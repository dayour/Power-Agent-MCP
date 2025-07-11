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
exports.GovernanceTools = void 0;
var GovernanceTools = /** @class */ (function () {
    function GovernanceTools() {
    }
    GovernanceTools.prototype.getTools = function () {
        return [
            {
                name: 'pp_set_connection_variables',
                description: 'Manage connection variables and environment-specific settings',
                inputSchema: {
                    type: 'object',
                    properties: {
                        connectionVariablesFile: {
                            type: 'string',
                            description: 'Path to connection variables JSON file'
                        }
                    },
                    required: ['connectionVariablesFile']
                }
            },
            {
                name: 'pp_set_governance_config',
                description: 'Configure governance policies and compliance settings',
                inputSchema: {
                    type: 'object',
                    properties: {
                        configurationFile: {
                            type: 'string',
                            description: 'Path to governance configuration file'
                        }
                    },
                    required: ['configurationFile']
                }
            },
            {
                name: 'pp_update_org_settings',
                description: 'Update organization settings and preferences',
                inputSchema: {
                    type: 'object',
                    properties: {
                        settingsFile: {
                            type: 'string',
                            description: 'Path to organization settings file'
                        }
                    },
                    required: ['settingsFile']
                }
            },
            {
                name: 'pp_publish_customizations',
                description: 'Publish customizations and activate changes',
                inputSchema: {
                    type: 'object',
                    properties: {
                        async: {
                            type: 'boolean',
                            description: 'Run publish operation asynchronously'
                        }
                    }
                }
            }
        ];
    };
    GovernanceTools.prototype.getHandlers = function () {
        return {
            pp_set_connection_variables: this.setConnectionVariables.bind(this),
            pp_set_governance_config: this.setGovernanceConfig.bind(this),
            pp_update_org_settings: this.updateOrgSettings.bind(this),
            pp_publish_customizations: this.publishCustomizations.bind(this)
        };
    };
    GovernanceTools.prototype.setConnectionVariables = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var setConnectionVariablesMain, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/set-connection-variables/set-connection-variables-v2/index.js'); })];
                    case 1:
                        setConnectionVariablesMain = (_a.sent()).main;
                        process.env.INPUT_CONNECTIONVARIABLESFILE = args.connectionVariablesFile;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, setConnectionVariablesMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: 'Connection variables set successfully',
                                connectionVariablesFile: args.connectionVariablesFile
                            }];
                    case 4:
                        error_1 = _a.sent();
                        throw new Error("Failed to set connection variables: ".concat(error_1 instanceof Error ? error_1.message : String(error_1)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    GovernanceTools.prototype.setGovernanceConfig = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var setGovernanceConfigMain, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/set-governance-config/set-governance-config-v2/index.js'); })];
                    case 1:
                        setGovernanceConfigMain = (_a.sent()).main;
                        process.env.INPUT_CONFIGURATIONFILE = args.configurationFile;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, setGovernanceConfigMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: 'Governance configuration set successfully',
                                configurationFile: args.configurationFile
                            }];
                    case 4:
                        error_2 = _a.sent();
                        throw new Error("Failed to set governance config: ".concat(error_2 instanceof Error ? error_2.message : String(error_2)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    GovernanceTools.prototype.updateOrgSettings = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var updateOrgSettingsMain, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/update-org-settings/update-org-settings-v2/index.js'); })];
                    case 1:
                        updateOrgSettingsMain = (_a.sent()).main;
                        process.env.INPUT_SETTINGSFILE = args.settingsFile;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, updateOrgSettingsMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: 'Organization settings updated successfully',
                                settingsFile: args.settingsFile
                            }];
                    case 4:
                        error_3 = _a.sent();
                        throw new Error("Failed to update org settings: ".concat(error_3 instanceof Error ? error_3.message : String(error_3)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    GovernanceTools.prototype.publishCustomizations = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var publishCustomizationsMain, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/publish-customizations/publish-customizations-v2/index.js'); })];
                    case 1:
                        publishCustomizationsMain = (_a.sent()).main;
                        if (args.async !== undefined)
                            process.env.INPUT_ASYNC = String(args.async);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, publishCustomizationsMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: 'Customizations published successfully'
                            }];
                    case 4:
                        error_4 = _a.sent();
                        throw new Error("Failed to publish customizations: ".concat(error_4 instanceof Error ? error_4.message : String(error_4)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return GovernanceTools;
}());
exports.GovernanceTools = GovernanceTools;
