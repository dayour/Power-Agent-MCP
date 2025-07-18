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
exports.UtilityTools = void 0;
var UtilityTools = /** @class */ (function () {
    function UtilityTools() {
    }
    UtilityTools.prototype.getTools = function () {
        return [
            {
                name: 'pp_tool_installer',
                description: 'Install and manage Power Platform CLI tools',
                inputSchema: {
                    type: 'object',
                    properties: {
                        addToolsToPath: {
                            type: 'boolean',
                            description: 'Add PAC CLI tools to system PATH'
                        }
                    }
                }
            },
            {
                name: 'pp_whoami',
                description: 'Validate authentication and connection status',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_catalog_status',
                description: 'Monitor catalog submission status',
                inputSchema: {
                    type: 'object',
                    properties: {
                        catalogSubmissionId: {
                            type: 'string',
                            description: 'ID of the catalog submission to check'
                        },
                        requestId: {
                            type: 'string',
                            description: 'Request ID for status tracking'
                        }
                    }
                }
            }
        ];
    };
    UtilityTools.prototype.getHandlers = function () {
        return {
            pp_tool_installer: this.toolInstaller.bind(this),
            pp_whoami: this.whoami.bind(this),
            pp_catalog_status: this.catalogStatus.bind(this)
        };
    };
    UtilityTools.prototype.toolInstaller = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var toolInstallerMain, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/tool-installer/tool-installer-v2/index.js'); })];
                    case 1:
                        toolInstallerMain = (_a.sent()).main;
                        if (args.addToolsToPath !== undefined)
                            process.env.INPUT_ADDTOOLSTOPATH = String(args.addToolsToPath);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, toolInstallerMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: 'Power Platform CLI tools installed successfully',
                                addToolsToPath: args.addToolsToPath || false
                            }];
                    case 4:
                        error_1 = _a.sent();
                        throw new Error("Failed to install tools: ".concat(error_1 instanceof Error ? error_1.message : String(error_1)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UtilityTools.prototype.whoami = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var whoamiMain, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/whoami/whoami-v2/index.js'); })];
                    case 1:
                        whoamiMain = (_a.sent()).main;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, whoamiMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: 'Authentication validated successfully'
                            }];
                    case 4:
                        error_2 = _a.sent();
                        throw new Error("Authentication validation failed: ".concat(error_2 instanceof Error ? error_2.message : String(error_2)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UtilityTools.prototype.catalogStatus = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var catalogStatusMain, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/catalog-status/catalog-status-v2/index.js'); })];
                    case 1:
                        catalogStatusMain = (_a.sent()).main;
                        if (args.catalogSubmissionId)
                            process.env.INPUT_CATALOGSUBMISSIONID = args.catalogSubmissionId;
                        if (args.requestId)
                            process.env.INPUT_REQUESTID = args.requestId;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, catalogStatusMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: 'Catalog status retrieved successfully',
                                catalogSubmissionId: args.catalogSubmissionId,
                                requestId: args.requestId
                            }];
                    case 4:
                        error_3 = _a.sent();
                        throw new Error("Failed to get catalog status: ".concat(error_3 instanceof Error ? error_3.message : String(error_3)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return UtilityTools;
}());
exports.UtilityTools = UtilityTools;
