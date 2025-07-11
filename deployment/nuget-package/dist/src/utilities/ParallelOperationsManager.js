// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export class ParallelOperationsManager {
    config;
    constructor(config) {
        this.config = {
            maxConcurrency: 3, // Conservative default for Power Platform API limits
            timeoutMs: 300000, // 5 minutes default timeout
            retryAttempts: 2,
            retryDelayMs: 5000, // 5 second delay between retries
            ...config
        };
    }
    /**
     * Executes multiple operations in parallel with safety checks
     * @param operations Array of operation functions to execute
     * @param safetyChecker Function to check if operations can run in parallel
     * @returns Results of all operations
     */
    async executeParallel(operations, safetyChecker) {
        // Group operations based on safety constraints
        const { parallelGroups, sequentialOperations } = this.groupOperations(operations, safetyChecker);
        const allResults = [];
        // Execute parallel groups
        for (const group of parallelGroups) {
            const groupResults = await this.executeBatch(group);
            allResults.push(...groupResults);
        }
        // Execute sequential operations
        for (const operation of sequentialOperations) {
            const result = await this.executeSingle(operation);
            allResults.push(result);
        }
        return allResults;
    }
    /**
     * Executes multiple solution export operations in parallel
     * @param solutionExports Array of solution export configurations
     * @returns Results of all export operations
     */
    async exportSolutionsParallel(solutionExports) {
        // Solutions can be exported in parallel if they're from different environments
        // or different solutions from the same environment
        const safetyChecker = (id1, id2) => {
            const export1 = solutionExports.find(e => e.id === id1);
            const export2 = solutionExports.find(e => e.id === id2);
            if (!export1 || !export2)
                return false;
            // Different environments can run in parallel
            if (export1.environmentUrl !== export2.environmentUrl) {
                return true;
            }
            // Different solutions from same environment can run in parallel
            return export1.solutionName !== export2.solutionName;
        };
        const operations = solutionExports.map(se => ({
            id: se.id,
            operation: se.exportOperation
        }));
        return this.executeParallel(operations, safetyChecker);
    }
    /**
     * Executes multiple solution import operations with safety checks
     * @param solutionImports Array of solution import configurations
     * @returns Results of all import operations
     */
    async importSolutionsParallel(solutionImports) {
        // Solution imports need careful dependency management
        const dependencyMap = new Map();
        solutionImports.forEach(si => {
            dependencyMap.set(si.id, si.dependencies);
        });
        // Execute imports in dependency order
        const results = [];
        const completed = new Set();
        const remaining = new Set(solutionImports.map(si => si.id));
        while (remaining.size > 0) {
            // Find operations that can run (all dependencies completed)
            const ready = [];
            for (const importId of remaining) {
                const dependencies = dependencyMap.get(importId) || [];
                const canRun = dependencies.every(dep => completed.has(dep));
                if (canRun) {
                    const importConfig = solutionImports.find(si => si.id === importId);
                    if (importConfig) {
                        ready.push({
                            id: importId,
                            operation: importConfig.importOperation
                        });
                    }
                }
            }
            if (ready.length === 0) {
                // Circular dependency or missing dependency
                const remainingOps = Array.from(remaining);
                throw new Error(`Cannot resolve dependencies for operations: ${remainingOps.join(', ')}`);
            }
            // Execute ready operations in parallel (but respect environment limits)
            const batchResults = await this.executeBatch(ready);
            results.push(...batchResults);
            // Mark completed operations
            batchResults.forEach(result => {
                if (result.success) {
                    completed.add(result.operationId);
                    remaining.delete(result.operationId);
                }
            });
        }
        return results;
    }
    async executeBatch(operations) {
        // Limit concurrency to respect API limits
        const batches = [];
        for (let i = 0; i < operations.length; i += this.config.maxConcurrency) {
            batches.push(operations.slice(i, i + this.config.maxConcurrency));
        }
        const allResults = [];
        for (const batch of batches) {
            const batchPromises = batch.map(op => this.executeSingle(op));
            const batchResults = await Promise.allSettled(batchPromises);
            allResults.push(...batchResults.map((result, index) => ({
                operationId: batch[index].id,
                success: result.status === 'fulfilled' && result.value.success,
                data: result.status === 'fulfilled' ? result.value.data : undefined,
                error: result.status === 'rejected' ? new Error(result.reason) :
                    (result.status === 'fulfilled' ? result.value.error : undefined)
            })));
        }
        return allResults;
    }
    async executeSingle(operation) {
        let lastError;
        for (let attempt = 0; attempt <= this.config.retryAttempts; attempt++) {
            try {
                // Add timeout wrapper
                const timeoutPromise = new Promise((_, reject) => {
                    setTimeout(() => reject(new Error('Operation timeout')), this.config.timeoutMs);
                });
                const data = await Promise.race([
                    operation.operation(),
                    timeoutPromise
                ]);
                return {
                    operationId: operation.id,
                    success: true,
                    data
                };
            }
            catch (error) {
                lastError = error instanceof Error ? error : new Error(String(error));
                // Wait before retry (except on last attempt)
                if (attempt < this.config.retryAttempts) {
                    await this.delay(this.config.retryDelayMs * Math.pow(2, attempt)); // Exponential backoff
                }
            }
        }
        return {
            operationId: operation.id,
            success: false,
            error: lastError
        };
    }
    groupOperations(operations, safetyChecker) {
        if (!safetyChecker) {
            // If no safety checker, assume all operations can run in parallel
            return {
                parallelGroups: [operations],
                sequentialOperations: []
            };
        }
        const parallelGroups = [];
        const sequentialOperations = [];
        const processed = new Set();
        for (const operation of operations) {
            if (processed.has(operation.id))
                continue;
            // Try to find a group where this operation can be added
            let addedToGroup = false;
            for (const group of parallelGroups) {
                const canAddToGroup = group.every(groupOp => safetyChecker(operation.id, groupOp.id));
                if (canAddToGroup) {
                    group.push(operation);
                    addedToGroup = true;
                    break;
                }
            }
            if (!addedToGroup) {
                // Create new group or add to sequential operations
                const compatibleOps = operations.filter(op => !processed.has(op.id) &&
                    op.id !== operation.id &&
                    safetyChecker(operation.id, op.id));
                if (compatibleOps.length > 0) {
                    parallelGroups.push([operation, ...compatibleOps]);
                    compatibleOps.forEach(op => processed.add(op.id));
                }
                else {
                    sequentialOperations.push(operation);
                }
            }
            processed.add(operation.id);
        }
        return { parallelGroups, sequentialOperations };
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
// Global parallel operations manager
export const globalParallelManager = new ParallelOperationsManager();
