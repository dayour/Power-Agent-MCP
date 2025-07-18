// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { should, use } from "chai";
import { stubInterface } from "ts-sinon";
import * as sinonChai from "sinon-chai";
import rewiremock from "../rewiremock";
import { restore, stub } from "sinon";
import { mockEnvironmentUrl } from "./mockData";
import { BuildToolsHost } from "../../src/host/BuildToolsHost";
import { BuildToolsRunnerParams } from "../../src/host/BuildToolsRunnerParams";
should();
use(sinonChai);
describe("import-solution tests", () => {
    let importSolutionStub;
    let credentials;
    beforeEach(() => {
        importSolutionStub = stub();
        credentials = stubInterface();
    });
    afterEach(() => restore());
    async function callActionWithMocks() {
        const importSolution = await rewiremock.around(() => import("../../src/tasks/import-solution/import-solution-v2/index"), (mock) => {
            mock(() => import("@microsoft/powerplatform-cli-wrapper/dist/actions")).with({ importSolution: importSolutionStub });
            mock(() => import("../../src/params/auth/getCredentials")).with({ getCredentials: () => credentials });
            mock(() => import("../../src/params/auth/getEnvironmentUrl")).with({ getEnvironmentUrl: () => mockEnvironmentUrl });
        });
        importSolution.main();
    }
    it("fetches parameters from index.ts, calls importSolutionStub properly", async () => {
        await callActionWithMocks();
        importSolutionStub.should.have.been.calledOnceWithExactly({
            credentials: credentials,
            environmentUrl: mockEnvironmentUrl,
            path: { name: 'SolutionInputFile', required: true, defaultValue: undefined },
            useDeploymentSettingsFile: { name: 'UseDeploymentSettingsFile', required: false, defaultValue: false },
            deploymentSettingsFile: { name: 'DeploymentSettingsFile', required: false, defaultValue: '' },
            async: { name: 'AsyncOperation', required: true, defaultValue: true },
            maxAsyncWaitTimeInMin: { name: 'MaxAsyncWaitTime', required: true, defaultValue: '60' },
            importAsHolding: { name: 'HoldingSolution', required: false, defaultValue: false },
            stageAndUpgrade: { name: 'StageAndUpgrade', required: false, defaultValue: false },
            forceOverwrite: { name: 'OverwriteUnmanagedCustomizations', required: false, defaultValue: false },
            publishChanges: { name: 'PublishCustomizationChanges', required: false, defaultValue: false },
            skipDependencyCheck: { name: 'SkipProductUpdateDependencies', required: false, defaultValue: false },
            convertToManaged: { name: 'ConvertToManaged', required: false, defaultValue: false },
            activatePlugins: { name: 'MergedActivatePlugin', required: false, defaultValue: false },
            skipLowerVersion: { name: 'SkipLowerVersion', required: false, defaultValue: false },
            logToConsole: false
        }, new BuildToolsRunnerParams(), new BuildToolsHost());
    });
});
