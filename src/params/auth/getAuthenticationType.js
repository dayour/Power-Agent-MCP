"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthenticationType = getAuthenticationType;
var azure_pipelines_task_lib_1 = require("azure-pipelines-task-lib");
function getAuthenticationType(defaultAuthType) {
    var authenticationType = (0, azure_pipelines_task_lib_1.getInput)("authenticationType");
    if (!authenticationType && defaultAuthType) {
        return defaultAuthType;
    }
    assertIsEndpointName(authenticationType);
    return authenticationType;
}
function assertIsEndpointName(input) {
    if (input === undefined) {
        throw new Error("authenticationType is undefined");
    }
    if (input !== "PowerPlatformEnvironment" && input !== "PowerPlatformSPN") {
        throw new Error("Unsupported authenticationType: ".concat(input));
    }
}
