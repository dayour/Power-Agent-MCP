// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export class TaskParser {
    /**
     * Enhanced parameter parsing with validation and type safety
     * @param taskDefinition The task definition to parse
     * @returns Record of validated parameter entries
     */
    getHostParameterEntries(taskDefinition) {
        // Validate task definition structure before processing
        const validatedDefinition = this.validateTaskDefinition(taskDefinition);
        const typedData = validatedDefinition.inputs.map(taskParameter => ({
            name: taskParameter.name,
            required: taskParameter.required ?? false,
            defaultValue: taskParameter.defaultValue
        }));
        const parameterMap = {};
        typedData.forEach(p => {
            parameterMap[p.name] = p;
        });
        return parameterMap;
    }
    /**
     * Validates the task definition structure for type safety
     * @param data The data to validate
     * @returns Validated task definition
     */
    validateTaskDefinition(data) {
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid task definition: must be an object');
        }
        if (!Array.isArray(data.inputs)) {
            throw new Error('Invalid task definition: missing or invalid inputs array');
        }
        // Validate each input parameter
        data.inputs.forEach((input, index) => {
            if (!input || typeof input !== 'object') {
                throw new Error(`Invalid input parameter at index ${index}: must be an object`);
            }
            if (!input.name || typeof input.name !== 'string') {
                throw new Error(`Invalid input parameter at index ${index}: missing or invalid name`);
            }
            if (input.required !== undefined && typeof input.required !== 'boolean') {
                throw new Error(`Invalid input parameter '${input.name}': required must be boolean`);
            }
            if (input.defaultValue !== undefined &&
                typeof input.defaultValue !== 'string' &&
                typeof input.defaultValue !== 'boolean') {
                throw new Error(`Invalid input parameter '${input.name}': defaultValue must be string or boolean`);
            }
        });
        return data;
    }
    /**
     * Gets a specific parameter with type checking
     * @param parameterMap The parameter map
     * @param parameterName The parameter name to retrieve
     * @returns The parameter value or undefined if not found
     */
    getParameter(parameterMap, parameterName) {
        return parameterMap[parameterName];
    }
    /**
     * Gets a parameter value with default fallback
     * @param parameterMap The parameter map
     * @param parameterName The parameter name
     * @param fallback Default value if parameter not found
     * @returns The parameter value or fallback
     */
    getParameterValue(parameterMap, parameterName, fallback) {
        const parameter = parameterMap[parameterName];
        if (!parameter) {
            if (fallback !== undefined) {
                return fallback;
            }
            throw new Error(`Required parameter '${parameterName}' not found`);
        }
        return parameter.defaultValue ?? fallback;
    }
    /**
     * Validates that required parameters are present
     * @param parameterMap The parameter map to validate
     * @param requiredParameters Array of required parameter names
     */
    validateRequiredParameters(parameterMap, requiredParameters) {
        const missingParameters = [];
        for (const paramName of requiredParameters) {
            const parameter = parameterMap[paramName];
            if (!parameter || (parameter.required && parameter.defaultValue === undefined)) {
                missingParameters.push(paramName);
            }
        }
        if (missingParameters.length > 0) {
            throw new Error(`Missing required parameters: ${missingParameters.join(', ')}`);
        }
    }
}
