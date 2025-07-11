// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
// Main enhanced build tools integration
export { EnhancedBuildTools, enhancedBuildTools } from './EnhancedBuildTools';
// Error handling utilities
export { ErrorHandler } from './ErrorHandler';
// Parameter validation utilities
export { ParameterValidator } from './ParameterValidator';
// Caching mechanisms
export { PowerPlatformCache, globalCache } from './CacheManager';
// Parallel operations support
export { ParallelOperationsManager, globalParallelManager } from './ParallelOperationsManager';
// Template management
export { TemplateManager } from './TemplateManager';
// Utility constants
export const ENHANCEMENT_VERSION = '1.0.0';
export const SUPPORTED_FEATURES = [
    'enhanced-error-messages',
    'parameter-validation',
    'parallel-operations',
    'caching-mechanisms',
    'template-management'
];
