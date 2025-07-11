"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateManager = exports.ParallelOperationsManager = exports.PowerPlatformCache = exports.ParameterValidator = exports.ErrorHandler = exports.enhancedBuildTools = exports.EnhancedBuildTools = void 0;
var ErrorHandler_1 = require("./ErrorHandler");
Object.defineProperty(exports, "ErrorHandler", { enumerable: true, get: function () { return ErrorHandler_1.ErrorHandler; } });
var ParameterValidator_1 = require("./ParameterValidator");
Object.defineProperty(exports, "ParameterValidator", { enumerable: true, get: function () { return ParameterValidator_1.ParameterValidator; } });
var CacheManager_1 = require("./CacheManager");
Object.defineProperty(exports, "PowerPlatformCache", { enumerable: true, get: function () { return CacheManager_1.PowerPlatformCache; } });
var ParallelOperationsManager_1 = require("./ParallelOperationsManager");
Object.defineProperty(exports, "ParallelOperationsManager", { enumerable: true, get: function () { return ParallelOperationsManager_1.ParallelOperationsManager; } });
var TemplateManager_1 = require("./TemplateManager");
Object.defineProperty(exports, "TemplateManager", { enumerable: true, get: function () { return TemplateManager_1.TemplateManager; } });
/**
 * Enhanced Power Platform Build Tools utilities that integrate all improvements
 */
var EnhancedBuildTools = /** @class */ (function () {
    function EnhancedBuildTools() {
        this.cache = CacheManager_1.globalCache;
        this.parallelManager = ParallelOperationsManager_1.globalParallelManager;
        this.templateManager = new TemplateManager_1.TemplateManager();
    }
    EnhancedBuildTools.getInstance = function () {
        if (!EnhancedBuildTools.instance) {
            EnhancedBuildTools.instance = new EnhancedBuildTools();
        }
        return EnhancedBuildTools.instance;
    };
    /**
     * Enhanced solution export with caching, validation, and error handling
     */
    EnhancedBuildTools.prototype.exportSolutionEnhanced = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheKey, cachedResult, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // Parameter validation
                        ParameterValidator_1.ParameterValidator.validateAndThrow({
                            solutionName: params.solutionName,
                            solutionPath: params.outputPath,
                            environmentUrl: params.environmentUrl
                        });
                        cacheKey = "export:".concat(params.environmentUrl, ":").concat(params.solutionName);
                        cachedResult = this.cache.get(cacheKey);
                        if (cachedResult) {
                            return [2 /*return*/, cachedResult];
                        }
                        return [4 /*yield*/, params.exportFunction()];
                    case 1:
                        result = _a.sent();
                        // Cache the result
                        this.cache.set(cacheKey, result, 5 * 60 * 1000); // 5 minutes TTL
                        return [2 /*return*/, result];
                    case 2:
                        error_1 = _a.sent();
                        ErrorHandler_1.ErrorHandler.handleSolutionExportError(params.solutionName, params.environmentUrl, params.outputPath, error_1 instanceof Error ? error_1 : String(error_1));
                        throw error_1; // Re-throw for caller handling
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Enhanced solution import with validation and error handling
     */
    EnhancedBuildTools.prototype.importSolutionEnhanced = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // Parameter validation
                        ParameterValidator_1.ParameterValidator.validateAndThrow({
                            solutionPath: params.solutionPath,
                            environmentUrl: params.environmentUrl
                        });
                        return [4 /*yield*/, params.importFunction()];
                    case 1:
                        result = _a.sent();
                        // Invalidate related cache entries
                        this.cache.invalidatePattern("solution:".concat(params.environmentUrl, ":"));
                        this.cache.invalidatePattern("environment:".concat(params.environmentUrl));
                        return [2 /*return*/, result];
                    case 2:
                        error_2 = _a.sent();
                        ErrorHandler_1.ErrorHandler.handleSolutionImportError(params.solutionPath, params.environmentUrl, error_2 instanceof Error ? error_2 : String(error_2));
                        throw error_2; // Re-throw for caller handling
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Execute multiple solution operations in parallel
     */
    EnhancedBuildTools.prototype.executeParallelSolutionOperations = function (operations) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.parallelManager.exportSolutionsParallel(operations.map(function (op) { return ({
                        id: op.id,
                        solutionName: op.solutionName,
                        environmentUrl: op.environmentUrl,
                        exportOperation: op.operation
                    }); }))];
            });
        });
    };
    /**
     * Apply a deployment template with enhanced configuration
     */
    EnhancedBuildTools.prototype.applyDeploymentTemplate = function (scenarioId, customizations) {
        var template = this.templateManager.getTemplate(scenarioId);
        if (!template) {
            throw new Error("Template not found for scenario: ".concat(scenarioId));
        }
        return this.templateManager.applyTemplate(template, customizations);
    };
    /**
     * Get template suggestions based on context
     */
    EnhancedBuildTools.prototype.getTemplateSuggestions = function (context) {
        return this.templateManager.getTemplateSuggestions(context);
    };
    /**
     * Get cache statistics for monitoring
     */
    EnhancedBuildTools.prototype.getCacheStats = function () {
        return this.cache.getStats();
    };
    /**
     * Clear cache (useful for testing or troubleshooting)
     */
    EnhancedBuildTools.prototype.clearCache = function () {
        this.cache.clear();
    };
    /**
     * Get all available templates
     */
    EnhancedBuildTools.prototype.getAvailableTemplates = function () {
        return this.templateManager.listTemplates();
    };
    /**
     * Enhanced environment operation with caching and error handling
     */
    EnhancedBuildTools.prototype.executeEnvironmentOperation = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var urlValidation, cacheKey, isReadOperation, cached, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        urlValidation = ParameterValidator_1.ParameterValidator.validateEnvironmentUrl(params.environmentUrl);
                        if (!urlValidation.isValid) {
                            ErrorHandler_1.ErrorHandler.handleValidationError('EnvironmentUrl', params.environmentUrl, urlValidation.message, urlValidation.suggestion ? [urlValidation.suggestion] : undefined);
                            throw new Error(urlValidation.message);
                        }
                        cacheKey = "env:".concat(params.operation, ":").concat(params.environmentUrl);
                        isReadOperation = ['get', 'list', 'check', 'status'].some(function (op) {
                            return params.operation.toLowerCase().includes(op);
                        });
                        if (isReadOperation) {
                            cached = this.cache.get(cacheKey);
                            if (cached) {
                                return [2 /*return*/, cached];
                            }
                        }
                        return [4 /*yield*/, params.operationFunction()];
                    case 1:
                        result = _a.sent();
                        // Cache read operations
                        if (isReadOperation) {
                            this.cache.set(cacheKey, result, params.cacheTTL);
                        }
                        else {
                            // Invalidate cache for write operations
                            this.cache.invalidatePattern("env:.*:".concat(params.environmentUrl));
                        }
                        return [2 /*return*/, result];
                    case 2:
                        error_3 = _a.sent();
                        ErrorHandler_1.ErrorHandler.handleEnvironmentError(params.operation, params.environmentUrl, error_3 instanceof Error ? error_3 : String(error_3));
                        throw error_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return EnhancedBuildTools;
}());
exports.EnhancedBuildTools = EnhancedBuildTools;
// Export singleton instance for convenience
exports.enhancedBuildTools = EnhancedBuildTools.getInstance();
