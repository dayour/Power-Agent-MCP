// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as tl from 'azure-pipelines-task-lib/task';
import { upgradeSolution } from "@microsoft/powerplatform-cli-wrapper/dist/actions";
import { BuildToolsHost } from "../../../host/BuildToolsHost";
import { TaskParser } from "../../../parser/TaskParser";
import { getCredentials } from "../../../params/auth/getCredentials";
import { getEnvironmentUrl } from "../../../params/auth/getEnvironmentUrl";
import * as taskDefinitionData from "./task.json";
import { isRunningOnAgent } from "../../../params/auth/isRunningOnAgent";
import { BuildToolsRunnerParams } from "../../../host/BuildToolsRunnerParams";
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
    await upgradeSolution({
        credentials: getCredentials(),
        environmentUrl: getEnvironmentUrl(),
        name: parameterMap['SolutionName'],
        async: parameterMap['AsyncOperation'],
        maxAsyncWaitTimeInMin: parameterMap['MaxAsyncWaitTime'],
        logToConsole: isDiagnosticsMode ? true : false
    }, new BuildToolsRunnerParams(), new BuildToolsHost());
}
