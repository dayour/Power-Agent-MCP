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
describe("install-application tests", () => {
    let installApplicationStub;
    let credentials;
    beforeEach(() => {
        installApplicationStub = stub();
        credentials = stubInterface();
    });
    afterEach(() => restore());
    async function callActionWithMocks() {
        const installApplication = await rewiremock.around(() => import("../../src/tasks/install-application/install-application-v2/index"), (mock) => {
            mock(() => import("@microsoft/powerplatform-cli-wrapper/dist/actions")).with({ installApplication: installApplicationStub });
            mock(() => import("../../src/params/auth/getCredentials")).with({ getCredentials: () => credentials });
        });
        installApplication.main();
    }
    it("fetches parameters from index.ts, calls installApplicationStub properly", async () => {
        await callActionWithMocks();
        installApplicationStub.should.have.been.calledOnceWithExactly({
            credentials: credentials,
            environment: { name: 'Environment', required: true, defaultValue: '$(BuildTools.EnvironmentUrl)' },
            applicationListFile: { name: 'ApplicationList', required: true, defaultValue: undefined },
            logToConsole: false
        }, new BuildToolsRunnerParams(), new BuildToolsHost());
    });
});
