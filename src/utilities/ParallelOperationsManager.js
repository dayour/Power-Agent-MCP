"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalParallelManager = exports.ParallelOperationsManager = void 0;
var ParallelOperationsManager = /** @class */ (function () {
    function ParallelOperationsManager(config) {
        this.config = __assign({ maxConcurrency: 3, timeoutMs: 300000, retryAttempts: 2, retryDelayMs: 5000 }, config);
    }
    /**
     * Executes multiple operations in parallel with safety checks
     * @param operations Array of operation functions to execute
     * @param safetyChecker Function to check if operations can run in parallel
     * @returns Results of all operations
     */
    ParallelOperationsManager.prototype.executeParallel = function (operations, safetyChecker) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, parallelGroups, sequentialOperations, allResults, _i, parallelGroups_1, group, groupResults, _b, sequentialOperations_1, operation, result;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.groupOperations(operations, safetyChecker), parallelGroups = _a.parallelGroups, sequentialOperations = _a.sequentialOperations;
                        allResults = [];
                        _i = 0, parallelGroups_1 = parallelGroups;
                        _c.label = 1;
                    case 1:
                        if (!(_i < parallelGroups_1.length)) return [3 /*break*/, 4];
                        group = parallelGroups_1[_i];
                        return [4 /*yield*/, this.executeBatch(group)];
                    case 2:
                        groupResults = _c.sent();
                        allResults.push.apply(allResults, groupResults);
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        _b = 0, sequentialOperations_1 = sequentialOperations;
                        _c.label = 5;
                    case 5:
                        if (!(_b < sequentialOperations_1.length)) return [3 /*break*/, 8];
                        operation = sequentialOperations_1[_b];
                        return [4 /*yield*/, this.executeSingle(operation)];
                    case 6:
                        result = _c.sent();
                        allResults.push(result);
                        _c.label = 7;
                    case 7:
                        _b++;
                        return [3 /*break*/, 5];
                    case 8: return [2 /*return*/, allResults];
                }
            });
        });
    };
    /**
     * Executes multiple solution export operations in parallel
     * @param solutionExports Array of solution export configurations
     * @returns Results of all export operations
     */
    ParallelOperationsManager.prototype.exportSolutionsParallel = function (solutionExports) {
        return __awaiter(this, void 0, void 0, function () {
            var safetyChecker, operations;
            return __generator(this, function (_a) {
                safetyChecker = function (id1, id2) {
                    var export1 = solutionExports.find(function (e) { return e.id === id1; });
                    var export2 = solutionExports.find(function (e) { return e.id === id2; });
                    if (!export1 || !export2)
                        return false;
                    // Different environments can run in parallel
                    if (export1.environmentUrl !== export2.environmentUrl) {
                        return true;
                    }
                    // Different solutions from same environment can run in parallel
                    return export1.solutionName !== export2.solutionName;
                };
                operations = solutionExports.map(function (se) { return ({
                    id: se.id,
                    operation: se.exportOperation
                }); });
                return [2 /*return*/, this.executeParallel(operations, safetyChecker)];
            });
        });
    };
    /**
     * Executes multiple solution import operations with safety checks
     * @param solutionImports Array of solution import configurations
     * @returns Results of all import operations
     */
    ParallelOperationsManager.prototype.importSolutionsParallel = function (solutionImports) {
        return __awaiter(this, void 0, void 0, function () {
            var dependencyMap, results, completed, remaining, ready, _loop_1, _i, remaining_1, importId, remainingOps, batchResults;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dependencyMap = new Map();
                        solutionImports.forEach(function (si) {
                            dependencyMap.set(si.id, si.dependencies);
                        });
                        results = [];
                        completed = new Set();
                        remaining = new Set(solutionImports.map(function (si) { return si.id; }));
                        _a.label = 1;
                    case 1:
                        if (!(remaining.size > 0)) return [3 /*break*/, 3];
                        ready = [];
                        _loop_1 = function (importId) {
                            var dependencies = dependencyMap.get(importId) || [];
                            var canRun = dependencies.every(function (dep) { return completed.has(dep); });
                            if (canRun) {
                                var importConfig = solutionImports.find(function (si) { return si.id === importId; });
                                if (importConfig) {
                                    ready.push({
                                        id: importId,
                                        operation: importConfig.importOperation
                                    });
                                }
                            }
                        };
                        for (_i = 0, remaining_1 = remaining; _i < remaining_1.length; _i++) {
                            importId = remaining_1[_i];
                            _loop_1(importId);
                        }
                        if (ready.length === 0) {
                            remainingOps = Array.from(remaining);
                            throw new Error("Cannot resolve dependencies for operations: ".concat(remainingOps.join(', ')));
                        }
                        return [4 /*yield*/, this.executeBatch(ready)];
                    case 2:
                        batchResults = _a.sent();
                        results.push.apply(results, batchResults);
                        // Mark completed operations
                        batchResults.forEach(function (result) {
                            if (result.success) {
                                completed.add(result.operationId);
                                remaining.delete(result.operationId);
                            }
                        });
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/, results];
                }
            });
        });
    };
    ParallelOperationsManager.prototype.executeBatch = function (operations) {
        return __awaiter(this, void 0, void 0, function () {
            var batches, i, allResults, _loop_2, _i, batches_1, batch;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        batches = [];
                        for (i = 0; i < operations.length; i += this.config.maxConcurrency) {
                            batches.push(operations.slice(i, i + this.config.maxConcurrency));
                        }
                        allResults = [];
                        _loop_2 = function (batch) {
                            var batchPromises, batchResults;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        batchPromises = batch.map(function (op) { return _this.executeSingle(op); });
                                        return [4 /*yield*/, Promise.allSettled(batchPromises)];
                                    case 1:
                                        batchResults = _b.sent();
                                        allResults.push.apply(allResults, batchResults.map(function (result, index) { return ({
                                            operationId: batch[index].id,
                                            success: result.status === 'fulfilled' && result.value.success,
                                            data: result.status === 'fulfilled' ? result.value.data : undefined,
                                            error: result.status === 'rejected' ? new Error(result.reason) :
                                                (result.status === 'fulfilled' ? result.value.error : undefined)
                                        }); }));
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _i = 0, batches_1 = batches;
                        _a.label = 1;
                    case 1:
                        if (!(_i < batches_1.length)) return [3 /*break*/, 4];
                        batch = batches_1[_i];
                        return [5 /*yield**/, _loop_2(batch)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, allResults];
                }
            });
        });
    };
    ParallelOperationsManager.prototype.executeSingle = function (operation) {
        return __awaiter(this, void 0, void 0, function () {
            var lastError, attempt, timeoutPromise, data, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        attempt = 0;
                        _a.label = 1;
                    case 1:
                        if (!(attempt <= this.config.retryAttempts)) return [3 /*break*/, 8];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 7]);
                        timeoutPromise = new Promise(function (_, reject) {
                            setTimeout(function () { return reject(new Error('Operation timeout')); }, _this.config.timeoutMs);
                        });
                        return [4 /*yield*/, Promise.race([
                                operation.operation(),
                                timeoutPromise
                            ])];
                    case 3:
                        data = _a.sent();
                        return [2 /*return*/, {
                                operationId: operation.id,
                                success: true,
                                data: data
                            }];
                    case 4:
                        error_1 = _a.sent();
                        lastError = error_1 instanceof Error ? error_1 : new Error(String(error_1));
                        if (!(attempt < this.config.retryAttempts)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.delay(this.config.retryDelayMs * Math.pow(2, attempt))];
                    case 5:
                        _a.sent(); // Exponential backoff
                        _a.label = 6;
                    case 6: return [3 /*break*/, 7];
                    case 7:
                        attempt++;
                        return [3 /*break*/, 1];
                    case 8: return [2 /*return*/, {
                            operationId: operation.id,
                            success: false,
                            error: lastError
                        }];
                }
            });
        });
    };
    ParallelOperationsManager.prototype.groupOperations = function (operations, safetyChecker) {
        if (!safetyChecker) {
            // If no safety checker, assume all operations can run in parallel
            return {
                parallelGroups: [operations],
                sequentialOperations: []
            };
        }
        var parallelGroups = [];
        var sequentialOperations = [];
        var processed = new Set();
        var _loop_3 = function (operation) {
            if (processed.has(operation.id))
                return "continue";
            // Try to find a group where this operation can be added
            var addedToGroup = false;
            for (var _a = 0, parallelGroups_2 = parallelGroups; _a < parallelGroups_2.length; _a++) {
                var group = parallelGroups_2[_a];
                var canAddToGroup = group.every(function (groupOp) { return safetyChecker(operation.id, groupOp.id); });
                if (canAddToGroup) {
                    group.push(operation);
                    addedToGroup = true;
                    break;
                }
            }
            if (!addedToGroup) {
                // Create new group or add to sequential operations
                var compatibleOps = operations.filter(function (op) {
                    return !processed.has(op.id) &&
                        op.id !== operation.id &&
                        safetyChecker(operation.id, op.id);
                });
                if (compatibleOps.length > 0) {
                    parallelGroups.push(__spreadArray([operation], compatibleOps, true));
                    compatibleOps.forEach(function (op) { return processed.add(op.id); });
                }
                else {
                    sequentialOperations.push(operation);
                }
            }
            processed.add(operation.id);
        };
        for (var _i = 0, operations_1 = operations; _i < operations_1.length; _i++) {
            var operation = operations_1[_i];
            _loop_3(operation);
        }
        return { parallelGroups: parallelGroups, sequentialOperations: sequentialOperations };
    };
    ParallelOperationsManager.prototype.delay = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    return ParallelOperationsManager;
}());
exports.ParallelOperationsManager = ParallelOperationsManager;
// Global parallel operations manager
exports.globalParallelManager = new ParallelOperationsManager();
