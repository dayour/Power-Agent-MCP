// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { should, use } from "chai";
import { stubInterface } from "ts-sinon";
import * as sinonChai from "sinon-chai";
import rewiremock from "../rewiremock";
import { restore, spy, stub } from "sinon";
import { mockEnvironmentUrl } from "./mockData";
import { BuildToolsRunnerParams } from "../../src/host/BuildToolsRunnerParams";
import { BuildToolsHost } from "../../src/host/BuildToolsHost";
import * as tl from 'azure-pipelines-task-lib/task';
import { EnvIdVariableName } from "../../src/host/PipelineVariables";
should();
use(sinonChai);
describe("whoami tests", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let whoAmIStub;
    let tlSetVariableSpy;
    let credentials;
    const mockEnvironmentIdReturn = 'mocked-id';
    beforeEach(() => {
        whoAmIStub = stub().returns({
            environmentId: mockEnvironmentIdReturn
        });
        credentials = stubInterface();
        tlSetVariableSpy = spy(tl, "setVariable");
    });
    afterEach(() => restore());
    async function callActionWithMocks() {
        const whoAmI = await rewiremock.around(() => import("../../src/tasks/whoami/whoami-v2/index"), (mock) => {
            mock(() => import("@microsoft/powerplatform-cli-wrapper/dist/actions")).with({ whoAmI: whoAmIStub });
            mock(() => import("../../src/params/auth/getCredentials")).with({ getCredentials: () => credentials });
            mock(() => import("../../src/params/auth/getEnvironmentUrl")).with({ getEnvironmentUrl: () => mockEnvironmentUrl });
        });
        await whoAmI.main();
    }
    it("calls whoAmI", async () => {
        await callActionWithMocks();
        whoAmIStub.should.have.been.calledWithExactly({
            credentials: credentials,
            environmentUrl: mockEnvironmentUrl,
            logToConsole: false
        }, new BuildToolsRunnerParams(), new BuildToolsHost());
        tlSetVariableSpy.should.have.been.calledOnceWith(EnvIdVariableName, mockEnvironmentIdReturn);
    });
});
