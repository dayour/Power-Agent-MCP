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
describe("Add solution component to target solution", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let addSolutionComponentStub;
    let credentials;
    beforeEach(() => {
        addSolutionComponentStub = stub();
        credentials = stubInterface();
    });
    afterEach(() => restore());
    async function callActionWithMocks() {
        const mockedModule = await rewiremock.around(() => import("../../src/tasks/add-solution-component/add-solution-component-v2/index"), (mock) => {
            mock(() => import("@microsoft/powerplatform-cli-wrapper/dist/actions")).with({ addSolutionComponent: addSolutionComponentStub });
            mock(() => import("../../src/params/auth/getCredentials")).with({ getCredentials: () => credentials });
            mock(() => import("../../src/params/auth/getEnvironmentUrl")).with({ getEnvironmentUrl: () => mockEnvironmentUrl });
        });
        await mockedModule.main();
    }
    it("calls add-solution-component action", async () => {
        await callActionWithMocks();
        addSolutionComponentStub.should.have.been.calledOnceWithExactly({
            credentials: credentials,
            environmentUrl: mockEnvironmentUrl,
            solutionName: { name: 'SolutionName', required: true, defaultValue: undefined },
            component: { name: 'Component', required: true, defaultValue: undefined },
            componentType: { name: 'ComponentType', required: true, defaultValue: undefined },
            addRequiredComponents: { name: 'AddRequiredComponents', required: false, defaultValue: false },
            async: { name: 'AsyncOperation', required: false, defaultValue: false },
        }, new BuildToolsRunnerParams(), new BuildToolsHost());
    });
});
