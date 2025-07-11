// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as tl from 'azure-pipelines-task-lib/task';
import { assignUser } from "@microsoft/powerplatform-cli-wrapper/dist/actions";
import { BuildToolsRunnerParams } from "../../../host/BuildToolsRunnerParams";
import { getCredentials } from "../../../params/auth/getCredentials";
import { isRunningOnAgent } from '../../../params/auth/isRunningOnAgent';
import * as taskDefinitionData from "./task.json";
import { TaskParser } from "../../../parser/TaskParser";
import { BuildToolsHost } from "../../../host/BuildToolsHost";
(async () => {
    if (isRunningOnAgent()) {
        await main();
    }
})().catch(error => {
    tl.setResult(tl.TaskResult.Failed, error);
});
export async function main() {
    const taskParser = new TaskParser();
    const parameterMap = taskParser.getHostParameterEntries(taskDefinitionData);
    const isDiagnosticsMode = tl.getVariable('agent.diagnostic');
    await assignUser({
        credentials: getCredentials(),
        environment: parameterMap['Environment'],
        user: parameterMap['User'],
        role: parameterMap['Role'],
        applicationUser: parameterMap['ApplicationUser'],
        businessUnit: parameterMap['BusinessUnit'],
        logToConsole: isDiagnosticsMode ? true : false
    }, new BuildToolsRunnerParams(), new BuildToolsHost());
}
