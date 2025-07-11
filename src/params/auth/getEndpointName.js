"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEndpointName = getEndpointName;
var azure_pipelines_task_lib_1 = require("azure-pipelines-task-lib");
function getEndpointName(authenticationType) {
    var endpointName = (0, azure_pipelines_task_lib_1.getInput)(authenticationType);
    if (endpointName === undefined) {
        throw new Error("End Point Name for ".concat(authenticationType, " is undefined"));
    }
    return endpointName;
}
