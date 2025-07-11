// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { assert, should, use } from "chai";
import * as sinonChai from "sinon-chai";
import rewiremock from "../rewiremock";
import { debug } from "console";
import { restore } from "sinon";
should();
use(sinonChai);
describe("tool-installer tests", () => {
    const cliLocatorPath = "path/from/mocked/cli/locator";
    const cliExecutablePath = `${cliLocatorPath}/pac/tools`;
    const addToolsToPath = 'AddToolsToPath';
    let prependPathValue;
    let inputs;
    let variables;
    beforeEach(() => {
        prependPathValue = '';
        inputs = {};
        variables = {};
    });
    afterEach(() => restore());
    async function callActionWithMocks() {
        const toolInstaller = await rewiremock.around(() => import("../../src/tasks/tool-installer/tool-installer-v2/index"), (mock) => {
            mock(() => import("azure-pipelines-task-lib")).with({
                getInputRequired: (name) => inputs[name],
                setVariable: (name, val, secret, isOutput) => {
                    variables[name] = val;
                },
                debug: (message) => debug(message),
                prependPath: (path) => prependPathValue = path
            });
            mock(() => import("../../src/host/CliLocator")).with({
                findPacCLIPath: () => Promise.resolve({ pacRootPath: cliLocatorPath, pacPath: cliExecutablePath })
            });
        });
        await toolInstaller.main();
    }
    it("calls tool-installer", async () => {
        inputs[addToolsToPath] = 'false';
        await callActionWithMocks();
    });
    it("call tool-installer with AddToolsToPath=true and calls prependPath.", async () => {
        inputs[addToolsToPath] = 'true';
        await callActionWithMocks();
        assert.equal(prependPathValue, cliExecutablePath);
    });
});
