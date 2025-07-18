// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as tl from 'azure-pipelines-task-lib/task';
import { addSolutionComponent } from "@microsoft/powerplatform-cli-wrapper/dist/actions";
import { BuildToolsRunnerParams } from "../../../host/BuildToolsRunnerParams";
import { getCredentials } from "../../../params/auth/getCredentials";
import { isRunningOnAgent } from '../../../params/auth/isRunningOnAgent';
import * as taskDefinitionData from "./task.json";
import { TaskParser } from "../../../parser/TaskParser";
import { BuildToolsHost } from "../../../host/BuildToolsHost";
import { getEnvironmentUrl } from "../../../params/auth/getEnvironmentUrl";
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
    await addSolutionComponent({
        credentials: getCredentials(),
        environmentUrl: getEnvironmentUrl(),
        solutionName: parameterMap['SolutionName'],
        component: parameterMap['Component'],
        componentType: parameterMap['ComponentType'],
        addRequiredComponents: parameterMap['AddRequiredComponents'],
        async: parameterMap['AsyncOperation'],
    }, new BuildToolsRunnerParams(), new BuildToolsHost());
}
