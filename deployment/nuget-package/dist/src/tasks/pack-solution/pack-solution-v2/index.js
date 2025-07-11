// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as tl from 'azure-pipelines-task-lib/task';
import { packSolution } from "@microsoft/powerplatform-cli-wrapper/dist/actions";
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
    await packSolution({
        solutionZipFile: parameterMap['SolutionOutputFile'],
        sourceFolder: parameterMap['SolutionSourceFolder'],
        solutionType: parameterMap['SolutionType'],
        errorLevel: errorLevel,
        singleComponent: parameterMap['SingleComponent'],
        mapFile: parameterMap['MapFile'],
        localeTemplate: parameterMap['LocaleTemplate'],
        localize: parameterMap['Localize'],
        useLcid: parameterMap['UseLcid'],
        disablePluginRemap: parameterMap['DisablePluginRemap'],
        processCanvasApps: parameterMap['ProcessCanvasApps'],
        logToConsole: isDiagnosticsMode ? true : false
    }, new BuildToolsRunnerParams(), new BuildToolsHost());
}
