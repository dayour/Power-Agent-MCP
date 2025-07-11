"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPPORTED_FEATURES = exports.ENHANCEMENT_VERSION = exports.TemplateManager = exports.globalParallelManager = exports.ParallelOperationsManager = exports.globalCache = exports.PowerPlatformCache = exports.ParameterValidator = exports.ErrorHandler = exports.enhancedBuildTools = exports.EnhancedBuildTools = void 0;
// Main enhanced build tools integration
var EnhancedBuildTools_1 = require("./EnhancedBuildTools");
Object.defineProperty(exports, "EnhancedBuildTools", { enumerable: true, get: function () { return EnhancedBuildTools_1.EnhancedBuildTools; } });
Object.defineProperty(exports, "enhancedBuildTools", { enumerable: true, get: function () { return EnhancedBuildTools_1.enhancedBuildTools; } });
// Error handling utilities
var ErrorHandler_1 = require("./ErrorHandler");
Object.defineProperty(exports, "ErrorHandler", { enumerable: true, get: function () { return ErrorHandler_1.ErrorHandler; } });
// Parameter validation utilities
var ParameterValidator_1 = require("./ParameterValidator");
Object.defineProperty(exports, "ParameterValidator", { enumerable: true, get: function () { return ParameterValidator_1.ParameterValidator; } });
// Caching mechanisms
var CacheManager_1 = require("./CacheManager");
Object.defineProperty(exports, "PowerPlatformCache", { enumerable: true, get: function () { return CacheManager_1.PowerPlatformCache; } });
Object.defineProperty(exports, "globalCache", { enumerable: true, get: function () { return CacheManager_1.globalCache; } });
// Parallel operations support
var ParallelOperationsManager_1 = require("./ParallelOperationsManager");
Object.defineProperty(exports, "ParallelOperationsManager", { enumerable: true, get: function () { return ParallelOperationsManager_1.ParallelOperationsManager; } });
Object.defineProperty(exports, "globalParallelManager", { enumerable: true, get: function () { return ParallelOperationsManager_1.globalParallelManager; } });
// Template management
var TemplateManager_1 = require("./TemplateManager");
Object.defineProperty(exports, "TemplateManager", { enumerable: true, get: function () { return TemplateManager_1.TemplateManager; } });
// Utility constants
exports.ENHANCEMENT_VERSION = '1.0.0';
exports.SUPPORTED_FEATURES = [
    'enhanced-error-messages',
    'parameter-validation',
    'parallel-operations',
    'caching-mechanisms',
    'template-management'
];
