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
exports.ApplicationTools = void 0;
var ApplicationTools = /** @class */ (function () {
    function ApplicationTools() {
    }
    ApplicationTools.prototype.getTools = function () {
        return [
            {
                name: 'pp_application_help',
                description: 'Show help for application commands',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_install_application',
                description: 'Install applications from catalog or AppSource',
                inputSchema: {
                    type: 'object',
                    properties: {
                        applicationName: {
                            type: 'string',
                            description: 'Name of the application to install'
                        },
                        applicationId: {
                            type: 'string',
                            description: 'ID of the application to install'
                        },
                        targetEnvironment: {
                            type: 'string',
                            description: 'Target environment for installation'
                        }
                    },
                    required: ['applicationName']
                }
            },
            {
                name: 'pp_application_list',
                description: 'List available Dataverse applications from AppSource',
                inputSchema: {
                    type: 'object',
                    properties: {
                        environment: {
                            type: 'string',
                            description: 'Target environment URL'
                        }
                    }
                }
            },
            {
                name: 'pp_deploy_package',
                description: 'Deploy packages with settings management',
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
                        },
                        useDeploymentSettingsFile: {
                            type: 'boolean',
                            description: 'Use deployment settings file'
                        },
                        deploymentSettingsFile: {
                            type: 'string',
                            description: 'Path to deployment settings file'
                        },
                        packageRuntimeSettingsFile: {
                            type: 'string',
                            description: 'Path to package runtime settings file'
                        }
                    },
                    required: ['packageFile']
                }
            },
            {
                name: 'pp_install_catalog',
                description: 'Install catalog applications',
                inputSchema: {
                    type: 'object',
                    properties: {
                        catalogItemId: {
                            type: 'string',
                            description: 'ID of the catalog item to install'
                        },
                        targetEnvironment: {
                            type: 'string',
                            description: 'Target environment for installation'
                        },
                        targetVersion: {
                            type: 'string',
                            description: 'Target version to install'
                        }
                    },
                    required: ['catalogItemId']
                }
            },
            {
                name: 'pp_submit_catalog',
                description: 'Submit applications to catalog',
                inputSchema: {
                    type: 'object',
                    properties: {
                        catalogSubmissionFile: {
                            type: 'string',
                            description: 'Path to catalog submission file'
                        },
                        packageSolutionZipFile: {
                            type: 'string',
                            description: 'Path to package solution zip file'
                        },
                        packageZipFile: {
                            type: 'string',
                            description: 'Path to package zip file'
                        },
                        solutionZipFile: {
                            type: 'string',
                            description: 'Path to solution zip file'
                        },
                        pollStatus: {
                            type: 'boolean',
                            description: 'Poll submission status'
                        }
                    },
                    required: ['catalogSubmissionFile']
                }
            }
        ];
    };
    ApplicationTools.prototype.getHandlers = function () {
        return {
            pp_install_application: this.installApplication.bind(this),
            pp_deploy_package: this.deployPackage.bind(this),
            pp_install_catalog: this.installCatalog.bind(this),
            pp_submit_catalog: this.submitCatalog.bind(this)
        };
    };
    ApplicationTools.prototype.installApplication = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var installApplicationMain, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/install-application/install-application-v2/index.js'); })];
                    case 1:
                        installApplicationMain = (_a.sent()).main;
                        process.env.INPUT_APPLICATIONNAME = args.applicationName;
                        if (args.applicationId)
                            process.env.INPUT_APPLICATIONID = args.applicationId;
                        if (args.targetEnvironment)
                            process.env.INPUT_TARGETENVIRONMENT = args.targetEnvironment;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, installApplicationMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: 'Application installed successfully',
                                applicationName: args.applicationName
                            }];
                    case 4:
                        error_1 = _a.sent();
                        throw new Error("Failed to install application: ".concat(error_1 instanceof Error ? error_1.message : String(error_1)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ApplicationTools.prototype.deployPackage = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var deployPackageMain, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/deploy-package/deploy-package-v2/index.js'); })];
                    case 1:
                        deployPackageMain = (_a.sent()).main;
                        process.env.INPUT_PACKAGEFILE = args.packageFile;
                        if (args.packageName)
                            process.env.INPUT_PACKAGENAME = args.packageName;
                        if (args.useDeploymentSettingsFile !== undefined)
                            process.env.INPUT_USEDEPLOYMENTSETTINGSFILE = String(args.useDeploymentSettingsFile);
                        if (args.deploymentSettingsFile)
                            process.env.INPUT_DEPLOYMENTSETTINGSFILE = args.deploymentSettingsFile;
                        if (args.packageRuntimeSettingsFile)
                            process.env.INPUT_PACKAGERUNTIMESETTINGSFILE = args.packageRuntimeSettingsFile;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, deployPackageMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: 'Package deployed successfully',
                                packageFile: args.packageFile
                            }];
                    case 4:
                        error_2 = _a.sent();
                        throw new Error("Failed to deploy package: ".concat(error_2 instanceof Error ? error_2.message : String(error_2)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ApplicationTools.prototype.installCatalog = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var installCatalogMain, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/install-catalog/install-catalog-v2/index.js'); })];
                    case 1:
                        installCatalogMain = (_a.sent()).main;
                        process.env.INPUT_CATALOGITEMID = args.catalogItemId;
                        if (args.targetEnvironment)
                            process.env.INPUT_TARGETENVIRONMENT = args.targetEnvironment;
                        if (args.targetVersion)
                            process.env.INPUT_TARGETVERSION = args.targetVersion;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, installCatalogMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: 'Catalog item installed successfully',
                                catalogItemId: args.catalogItemId
                            }];
                    case 4:
                        error_3 = _a.sent();
                        throw new Error("Failed to install catalog item: ".concat(error_3 instanceof Error ? error_3.message : String(error_3)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ApplicationTools.prototype.submitCatalog = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var submitCatalogMain, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/submit-catalog/submit-catalog-v2/index.js'); })];
                    case 1:
                        submitCatalogMain = (_a.sent()).main;
                        process.env.INPUT_CATALOGSUBMISSIONFILE = args.catalogSubmissionFile;
                        if (args.packageSolutionZipFile)
                            process.env.INPUT_PACKAGESOLUTIONZIPFILE = args.packageSolutionZipFile;
                        if (args.packageZipFile)
                            process.env.INPUT_PACKAGEZIPFILE = args.packageZipFile;
                        if (args.solutionZipFile)
                            process.env.INPUT_SOLUTIONZIPFILE = args.solutionZipFile;
                        if (args.pollStatus !== undefined)
                            process.env.INPUT_POLLSTATUS = String(args.pollStatus);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, submitCatalogMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: 'Catalog submission completed',
                                catalogSubmissionFile: args.catalogSubmissionFile
                            }];
                    case 4:
                        error_4 = _a.sent();
                        throw new Error("Failed to submit to catalog: ".concat(error_4 instanceof Error ? error_4.message : String(error_4)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return ApplicationTools;
}());
exports.ApplicationTools = ApplicationTools;
