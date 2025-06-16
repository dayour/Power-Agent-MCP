// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ErrorHandler } from './ErrorHandler';
import { ParameterValidator } from './ParameterValidator';
import { PowerPlatformCache, globalCache } from './CacheManager';
import { ParallelOperationsManager, globalParallelManager } from './ParallelOperationsManager';
import { TemplateManager } from './TemplateManager';

/**
 * Enhanced Power Platform Build Tools utilities that integrate all improvements
 */
export class EnhancedBuildTools {
  private static instance: EnhancedBuildTools;
  private cache: PowerPlatformCache;
  private parallelManager: ParallelOperationsManager;
  private templateManager: TemplateManager;

  private constructor() {
    this.cache = globalCache;
    this.parallelManager = globalParallelManager;
    this.templateManager = new TemplateManager();
  }

  public static getInstance(): EnhancedBuildTools {
    if (!EnhancedBuildTools.instance) {
      EnhancedBuildTools.instance = new EnhancedBuildTools();
    }
    return EnhancedBuildTools.instance;
  }

  /**
   * Enhanced solution export with caching, validation, and error handling
   */
  public async exportSolutionEnhanced(params: {
    solutionName: string;
    environmentUrl: string;
    outputPath: string;
    exportFunction: () => Promise<any>;
  }): Promise<any> {
    try {
      // Parameter validation
      ParameterValidator.validateAndThrow({
        solutionName: params.solutionName,
        solutionPath: params.outputPath,
        environmentUrl: params.environmentUrl
      });

      // Check cache first
      const cacheKey = `export:${params.environmentUrl}:${params.solutionName}`;
      const cachedResult = this.cache.get(cacheKey);
      if (cachedResult) {
        return cachedResult;
      }

      // Execute export
      const result = await params.exportFunction();

      // Cache the result
      this.cache.set(cacheKey, result, 5 * 60 * 1000); // 5 minutes TTL

      return result;

    } catch (error) {
      ErrorHandler.handleSolutionExportError(
        params.solutionName,
        params.environmentUrl,
        params.outputPath,
        error instanceof Error ? error : String(error)
      );
      throw error; // Re-throw for caller handling
    }
  }

  /**
   * Enhanced solution import with validation and error handling
   */
  public async importSolutionEnhanced(params: {
    solutionPath: string;
    environmentUrl: string;
    importFunction: () => Promise<any>;
  }): Promise<any> {
    try {
      // Parameter validation
      ParameterValidator.validateAndThrow({
        solutionPath: params.solutionPath,
        environmentUrl: params.environmentUrl
      });

      // Execute import
      const result = await params.importFunction();

      // Invalidate related cache entries
      this.cache.invalidatePattern(`solution:${params.environmentUrl}:`);
      this.cache.invalidatePattern(`environment:${params.environmentUrl}`);

      return result;

    } catch (error) {
      ErrorHandler.handleSolutionImportError(
        params.solutionPath,
        params.environmentUrl,
        error instanceof Error ? error : String(error)
      );
      throw error; // Re-throw for caller handling
    }
  }

  /**
   * Execute multiple solution operations in parallel
   */
  public async executeParallelSolutionOperations<T>(
    operations: Array<{
      id: string;
      solutionName: string;
      environmentUrl: string;
      operation: () => Promise<T>;
    }>
  ): Promise<Array<{ id: string; success: boolean; data?: T; error?: Error }>> {
    return this.parallelManager.exportSolutionsParallel(
      operations.map(op => ({
        id: op.id,
        solutionName: op.solutionName,
        environmentUrl: op.environmentUrl,
        exportOperation: op.operation
      }))
    );
  }

  /**
   * Apply a deployment template with enhanced configuration
   */
  public applyDeploymentTemplate(
    scenarioId: string,
    customizations?: Record<string, any>
  ): Record<string, any> {
    const template = this.templateManager.getTemplate(scenarioId);
    if (!template) {
      throw new Error(`Template not found for scenario: ${scenarioId}`);
    }

    return this.templateManager.applyTemplate(template, customizations);
  }

  /**
   * Get template suggestions based on context
   */
  public getTemplateSuggestions(context: {
    hasMultipleSolutions?: boolean;
    hasMultipleEnvironments?: boolean;
    isProduction?: boolean;
    includesTesting?: boolean;
  }) {
    return this.templateManager.getTemplateSuggestions(context);
  }

  /**
   * Get cache statistics for monitoring
   */
  public getCacheStats() {
    return this.cache.getStats();
  }

  /**
   * Clear cache (useful for testing or troubleshooting)
   */
  public clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get all available templates
   */
  public getAvailableTemplates() {
    return this.templateManager.listTemplates();
  }

  /**
   * Enhanced environment operation with caching and error handling
   */
  public async executeEnvironmentOperation<T>(params: {
    operation: string;
    environmentUrl: string;
    operationFunction: () => Promise<T>;
    cacheTTL?: number;
  }): Promise<T> {
    try {
      // Validate environment URL
      const urlValidation = ParameterValidator.validateEnvironmentUrl(params.environmentUrl);
      if (!urlValidation.isValid) {
        ErrorHandler.handleValidationError(
          'EnvironmentUrl',
          params.environmentUrl,
          urlValidation.message,
          urlValidation.suggestion ? [urlValidation.suggestion] : undefined
        );
        throw new Error(urlValidation.message);
      }

      // Check cache if this is a read operation
      const cacheKey = `env:${params.operation}:${params.environmentUrl}`;
      const isReadOperation = ['get', 'list', 'check', 'status'].some(op => 
        params.operation.toLowerCase().includes(op)
      );

      if (isReadOperation) {
        const cached = this.cache.get<T>(cacheKey);
        if (cached) {
          return cached;
        }
      }

      // Execute operation
      const result = await params.operationFunction();

      // Cache read operations
      if (isReadOperation) {
        this.cache.set(cacheKey, result, params.cacheTTL);
      } else {
        // Invalidate cache for write operations
        this.cache.invalidatePattern(`env:.*:${params.environmentUrl}`);
      }

      return result;

    } catch (error) {
      ErrorHandler.handleEnvironmentError(
        params.operation,
        params.environmentUrl,
        error instanceof Error ? error : String(error)
      );
      throw error;
    }
  }
}

// Export singleton instance for convenience
export const enhancedBuildTools = EnhancedBuildTools.getInstance();

// Export utility classes for advanced usage
export {
  ErrorHandler,
  ParameterValidator,
  PowerPlatformCache,
  ParallelOperationsManager,
  TemplateManager
};