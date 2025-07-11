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
exports.ConnectorTools = void 0;
var ConnectorTools = /** @class */ (function () {
    function ConnectorTools() {
    }
    ConnectorTools.prototype.getTools = function () {
        return [
            {
                name: 'pp_connector_help',
                description: 'Show help for connector commands',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_connector_create',
                description: 'Creates a new row in the Connector table in Dataverse',
                inputSchema: {
                    type: 'object',
                    properties: {
                        connectorName: {
                            type: 'string',
                            description: 'Name for the new connector'
                        },
                        openApiFile: {
                            type: 'string',
                            description: 'Path to OpenAPI definition file'
                        },
                        iconFile: {
                            type: 'string',
                            description: 'Path to connector icon file'
                        },
                        environment: {
                            type: 'string',
                            description: 'Target environment URL'
                        }
                    },
                    required: ['connectorName', 'openApiFile']
                }
            },
            {
                name: 'pp_connector_download',
                description: 'Download a Connector\'s OpenApiDefinition and API Properties file',
                inputSchema: {
                    type: 'object',
                    properties: {
                        connectorId: {
                            type: 'string',
                            description: 'ID of the connector to download'
                        },
                        outputFolder: {
                            type: 'string',
                            description: 'Output folder for connector files'
                        },
                        environment: {
                            type: 'string',
                            description: 'Source environment URL'
                        }
                    },
                    required: ['connectorId', 'outputFolder']
                }
            },
            {
                name: 'pp_connector_init',
                description: 'Initializes a new API Properties file for a Connector',
                inputSchema: {
                    type: 'object',
                    properties: {
                        connectorName: {
                            type: 'string',
                            description: 'Name for the connector'
                        },
                        outputFile: {
                            type: 'string',
                            description: 'Output file path for API properties'
                        }
                    },
                    required: ['connectorName']
                }
            },
            {
                name: 'pp_connector_list',
                description: 'List the Connectors registered in Dataverse',
                inputSchema: {
                    type: 'object',
                    properties: {
                        environment: {
                            type: 'string',
                            description: 'Environment URL to list connectors from'
                        }
                    }
                }
            },
            {
                name: 'pp_connector_update',
                description: 'Updates a Connector Entity in Dataverse',
                inputSchema: {
                    type: 'object',
                    properties: {
                        connectorId: {
                            type: 'string',
                            description: 'ID of the connector to update'
                        },
                        openApiFile: {
                            type: 'string',
                            description: 'Path to updated OpenAPI definition file'
                        },
                        iconFile: {
                            type: 'string',
                            description: 'Path to updated connector icon file'
                        },
                        environment: {
                            type: 'string',
                            description: 'Target environment URL'
                        }
                    },
                    required: ['connectorId']
                }
            }
        ];
    };
    ConnectorTools.prototype.getHandlers = function () {
        var _this = this;
        return {
            pp_connector_help: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: 'Connector commands help displayed' }];
                });
            }); },
            pp_connector_create: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Connector '".concat(args.connectorName, "' created from OpenAPI definition: ").concat(args.openApiFile) }];
                });
            }); },
            pp_connector_download: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Connector ".concat(args.connectorId, " downloaded to: ").concat(args.outputFolder) }];
                });
            }); },
            pp_connector_init: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "API Properties file initialized for connector: ".concat(args.connectorName) }];
                });
            }); },
            pp_connector_list: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: 'Connectors listed from Dataverse' }];
                });
            }); },
            pp_connector_update: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Connector updated: ".concat(args.connectorId) }];
                });
            }); }
        };
    };
    return ConnectorTools;
}());
exports.ConnectorTools = ConnectorTools;
