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
exports.PackageTools = void 0;
var PackageTools = /** @class */ (function () {
    function PackageTools() {
    }
    PackageTools.prototype.getTools = function () {
        return [
            {
                name: 'pp_package_help',
                description: 'Show help for package commands',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_package_add_external',
                description: 'Adds a package external to the Dataverse solution system',
                inputSchema: {
                    type: 'object',
                    properties: {
                        packagePath: {
                            type: 'string',
                            description: 'Path to the external package'
                        },
                        packageName: {
                            type: 'string',
                            description: 'Name of the external package'
                        }
                    },
                    required: ['packagePath']
                }
            },
            {
                name: 'pp_package_add_reference',
                description: 'Adds reference to Dataverse solution project',
                inputSchema: {
                    type: 'object',
                    properties: {
                        path: {
                            type: 'string',
                            description: 'Path to the project to reference'
                        },
                        projectName: {
                            type: 'string',
                            description: 'Name of the project to reference'
                        }
                    },
                    required: ['path']
                }
            },
            {
                name: 'pp_package_add_solution',
                description: 'Adds a prebuilt Dataverse solution file to a Package Deployer Package project',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionFile: {
                            type: 'string',
                            description: 'Path to the solution file'
                        },
                        solutionName: {
                            type: 'string',
                            description: 'Name of the solution'
                        }
                    },
                    required: ['solutionFile']
                }
            },
            {
                name: 'pp_package_init',
                description: 'Initializes a directory with a new Dataverse package project',
                inputSchema: {
                    type: 'object',
                    properties: {
                        outputDirectory: {
                            type: 'string',
                            description: 'Output directory for the package project'
                        },
                        packageName: {
                            type: 'string',
                            description: 'Name for the package'
                        }
                    },
                    required: ['packageName']
                }
            },
            {
                name: 'pp_package_show',
                description: 'Shows details of Dataverse package',
                inputSchema: {
                    type: 'object',
                    properties: {
                        packageFile: {
                            type: 'string',
                            description: 'Path to the package file'
                        },
                        packageName: {
                            type: 'string',
                            description: 'Name of the package'
                        }
                    }
                }
            }
        ];
    };
    PackageTools.prototype.getHandlers = function () {
        var _this = this;
        return {
            pp_package_help: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: 'Package commands help displayed' }];
                });
            }); },
            pp_package_add_external: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "External package added: ".concat(args.packagePath) }];
                });
            }); },
            pp_package_add_reference: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Reference added to project: ".concat(args.path) }];
                });
            }); },
            pp_package_add_solution: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Solution file added to package: ".concat(args.solutionFile) }];
                });
            }); },
            pp_package_init: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Package project initialized: ".concat(args.packageName) }];
                });
            }); },
            pp_package_show: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Package details displayed for: ".concat(args.packageFile || args.packageName) }];
                });
            }); }
        };
    };
    return PackageTools;
}());
exports.PackageTools = PackageTools;
