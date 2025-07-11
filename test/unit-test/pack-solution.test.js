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
var chai_1 = require("chai");
var sinonChai = require("sinon-chai");
var rewiremock_1 = require("../rewiremock");
var sinon_1 = require("sinon");
var BuildToolsHost_1 = require("../../src/host/BuildToolsHost");
var BuildToolsRunnerParams_1 = require("../../src/host/BuildToolsRunnerParams");
(0, chai_1.should)();
(0, chai_1.use)(sinonChai);
describe("pack solution test", function () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var packSolutionStub;
    beforeEach(function () {
        packSolutionStub = (0, sinon_1.stub)();
    });
    afterEach(function () { return (0, sinon_1.restore)(); });
    function callActionWithMocks() {
        return __awaiter(this, void 0, void 0, function () {
            var pack;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, rewiremock_1.default.around(function () { return Promise.resolve().then(function () { return require("../../src/tasks/pack-solution/pack-solution-v2/index"); }); }, function (mock) {
                            mock(function () { return Promise.resolve().then(function () { return require("@microsoft/powerplatform-cli-wrapper/dist/actions"); }); }).with({ packSolution: packSolutionStub });
                        })];
                    case 1:
                        pack = _a.sent();
                        pack.main();
                        return [2 /*return*/];
                }
            });
        });
    }
    it("calls pack solution", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, callActionWithMocks()];
                case 1:
                    _a.sent();
                    packSolutionStub.should.have.been.calledOnceWithExactly({
                        solutionZipFile: { name: 'SolutionOutputFile', required: true, defaultValue: undefined },
                        sourceFolder: { name: 'SolutionSourceFolder', required: true, defaultValue: undefined },
                        solutionType: { name: 'SolutionType', required: false, defaultValue: "Unmanaged" },
                        errorLevel: { name: 'ErrorLevel', required: false, defaultValue: 'Info' },
                        singleComponent: { name: 'SingleComponent', required: false, defaultValue: 'None' },
                        mapFile: { name: 'MapFile', required: false, defaultValue: undefined },
                        localeTemplate: { name: 'LocaleTemplate', required: false, defaultValue: undefined },
                        localize: { name: 'Localize', required: false, defaultValue: false },
                        useLcid: { name: 'UseLcid', required: false, defaultValue: false },
                        disablePluginRemap: { name: 'DisablePluginRemap', required: false, defaultValue: false },
                        processCanvasApps: { name: 'ProcessCanvasApps', required: false, defaultValue: false },
                        logToConsole: false
                    }, new BuildToolsRunnerParams_1.BuildToolsRunnerParams(), new BuildToolsHost_1.BuildToolsHost());
                    return [2 /*return*/];
            }
        });
    }); });
});
