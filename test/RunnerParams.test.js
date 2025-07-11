"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var BuildToolsRunnerParams_1 = require("../src/host/BuildToolsRunnerParams");
(0, chai_1.should)();
describe("BuildToolsRunnerParams tests", function () {
    var runnerParam;
    beforeEach(function () {
        runnerParam = new BuildToolsRunnerParams_1.BuildToolsRunnerParams();
    });
    it("RunnerParams has agent initialized", function () {
        runnerParam.agent.should.contain('powerplatform-build-tools');
        runnerParam.logger.should.not.be.empty;
    });
    it("RunnerParams has workingDir initialized", function () {
        runnerParam.workingDir.should.not.be.empty;
    });
});
