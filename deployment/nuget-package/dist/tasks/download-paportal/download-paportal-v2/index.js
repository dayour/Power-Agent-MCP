// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as tl from "azure-pipelines-task-lib/task";
import { downloadPaportal } from "@microsoft/powerplatform-cli-wrapper/dist/actions";
import { BuildToolsHost } from "../../../host/BuildToolsHost";
import { TaskParser } from "../../../parser/TaskParser";
import { getCredentials } from "../../../params/auth/getCredentials";
import { getEnvironmentUrl } from "../../../params/auth/getEnvironmentUrl";
import * as taskDefinitionData from "./task.json";
import { BuildToolsRunnerParams } from "../../../host/BuildToolsRunnerParams";
import { isRunningOnAgent } from "../../../params/auth/isRunningOnAgent";
(async () => {
    if (isRunningOnAgent()) {
        await main();
    }
})().catch((error) => {
    tl.setResult(tl.TaskResult.Failed, error);
});
export async function main() {
    const taskParser = new TaskParser();
    const parameterMap = taskParser.getHostParameterEntries(taskDefinitionData);
    await downloadPaportal({
        credentials: getCredentials(),
        environmentUrl: getEnvironmentUrl(),
        path: parameterMap["DownloadPath"],
        websiteId: parameterMap["WebsiteId"],
        overwrite: parameterMap["Overwrite"],
        excludeEntities: parameterMap["ExcludeEntities"],
        modelVersion: parameterMap["ModelVersion"],
    }, new BuildToolsRunnerParams(), new BuildToolsHost());
}
