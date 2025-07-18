// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
describe("upgrade solution test", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let upgradeSolutionStub;
    let credentials;
    beforeEach(() => {
        upgradeSolutionStub = stub();
        credentials = stubInterface();
    });
    afterEach(() => restore());
    async function callActionWithMocks() {
        const apply = await rewiremock.around(() => import("../../src/tasks/apply-solution-upgrade/apply-solution-upgrade-v2/index"), (mock) => {
            mock(() => import("@microsoft/powerplatform-cli-wrapper/dist/actions")).with({ upgradeSolution: upgradeSolutionStub });
            mock(() => import("../../src/params/auth/getCredentials")).with({ getCredentials: () => credentials });
            mock(() => import("../../src/params/auth/getEnvironmentUrl")).with({ getEnvironmentUrl: () => mockEnvironmentUrl });
        });
        apply.main();
    }
    it("calls upgrade solution", async () => {
        await callActionWithMocks();
        upgradeSolutionStub.should.have.been.calledOnceWithExactly({
            credentials: credentials,
            environmentUrl: mockEnvironmentUrl,
            name: { name: 'SolutionName', required: true, defaultValue: undefined },
            async: { name: 'AsyncOperation', required: true, defaultValue: true },
            maxAsyncWaitTimeInMin: { name: 'MaxAsyncWaitTime', required: true, defaultValue: '60' },
            logToConsole: false
        }, new BuildToolsRunnerParams(), new BuildToolsHost());
    });
});
