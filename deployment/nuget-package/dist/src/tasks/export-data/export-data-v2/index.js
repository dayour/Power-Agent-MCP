// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as tl from 'azure-pipelines-task-lib/task';
import { dataExport } from "@microsoft/powerplatform-cli-wrapper/dist/actions";
import { BuildToolsRunnerParams } from "../../../host/BuildToolsRunnerParams";
import { getCredentials } from "../../../params/auth/getCredentials";
import { getEnvironmentUrl } from '../../../params/auth/getEnvironmentUrl';
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
    await dataExport({
        credentials: getCredentials(),
        environmentUrl: getEnvironmentUrl(),
        schemaFile: parameterMap['SchemaFile'],
        dataFile: parameterMap['DataFile'],
        overwrite: parameterMap['Overwrite'],
        verbose: {
            name: "Verbose",
            required: false,
            defaultValue: false
        },
        logToConsole: isDiagnosticsMode ? true : false
    }, new BuildToolsRunnerParams(), new BuildToolsHost());
}
