// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { should, use } from "chai";
import { stubInterface } from "ts-sinon";
import * as sinonChai from "sinon-chai";
import rewiremock from "../rewiremock";
import { restore, stub } from "sinon";
import { BuildToolsHost } from "../../src/host/BuildToolsHost";
import { BuildToolsRunnerParams } from "../../src/host/BuildToolsRunnerParams";
should();
use(sinonChai);
describe("deleteEnvironment tests", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let deleteEnvironmentStub;
    let credentials;
    beforeEach(() => {
        deleteEnvironmentStub = stub();
        credentials = stubInterface();
    });
    afterEach(() => restore());
    async function callActionWithMocks() {
        const deleteEnv = await rewiremock.around(() => import("../../src/tasks/delete-environment/delete-environment-v2/index"), (mock) => {
            mock(() => import("@microsoft/powerplatform-cli-wrapper/dist/actions")).with({ deleteEnvironment: deleteEnvironmentStub });
            mock(() => import("../../src/params/auth/getCredentials")).with({ getCredentials: () => credentials });
        });
        deleteEnv.main();
    }
    it("calls deleteEnvironment", async () => {
        await callActionWithMocks();
        deleteEnvironmentStub.should.have.been.calledOnceWithExactly({
            credentials: credentials,
            environment: { name: "Environment", required: false, defaultValue: '$(BuildTools.EnvironmentUrl)' },
            logToConsole: false
        }, new BuildToolsRunnerParams(), new BuildToolsHost());
    });
});
