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
exports.main = main;
var tl = require("azure-pipelines-task-lib/task");
var actions_1 = require("@microsoft/powerplatform-cli-wrapper/dist/actions");
var isRunningOnAgent_1 = require("../../../params/auth/isRunningOnAgent");
var BuildToolsHost_1 = require("../../../host/BuildToolsHost");
var TaskParser_1 = require("../../../parser/TaskParser");
var getCredentials_1 = require("../../../params/auth/getCredentials");
var getEnvironmentUrl_1 = require("../../../params/auth/getEnvironmentUrl");
var BuildToolsRunnerParams_1 = require("../../../host/BuildToolsRunnerParams");
var ErrorHandler_1 = require("../../../utilities/ErrorHandler");
var ParameterValidator_1 = require("../../../utilities/ParameterValidator");
var taskDefinitionData = require("./task.json");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(0, isRunningOnAgent_1.isRunningOnAgent)()) return [3 /*break*/, 2];
                return [4 /*yield*/, main()];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); })().catch(function (error) {
    tl.debug(ErrorHandler_1.ErrorHandler.sanitizeError(error)); // Full error for debugging
    tl.setResult(tl.TaskResult.Failed, ErrorHandler_1.ErrorHandler.sanitizeError(error)); // Sanitized for user
});
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var taskParser, parameterMap, isDiagnosticsMode, solutionName, outputPath, environmentUrl, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    taskParser = new TaskParser_1.TaskParser();
                    parameterMap = taskParser.getHostParameterEntries(taskDefinitionData);
                    isDiagnosticsMode = tl.getVariable('agent.diagnostic');
                    solutionName = parameterMap['SolutionName'];
                    outputPath = parameterMap['SolutionOutputFile'];
                    environmentUrl = (0, getEnvironmentUrl_1.getEnvironmentUrl)();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    // Enhanced parameter validation
                    ParameterValidator_1.ParameterValidator.validateAndThrow({
                        solutionName: solutionName === null || solutionName === void 0 ? void 0 : solutionName.defaultValue,
                        solutionPath: outputPath === null || outputPath === void 0 ? void 0 : outputPath.defaultValue,
                        environmentUrl: environmentUrl
                    });
                    return [4 /*yield*/, (0, actions_1.exportSolution)({
                            credentials: (0, getCredentials_1.getCredentials)(),
                            environmentUrl: environmentUrl,
                            name: solutionName,
                            path: outputPath,
                            managed: parameterMap['Managed'],
                            async: parameterMap['AsyncOperation'],
                            maxAsyncWaitTimeInMin: parameterMap['MaxAsyncWaitTime'],
                            autoNumberSettings: parameterMap['ExportAutoNumberingSettings'],
                            calenderSettings: parameterMap['ExportCalendarSettings'],
                            customizationSettings: parameterMap['ExportCustomizationSettings'],
                            emailTrackingSettings: parameterMap['ExportEmailTrackingSettings'],
                            externalApplicationSettings: parameterMap['ExportExternalApplicationSettings'],
                            generalSettings: parameterMap['ExportGeneralSettings'],
                            isvConfig: parameterMap['ExportIsvConfig'],
                            marketingSettings: parameterMap['ExportMarketingSettings'],
                            outlookSynchronizationSettings: parameterMap['ExportOutlookSynchronizationSettings'],
                            relationshipRoles: parameterMap['ExportRelationshipRoles'],
                            sales: parameterMap['ExportSales'],
                            overwrite: parameterMap['OverwriteLocalSolution'],
                            logToConsole: isDiagnosticsMode ? true : false
                        }, new BuildToolsRunnerParams_1.BuildToolsRunnerParams(), new BuildToolsHost_1.BuildToolsHost())];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    // Enhanced error handling with troubleshooting guidance
                    ErrorHandler_1.ErrorHandler.handleSolutionExportError((solutionName === null || solutionName === void 0 ? void 0 : solutionName.defaultValue) || 'Unknown', environmentUrl, outputPath === null || outputPath === void 0 ? void 0 : outputPath.defaultValue, error_1 instanceof Error ? error_1 : String(error_1));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
