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
describe("delete solution test", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let deleteSolutionStub;
    let credentials;
    beforeEach(() => {
        deleteSolutionStub = stub();
        credentials = stubInterface();
    });
    afterEach(() => restore());
    async function callActionWithMocks() {
        const deleteSolution = await rewiremock.around(() => import("../../src/tasks/delete-solution/delete-solution-v2/index"), (mock) => {
            mock(() => import("@microsoft/powerplatform-cli-wrapper/dist/actions")).with({ deleteSolution: deleteSolutionStub });
            mock(() => import("../../src/params/auth/getCredentials")).with({ getCredentials: () => credentials });
            mock(() => import("../../src/params/auth/getEnvironmentUrl")).with({ getEnvironmentUrl: () => mockEnvironmentUrl });
        });
        deleteSolution.main();
    }
    it("calls delete solution", async () => {
        await callActionWithMocks();
        deleteSolutionStub.should.have.been.calledOnceWithExactly({
            credentials: credentials,
            environmentUrl: mockEnvironmentUrl,
            name: { name: 'SolutionName', required: true, defaultValue: undefined },
            logToConsole: false
        }, new BuildToolsRunnerParams(), new BuildToolsHost());
    });
});
