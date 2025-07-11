"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
exports.ErrorHandler = void 0;
var tl = require("azure-pipelines-task-lib/task");
var ErrorHandler = /** @class */ (function () {
    function ErrorHandler() {
    }
    ErrorHandler.sanitizeError = function (error) {
        var message = typeof error === 'string' ? error : (error.message || error.toString());
        this.sensitivePatterns.forEach(function (pattern) {
            message = message.replace(pattern, '[REDACTED]');
        });
        return message;
    };
    ErrorHandler.createEnhancedError = function (options) {
        var operation = options.operation, _a = options.context, context = _a === void 0 ? {} : _a, _b = options.troubleshootingSteps, troubleshootingSteps = _b === void 0 ? [] : _b, documentationUrl = options.documentationUrl, originalError = options.originalError;
        var enhancedMessage = "Failed to ".concat(operation);
        // Add original error if provided
        if (originalError) {
            var sanitizedError = this.sanitizeError(originalError);
            enhancedMessage += ":\n".concat(sanitizedError);
        }
        // Add context information
        var contextEntries = Object.entries(context).filter(function (_a) {
            var _ = _a[0], value = _a[1];
            return value;
        });
        if (contextEntries.length > 0) {
            enhancedMessage += '\n\nContext:';
            contextEntries.forEach(function (_a) {
                var key = _a[0], value = _a[1];
                enhancedMessage += "\n- ".concat(key, ": ").concat(value);
            });
        }
        // Add troubleshooting steps
        if (troubleshootingSteps.length > 0) {
            enhancedMessage += '\n\nTroubleshooting steps:';
            troubleshootingSteps.forEach(function (step, index) {
                enhancedMessage += "\n".concat(index + 1, ". ").concat(step);
            });
        }
        // Add documentation link
        if (documentationUrl) {
            enhancedMessage += "\n\nFor more help, see: ".concat(documentationUrl);
        }
        return enhancedMessage;
    };
    ErrorHandler.handleSolutionExportError = function (solutionName, environmentUrl, outputPath, originalError) {
        var enhancedMessage = this.createEnhancedError({
            operation: "export solution '".concat(solutionName, "'"),
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
            originalError: originalError
        });
        tl.setResult(tl.TaskResult.Failed, enhancedMessage);
    };
    ErrorHandler.handleSolutionImportError = function (solutionPath, environmentUrl, originalError) {
        var enhancedMessage = this.createEnhancedError({
            operation: "import solution from '".concat(solutionPath, "'"),
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
            originalError: originalError
        });
        tl.setResult(tl.TaskResult.Failed, enhancedMessage);
    };
    ErrorHandler.handleEnvironmentError = function (operation, environmentUrl, originalError) {
        var enhancedMessage = this.createEnhancedError({
            operation: "".concat(operation, " environment"),
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
            originalError: originalError
        });
        tl.setResult(tl.TaskResult.Failed, enhancedMessage);
    };
    ErrorHandler.handleValidationError = function (field, value, validationMessage, suggestions) {
        var enhancedMessage = this.createEnhancedError({
            operation: "validate parameter '".concat(field, "'"),
            context: {
                'Field': field,
                'Value': value
            },
            troubleshootingSteps: __spreadArray([
                validationMessage
            ], (suggestions || []), true)
        });
        tl.setResult(tl.TaskResult.Failed, enhancedMessage);
    };
    ErrorHandler.sensitivePatterns = [
        /password[=:]\s*[^\s&]+/gi,
        /token[=:]\s*[^\s&]+/gi,
        /secret[=:]\s*[^\s&]+/gi,
        /key[=:]\s*[^\s&]+/gi,
        /authorization[=:]\s*[^\s&]+/gi,
        /bearer\s+[^\s&]+/gi
    ];
    return ErrorHandler;
}());
exports.ErrorHandler = ErrorHandler;
