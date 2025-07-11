// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as tl from 'azure-pipelines-task-lib/task';
import { publishSolution } from "@microsoft/powerplatform-cli-wrapper/dist/actions";
import { BuildToolsRunnerParams } from "../../../host/BuildToolsRunnerParams";
import { TaskParser } from "../../../parser/TaskParser";
import { getCredentials } from "../../../params/auth/getCredentials";
import { getEnvironmentUrl } from "../../../params/auth/getEnvironmentUrl";
import { isRunningOnAgent } from '../../../params/auth/isRunningOnAgent';
import { BuildToolsHost } from "../../../host/BuildToolsHost";
import * as taskDefinitionData from "./task.json";
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
    await publishSolution({
        credentials: getCredentials(),
        environmentUrl: getEnvironmentUrl(),
        async: parameterMap['AsyncOperation'],
        maxAsyncWaitTimeInMin: parameterMap['MaxAsyncWaitTime'],
        logToConsole: isDiagnosticsMode ? true : false
    }, new BuildToolsRunnerParams(), new BuildToolsHost());
}
