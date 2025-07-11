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
describe("update org settings test", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let updateOrgSettingsStub;
    let credentials;
    beforeEach(() => {
        updateOrgSettingsStub = stub();
        credentials = stubInterface();
    });
    afterEach(() => restore());
    async function callActionWithMocks() {
        const apply = await rewiremock.around(() => import("../../src/tasks/update-org-settings/update-org-settings-v2/index"), (mock) => {
            mock(() => import("@microsoft/powerplatform-cli-wrapper/dist/actions")).with({ updateOrgSettings: updateOrgSettingsStub });
            mock(() => import("../../src/params/auth/getCredentials")).with({ getCredentials: () => credentials });
            mock(() => import("../../src/params/auth/getEnvironmentUrl")).with({ getEnvironmentUrl: () => mockEnvironmentUrl });
        });
        apply.main();
    }
    it("calls update org settings", async () => {
        await callActionWithMocks();
        updateOrgSettingsStub.should.have.been.calledOnceWithExactly({
            credentials: credentials,
            environmentUrl: mockEnvironmentUrl,
            name: { name: 'Name', required: true, defaultValue: undefined },
            value: { name: 'Value', required: false, defaultValue: undefined },
            logToConsole: false
        }, new BuildToolsRunnerParams(), new BuildToolsHost());
    });
});
