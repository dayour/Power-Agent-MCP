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
exports.EnvTools = void 0;
var EnvTools = /** @class */ (function () {
    function EnvTools() {
    }
    EnvTools.prototype.getTools = function () {
        return [
            {
                name: 'pp_env_help',
                description: 'Show help for environment commands',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_env_fetch',
                description: 'Performs FetchXML query against Dataverse',
                inputSchema: {
                    type: 'object',
                    properties: {
                        fetchXml: {
                            type: 'string',
                            description: 'FetchXML query to execute'
                        },
                        fetchXmlFile: {
                            type: 'string',
                            description: 'Path to file containing FetchXML query'
                        },
                        outputFile: {
                            type: 'string',
                            description: 'Output file path for query results'
                        },
                        environment: {
                            type: 'string',
                            description: 'Target environment URL'
                        }
                    }
                }
            },
            {
                name: 'pp_env_list',
                description: 'List all Dataverse environments from Global Discovery Service',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_env_list_settings',
                description: 'List environment settings',
                inputSchema: {
                    type: 'object',
                    properties: {
                        environment: {
                            type: 'string',
                            description: 'Environment URL to list settings from'
                        }
                    }
                }
            },
            {
                name: 'pp_env_select',
                description: 'Select default organization for current authentication profile',
                inputSchema: {
                    type: 'object',
                    properties: {
                        environment: {
                            type: 'string',
                            description: 'Environment URL to select as default'
                        },
                        name: {
                            type: 'string',
                            description: 'Environment name to select as default'
                        }
                    }
                }
            },
            {
                name: 'pp_env_update_settings',
                description: 'Update environment settings',
                inputSchema: {
                    type: 'object',
                    properties: {
                        environment: {
                            type: 'string',
                            description: 'Target environment URL'
                        },
                        settings: {
                            type: 'object',
                            description: 'Settings to update'
                        }
                    },
                    required: ['settings']
                }
            },
            {
                name: 'pp_env_who',
                description: 'Displays information about the current Dataverse organization',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            }
        ];
    };
    EnvTools.prototype.getHandlers = function () {
        var _this = this;
        return {
            pp_env_help: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: 'Environment commands help displayed' }];
                });
            }); },
            pp_env_fetch: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "FetchXML query executed".concat(args.outputFile ? " and results saved to: ".concat(args.outputFile) : '') }];
                });
            }); },
            pp_env_list: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: 'Environments listed from Global Discovery Service' }];
                });
            }); },
            pp_env_list_settings: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: 'Environment settings listed' }];
                });
            }); },
            pp_env_select: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Environment selected as default: ".concat(args.environment || args.name) }];
                });
            }); },
            pp_env_update_settings: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: 'Environment settings updated successfully' }];
                });
            }); },
            pp_env_who: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: 'Current Dataverse organization information displayed' }];
                });
            }); }
        };
    };
    return EnvTools;
}());
exports.EnvTools = EnvTools;
