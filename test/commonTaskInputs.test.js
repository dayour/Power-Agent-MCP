"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var sinon = require("sinon");
var tl = require("azure-pipelines-task-lib/task");
var getEnvironmentUrl_1 = require("../src/params/auth/getEnvironmentUrl");
var getCredentials_1 = require("../src/params/auth/getCredentials");
var PipelineVariables_1 = require("../src/host/PipelineVariables");
(0, chai_1.should)();
var tlStub = sinon.stub(tl);
describe("getEnvironmentUrl tests", function () {
    var testEnvUrl = 'https://ppdevtools.crm.dynamics.com/';
    beforeEach(function () {
        sinon.reset();
        tlStub.getInput
            .withArgs('authenticationType')
            .throws(new Error('Should never reach fallthrough to ServiceConnection!!'));
    });
    it("can read explicit task input parameter with literal url", function () {
        tlStub.getInput
            .withArgs('Environment')
            .returns(testEnvUrl);
        var result = (0, getEnvironmentUrl_1.getEnvironmentUrl)();
        validateEnvUrl(result);
    });
    it("can read explicit task input parameter with AzDO variable expression", function () {
        tlStub.getInput
            .withArgs('Environment')
            .returns('$(BuildTools.EnvironmentUrl)');
        tlStub.getVariable
            .withArgs('BuildTools.EnvironmentUrl')
            .returns(testEnvUrl);
        var result = (0, getEnvironmentUrl_1.getEnvironmentUrl)();
        validateEnvUrl(result);
    });
    it("can read explicit task input parameter with user defined AzDO variable expression", function () {
        var myVarName = 'ThisIsMyPipelineVariableName';
        tlStub.getInput
            .withArgs('Environment')
            .returns("$(".concat(myVarName, ")"));
        tlStub.getVariable
            .withArgs(myVarName)
            .returns(testEnvUrl);
        var result = (0, getEnvironmentUrl_1.getEnvironmentUrl)();
        validateEnvUrl(result);
    });
    it("can read from pipeline variable", function () {
        tlStub.getVariable
            .withArgs(PipelineVariables_1.EnvUrlVariableName)
            .returns(testEnvUrl);
        var result = (0, getEnvironmentUrl_1.getEnvironmentUrl)();
        validateEnvUrl(result);
    });
    it("can read CreateEnvironment task's output pipeline variable", function () {
        tlStub.getVariable
            .withArgs('PowerPlatformCreateEnvironment_BuildTools_EnvironmentUrl')
            .returns(testEnvUrl);
        var result = (0, getEnvironmentUrl_1.getEnvironmentUrl)();
        validateEnvUrl(result);
    });
    it("can fallback to reading url from service connection", function () {
        var authType = 'PowerPlatformSPN';
        tlStub.getInput
            .withArgs('authenticationType')
            .returns(authType)
            .withArgs(authType)
            .returns('PP_SPN');
        tlStub.getEndpointUrl
            .withArgs('PP_SPN', false)
            .returns(testEnvUrl);
        var result = (0, getEnvironmentUrl_1.getEnvironmentUrl)();
        validateEnvUrl(result);
    });
    function validateEnvUrl(result) {
        result.should.be.a('string');
        result.should.not.be.empty;
        var url = new URL('http://invalid');
        (0, chai_1.expect)(function () { return url = new URL(result); }).to.not.throw(TypeError);
        url.toString().should.equal(testEnvUrl);
    }
});
describe("getCredentials tests", function () {
    var PPEnvAuthType = "PowerPlatformEnvironment";
    var testEndpointName = "testEndpoint";
    beforeEach(function () {
        sinon.reset();
        tlStub.getInput
            .withArgs('authenticationType')
            .returns(PPEnvAuthType);
        tlStub.getInput
            .withArgs(PPEnvAuthType)
            .returns(testEndpointName);
        tlStub.getEndpointAuthorization
            .withArgs(testEndpointName, false)
            .returns({ parameters: { 'username': 'me', 'password': 'secret' }, scheme: 'test' });
    });
    var endpointsTests = [
        { endpoint: 'https://ppdevtools.crm.dynamics.com', cloudInstance: 'Public' },
        { endpoint: 'https://aurora.crm10.dynamics.com', cloudInstance: 'Tip1' },
        { endpoint: 'https://kc.crm9.dynamics.com', cloudInstance: 'UsGov' },
        { endpoint: 'https://niehau.crm.dynamics.cn', cloudInstance: 'China' },
        { endpoint: undefined, cloudInstance: 'Public' },
        { endpoint: 'http://bing.com', cloudInstance: 'Public' },
    ];
    var _loop_1 = function (variant) {
        it("can resolve '".concat(variant.cloudInstance, "' cloud instances from default endpoint ").concat(variant.endpoint), function () {
            tlStub.getEndpointUrl
                .withArgs(testEndpointName, true)
                .returns(variant.endpoint);
            var result = (0, getCredentials_1.getCredentials)();
            result.cloudInstance.should.equal(variant.cloudInstance);
        });
    };
    for (var _i = 0, endpointsTests_1 = endpointsTests; _i < endpointsTests_1.length; _i++) {
        var variant = endpointsTests_1[_i];
        _loop_1(variant);
    }
});
