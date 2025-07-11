"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var rewiremock_1 = require("rewiremock");
var chai_1 = require("chai");
var sinonChai = require("sinon-chai");
var sinon_1 = require("sinon");
var PipelineVariables_1 = require("../../src/host/PipelineVariables");
var mockData_1 = require("./mockData");
(0, chai_1.should)();
(0, chai_1.use)(sinonChai);
var inputs = {};
var variables = {};
var authParams = {};
describe('set-connection-variables tests', function () {
    beforeEach(function () {
        inputs = {};
        variables = {};
        authParams = {};
    });
    afterEach(function () { return (0, sinon_1.restore)(); });
    function callActionWithMocks() {
        return __awaiter(this, void 0, void 0, function () {
            var setConnectionVariables;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, rewiremock_1.default.around(function () { return Promise.resolve().then(function () { return require("../../src/tasks/set-connection-variables/set-connection-variables-v2/index"); }); }, function (mock) {
                            mock(function () { return Promise.resolve().then(function () { return require("azure-pipelines-task-lib"); }); }).with({
                                getInputRequired: function (name) { return inputs[name]; },
                                setVariable: function (name, val, secret, isOutput) {
                                    variables[name] = val;
                                },
                                getVariable: function (name) { return variables[name]; },
                                getEndpointAuthorizationParameterRequired: function (id, key) { return authParams[key]; }
                            });
                            mock(function () { return Promise.resolve().then(function () { return require("../../src/params/auth/getEnvironmentUrl"); }); }).with({ getEnvironmentUrl: function () { return mockData_1.mockEnvironmentUrl; } });
                        })];
                    case 1:
                        setConnectionVariables = _a.sent();
                        return [4 /*yield*/, setConnectionVariables.main()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    it('calls set-connection-variables with PowerPlatformSPN', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockedAppId, mockedSecret, mockedTenantId, expectedDataverseConnectionString;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inputs['authenticationType'] = 'PowerPlatformSPN';
                    inputs['PowerPlatformSPN'] = 'mocked-svc-conn-id';
                    variables[PipelineVariables_1.EnvUrlVariableName] = 'https://mock-env-url';
                    mockedAppId = 'mocked-app-id';
                    mockedSecret = 'mocked-secret';
                    mockedTenantId = 'mocked-tenant-id';
                    authParams['applicationId'] = mockedAppId;
                    authParams['clientSecret'] = mockedSecret;
                    authParams['tenantId'] = mockedTenantId;
                    expectedDataverseConnectionString = "AuthType=ClientSecret;url=".concat(mockData_1.mockEnvironmentUrl, ";ClientId=").concat(mockedAppId, ";ClientSecret=").concat(mockedSecret);
                    return [4 /*yield*/, callActionWithMocks()];
                case 1:
                    _a.sent();
                    variables[PipelineVariables_1.ApplicationIdlVariableName].should.equal(mockedAppId);
                    variables[PipelineVariables_1.ClientSecretVariableName].should.equal(mockedSecret);
                    variables[PipelineVariables_1.TenantIdVariableName].should.equal(mockedTenantId);
                    variables[PipelineVariables_1.DataverseConnectionStringVariableName].should.equal(expectedDataverseConnectionString);
                    return [2 /*return*/];
            }
        });
    }); });
    it('calls set-connection-variables with PowerPlatformEnvironment', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockedUserNme, mockedPassword, expectedDataverseConnectionString;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inputs['authenticationType'] = 'PowerPlatformEnvironment';
                    inputs['PowerPlatformEnvironment'] = 'mocked-svc-conn-id';
                    inputs['ApplicationId'] = 'mocked-app-id';
                    inputs['RedirectUri'] = 'mocked-redirect-uri';
                    variables[PipelineVariables_1.EnvUrlVariableName] = 'https://mock-env-url';
                    mockedUserNme = 'some@user.com';
                    mockedPassword = 'somePassord';
                    authParams['UserName'] = mockedUserNme;
                    authParams['Password'] = mockedPassword;
                    expectedDataverseConnectionString = "AuthType=OAuth;url=".concat(mockData_1.mockEnvironmentUrl, ";UserName=").concat(mockedUserNme, ";Password=").concat(mockedPassword, ";AppId=").concat(inputs['ApplicationId'], ";RedirectUri=").concat(inputs['RedirectUri']);
                    return [4 /*yield*/, callActionWithMocks()];
                case 1:
                    _a.sent();
                    variables[PipelineVariables_1.UserNameVariableName].should.equal(mockedUserNme);
                    variables[PipelineVariables_1.PasswordVariableName].should.equal(mockedPassword);
                    variables[PipelineVariables_1.DataverseConnectionStringVariableName].should.equal(expectedDataverseConnectionString);
                    return [2 /*return*/];
            }
        });
    }); });
});
