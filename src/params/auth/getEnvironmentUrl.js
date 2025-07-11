"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvironmentUrl = getEnvironmentUrl;
exports.readEnvUrlFromServiceConnection = readEnvUrlFromServiceConnection;
exports.log = log;
var tl = require("azure-pipelines-task-lib/task");
var getAuthenticationType_1 = require("./getAuthenticationType");
var getEndpointName_1 = require("./getEndpointName");
var PipelineVariables_1 = require("../../host/PipelineVariables");
function getEnvironmentUrl() {
    var _a;
    var explicitEnvInputParamName = 'Environment';
    var variableName = PipelineVariables_1.EnvUrlVariableName;
    // try reading the optional, but explicit task input parameter "Environment"
    var endpointUrl = tl.getInput(explicitEnvInputParamName, false);
    if (endpointUrl) {
        log("Discovered environment url from explicit input parameter '".concat(explicitEnvInputParamName, "': ").concat(endpointUrl));
        var varReferenceCandidate = void 0;
        var isRefExpr = void 0;
        // eslint-disable-next-line prefer-const
        _a = (0, PipelineVariables_1.IsolateVariableReference)(endpointUrl), varReferenceCandidate = _a[0], isRefExpr = _a[1];
        if (isRefExpr) {
            variableName = varReferenceCandidate;
            log("Discovered Azure DevOps variable expression that needs resolving: ".concat(endpointUrl, " -> ").concat(variableName));
            endpointUrl = undefined;
        }
        else {
            endpointUrl = varReferenceCandidate;
        }
    }
    // try finding the environment url that should be used for the calling task in this order:
    // - check for pipeline/task variables (typically set by e.g. createEnv task)
    if (!endpointUrl) {
        var envParams = (0, PipelineVariables_1.GetPipelineOutputVariable)(variableName);
        endpointUrl = envParams.value;
        var taskName = envParams.taskName;
        if (endpointUrl) {
            if (taskName) {
                log("Discovered environment url as task output variable (".concat(taskName, " - ").concat(variableName, "): ").concat(endpointUrl));
            }
            else {
                log("Discovered environment url as pipeline/task variable (".concat(variableName, "): ").concat(endpointUrl));
            }
        }
    }
    // - try named OS environment variable:
    if (!endpointUrl) {
        endpointUrl = process.env[variableName];
        if (endpointUrl) {
            log("Discovered environment url as OS environment variable (".concat(variableName, "): ").concat(endpointUrl));
        }
    }
    // - finally, fall back to use the env url that is part of the Azure DevOps service connection (i.e. called endpoint in the SDK here)
    if (!endpointUrl) {
        endpointUrl = readEnvUrlFromServiceConnection();
        log("Falling back to url from service connection, using: ".concat(endpointUrl));
    }
    return endpointUrl;
}
function readEnvUrlFromServiceConnection(defaultAuthType) {
    var authenticationType = (0, getAuthenticationType_1.getAuthenticationType)(defaultAuthType);
    var endpointName = (0, getEndpointName_1.getEndpointName)(authenticationType);
    if (!endpointName) {
        throw new Error("Could not find endpoint: ".concat(endpointName, " for authentication type: ").concat(authenticationType));
    }
    var url = tl.getEndpointUrl(endpointName, false);
    if (!url) {
        throw new Error("Could not find endpoint url for: ".concat(endpointName));
    }
    return url;
}
function log(message) {
    console.log(message);
    tl.debug(message);
}
