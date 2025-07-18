// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as tl from 'azure-pipelines-task-lib/task';
import { createEnvironment } from "@microsoft/powerplatform-cli-wrapper/dist/actions";
import { isRunningOnAgent } from "../../../params/auth/isRunningOnAgent";
import { BuildToolsHost } from "../../../host/BuildToolsHost";
import { TaskParser } from "../../../parser/TaskParser";
import { getCredentials } from "../../../params/auth/getCredentials";
import { BuildToolsRunnerParams } from "../../../host/BuildToolsRunnerParams";
import { EnvIdVariableName, EnvUrlVariableName, SetTaskOutputVariable } from "../../../host/PipelineVariables";
import { ErrorHandler } from "../../../utilities/ErrorHandler";
import * as taskDefinitionData from "./task.json";
(async () => {
    if (isRunningOnAgent()) {
        await main();
    }
})().catch(error => {
    tl.debug(ErrorHandler.sanitizeError(error)); // Full error for debugging
    tl.setResult(tl.TaskResult.Failed, ErrorHandler.sanitizeError(error)); // Sanitized for user
});
export async function main() {
    const taskParser = new TaskParser();
    const parameterMap = taskParser.getHostParameterEntries(taskDefinitionData);
    const isDiagnosticsMode = tl.getVariable('agent.diagnostic');
    const environmentName = parameterMap['DisplayName'];
    try {
        const createResult = await createEnvironment({
            credentials: getCredentials(),
            environmentName: environmentName,
            environmentType: parameterMap['EnvironmentSku'],
            user: parameterMap['User'],
            region: parameterMap['LocationName'],
            currency: parameterMap['CurrencyName'],
            language: parameterMap['LanguageName'],
            templates: parameterMap['AppsTemplate'],
            domainName: parameterMap['DomainName'],
            teamId: parameterMap['TeamId'],
            securityGroupId: parameterMap['SecurityGroupId'],
            logToConsole: isDiagnosticsMode ? true : false
        }, new BuildToolsRunnerParams(), new BuildToolsHost());
        if (!createResult.environmentUrl || !createResult.environmentId) {
            return tl.setResult(tl.TaskResult.SucceededWithIssues, 'CreateEnvironment call did NOT return the expected environment URL!');
        }
        // set output variables:
        SetTaskOutputVariable(EnvUrlVariableName, createResult.environmentUrl);
        SetTaskOutputVariable(EnvIdVariableName, createResult.environmentId);
    }
    catch (error) {
        // Enhanced error handling for environment creation
        ErrorHandler.handleEnvironmentError(`create environment '${environmentName?.defaultValue || 'Unknown'}'`, 'N/A', // No specific environment URL for creation
        error instanceof Error ? error : String(error));
    }
}
