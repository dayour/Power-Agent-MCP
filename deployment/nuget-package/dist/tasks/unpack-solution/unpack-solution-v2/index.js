// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as tl from 'azure-pipelines-task-lib/task';
import { unpackSolution } from "@microsoft/powerplatform-cli-wrapper/dist/actions";
import { isRunningOnAgent } from "../../../params/auth/isRunningOnAgent";
import { BuildToolsHost } from "../../../host/BuildToolsHost";
import { TaskParser } from "../../../parser/TaskParser";
import * as taskDefinitionData from "./task.json";
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
    const errorLevel = {
        name: "ErrorLevel",
        required: false,
        defaultValue: isDiagnosticsMode ? "Verbose" : "Info"
    };
    await unpackSolution({
        solutionZipFile: parameterMap['SolutionInputFile'],
        sourceFolder: parameterMap['SolutionTargetFolder'],
        solutionType: parameterMap['SolutionType'],
        overwriteFiles: parameterMap['OverwriteFiles'],
        errorLevel: errorLevel,
        singleComponent: parameterMap['SingleComponent'],
        mapFile: parameterMap['MapFile'],
        localeTemplate: parameterMap['LocaleTemplate'],
        localize: parameterMap['Localize'],
        useLcid: parameterMap['UseLcid'],
        processCanvasApps: parameterMap['ProcessCanvasApps'],
        logToConsole: isDiagnosticsMode ? true : false
    }, new BuildToolsRunnerParams(), new BuildToolsHost());
}
