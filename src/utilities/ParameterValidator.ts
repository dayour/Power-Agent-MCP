// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as path from 'path';
import * as fs from 'fs';
import * as tl from 'azure-pipelines-task-lib/task';
import { ErrorHandler } from './ErrorHandler';

export interface ValidationResult {
  isValid: boolean;
  message: string;
  suggestion?: string;
}

export class ParameterValidator {
  
  /**
   * Validates and sanitizes file paths to prevent path traversal attacks
   * @param inputPath The path to validate
   * @param allowedBasePath Optional base path to restrict access to
   * @returns Sanitized path if valid
   */
  public static validatePath(inputPath: string, allowedBasePath?: string): string {
    if (!inputPath) {
      throw new Error('Path is required');
    }

    // Remove any null bytes and normalize the path
    const sanitizedPath = inputPath.replace(/\0/g, '');
    
    // Check for path traversal attempts
    if (sanitizedPath.includes('..')) {
      throw new Error('Path traversal attempt detected. Relative paths with ".." are not allowed');
    }

    // Resolve the path to get absolute path
    const resolvedPath = path.resolve(sanitizedPath);

    // If a base path is provided, ensure the resolved path is within it
    if (allowedBasePath) {
      const resolvedBasePath = path.resolve(allowedBasePath);
      if (!resolvedPath.startsWith(resolvedBasePath)) {
        throw new Error(`Path '${inputPath}' is outside the allowed directory '${allowedBasePath}'`);
      }
    }

    // Enforce maximum path length (260 characters on Windows)
    if (resolvedPath.length > 260) {
      throw new Error(`Path length exceeds maximum allowed length of 260 characters`);
    }

    return resolvedPath;
  }

  /**
   * Validates solution file path with enhanced error messages
   * @param inputPath The solution file path to validate
   * @returns ValidationResult with detailed feedback
   */
  public static validateSolutionPath(inputPath: string): ValidationResult {
    if (!inputPath) {
      return {
        isValid: false,
        message: 'Solution path is required',
        suggestion: 'Specify the path to your solution file (e.g., solutions/MySolution.zip)'
      };
    }

    try {
      // Validate path security
      const sanitizedPath = this.validatePath(inputPath);

      // Check file extension
      if (!sanitizedPath.toLowerCase().endsWith('.zip')) {
        return {
          isValid: false,
          message: 'Solution file must be a .zip file',
          suggestion: `Did you mean '${inputPath}.zip'?`
        };
      }

      // Check if file exists (for import operations)
      if (fs.existsSync(sanitizedPath)) {
        const stats = fs.statSync(sanitizedPath);
        if (!stats.isFile()) {
          return {
            isValid: false,
            message: 'Solution path must point to a file, not a directory',
            suggestion: 'Ensure the path includes the solution filename with .zip extension'
          };
        }

        // Check file size (basic validation)
        if (stats.size === 0) {
          return {
            isValid: false,
            message: 'Solution file appears to be empty',
            suggestion: 'Verify the solution file was created correctly and is not corrupted'
          };
        }
      }

      return { isValid: true, message: 'Valid solution path' };

    } catch (error) {
      return {
        isValid: false,
        message: error instanceof Error ? error.message : 'Invalid path format',
        suggestion: 'Use an absolute path or a relative path from the working directory'
      };
    }
  }

  /**
   * Validates environment URL format and accessibility
   * @param environmentUrl The environment URL to validate
   * @returns ValidationResult with detailed feedback
   */
  public static validateEnvironmentUrl(environmentUrl: string): ValidationResult {
    if (!environmentUrl) {
      return {
        isValid: false,
        message: 'Environment URL is required',
        suggestion: 'Provide the URL of your Power Platform environment (e.g., https://myorg.crm.dynamics.com)'
      };
    }

    try {
      const url = new URL(environmentUrl);

      // Validate protocol
      if (!['https:', 'http:'].includes(url.protocol)) {
        return {
          isValid: false,
          message: 'Environment URL must use HTTP or HTTPS protocol',
          suggestion: `Did you mean 'https://${environmentUrl}'?`
        };
      }

      // Prefer HTTPS for security
      if (url.protocol === 'http:') {
        return {
          isValid: false,
          message: 'HTTPS is required for security',
          suggestion: `Use 'https://${url.host}${url.pathname}' instead`
        };
      }

      // Validate common Power Platform URL patterns
      const validPatterns = [
        /\.crm\d*\.dynamics\.com$/,
        /\.crm\d*\.microsoftdynamics\.com$/,
        /\.powerapps\.com$/
      ];

      const isValidPattern = validPatterns.some(pattern => pattern.test(url.hostname));
      if (!isValidPattern) {
        return {
          isValid: false,
          message: 'URL does not match expected Power Platform environment format',
          suggestion: 'Ensure the URL follows the pattern: https://[org].crm[region].dynamics.com'
        };
      }

      return { isValid: true, message: 'Valid environment URL' };

    } catch (error) {
      return {
        isValid: false,
        message: 'Invalid URL format',
        suggestion: 'Ensure the URL is properly formatted (e.g., https://myorg.crm.dynamics.com)'
      };
    }
  }

  /**
   * Validates solution name format and suggests corrections
   * @param solutionName The solution name to validate
   * @returns ValidationResult with detailed feedback
   */
  public static validateSolutionName(solutionName: string): ValidationResult {
    if (!solutionName) {
      return {
        isValid: false,
        message: 'Solution name is required',
        suggestion: 'Provide the unique name of the solution (not the display name)'
      };
    }

    // Check for invalid characters
    const invalidChars = /[<>:"/\\|?*\s]/;
    if (invalidChars.test(solutionName)) {
      return {
        isValid: false,
        message: 'Solution name contains invalid characters',
        suggestion: 'Solution names cannot contain spaces or special characters like < > : " / \\ | ? *'
      };
    }

    // Check length
    if (solutionName.length > 65) {
      return {
        isValid: false,
        message: 'Solution name is too long (maximum 65 characters)',
        suggestion: 'Use a shorter, more concise solution name'
      };
    }

    // Check for minimum length
    if (solutionName.length < 1) {
      return {
        isValid: false,
        message: 'Solution name cannot be empty',
        suggestion: 'Provide a meaningful solution name'
      };
    }

    return { isValid: true, message: 'Valid solution name' };
  }

  /**
   * Validates parameters and throws enhanced errors if validation fails
   * @param params Object containing parameters to validate
   */
  public static validateAndThrow(params: {
    solutionName?: string;
    solutionPath?: string;
    environmentUrl?: string;
  }): void {
    const { solutionName, solutionPath, environmentUrl } = params;

    if (solutionName) {
      const nameValidation = this.validateSolutionName(solutionName);
      if (!nameValidation.isValid) {
        ErrorHandler.handleValidationError('SolutionName', solutionName, nameValidation.message, 
          nameValidation.suggestion ? [nameValidation.suggestion] : undefined);
        return; // This won't be reached due to tl.setResult, but helps with type checking
      }
    }

    if (solutionPath) {
      const pathValidation = this.validateSolutionPath(solutionPath);
      if (!pathValidation.isValid) {
        ErrorHandler.handleValidationError('SolutionPath', solutionPath, pathValidation.message,
          pathValidation.suggestion ? [pathValidation.suggestion] : undefined);
        return;
      }
    }

    if (environmentUrl) {
      const urlValidation = this.validateEnvironmentUrl(environmentUrl);
      if (!urlValidation.isValid) {
        ErrorHandler.handleValidationError('EnvironmentUrl', environmentUrl, urlValidation.message,
          urlValidation.suggestion ? [urlValidation.suggestion] : undefined);
        return;
      }
    }
  }
}