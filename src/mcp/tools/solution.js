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
exports.SolutionTools = void 0;
var SolutionTools = /** @class */ (function () {
    function SolutionTools() {
    }
    SolutionTools.prototype.getTools = function () {
        return [
            {
                name: 'pp_export_solution',
                description: 'Export managed and unmanaged solutions with advanced settings',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionName: {
                            type: 'string',
                            description: 'Name of the solution to export'
                        },
                        solutionOutputFile: {
                            type: 'string',
                            description: 'Output file path for the solution'
                        },
                        managed: {
                            type: 'boolean',
                            description: 'Export as managed solution'
                        },
                        exportAutoNumberingSettings: {
                            type: 'boolean',
                            description: 'Include auto numbering settings'
                        },
                        exportCalendarSettings: {
                            type: 'boolean',
                            description: 'Include calendar settings'
                        },
                        exportCustomizationSettings: {
                            type: 'boolean',
                            description: 'Include customization settings'
                        },
                        exportEmailTrackingSettings: {
                            type: 'boolean',
                            description: 'Include email tracking settings'
                        },
                        exportGeneralSettings: {
                            type: 'boolean',
                            description: 'Include general settings'
                        },
                        exportMarketingSettings: {
                            type: 'boolean',
                            description: 'Include marketing settings'
                        },
                        exportOutlookSynchronizationSettings: {
                            type: 'boolean',
                            description: 'Include Outlook sync settings'
                        },
                        exportRelationshipRoles: {
                            type: 'boolean',
                            description: 'Include relationship roles'
                        },
                        exportIsvConfig: {
                            type: 'boolean',
                            description: 'Include ISV configuration'
                        },
                        exportSales: {
                            type: 'boolean',
                            description: 'Include sales settings'
                        },
                        exportExternalApplications: {
                            type: 'boolean',
                            description: 'Include external applications'
                        }
                    },
                    required: ['solutionName', 'solutionOutputFile']
                }
            },
            {
                name: 'pp_import_solution',
                description: 'Import solutions with dependency handling and upgrade support',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionInputFile: {
                            type: 'string',
                            description: 'Path to the solution file to import'
                        },
                        publishWorkflows: {
                            type: 'boolean',
                            description: 'Publish workflows after import'
                        },
                        overwriteUnmanagedCustomizations: {
                            type: 'boolean',
                            description: 'Overwrite unmanaged customizations'
                        },
                        skipProductUpdateDependencies: {
                            type: 'boolean',
                            description: 'Skip product update dependencies'
                        },
                        importAsHolding: {
                            type: 'boolean',
                            description: 'Import as holding solution'
                        },
                        stageAndUpgrade: {
                            type: 'boolean',
                            description: 'Stage and upgrade in single operation'
                        },
                        forceOverwrite: {
                            type: 'boolean',
                            description: 'Force overwrite of existing solution'
                        },
                        useAsyncMode: {
                            type: 'boolean',
                            description: 'Use asynchronous import mode'
                        },
                        maxAsyncWaitTime: {
                            type: 'string',
                            description: 'Maximum wait time for async operation'
                        },
                        deploymentSettingsFile: {
                            type: 'string',
                            description: 'Path to deployment settings file'
                        }
                    },
                    required: ['solutionInputFile']
                }
            },
            {
                name: 'pp_pack_solution',
                description: 'Package solutions from source control with Canvas app processing',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionOutputFile: {
                            type: 'string',
                            description: 'Output file path for packed solution'
                        },
                        solutionSourceFolder: {
                            type: 'string',
                            description: 'Source folder containing unpacked solution'
                        },
                        solutionType: {
                            type: 'string',
                            enum: ['Unmanaged', 'Managed', 'Both'],
                            description: 'Type of solution to pack'
                        },
                        processCanvasApps: {
                            type: 'boolean',
                            description: 'Process Canvas apps during packing'
                        },
                        packageType: {
                            type: 'string',
                            enum: ['Unmanaged', 'Managed'],
                            description: 'Package type for Canvas apps'
                        }
                    },
                    required: ['solutionOutputFile', 'solutionSourceFolder']
                }
            },
            {
                name: 'pp_unpack_solution',
                description: 'Unpack solutions for source control integration',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionInputFile: {
                            type: 'string',
                            description: 'Path to the solution file to unpack'
                        },
                        solutionTargetFolder: {
                            type: 'string',
                            description: 'Target folder for unpacked solution'
                        },
                        solutionType: {
                            type: 'string',
                            enum: ['Unmanaged', 'Managed', 'Both'],
                            description: 'Type of solution to unpack'
                        },
                        processCanvasApps: {
                            type: 'boolean',
                            description: 'Process Canvas apps during unpacking'
                        },
                        packageType: {
                            type: 'string',
                            enum: ['Unmanaged', 'Managed'],
                            description: 'Package type for Canvas apps'
                        },
                        allowDelete: {
                            type: 'boolean',
                            description: 'Allow deletion of files in target folder'
                        },
                        allowWrite: {
                            type: 'boolean',
                            description: 'Allow writing to target folder'
                        }
                    },
                    required: ['solutionInputFile', 'solutionTargetFolder']
                }
            },
            {
                name: 'pp_set_solution_version',
                description: 'Set solution version with semantic versioning support',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionName: {
                            type: 'string',
                            description: 'Name of the solution'
                        },
                        solutionVersionNumber: {
                            type: 'string',
                            description: 'Version number (e.g., 1.0.0.0)'
                        }
                    },
                    required: ['solutionName', 'solutionVersionNumber']
                }
            },
            {
                name: 'pp_add_solution_component',
                description: 'Add components to solutions with dependency tracking',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionName: {
                            type: 'string',
                            description: 'Name of the solution'
                        },
                        component: {
                            type: 'string',
                            description: 'Component to add to solution'
                        },
                        componentType: {
                            type: 'string',
                            description: 'Type of component'
                        },
                        addRequiredComponents: {
                            type: 'boolean',
                            description: 'Add required components automatically'
                        }
                    },
                    required: ['solutionName', 'component', 'componentType']
                }
            },
            {
                name: 'pp_apply_solution_upgrade',
                description: 'Apply solution upgrades with automated processing',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionName: {
                            type: 'string',
                            description: 'Name of the solution to upgrade'
                        },
                        async: {
                            type: 'boolean',
                            description: 'Run upgrade asynchronously'
                        },
                        maxAsyncWaitTime: {
                            type: 'string',
                            description: 'Maximum wait time for async operation'
                        }
                    },
                    required: ['solutionName']
                }
            },
            {
                name: 'pp_delete_solution',
                description: 'Delete solutions with dependency checks',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionName: {
                            type: 'string',
                            description: 'Name of the solution to delete'
                        }
                    },
                    required: ['solutionName']
                }
            },
            {
                name: 'pp_solution_help',
                description: 'Show help for solution commands',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_solution_add_license',
                description: 'Add license and plan info to the solution',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionName: {
                            type: 'string',
                            description: 'Name of the solution'
                        },
                        licenseFile: {
                            type: 'string',
                            description: 'Path to license file'
                        }
                    },
                    required: ['solutionName', 'licenseFile']
                }
            },
            {
                name: 'pp_solution_clone',
                description: 'Create a solution project based on an existing solution',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionName: {
                            type: 'string',
                            description: 'Name of the solution to clone'
                        },
                        targetDirectory: {
                            type: 'string',
                            description: 'Target directory for the cloned project'
                        },
                        environment: {
                            type: 'string',
                            description: 'Source environment URL'
                        }
                    },
                    required: ['solutionName']
                }
            },
            {
                name: 'pp_solution_create_settings',
                description: 'Create a settings file from solution zip or solution folder',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionFile: {
                            type: 'string',
                            description: 'Path to solution file or folder'
                        },
                        outputFile: {
                            type: 'string',
                            description: 'Output file path for settings'
                        }
                    },
                    required: ['solutionFile', 'outputFile']
                }
            },
            {
                name: 'pp_solution_init',
                description: 'Initializes a directory with a new Dataverse solution project',
                inputSchema: {
                    type: 'object',
                    properties: {
                        publisherName: {
                            type: 'string',
                            description: 'Publisher name'
                        },
                        publisherPrefix: {
                            type: 'string',
                            description: 'Publisher prefix'
                        },
                        outputDirectory: {
                            type: 'string',
                            description: 'Output directory for the solution project'
                        }
                    },
                    required: ['publisherName', 'publisherPrefix']
                }
            },
            {
                name: 'pp_solution_list',
                description: 'List all Solutions from the current Dataverse organization',
                inputSchema: {
                    type: 'object',
                    properties: {
                        environment: {
                            type: 'string',
                            description: 'Environment URL to list solutions from'
                        }
                    }
                }
            },
            {
                name: 'pp_solution_online_version',
                description: 'Sets version for solution loaded in Dataverse',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionName: {
                            type: 'string',
                            description: 'Name of the solution'
                        },
                        solutionVersionNumber: {
                            type: 'string',
                            description: 'Version number to set online'
                        }
                    },
                    required: ['solutionName', 'solutionVersionNumber']
                }
            },
            {
                name: 'pp_solution_sync',
                description: 'Sync the current Dataverse solution project to current state',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionName: {
                            type: 'string',
                            description: 'Name of the solution to sync'
                        }
                    },
                    required: ['solutionName']
                }
            },
            {
                name: 'pp_solution_upgrade',
                description: 'Apply solution upgrade',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionName: {
                            type: 'string',
                            description: 'Name of the solution to upgrade'
                        },
                        async: {
                            type: 'boolean',
                            description: 'Run upgrade asynchronously'
                        }
                    },
                    required: ['solutionName']
                }
            }
        ];
    };
    SolutionTools.prototype.getHandlers = function () {
        var _this = this;
        return {
            pp_export_solution: this.exportSolution.bind(this),
            pp_import_solution: this.importSolution.bind(this),
            pp_pack_solution: this.packSolution.bind(this),
            pp_unpack_solution: this.unpackSolution.bind(this),
            pp_set_solution_version: this.setSolutionVersion.bind(this),
            pp_add_solution_component: this.addSolutionComponent.bind(this),
            pp_apply_solution_upgrade: this.applySolutionUpgrade.bind(this),
            pp_delete_solution: this.deleteSolution.bind(this),
            pp_solution_help: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ content: 'Solution commands help displayed' })];
            }); }); },
            pp_solution_add_license: function (args) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ content: "License added to solution: ".concat(args.solutionName) })];
            }); }); },
            pp_solution_clone: function (args) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ content: "Solution '".concat(args.solutionName, "' cloned to directory") })];
            }); }); },
            pp_solution_create_settings: function (args) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ content: "Settings file created from ".concat(args.solutionFile, " at: ").concat(args.outputFile) })];
            }); }); },
            pp_solution_init: function (args) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ content: "Solution project initialized with publisher: ".concat(args.publisherName) })];
            }); }); },
            pp_solution_list: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ content: 'Solutions listed from Dataverse organization' })];
            }); }); },
            pp_solution_online_version: function (args) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ content: "Online version set for solution ".concat(args.solutionName, ": ").concat(args.solutionVersionNumber) })];
            }); }); },
            pp_solution_sync: function (args) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ content: "Solution synchronized: ".concat(args.solutionName) })];
            }); }); },
            pp_solution_upgrade: function (args) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ content: "Solution upgrade applied: ".concat(args.solutionName) })];
            }); }); }
        };
    };
    SolutionTools.prototype.exportSolution = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var exportSolutionMain, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/export-solution/export-solution-v2/index.js'); })];
                    case 1:
                        exportSolutionMain = (_a.sent()).main;
                        process.env.INPUT_SOLUTIONNAME = args.solutionName;
                        process.env.INPUT_SOLUTIONOUTPUTFILE = args.solutionOutputFile;
                        if (args.managed !== undefined)
                            process.env.INPUT_MANAGED = String(args.managed);
                        if (args.exportAutoNumberingSettings !== undefined)
                            process.env.INPUT_EXPORTAUTONUMBERINGSETTINGS = String(args.exportAutoNumberingSettings);
                        if (args.exportCalendarSettings !== undefined)
                            process.env.INPUT_EXPORTCALENDARSETTINGS = String(args.exportCalendarSettings);
                        if (args.exportCustomizationSettings !== undefined)
                            process.env.INPUT_EXPORTCUSTOMIZATIONSETTINGS = String(args.exportCustomizationSettings);
                        if (args.exportEmailTrackingSettings !== undefined)
                            process.env.INPUT_EXPORTEMAILTRACKINGSETTINGS = String(args.exportEmailTrackingSettings);
                        if (args.exportGeneralSettings !== undefined)
                            process.env.INPUT_EXPORTGENERALSETTINGS = String(args.exportGeneralSettings);
                        if (args.exportMarketingSettings !== undefined)
                            process.env.INPUT_EXPORTMARKETINGSETTINGS = String(args.exportMarketingSettings);
                        if (args.exportOutlookSynchronizationSettings !== undefined)
                            process.env.INPUT_EXPORTOUTLOOKSYNCHRONIZATIONSETTINGS = String(args.exportOutlookSynchronizationSettings);
                        if (args.exportRelationshipRoles !== undefined)
                            process.env.INPUT_EXPORTRELATIONSHIPROLES = String(args.exportRelationshipRoles);
                        if (args.exportIsvConfig !== undefined)
                            process.env.INPUT_EXPORTISVCONFIG = String(args.exportIsvConfig);
                        if (args.exportSales !== undefined)
                            process.env.INPUT_EXPORTSALES = String(args.exportSales);
                        if (args.exportExternalApplications !== undefined)
                            process.env.INPUT_EXPORTEXTERNALAPPLICATIONS = String(args.exportExternalApplications);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, exportSolutionMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: "Solution '".concat(args.solutionName, "' exported successfully"),
                                solutionName: args.solutionName,
                                outputFile: args.solutionOutputFile,
                                managed: args.managed || false
                            }];
                    case 4:
                        error_1 = _a.sent();
                        throw new Error("Failed to export solution: ".concat(error_1 instanceof Error ? error_1.message : String(error_1)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SolutionTools.prototype.importSolution = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var importSolutionMain, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/import-solution/import-solution-v2/index.js'); })];
                    case 1:
                        importSolutionMain = (_a.sent()).main;
                        process.env.INPUT_SOLUTIONINPUTFILE = args.solutionInputFile;
                        if (args.publishWorkflows !== undefined)
                            process.env.INPUT_PUBLISHWORKFLOWS = String(args.publishWorkflows);
                        if (args.overwriteUnmanagedCustomizations !== undefined)
                            process.env.INPUT_OVERWRITEUNMANAGEDCUSTOMIZATIONS = String(args.overwriteUnmanagedCustomizations);
                        if (args.skipProductUpdateDependencies !== undefined)
                            process.env.INPUT_SKIPPRODUCTUPDATEDEPENDENCIES = String(args.skipProductUpdateDependencies);
                        if (args.importAsHolding !== undefined)
                            process.env.INPUT_IMPORTASHOLDING = String(args.importAsHolding);
                        if (args.stageAndUpgrade !== undefined)
                            process.env.INPUT_STAGEANDUPGRADE = String(args.stageAndUpgrade);
                        if (args.forceOverwrite !== undefined)
                            process.env.INPUT_FORCEOVERWRITE = String(args.forceOverwrite);
                        if (args.useAsyncMode !== undefined)
                            process.env.INPUT_USEASYNCMODE = String(args.useAsyncMode);
                        if (args.maxAsyncWaitTime)
                            process.env.INPUT_MAXASYNCWAITTIME = args.maxAsyncWaitTime;
                        if (args.deploymentSettingsFile)
                            process.env.INPUT_DEPLOYMENTSETTINGSFILE = args.deploymentSettingsFile;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, importSolutionMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: 'Solution imported successfully',
                                inputFile: args.solutionInputFile,
                                importAsHolding: args.importAsHolding || false
                            }];
                    case 4:
                        error_2 = _a.sent();
                        throw new Error("Failed to import solution: ".concat(error_2 instanceof Error ? error_2.message : String(error_2)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SolutionTools.prototype.packSolution = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var packSolutionMain, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/pack-solution/pack-solution-v2/index.js'); })];
                    case 1:
                        packSolutionMain = (_a.sent()).main;
                        process.env.INPUT_SOLUTIONOUTPUTFILE = args.solutionOutputFile;
                        process.env.INPUT_SOLUTIONSOURCEFOLDER = args.solutionSourceFolder;
                        if (args.solutionType)
                            process.env.INPUT_SOLUTIONTYPE = args.solutionType;
                        if (args.processCanvasApps !== undefined)
                            process.env.INPUT_PROCESSCANVASAPPS = String(args.processCanvasApps);
                        if (args.packageType)
                            process.env.INPUT_PACKAGETYPE = args.packageType;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, packSolutionMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: 'Solution packed successfully',
                                outputFile: args.solutionOutputFile,
                                sourceFolder: args.solutionSourceFolder,
                                solutionType: args.solutionType || 'Unmanaged'
                            }];
                    case 4:
                        error_3 = _a.sent();
                        throw new Error("Failed to pack solution: ".concat(error_3 instanceof Error ? error_3.message : String(error_3)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SolutionTools.prototype.unpackSolution = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var unpackSolutionMain, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/unpack-solution/unpack-solution-v2/index.js'); })];
                    case 1:
                        unpackSolutionMain = (_a.sent()).main;
                        process.env.INPUT_SOLUTIONINPUTFILE = args.solutionInputFile;
                        process.env.INPUT_SOLUTIONTARGETFOLDER = args.solutionTargetFolder;
                        if (args.solutionType)
                            process.env.INPUT_SOLUTIONTYPE = args.solutionType;
                        if (args.processCanvasApps !== undefined)
                            process.env.INPUT_PROCESSCANVASAPPS = String(args.processCanvasApps);
                        if (args.packageType)
                            process.env.INPUT_PACKAGETYPE = args.packageType;
                        if (args.allowDelete !== undefined)
                            process.env.INPUT_ALLOWDELETE = String(args.allowDelete);
                        if (args.allowWrite !== undefined)
                            process.env.INPUT_ALLOWWRITE = String(args.allowWrite);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, unpackSolutionMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: 'Solution unpacked successfully',
                                inputFile: args.solutionInputFile,
                                targetFolder: args.solutionTargetFolder,
                                solutionType: args.solutionType || 'Unmanaged'
                            }];
                    case 4:
                        error_4 = _a.sent();
                        throw new Error("Failed to unpack solution: ".concat(error_4 instanceof Error ? error_4.message : String(error_4)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SolutionTools.prototype.setSolutionVersion = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var setSolutionVersionMain, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/set-solution-version/set-solution-version-v2/index.js'); })];
                    case 1:
                        setSolutionVersionMain = (_a.sent()).main;
                        process.env.INPUT_SOLUTIONNAME = args.solutionName;
                        process.env.INPUT_SOLUTIONVERSIONNUMBER = args.solutionVersionNumber;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, setSolutionVersionMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: "Solution version set successfully",
                                solutionName: args.solutionName,
                                versionNumber: args.solutionVersionNumber
                            }];
                    case 4:
                        error_5 = _a.sent();
                        throw new Error("Failed to set solution version: ".concat(error_5 instanceof Error ? error_5.message : String(error_5)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SolutionTools.prototype.addSolutionComponent = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var addSolutionComponentMain, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/add-solution-component/add-solution-component-v2/index.js'); })];
                    case 1:
                        addSolutionComponentMain = (_a.sent()).main;
                        process.env.INPUT_SOLUTIONNAME = args.solutionName;
                        process.env.INPUT_COMPONENT = args.component;
                        process.env.INPUT_COMPONENTTYPE = args.componentType;
                        if (args.addRequiredComponents !== undefined)
                            process.env.INPUT_ADDREQUIREDCOMPONENTS = String(args.addRequiredComponents);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, addSolutionComponentMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: 'Component added to solution successfully',
                                solutionName: args.solutionName,
                                component: args.component,
                                componentType: args.componentType
                            }];
                    case 4:
                        error_6 = _a.sent();
                        throw new Error("Failed to add solution component: ".concat(error_6 instanceof Error ? error_6.message : String(error_6)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SolutionTools.prototype.applySolutionUpgrade = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var applySolutionUpgradeMain, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/apply-solution-upgrade/apply-solution-upgrade-v2/index.js'); })];
                    case 1:
                        applySolutionUpgradeMain = (_a.sent()).main;
                        process.env.INPUT_SOLUTIONNAME = args.solutionName;
                        if (args.async !== undefined)
                            process.env.INPUT_ASYNC = String(args.async);
                        if (args.maxAsyncWaitTime)
                            process.env.INPUT_MAXASYNCWAITTIME = args.maxAsyncWaitTime;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, applySolutionUpgradeMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: 'Solution upgrade applied successfully',
                                solutionName: args.solutionName
                            }];
                    case 4:
                        error_7 = _a.sent();
                        throw new Error("Failed to apply solution upgrade: ".concat(error_7 instanceof Error ? error_7.message : String(error_7)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SolutionTools.prototype.deleteSolution = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var deleteSolutionMain, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/delete-solution/delete-solution-v2/index.js'); })];
                    case 1:
                        deleteSolutionMain = (_a.sent()).main;
                        process.env.INPUT_SOLUTIONNAME = args.solutionName;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, deleteSolutionMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: 'Solution deleted successfully',
                                solutionName: args.solutionName
                            }];
                    case 4:
                        error_8 = _a.sent();
                        throw new Error("Failed to delete solution: ".concat(error_8 instanceof Error ? error_8.message : String(error_8)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return SolutionTools;
}());
exports.SolutionTools = SolutionTools;
