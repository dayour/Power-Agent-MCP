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
describe("install-catalog tests", () => {
    let installCatalogStub;
    let credentials;
    beforeEach(() => {
        installCatalogStub = stub();
        credentials = stubInterface();
    });
    afterEach(() => restore());
    async function callActionWithMocks() {
        const installCatalog = await rewiremock.around(() => import("../../src/tasks/install-catalog/install-catalog-v2/index"), (mock) => {
            mock(() => import("@microsoft/powerplatform-cli-wrapper/dist/actions")).with({ installCatalog: installCatalogStub });
            mock(() => import("../../src/params/auth/getCredentials")).with({ getCredentials: () => credentials });
            mock(() => import("../../src/params/auth/getEnvironmentUrl")).with({ getEnvironmentUrl: () => mockEnvironmentUrl });
        });
        installCatalog.main();
    }
    it("fetches parameters from index.ts, calls installCatalogStub properly", async () => {
        await callActionWithMocks();
        installCatalogStub.should.have.been.calledOnceWithExactly({
            credentials: credentials,
            environmentUrl: mockEnvironmentUrl,
            catalogItemId: { name: 'CatalogItemId', required: true, defaultValue: undefined },
            targetEnvironmentUrl: { name: 'TargetEnvironmentUrl', required: false, defaultValue: undefined },
            targetEnvironment: { name: 'TargetEnvironment', required: false, defaultValue: undefined },
            settings: { name: 'Settings', required: false, defaultValue: undefined },
            targetVersion: { name: 'TargetVersion', required: false, defaultValue: undefined },
            pollStatus: { name: 'PollStatus', required: false, defaultValue: false },
            logToConsole: false
        }, new BuildToolsRunnerParams(), new BuildToolsHost());
    });
});
