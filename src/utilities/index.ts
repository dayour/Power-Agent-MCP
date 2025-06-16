// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Main enhanced build tools integration
export { EnhancedBuildTools, enhancedBuildTools } from './EnhancedBuildTools';

// Error handling utilities
export { ErrorHandler, EnhancedErrorOptions } from './ErrorHandler';

// Parameter validation utilities
export { ParameterValidator, ValidationResult } from './ParameterValidator';

// Caching mechanisms
export { PowerPlatformCache, CacheEntry, CacheConfig, globalCache } from './CacheManager';

// Parallel operations support
export { 
  ParallelOperationsManager, 
  OperationResult, 
  ParallelOperationConfig,
  globalParallelManager 
} from './ParallelOperationsManager';

// Template management
export { 
  TemplateManager, 
  TaskTemplate, 
  TaskConfiguration, 
  TemplateValidationResult 
} from './TemplateManager';

// Utility constants
export const ENHANCEMENT_VERSION = '1.0.0';
export const SUPPORTED_FEATURES = [
  'enhanced-error-messages',
  'parameter-validation',
  'parallel-operations',
  'caching-mechanisms',
  'template-management'
] as const;

export type SupportedFeature = typeof SUPPORTED_FEATURES[number];