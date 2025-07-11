// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as tl from 'azure-pipelines-task-lib/task';
import { copyEnvironment } from "@microsoft/powerplatform-cli-wrapper/dist/actions";
import { BuildToolsHost } from "../../../host/BuildToolsHost";
import { TaskParser } from "../../../parser/TaskParser";
import { getCredentials } from "../../../params/auth/getCredentials";
import { BuildToolsRunnerParams } from "../../../host/BuildToolsRunnerParams";
import { isRunningOnAgent } from "../../../params/auth/isRunningOnAgent";
import { EnvUrlVariableName, EnvIdVariableName, SetTaskOutputVariable } from "../../../host/PipelineVariables";
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
    const copyResult = await copyEnvironment({
        credentials: getCredentials(),
        sourceEnvironment: parameterMap['Environment'],
        targetEnvironment: parameterMap['TargetEnvironmentUrl'],
        copyType: parameterMap['CopyType'],
        overrideFriendlyName: parameterMap['OverrideFriendlyName'],
        friendlyTargetEnvironmentName: parameterMap['FriendlyName'],
        skipAuditData: parameterMap['SkipAuditData'],
        maxAsyncWaitTime: parameterMap['MaxAsyncWaitTime'],
        logToConsole: isDiagnosticsMode ? true : false
    }, new BuildToolsRunnerParams(), new BuildToolsHost());
    if (!copyResult.environmentUrl || !copyResult.environmentId) {
        return tl.setResult(tl.TaskResult.SucceededWithIssues, 'CopyEnvironment call did NOT return the expected environment URL!');
    }
    // set output variables:
    SetTaskOutputVariable(EnvUrlVariableName, copyResult.environmentUrl);
    SetTaskOutputVariable(EnvIdVariableName, copyResult.environmentId);
}
