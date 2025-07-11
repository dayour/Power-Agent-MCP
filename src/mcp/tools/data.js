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
exports.DataTools = void 0;
var DataTools = /** @class */ (function () {
    function DataTools() {
    }
    DataTools.prototype.getTools = function () {
        return [
            {
                name: 'pp_export_data',
                description: 'Export configuration data with schema validation',
                inputSchema: {
                    type: 'object',
                    properties: {
                        schemaFile: {
                            type: 'string',
                            description: 'Path to the data schema file'
                        },
                        dataFile: {
                            type: 'string',
                            description: 'Output file for exported data'
                        }
                    },
                    required: ['schemaFile', 'dataFile']
                }
            },
            {
                name: 'pp_import_data',
                description: 'Import data with transformation and validation',
                inputSchema: {
                    type: 'object',
                    properties: {
                        dataFile: {
                            type: 'string',
                            description: 'Path to the data file to import'
                        },
                        connectionCount: {
                            type: 'number',
                            description: 'Number of connections to use for import'
                        }
                    },
                    required: ['dataFile']
                }
            }
        ];
    };
    DataTools.prototype.getHandlers = function () {
        return {
            pp_export_data: this.exportData.bind(this),
            pp_import_data: this.importData.bind(this)
        };
    };
    DataTools.prototype.exportData = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var exportDataMain, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/export-data/export-data-v2/index.js'); })];
                    case 1:
                        exportDataMain = (_a.sent()).main;
                        process.env.INPUT_SCHEMAFILE = args.schemaFile;
                        process.env.INPUT_DATAFILE = args.dataFile;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, exportDataMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: 'Data exported successfully',
                                schemaFile: args.schemaFile,
                                dataFile: args.dataFile
                            }];
                    case 4:
                        error_1 = _a.sent();
                        throw new Error("Failed to export data: ".concat(error_1 instanceof Error ? error_1.message : String(error_1)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DataTools.prototype.importData = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var importDataMain, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/import-data/import-data-v2/index.js'); })];
                    case 1:
                        importDataMain = (_a.sent()).main;
                        process.env.INPUT_DATAFILE = args.dataFile;
                        if (args.connectionCount)
                            process.env.INPUT_CONNECTIONCOUNT = String(args.connectionCount);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, importDataMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: 'Data imported successfully',
                                dataFile: args.dataFile
                            }];
                    case 4:
                        error_2 = _a.sent();
                        throw new Error("Failed to import data: ".concat(error_2 instanceof Error ? error_2.message : String(error_2)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return DataTools;
}());
exports.DataTools = DataTools;
