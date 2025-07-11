// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as tl from 'azure-pipelines-task-lib/task';
import { checkSolution } from "@microsoft/powerplatform-cli-wrapper/dist/actions";
import { isRunningOnAgent } from "../../../params/auth/isRunningOnAgent";
import { BuildToolsHost } from "../../../host/BuildToolsHost";
import { TaskParser } from "../../../parser/TaskParser";
import { getCredentials } from "../../../params/auth/getCredentials";
import { BuildToolsRunnerParams } from "../../../host/BuildToolsRunnerParams";
import { readEnvUrlFromServiceConnection } from '../../../params/auth/getEnvironmentUrl';
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
    const defaultAuthType = 'PowerPlatformSPN';
    const isDiagnosticsMode = tl.getVariable('agent.diagnostic');
    await checkSolution({
        // PS impl only supported single auth mode, SPN; some pipelines have no explicit value for authenticationType
        credentials: getCredentials(defaultAuthType),
        environmentUrl: readEnvUrlFromServiceConnection(defaultAuthType),
        fileLocation: parameterMap['FileLocation'],
        solutionPath: parameterMap['FilesToAnalyze'],
        solutionUrl: parameterMap['FilesToAnalyzeSasUri'],
        filesExcluded: parameterMap['FilesToExclude'],
        ruleLevelOverride: parameterMap['RulesToOverride'],
        ruleSet: parameterMap['RuleSet'],
        errorLevel: parameterMap['ErrorLevel'],
        errorThreshold: parameterMap['ErrorThreshold'],
        failOnAnalysisError: parameterMap['FailOnPowerAppsCheckerAnalysisError'],
        artifactStoreName: parameterMap['ArtifactDestinationName'],
        useDefaultPAEndpoint: parameterMap['UseDefaultPACheckerEndpoint'],
        customPAEndpoint: parameterMap['CustomPACheckerEndpoint'],
        geoInstance: { name: "GeoInstance", required: false, defaultValue: undefined },
        saveResults: parameterMap['SaveResults'],
        logToConsole: isDiagnosticsMode ? true : false
    }, new BuildToolsRunnerParams(), new BuildToolsHost('PowerAppsChecker'));
}
