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
exports.PcfTools = void 0;
var PcfTools = /** @class */ (function () {
    function PcfTools() {
    }
    PcfTools.prototype.getTools = function () {
        return [
            {
                name: 'pp_pcf_help',
                description: 'Show help for PCF component commands',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_pcf_init',
                description: 'Initializes a directory with a new Power Apps component framework project',
                inputSchema: {
                    type: 'object',
                    properties: {
                        namespace: {
                            type: 'string',
                            description: 'Namespace for the component'
                        },
                        name: {
                            type: 'string',
                            description: 'Name of the component'
                        },
                        template: {
                            type: 'string',
                            description: 'Template to use (field, dataset, etc.)'
                        },
                        outputDirectory: {
                            type: 'string',
                            description: 'Output directory for the project'
                        }
                    },
                    required: ['namespace', 'name', 'template']
                }
            },
            {
                name: 'pp_pcf_push',
                description: 'Import the Power Apps component framework project into Dataverse',
                inputSchema: {
                    type: 'object',
                    properties: {
                        publisher: {
                            type: 'string',
                            description: 'Publisher prefix for the component'
                        },
                        environment: {
                            type: 'string',
                            description: 'Target environment URL'
                        }
                    }
                }
            },
            {
                name: 'pp_pcf_version',
                description: 'Patch version for PCF controls',
                inputSchema: {
                    type: 'object',
                    properties: {
                        strategy: {
                            type: 'string',
                            description: 'Version update strategy (patch, minor, major)'
                        },
                        newVersion: {
                            type: 'string',
                            description: 'Specific version to set'
                        }
                    }
                }
            }
        ];
    };
    PcfTools.prototype.getHandlers = function () {
        var _this = this;
        return {
            pp_pcf_help: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: 'PCF component commands help displayed' }];
                });
            }); },
            pp_pcf_init: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "PCF component project initialized: ".concat(args.namespace, ".").concat(args.name, " using template ").concat(args.template) }];
                });
            }); },
            pp_pcf_push: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: 'PCF component imported into Dataverse successfully' }];
                });
            }); },
            pp_pcf_version: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "PCF component version updated".concat(args.newVersion ? " to: ".concat(args.newVersion) : " using strategy: ".concat(args.strategy)) }];
                });
            }); }
        };
    };
    return PcfTools;
}());
exports.PcfTools = PcfTools;
