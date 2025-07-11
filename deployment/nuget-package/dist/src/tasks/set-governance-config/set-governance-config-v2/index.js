// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as tl from 'azure-pipelines-task-lib/task';
import { setGovernanceConfig } from "@microsoft/powerplatform-cli-wrapper/dist/actions";
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
    await setGovernanceConfig({
        credentials: getCredentials(),
        environment: parameterMap['Environment'],
        protectionLevel: parameterMap['ProtectionLevel'],
        disableGroupSharing: parameterMap['DisableGroupSharing'],
        excludeAnalysis: parameterMap['ExcludeAnalysis'],
        includeInsights: parameterMap['IncludeInsights'],
        limitSharingMode: parameterMap['LimitSharingMode'],
        maxLimitUserSharing: parameterMap['MaxLimitUserSharing'],
        solutionCheckerMode: parameterMap['SolutionCheckerMode'],
        logToConsole: isDiagnosticsMode ? true : false
    }, new BuildToolsRunnerParams(), new BuildToolsHost());
}
