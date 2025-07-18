// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { should, use } from "chai";
import { stubInterface } from "ts-sinon";
import * as sinonChai from "sinon-chai";
import rewiremock from "../rewiremock";
import { restore, stub } from "sinon";
import { BuildToolsHost } from "../../src/host/BuildToolsHost";
import { BuildToolsRunnerParams } from "../../src/host/BuildToolsRunnerParams";
should();
use(sinonChai);
describe("backup-environment tests", () => {
    let backupEnvironmentStub;
    let credentials;
    beforeEach(() => {
        backupEnvironmentStub = stub();
        credentials = stubInterface();
    });
    afterEach(() => restore());
    async function callActionWithMocks() {
        const backup = await rewiremock.around(() => import("../../src/tasks/backup-environment/backup-environment-v2/index"), (mock) => {
            mock(() => import("@microsoft/powerplatform-cli-wrapper/dist/actions")).with({ backupEnvironment: backupEnvironmentStub });
            mock(() => import("../../src/params/auth/getCredentials")).with({ getCredentials: () => credentials });
        });
        backup.main();
    }
    it("fetches parameters from index.ts, calls backupEnviromentStub properly", async () => {
        await callActionWithMocks();
        backupEnvironmentStub.should.have.been.calledOnceWithExactly({
            credentials: credentials,
            environment: { name: "Environment", required: false, defaultValue: '$(BuildTools.EnvironmentUrl)' },
            backupLabel: { name: 'BackupLabel', required: true, defaultValue: 'Full Backup - $(Build.BuildNumber)' },
            logToConsole: false
        }, new BuildToolsRunnerParams(), new BuildToolsHost());
    });
});
