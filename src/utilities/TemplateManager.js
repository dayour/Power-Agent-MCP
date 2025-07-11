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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateManager = void 0;
var TemplateManager = /** @class */ (function () {
    function TemplateManager() {
        this.templates = new Map();
        this.loadDefaultTemplates();
    }
    /**
     * Gets a template by scenario ID
     * @param scenarioId The scenario identifier
     * @returns Template if found, undefined otherwise
     */
    TemplateManager.prototype.getTemplate = function (scenarioId) {
        return this.templates.get(scenarioId);
    };
    /**
     * Applies a template with optional customizations
     * @param template The template to apply
     * @param customizations Optional parameter overrides
     * @returns Merged task configuration
     */
    TemplateManager.prototype.applyTemplate = function (template, customizations) {
        return __assign(__assign({}, template.parameters), customizations);
    };
    /**
     * Validates template parameters
     * @param template The template to validate
     * @returns Validation result
     */
    TemplateManager.prototype.validateTemplate = function (template) {
        var errors = [];
        var warnings = [];
        // Basic validation
        if (!template.name) {
            errors.push('Template name is required');
        }
        if (!template.scenario) {
            errors.push('Template scenario is required');
        }
        if (!template.parameters) {
            errors.push('Template parameters are required');
        }
        // Validate required parameters for common scenarios
        if (template.scenario.includes('solution')) {
            if (!template.parameters.SolutionName && !template.parameters.solutionName) {
                warnings.push('Solution templates should include a solution name parameter');
            }
        }
        if (template.scenario.includes('environment')) {
            if (!template.parameters.EnvironmentUrl && !template.parameters.environmentUrl) {
                warnings.push('Environment templates should include an environment URL parameter');
            }
        }
        return {
            isValid: errors.length === 0,
            errors: errors,
            warnings: warnings
        };
    };
    /**
     * Registers a new template
     * @param template The template to register
     * @returns True if registered successfully
     */
    TemplateManager.prototype.registerTemplate = function (template) {
        var validation = this.validateTemplate(template);
        if (!validation.isValid) {
            throw new Error("Invalid template: ".concat(validation.errors.join(', ')));
        }
        this.templates.set(template.scenario, template);
        return true;
    };
    /**
     * Lists all available templates
     * @returns Array of all templates
     */
    TemplateManager.prototype.listTemplates = function () {
        return Array.from(this.templates.values());
    };
    /**
     * Finds templates by tag
     * @param tag Tag to search for
     * @returns Array of matching templates
     */
    TemplateManager.prototype.findTemplatesByTag = function (tag) {
        return this.listTemplates().filter(function (template) {
            return template.tags.includes(tag);
        });
    };
    /**
     * Gets template suggestions based on context
     * @param context Context information for suggestions
     * @returns Array of suggested templates
     */
    TemplateManager.prototype.getTemplateSuggestions = function (context) {
        var suggestions = [];
        if (context.hasMultipleSolutions) {
            var multiSolutionTemplates = this.findTemplatesByTag('multi-solution');
            suggestions.push.apply(suggestions, multiSolutionTemplates);
        }
        if (context.isProduction) {
            var prodTemplates = this.findTemplatesByTag('production');
            suggestions.push.apply(suggestions, prodTemplates);
        }
        if (context.includesTesting) {
            var testTemplates = this.findTemplatesByTag('testing');
            suggestions.push.apply(suggestions, testTemplates);
        }
        // Default suggestions if no specific context
        if (suggestions.length === 0) {
            suggestions.push.apply(suggestions, this.findTemplatesByTag('basic'));
        }
        return suggestions;
    };
    TemplateManager.prototype.loadDefaultTemplates = function () {
        // Development to Test Deployment Template
        this.registerTemplate({
            name: "Development to Test Deployment",
            description: "Standard deployment from development to test environment",
            scenario: "dev-to-test",
            version: "1.0.0",
            tags: ["deployment", "basic", "testing"],
            parameters: {
                sourceEnvironment: "{{dev_env_url}}",
                targetEnvironment: "{{test_env_url}}",
                solutionName: "{{solution_name}}",
                asyncOperation: true,
                maxAsyncWaitTime: 60,
                runSolutionChecker: true,
                backupBeforeImport: true,
                publishCustomizations: true
            },
            dependencies: ["export-solution", "checker", "backup-environment", "import-solution"]
        });
        // Test to Production Deployment Template
        this.registerTemplate({
            name: "Test to Production Deployment",
            description: "Production deployment with enhanced safety checks",
            scenario: "test-to-prod",
            version: "1.0.0",
            tags: ["deployment", "production", "safety"],
            parameters: {
                sourceEnvironment: "{{test_env_url}}",
                targetEnvironment: "{{prod_env_url}}",
                solutionName: "{{solution_name}}",
                asyncOperation: true,
                maxAsyncWaitTime: 120,
                runSolutionChecker: true,
                backupBeforeImport: true,
                publishCustomizations: true,
                skipLowerVersion: false,
                convertToManaged: true,
                overwriteUnmanagedCustomizations: false
            },
            dependencies: ["export-solution", "checker", "backup-environment", "import-solution"]
        });
        // Hotfix Deployment Template
        this.registerTemplate({
            name: "Emergency Hotfix Deployment",
            description: "Fast deployment for critical fixes",
            scenario: "hotfix-deployment",
            version: "1.0.0",
            tags: ["hotfix", "emergency", "production"],
            parameters: {
                sourceEnvironment: "{{hotfix_env_url}}",
                targetEnvironment: "{{prod_env_url}}",
                solutionName: "{{solution_name}}",
                asyncOperation: false,
                maxAsyncWaitTime: 30,
                runSolutionChecker: false,
                backupBeforeImport: true,
                publishCustomizations: true,
                forceOverwrite: true
            },
            dependencies: ["backup-environment", "import-solution"]
        });
        // Multi-Solution Release Template
        this.registerTemplate({
            name: "Multi-Solution Release",
            description: "Coordinated deployment of multiple related solutions",
            scenario: "multi-solution-release",
            version: "1.0.0",
            tags: ["multi-solution", "release", "production"],
            parameters: {
                sourceEnvironment: "{{source_env_url}}",
                targetEnvironment: "{{target_env_url}}",
                solutionNames: ["{{solution_1}}", "{{solution_2}}", "{{solution_3}}"],
                asyncOperation: true,
                maxAsyncWaitTime: 180,
                runSolutionChecker: true,
                backupBeforeImport: true,
                publishCustomizations: true,
                parallelProcessing: true,
                respectDependencies: true
            }
        });
        // Environment Setup Template
        this.registerTemplate({
            name: "Complete Environment Setup",
            description: "Full environment provisioning and configuration",
            scenario: "environment-setup",
            version: "1.0.0",
            tags: ["environment", "setup", "configuration"],
            parameters: {
                environmentName: "{{env_name}}",
                environmentType: "{{env_type}}", // Sandbox, Production, Trial
                region: "{{region}}",
                currency: "{{currency}}",
                language: "{{language}}",
                adminUser: "{{admin_user}}",
                securityGroupId: "{{security_group}}",
                setupApplications: true,
                setupConnections: true,
                setupGovernance: true
            },
            dependencies: ["create-environment", "assign-user", "set-governance-config"]
        });
        // Environment Refresh Template
        this.registerTemplate({
            name: "Test Environment Refresh",
            description: "Refresh test environment from production data",
            scenario: "environment-refresh",
            version: "1.0.0",
            tags: ["environment", "refresh", "testing"],
            parameters: {
                sourceEnvironment: "{{prod_env_url}}",
                targetEnvironment: "{{test_env_url}}",
                backupTarget: true,
                copyData: true,
                copySolutions: true,
                resetConnections: true,
                updateUrls: true,
                cleanupData: true
            },
            dependencies: ["backup-environment", "copy-environment", "set-connection-variables"]
        });
        // Basic CI Pipeline Template
        this.registerTemplate({
            name: "Basic Continuous Integration",
            description: "Basic CI pipeline for solution validation",
            scenario: "basic-ci",
            version: "1.0.0",
            tags: ["ci", "basic", "validation"],
            parameters: {
                sourceEnvironment: "{{dev_env_url}}",
                solutionName: "{{solution_name}}",
                runChecker: true,
                runTests: true,
                exportSolution: true,
                unpackSolution: true,
                validateCode: true
            },
            dependencies: ["export-solution", "checker", "unpack-solution"]
        });
        // Full CD Pipeline Template
        this.registerTemplate({
            name: "Complete Continuous Deployment",
            description: "Full CD pipeline with all stages",
            scenario: "full-cd",
            version: "1.0.0",
            tags: ["cd", "complete", "production"],
            parameters: {
                devEnvironment: "{{dev_env_url}}",
                testEnvironment: "{{test_env_url}}",
                prodEnvironment: "{{prod_env_url}}",
                solutionName: "{{solution_name}}",
                runAllChecks: true,
                approvalRequired: true,
                rollbackOnFailure: true,
                notificationEnabled: true
            }
        });
    };
    return TemplateManager;
}());
exports.TemplateManager = TemplateManager;
