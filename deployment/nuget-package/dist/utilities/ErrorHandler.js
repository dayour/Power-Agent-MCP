// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as tl from 'azure-pipelines-task-lib/task';
export class ErrorHandler {
    static sensitivePatterns = [
        /password[=:]\s*[^\s&]+/gi,
        /token[=:]\s*[^\s&]+/gi,
        /secret[=:]\s*[^\s&]+/gi,
        /key[=:]\s*[^\s&]+/gi,
        /authorization[=:]\s*[^\s&]+/gi,
        /bearer\s+[^\s&]+/gi
    ];
    static sanitizeError(error) {
        let message = typeof error === 'string' ? error : (error.message || error.toString());
        this.sensitivePatterns.forEach(pattern => {
            message = message.replace(pattern, '[REDACTED]');
        });
        return message;
    }
    static createEnhancedError(options) {
        const { operation, context = {}, troubleshootingSteps = [], documentationUrl, originalError } = options;
        let enhancedMessage = `Failed to ${operation}`;
        // Add original error if provided
        if (originalError) {
            const sanitizedError = this.sanitizeError(originalError);
            enhancedMessage += `:\n${sanitizedError}`;
        }
        // Add context information
        const contextEntries = Object.entries(context).filter(([_, value]) => value);
        if (contextEntries.length > 0) {
            enhancedMessage += '\n\nContext:';
            contextEntries.forEach(([key, value]) => {
                enhancedMessage += `\n- ${key}: ${value}`;
            });
        }
        // Add troubleshooting steps
        if (troubleshootingSteps.length > 0) {
            enhancedMessage += '\n\nTroubleshooting steps:';
            troubleshootingSteps.forEach((step, index) => {
                enhancedMessage += `\n${index + 1}. ${step}`;
            });
        }
        // Add documentation link
        if (documentationUrl) {
            enhancedMessage += `\n\nFor more help, see: ${documentationUrl}`;
        }
        return enhancedMessage;
    }
    static handleSolutionExportError(solutionName, environmentUrl, outputPath, originalError) {
        const enhancedMessage = this.createEnhancedError({
            operation: `export solution '${solutionName}'`,
            context: {
                'Solution Name': solutionName,
                'Environment URL': environmentUrl,
                'Output Path': outputPath || 'Not specified'
            },
            troubleshootingSteps: [
                'Verify the solution name exists in the target environment',
                'Check that you have sufficient permissions to export solutions',
                'Ensure the environment URL is correct and accessible',
                'Verify the output path is valid and writable',
                'Check if the solution has any dependencies that might prevent export'
            ],
            documentationUrl: 'https://aka.ms/powerplatform-export-solution',
            originalError
        });
        tl.setResult(tl.TaskResult.Failed, enhancedMessage);
    }
    static handleSolutionImportError(solutionPath, environmentUrl, originalError) {
        const enhancedMessage = this.createEnhancedError({
            operation: `import solution from '${solutionPath}'`,
            context: {
                'Solution Path': solutionPath,
                'Environment URL': environmentUrl
            },
            troubleshootingSteps: [
                'Verify the solution file exists and is not corrupted',
                'Check that you have sufficient permissions to import solutions',
                'Ensure the target environment is accessible and active',
                'Verify the solution is compatible with the target environment version',
                'Check if there are any dependency conflicts with existing solutions',
                'Ensure sufficient storage space is available in the target environment'
            ],
            documentationUrl: 'https://aka.ms/powerplatform-import-solution',
            originalError
        });
        tl.setResult(tl.TaskResult.Failed, enhancedMessage);
    }
    static handleEnvironmentError(operation, environmentUrl, originalError) {
        const enhancedMessage = this.createEnhancedError({
            operation: `${operation} environment`,
            context: {
                'Environment URL': environmentUrl
            },
            troubleshootingSteps: [
                'Verify the environment URL is correct and accessible',
                'Check that you have sufficient permissions for this operation',
                'Ensure your authentication credentials are valid and not expired',
                'Verify the environment is not in maintenance mode',
                'Check network connectivity and firewall settings'
            ],
            documentationUrl: 'https://aka.ms/powerplatform-environment-management',
            originalError
        });
        tl.setResult(tl.TaskResult.Failed, enhancedMessage);
    }
    static handleValidationError(field, value, validationMessage, suggestions) {
        const enhancedMessage = this.createEnhancedError({
            operation: `validate parameter '${field}'`,
            context: {
                'Field': field,
                'Value': value
            },
            troubleshootingSteps: [
                validationMessage,
                ...(suggestions || [])
            ]
        });
        tl.setResult(tl.TaskResult.Failed, enhancedMessage);
    }
}
