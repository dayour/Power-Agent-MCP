"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskParser = void 0;
var TaskParser = /** @class */ (function () {
    function TaskParser() {
    }
    /**
     * Enhanced parameter parsing with validation and type safety
     * @param taskDefinition The task definition to parse
     * @returns Record of validated parameter entries
     */
    TaskParser.prototype.getHostParameterEntries = function (taskDefinition) {
        // Validate task definition structure before processing
        var validatedDefinition = this.validateTaskDefinition(taskDefinition);
        var typedData = validatedDefinition.inputs.map(function (taskParameter) {
            var _a;
            return ({
                name: taskParameter.name,
                required: (_a = taskParameter.required) !== null && _a !== void 0 ? _a : false,
                defaultValue: taskParameter.defaultValue
            });
        });
        var parameterMap = {};
        typedData.forEach(function (p) {
            parameterMap[p.name] = p;
        });
        return parameterMap;
    };
    /**
     * Validates the task definition structure for type safety
     * @param data The data to validate
     * @returns Validated task definition
     */
    TaskParser.prototype.validateTaskDefinition = function (data) {
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid task definition: must be an object');
        }
        if (!Array.isArray(data.inputs)) {
            throw new Error('Invalid task definition: missing or invalid inputs array');
        }
        // Validate each input parameter
        data.inputs.forEach(function (input, index) {
            if (!input || typeof input !== 'object') {
                throw new Error("Invalid input parameter at index ".concat(index, ": must be an object"));
            }
            if (!input.name || typeof input.name !== 'string') {
                throw new Error("Invalid input parameter at index ".concat(index, ": missing or invalid name"));
            }
            if (input.required !== undefined && typeof input.required !== 'boolean') {
                throw new Error("Invalid input parameter '".concat(input.name, "': required must be boolean"));
            }
            if (input.defaultValue !== undefined &&
                typeof input.defaultValue !== 'string' &&
                typeof input.defaultValue !== 'boolean') {
                throw new Error("Invalid input parameter '".concat(input.name, "': defaultValue must be string or boolean"));
            }
        });
        return data;
    };
    /**
     * Gets a specific parameter with type checking
     * @param parameterMap The parameter map
     * @param parameterName The parameter name to retrieve
     * @returns The parameter value or undefined if not found
     */
    TaskParser.prototype.getParameter = function (parameterMap, parameterName) {
        return parameterMap[parameterName];
    };
    /**
     * Gets a parameter value with default fallback
     * @param parameterMap The parameter map
     * @param parameterName The parameter name
     * @param fallback Default value if parameter not found
     * @returns The parameter value or fallback
     */
    TaskParser.prototype.getParameterValue = function (parameterMap, parameterName, fallback) {
        var _a;
        var parameter = parameterMap[parameterName];
        if (!parameter) {
            if (fallback !== undefined) {
                return fallback;
            }
            throw new Error("Required parameter '".concat(parameterName, "' not found"));
        }
        return (_a = parameter.defaultValue) !== null && _a !== void 0 ? _a : fallback;
    };
    /**
     * Validates that required parameters are present
     * @param parameterMap The parameter map to validate
     * @param requiredParameters Array of required parameter names
     */
    TaskParser.prototype.validateRequiredParameters = function (parameterMap, requiredParameters) {
        var missingParameters = [];
        for (var _i = 0, requiredParameters_1 = requiredParameters; _i < requiredParameters_1.length; _i++) {
            var paramName = requiredParameters_1[_i];
            var parameter = parameterMap[paramName];
            if (!parameter || (parameter.required && parameter.defaultValue === undefined)) {
                missingParameters.push(paramName);
            }
        }
        if (missingParameters.length > 0) {
            throw new Error("Missing required parameters: ".concat(missingParameters.join(', ')));
        }
    };
    return TaskParser;
}());
exports.TaskParser = TaskParser;
