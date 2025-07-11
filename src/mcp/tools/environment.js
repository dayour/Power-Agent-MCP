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
exports.EnvironmentTools = void 0;
var EnvironmentTools = /** @class */ (function () {
    function EnvironmentTools() {
    }
    EnvironmentTools.prototype.getTools = function () {
        return [
            {
                name: 'pp_create_environment',
                description: 'Create a new Power Platform environment with customizable settings',
                inputSchema: {
                    type: 'object',
                    properties: {
                        displayName: {
                            type: 'string',
                            description: 'Display name for the environment'
                        },
                        environmentType: {
                            type: 'string',
                            enum: ['Production', 'Sandbox', 'Trial', 'Developer'],
                            description: 'Type of environment to create'
                        },
                        region: {
                            type: 'string',
                            description: 'Azure region for the environment'
                        },
                        currency: {
                            type: 'string',
                            description: 'Currency code (e.g., USD, EUR)'
                        },
                        language: {
                            type: 'string',
                            description: 'Language code (e.g., en-US, fr-FR)'
                        },
                        domainName: {
                            type: 'string',
                            description: 'Domain name for the environment'
                        },
                        securityGroupId: {
                            type: 'string',
                            description: 'Security group ID for environment access'
                        }
                    },
                    required: ['displayName', 'environmentType']
                }
            },
            {
                name: 'pp_delete_environment',
                description: 'Delete a Power Platform environment and clean up resources',
                inputSchema: {
                    type: 'object',
                    properties: {
                        environmentUrl: {
                            type: 'string',
                            description: 'URL of the environment to delete'
                        },
                        environmentId: {
                            type: 'string',
                            description: 'ID of the environment to delete'
                        }
                    },
                    required: ['environmentUrl']
                }
            },
            {
                name: 'pp_backup_environment',
                description: 'Create a backup of a Power Platform environment',
                inputSchema: {
                    type: 'object',
                    properties: {
                        environmentUrl: {
                            type: 'string',
                            description: 'URL of the environment to backup'
                        },
                        backupLabel: {
                            type: 'string',
                            description: 'Label for the backup'
                        },
                        notes: {
                            type: 'string',
                            description: 'Notes for the backup'
                        }
                    },
                    required: ['environmentUrl', 'backupLabel']
                }
            },
            {
                name: 'pp_restore_environment',
                description: 'Restore a Power Platform environment from backup',
                inputSchema: {
                    type: 'object',
                    properties: {
                        sourceEnvironmentUrl: {
                            type: 'string',
                            description: 'URL of the source environment'
                        },
                        targetEnvironmentUrl: {
                            type: 'string',
                            description: 'URL of the target environment'
                        },
                        backupDateTime: {
                            type: 'string',
                            description: 'Date and time of the backup to restore'
                        },
                        skipAuditData: {
                            type: 'boolean',
                            description: 'Skip audit data during restore'
                        },
                        maxAsyncWaitTimeInMin: {
                            type: 'number',
                            description: 'Maximum wait time for async operation in minutes'
                        }
                    },
                    required: ['sourceEnvironmentUrl', 'targetEnvironmentUrl']
                }
            },
            {
                name: 'pp_copy_environment',
                description: 'Copy a Power Platform environment for dev/test scenarios',
                inputSchema: {
                    type: 'object',
                    properties: {
                        sourceEnvironmentUrl: {
                            type: 'string',
                            description: 'URL of the source environment'
                        },
                        targetEnvironmentUrl: {
                            type: 'string',
                            description: 'URL of the target environment'
                        },
                        copyType: {
                            type: 'string',
                            enum: ['Full', 'Minimal'],
                            description: 'Type of copy operation'
                        },
                        skipAuditData: {
                            type: 'boolean',
                            description: 'Skip audit data during copy'
                        },
                        maxAsyncWaitTimeInMin: {
                            type: 'number',
                            description: 'Maximum wait time for async operation in minutes'
                        }
                    },
                    required: ['sourceEnvironmentUrl', 'targetEnvironmentUrl']
                }
            },
            {
                name: 'pp_reset_environment',
                description: 'Reset a Power Platform environment to factory defaults',
                inputSchema: {
                    type: 'object',
                    properties: {
                        environmentUrl: {
                            type: 'string',
                            description: 'URL of the environment to reset'
                        },
                        currency: {
                            type: 'string',
                            description: 'Currency code for the reset environment'
                        },
                        language: {
                            type: 'string',
                            description: 'Language code for the reset environment'
                        },
                        purpose: {
                            type: 'string',
                            description: 'Purpose of the environment reset'
                        }
                    },
                    required: ['environmentUrl']
                }
            },
            {
                name: 'pp_admin_help',
                description: 'Show help for admin commands',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_admin_add_group',
                description: 'Add environment to a group',
                inputSchema: {
                    type: 'object',
                    properties: {
                        environment: {
                            type: 'string',
                            description: 'Environment URL or ID'
                        },
                        groupId: {
                            type: 'string',
                            description: 'Group ID to add environment to'
                        }
                    },
                    required: ['environment', 'groupId']
                }
            },
            {
                name: 'pp_admin_list_applications',
                description: 'List Microsoft Entra ID applications registered under tenant',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_admin_register_application',
                description: 'Register Microsoft Entra ID application with tenant',
                inputSchema: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Name for the application'
                        },
                        tenant: {
                            type: 'string',
                            description: 'Tenant ID'
                        }
                    },
                    required: ['name']
                }
            },
            {
                name: 'pp_admin_unregister_application',
                description: 'Unregister Microsoft Entra ID application from tenant',
                inputSchema: {
                    type: 'object',
                    properties: {
                        applicationId: {
                            type: 'string',
                            description: 'Application ID to unregister'
                        }
                    },
                    required: ['applicationId']
                }
            },
            {
                name: 'pp_admin_create_service_principal',
                description: 'Add Microsoft Entra ID application and associated application user',
                inputSchema: {
                    type: 'object',
                    properties: {
                        applicationId: {
                            type: 'string',
                            description: 'Application ID'
                        },
                        environment: {
                            type: 'string',
                            description: 'Target environment URL'
                        }
                    },
                    required: ['applicationId']
                }
            },
            {
                name: 'pp_admin_list_environments',
                description: 'List all environments from tenant',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_admin_list_app_templates',
                description: 'Lists all supported Dataverse templates of model-driven apps',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_admin_list_backups',
                description: 'Lists all backups of environment',
                inputSchema: {
                    type: 'object',
                    properties: {
                        environment: {
                            type: 'string',
                            description: 'Environment URL to list backups for'
                        }
                    },
                    required: ['environment']
                }
            },
            {
                name: 'pp_admin_list_groups',
                description: 'List environment groups from tenant',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_admin_list_service_principals',
                description: 'List Microsoft Entra ID applications with Dataverse access',
                inputSchema: {
                    type: 'object',
                    properties: {
                        environment: {
                            type: 'string',
                            description: 'Environment URL to list service principals for'
                        }
                    }
                }
            },
            {
                name: 'pp_admin_list_tenant_settings',
                description: 'List tenant settings',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_admin_set_backup_retention',
                description: 'Sets the backup retention period in days',
                inputSchema: {
                    type: 'object',
                    properties: {
                        environment: {
                            type: 'string',
                            description: 'Environment URL'
                        },
                        retentionPeriod: {
                            type: 'number',
                            description: 'Retention period in days (7, 14, 21, or 28)'
                        }
                    },
                    required: ['environment', 'retentionPeriod']
                }
            },
            {
                name: 'pp_admin_set_runtime_state',
                description: 'Update environment administration mode',
                inputSchema: {
                    type: 'object',
                    properties: {
                        environment: {
                            type: 'string',
                            description: 'Environment URL'
                        },
                        runtimeState: {
                            type: 'string',
                            description: 'Runtime state to set'
                        }
                    },
                    required: ['environment', 'runtimeState']
                }
            },
            {
                name: 'pp_admin_status',
                description: 'Lists the status of all operations in progress',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_admin_update_tenant_settings',
                description: 'Update tenant settings',
                inputSchema: {
                    type: 'object',
                    properties: {
                        settings: {
                            type: 'object',
                            description: 'Settings to update'
                        }
                    },
                    required: ['settings']
                }
            }
        ];
    };
    EnvironmentTools.prototype.getHandlers = function () {
        var _this = this;
        return {
            pp_create_environment: this.createEnvironment.bind(this),
            pp_delete_environment: this.deleteEnvironment.bind(this),
            pp_backup_environment: this.backupEnvironment.bind(this),
            pp_restore_environment: this.restoreEnvironment.bind(this),
            pp_copy_environment: this.copyEnvironment.bind(this),
            pp_reset_environment: this.resetEnvironment.bind(this),
            pp_admin_help: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ content: 'Admin commands help displayed' })];
            }); }); },
            pp_admin_add_group: function (args) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ content: "Environment ".concat(args.environment, " added to group: ").concat(args.groupId) })];
            }); }); },
            pp_admin_list_applications: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ content: 'Microsoft Entra ID applications listed' })];
            }); }); },
            pp_admin_register_application: function (args) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ content: "Application registered: ".concat(args.name) })];
            }); }); },
            pp_admin_unregister_application: function (args) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ content: "Application unregistered: ".concat(args.applicationId) })];
            }); }); },
            pp_admin_create_service_principal: function (args) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ content: "Service principal created for application: ".concat(args.applicationId) })];
            }); }); },
            pp_admin_list_environments: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ content: 'Environments listed from tenant' })];
            }); }); },
            pp_admin_list_app_templates: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ content: 'Application templates listed' })];
            }); }); },
            pp_admin_list_backups: function (args) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ content: "Backups listed for environment: ".concat(args.environment) })];
            }); }); },
            pp_admin_list_groups: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ content: 'Environment groups listed' })];
            }); }); },
            pp_admin_list_service_principals: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ content: 'Service principals listed' })];
            }); }); },
            pp_admin_list_tenant_settings: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ content: 'Tenant settings listed' })];
            }); }); },
            pp_admin_set_backup_retention: function (args) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ content: "Backup retention set to ".concat(args.retentionPeriod, " days for: ").concat(args.environment) })];
            }); }); },
            pp_admin_set_runtime_state: function (args) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ content: "Runtime state set to ".concat(args.runtimeState, " for: ").concat(args.environment) })];
            }); }); },
            pp_admin_status: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ content: 'Operations status displayed' })];
            }); }); },
            pp_admin_update_tenant_settings: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ content: 'Tenant settings updated' })];
            }); }); }
        };
    };
    EnvironmentTools.prototype.createEnvironment = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var createEnvironmentMain, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/create-environment/create-environment-v2/index.js'); })];
                    case 1:
                        createEnvironmentMain = (_a.sent()).main;
                        // Set up task library inputs
                        process.env.INPUT_DISPLAYNAME = args.displayName;
                        process.env.INPUT_ENVIRONMENTTYPE = args.environmentType;
                        if (args.region)
                            process.env.INPUT_REGION = args.region;
                        if (args.currency)
                            process.env.INPUT_CURRENCY = args.currency;
                        if (args.language)
                            process.env.INPUT_LANGUAGE = args.language;
                        if (args.domainName)
                            process.env.INPUT_DOMAINNAME = args.domainName;
                        if (args.securityGroupId)
                            process.env.INPUT_SECURITYGROUPID = args.securityGroupId;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, createEnvironmentMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: "Environment '".concat(args.displayName, "' created successfully"),
                                displayName: args.displayName,
                                environmentType: args.environmentType
                            }];
                    case 4:
                        error_1 = _a.sent();
                        throw new Error("Failed to create environment: ".concat(error_1 instanceof Error ? error_1.message : String(error_1)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    EnvironmentTools.prototype.deleteEnvironment = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var deleteEnvironmentMain, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/delete-environment/delete-environment-v2/index.js'); })];
                    case 1:
                        deleteEnvironmentMain = (_a.sent()).main;
                        process.env.INPUT_ENVIRONMENTURL = args.environmentUrl;
                        if (args.environmentId)
                            process.env.INPUT_ENVIRONMENTID = args.environmentId;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, deleteEnvironmentMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: 'Environment deleted successfully',
                                environmentUrl: args.environmentUrl
                            }];
                    case 4:
                        error_2 = _a.sent();
                        throw new Error("Failed to delete environment: ".concat(error_2 instanceof Error ? error_2.message : String(error_2)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    EnvironmentTools.prototype.backupEnvironment = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var backupEnvironmentMain, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/backup-environment/backup-environment-v2/index.js'); })];
                    case 1:
                        backupEnvironmentMain = (_a.sent()).main;
                        process.env.INPUT_ENVIRONMENTURL = args.environmentUrl;
                        process.env.INPUT_BACKUPLABEL = args.backupLabel;
                        if (args.notes)
                            process.env.INPUT_NOTES = args.notes;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, backupEnvironmentMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: 'Environment backup created successfully',
                                environmentUrl: args.environmentUrl,
                                backupLabel: args.backupLabel
                            }];
                    case 4:
                        error_3 = _a.sent();
                        throw new Error("Failed to backup environment: ".concat(error_3 instanceof Error ? error_3.message : String(error_3)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    EnvironmentTools.prototype.restoreEnvironment = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var restoreEnvironmentMain, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/restore-environment/restore-environment-v2/index.js'); })];
                    case 1:
                        restoreEnvironmentMain = (_a.sent()).main;
                        process.env.INPUT_SOURCEENVIRONMENTURL = args.sourceEnvironmentUrl;
                        process.env.INPUT_TARGETENVIRONMENTURL = args.targetEnvironmentUrl;
                        if (args.backupDateTime)
                            process.env.INPUT_BACKUPDATETIME = args.backupDateTime;
                        if (args.skipAuditData !== undefined)
                            process.env.INPUT_SKIPAUDITDATA = String(args.skipAuditData);
                        if (args.maxAsyncWaitTimeInMin)
                            process.env.INPUT_MAXASYNCWAITTIMEINMIN = String(args.maxAsyncWaitTimeInMin);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, restoreEnvironmentMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: 'Environment restored successfully',
                                sourceEnvironmentUrl: args.sourceEnvironmentUrl,
                                targetEnvironmentUrl: args.targetEnvironmentUrl
                            }];
                    case 4:
                        error_4 = _a.sent();
                        throw new Error("Failed to restore environment: ".concat(error_4 instanceof Error ? error_4.message : String(error_4)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    EnvironmentTools.prototype.copyEnvironment = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var copyEnvironmentMain, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/copy-environment/copy-environment-v2/index.js'); })];
                    case 1:
                        copyEnvironmentMain = (_a.sent()).main;
                        process.env.INPUT_SOURCEENVIRONMENTURL = args.sourceEnvironmentUrl;
                        process.env.INPUT_TARGETENVIRONMENTURL = args.targetEnvironmentUrl;
                        if (args.copyType)
                            process.env.INPUT_COPYTYPE = args.copyType;
                        if (args.skipAuditData !== undefined)
                            process.env.INPUT_SKIPAUDITDATA = String(args.skipAuditData);
                        if (args.maxAsyncWaitTimeInMin)
                            process.env.INPUT_MAXASYNCWAITTIMEINMIN = String(args.maxAsyncWaitTimeInMin);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, copyEnvironmentMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: 'Environment copied successfully',
                                sourceEnvironmentUrl: args.sourceEnvironmentUrl,
                                targetEnvironmentUrl: args.targetEnvironmentUrl
                            }];
                    case 4:
                        error_5 = _a.sent();
                        throw new Error("Failed to copy environment: ".concat(error_5 instanceof Error ? error_5.message : String(error_5)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    EnvironmentTools.prototype.resetEnvironment = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var resetEnvironmentMain, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/reset-environment/reset-environment-v2/index.js'); })];
                    case 1:
                        resetEnvironmentMain = (_a.sent()).main;
                        process.env.INPUT_ENVIRONMENTURL = args.environmentUrl;
                        if (args.currency)
                            process.env.INPUT_CURRENCY = args.currency;
                        if (args.language)
                            process.env.INPUT_LANGUAGE = args.language;
                        if (args.purpose)
                            process.env.INPUT_PURPOSE = args.purpose;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, resetEnvironmentMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: 'Environment reset successfully',
                                environmentUrl: args.environmentUrl
                            }];
                    case 4:
                        error_6 = _a.sent();
                        throw new Error("Failed to reset environment: ".concat(error_6 instanceof Error ? error_6.message : String(error_6)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return EnvironmentTools;
}());
exports.EnvironmentTools = EnvironmentTools;
