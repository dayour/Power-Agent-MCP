// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as tl from 'azure-pipelines-task-lib/task';
import { deployPackage } from "@microsoft/powerplatform-cli-wrapper/dist/actions";
import { BuildToolsHost } from "../../../host/BuildToolsHost";
import { TaskParser } from "../../../parser/TaskParser";
import { getCredentials } from "../../../params/auth/getCredentials";
import { getEnvironmentUrl } from "../../../params/auth/getEnvironmentUrl";
import { BuildToolsRunnerParams } from "../../../host/BuildToolsRunnerParams";
import { isRunningOnAgent } from '../../../params/auth/isRunningOnAgent';
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
    await deployPackage({
        credentials: getCredentials(),
        environmentUrl: getEnvironmentUrl(),
        packagePath: parameterMap['PackageFile'],
        settings: parameterMap['Settings'],
        logConsole: parameterMap['logConsole'],
        logToConsole: isDiagnosticsMode ? true : false
    }, new BuildToolsRunnerParams(), new BuildToolsHost('DeployPackage'));
}
