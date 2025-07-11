"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordVariableName = exports.UserNameVariableName = exports.DataverseConnectionStringVariableName = exports.TenantIdVariableName = exports.ClientSecretVariableName = exports.ApplicationIdlVariableName = exports.EnvIdVariableName = exports.EnvUrlVariableName = void 0;
exports.SetTaskOutputVariable = SetTaskOutputVariable;
exports.GetPipelineVariable = GetPipelineVariable;
exports.GetPipelineOutputVariable = GetPipelineOutputVariable;
exports.IsolateVariableReference = IsolateVariableReference;
var tl = require("azure-pipelines-task-lib/task");
var semver = require("semver");
var getEnvironmentUrl_1 = require("../params/auth/getEnvironmentUrl");
var agentVersion = tl.getVariable('Agent.Version') || '1.95.0'; // assume lowest agent version from task.json files
var hasTaskVars = semver.lt(agentVersion, '2.115.0');
// for backwards compat, keep env var names the same as what shipped in PS implementation:
// see: https://dev.azure.com/dynamicscrm/OneCRM/_git/PowerApps.AzDevOpsExtensions?path=/src/extension/common/PipelineVariables.ps1
var VariableNamePrefix = "BuildTools.";
exports.EnvUrlVariableName = "".concat(VariableNamePrefix, "EnvironmentUrl");
exports.EnvIdVariableName = "".concat(VariableNamePrefix, "EnvironmentId");
exports.ApplicationIdlVariableName = "".concat(VariableNamePrefix, "ApplicationId");
exports.ClientSecretVariableName = "".concat(VariableNamePrefix, "ClientSecret");
exports.TenantIdVariableName = "".concat(VariableNamePrefix, "TenantId");
exports.DataverseConnectionStringVariableName = "".concat(VariableNamePrefix, "DataverseConnectionString");
exports.UserNameVariableName = "".concat(VariableNamePrefix, "UserName");
exports.PasswordVariableName = "".concat(VariableNamePrefix, "Password");
function SetTaskOutputVariable(varName, value) {
    tl.setVariable(varName, value, false, true);
}
function GetPipelineVariable(varName) {
    var value;
    if (hasTaskVars) {
        // NOTE: tl.getTaskVariable is only supported on newer agents >= 2.115.0, but our task.json still allow for agents 1.9.x
        value = tl.getTaskVariable(varName);
    }
    // try looking for plain pipeline variable:
    if (!value) {
        value = tl.getVariable(varName);
    }
    return value;
}
function GetPipelineOutputVariable(varName) {
    var envParams = {
        value: undefined,
        taskName: undefined
    };
    var value = GetPipelineVariable(varName);
    if (value) {
        //Prioritise pipeline variable
        envParams.value = value;
        return envParams;
    }
    //If pipeline variable isn't found then pick task output variable in this order -> restore > reset > copy > create
    var ppbtTaskOutVarOrigins = ['PowerPlatformCreateEnvironment', 'PowerPlatformCopyEnvironment',
        'PowerPlatformResetEnvironment', 'PowerPlatformRestoreEnvironment'];
    var outputVariableCounter = 0;
    for (var _i = 0, ppbtTaskOutVarOrigins_1 = ppbtTaskOutVarOrigins; _i < ppbtTaskOutVarOrigins_1.length; _i++) {
        var taskName = ppbtTaskOutVarOrigins_1[_i];
        var canonicalVarName = varName.replace(/\./g, '_').replace(/-/g, '_');
        value = tl.getVariable("".concat(taskName, "_").concat(canonicalVarName));
        if (value) {
            envParams.taskName = taskName;
            envParams.value = value;
            outputVariableCounter++;
        }
    }
    if (outputVariableCounter > 1) {
        (0, getEnvironmentUrl_1.log)("Multiple Values found in task output variables, picking (".concat(envParams.taskName, "): ").concat(envParams.value));
    }
    return envParams;
}
function IsolateVariableReference(refExpression) {
    var extractVarNameRegex = /\$\((\S+)\)/gm;
    var m = extractVarNameRegex.exec(refExpression);
    var isRefExpression = m !== null;
    var result = (isRefExpression) ? m[1] : refExpression;
    tl.debug("IsolateVarRef: ".concat(refExpression, " -> ").concat(result, " (isRefExpression=").concat(isRefExpression, ")"));
    return [result, isRefExpression];
}
