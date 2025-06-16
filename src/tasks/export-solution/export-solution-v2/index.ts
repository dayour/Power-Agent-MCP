// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as tl from 'azure-pipelines-task-lib/task';
import { exportSolution } from "@microsoft/powerplatform-cli-wrapper/dist/actions";
import { isRunningOnAgent } from "../../../params/auth/isRunningOnAgent";
import { BuildToolsHost } from "../../../host/BuildToolsHost";
import { TaskParser } from "../../../parser/TaskParser";
import { getCredentials } from "../../../params/auth/getCredentials";
import { getEnvironmentUrl } from "../../../params/auth/getEnvironmentUrl";
import { AzurePipelineTaskDefiniton } from "../../../parser/AzurePipelineDefinitions";
import { BuildToolsRunnerParams } from "../../../host/BuildToolsRunnerParams";
import { ErrorHandler } from "../../../utilities/ErrorHandler";
import { ParameterValidator } from "../../../utilities/ParameterValidator";

import * as taskDefinitionData from "./task.json";

(async () => {
  if (isRunningOnAgent()) {
    await main();
  }
})().catch(error => {
  tl.debug(ErrorHandler.sanitizeError(error)); // Full error for debugging
  tl.setResult(tl.TaskResult.Failed, ErrorHandler.sanitizeError(error)); // Sanitized for user
});

export async function main(): Promise<void> {
  const taskParser = new TaskParser();
  const parameterMap = taskParser.getHostParameterEntries((taskDefinitionData as unknown) as AzurePipelineTaskDefiniton);
  const isDiagnosticsMode = tl.getVariable('agent.diagnostic');

  const solutionName = parameterMap['SolutionName'];
  const outputPath = parameterMap['SolutionOutputFile'];
  const environmentUrl = getEnvironmentUrl();

  try {
    // Enhanced parameter validation
    ParameterValidator.validateAndThrow({
      solutionName: solutionName?.defaultValue as string,
      solutionPath: outputPath?.defaultValue as string,
      environmentUrl: environmentUrl
    });

    await exportSolution({
      credentials: getCredentials(),
      environmentUrl: environmentUrl,
      name: solutionName,
      path: outputPath,
      managed: parameterMap['Managed'],
      async: parameterMap['AsyncOperation'],
      maxAsyncWaitTimeInMin: parameterMap['MaxAsyncWaitTime'],
      autoNumberSettings: parameterMap['ExportAutoNumberingSettings'],
      calenderSettings: parameterMap['ExportCalendarSettings'],
      customizationSettings: parameterMap['ExportCustomizationSettings'],
      emailTrackingSettings: parameterMap['ExportEmailTrackingSettings'],
      externalApplicationSettings: parameterMap['ExportExternalApplicationSettings'],
      generalSettings: parameterMap['ExportGeneralSettings'],
      isvConfig: parameterMap['ExportIsvConfig'],
      marketingSettings: parameterMap['ExportMarketingSettings'],
      outlookSynchronizationSettings: parameterMap['ExportOutlookSynchronizationSettings'],
      relationshipRoles: parameterMap['ExportRelationshipRoles'],
      sales: parameterMap['ExportSales'],
      overwrite: parameterMap['OverwriteLocalSolution'],
      logToConsole: isDiagnosticsMode ? true : false
    }, new BuildToolsRunnerParams(), new BuildToolsHost());

  } catch (error) {
    // Enhanced error handling with troubleshooting guidance
    ErrorHandler.handleSolutionExportError(
      solutionName?.defaultValue as string || 'Unknown',
      environmentUrl,
      outputPath?.defaultValue as string,
      error instanceof Error ? error : String(error)
    );
  }
}
