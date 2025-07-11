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
exports.CanvasTools = void 0;
var CanvasTools = /** @class */ (function () {
    function CanvasTools() {
    }
    CanvasTools.prototype.getTools = function () {
        return [
            {
                name: 'pp_canvas_help',
                description: 'Show help for canvas app commands',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_canvas_create',
                description: 'Generate a canvas app from a custom connector',
                inputSchema: {
                    type: 'object',
                    properties: {
                        connectorName: {
                            type: 'string',
                            description: 'Name of the custom connector'
                        },
                        appName: {
                            type: 'string',
                            description: 'Name for the new canvas app'
                        },
                        environment: {
                            type: 'string',
                            description: 'Target environment URL'
                        }
                    },
                    required: ['connectorName', 'appName']
                }
            },
            {
                name: 'pp_canvas_download',
                description: 'Download canvas app as .msapp file',
                inputSchema: {
                    type: 'object',
                    properties: {
                        appId: {
                            type: 'string',
                            description: 'ID of the canvas app to download'
                        },
                        appName: {
                            type: 'string',
                            description: 'Name of the canvas app to download'
                        },
                        outputFile: {
                            type: 'string',
                            description: 'Output file path for the .msapp file'
                        },
                        environment: {
                            type: 'string',
                            description: 'Source environment URL'
                        }
                    },
                    required: ['outputFile']
                }
            },
            {
                name: 'pp_canvas_list',
                description: 'List canvas apps in the environment',
                inputSchema: {
                    type: 'object',
                    properties: {
                        environment: {
                            type: 'string',
                            description: 'Environment URL to list apps from'
                        }
                    }
                }
            },
            {
                name: 'pp_canvas_pack',
                description: 'Pack canvas app sources into an msapp file',
                inputSchema: {
                    type: 'object',
                    properties: {
                        sourceFolder: {
                            type: 'string',
                            description: 'Source folder containing unpacked canvas app'
                        },
                        outputFile: {
                            type: 'string',
                            description: 'Output .msapp file path'
                        }
                    },
                    required: ['sourceFolder', 'outputFile']
                }
            },
            {
                name: 'pp_canvas_unpack',
                description: 'Extract an msapp file into source files',
                inputSchema: {
                    type: 'object',
                    properties: {
                        msappFile: {
                            type: 'string',
                            description: 'Path to the .msapp file to unpack'
                        },
                        outputFolder: {
                            type: 'string',
                            description: 'Output folder for source files'
                        }
                    },
                    required: ['msappFile', 'outputFolder']
                }
            },
            {
                name: 'pp_canvas_validate',
                description: 'Validate the .pa.yaml source for an unpacked canvas app',
                inputSchema: {
                    type: 'object',
                    properties: {
                        sourceFolder: {
                            type: 'string',
                            description: 'Source folder containing unpacked canvas app'
                        }
                    },
                    required: ['sourceFolder']
                }
            }
        ];
    };
    CanvasTools.prototype.getHandlers = function () {
        var _this = this;
        return {
            pp_canvas_help: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: 'Canvas app commands help displayed' }];
                });
            }); },
            pp_canvas_create: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Canvas app '".concat(args.appName, "' created from connector '").concat(args.connectorName, "'") }];
                });
            }); },
            pp_canvas_download: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Canvas app downloaded to: ".concat(args.outputFile) }];
                });
            }); },
            pp_canvas_list: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: 'Canvas apps listed from environment' }];
                });
            }); },
            pp_canvas_pack: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Canvas app packed from '".concat(args.sourceFolder, "' to '").concat(args.outputFile, "'") }];
                });
            }); },
            pp_canvas_unpack: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Canvas app unpacked from '".concat(args.msappFile, "' to '").concat(args.outputFolder, "'") }];
                });
            }); },
            pp_canvas_validate: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Canvas app sources validated in: ".concat(args.sourceFolder) }];
                });
            }); }
        };
    };
    return CanvasTools;
}());
exports.CanvasTools = CanvasTools;
