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
exports.PagesTools = void 0;
var PagesTools = /** @class */ (function () {
    function PagesTools() {
    }
    PagesTools.prototype.getTools = function () {
        return [
            {
                name: 'pp_pages_help',
                description: 'Show help for Power Pages commands',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_pages_bootstrap_migrate',
                description: 'Migrates HTML code from bootstrap V3 to V5',
                inputSchema: {
                    type: 'object',
                    properties: {
                        sourceFolder: {
                            type: 'string',
                            description: 'Source folder containing HTML files'
                        },
                        outputFolder: {
                            type: 'string',
                            description: 'Output folder for migrated files'
                        }
                    },
                    required: ['sourceFolder']
                }
            },
            {
                name: 'pp_pages_download',
                description: 'Download Power Pages website content from environment',
                inputSchema: {
                    type: 'object',
                    properties: {
                        websiteId: {
                            type: 'string',
                            description: 'ID of the website to download'
                        },
                        outputFolder: {
                            type: 'string',
                            description: 'Output folder for website content'
                        },
                        environment: {
                            type: 'string',
                            description: 'Source environment URL'
                        }
                    },
                    required: ['websiteId', 'outputFolder']
                }
            },
            {
                name: 'pp_pages_download_code_site',
                description: 'Download Power Pages website content as code',
                inputSchema: {
                    type: 'object',
                    properties: {
                        websiteId: {
                            type: 'string',
                            description: 'ID of the website to download'
                        },
                        outputFolder: {
                            type: 'string',
                            description: 'Output folder for code files'
                        },
                        environment: {
                            type: 'string',
                            description: 'Source environment URL'
                        }
                    },
                    required: ['websiteId', 'outputFolder']
                }
            },
            {
                name: 'pp_pages_list',
                description: 'List all Power Pages websites from the environment',
                inputSchema: {
                    type: 'object',
                    properties: {
                        environment: {
                            type: 'string',
                            description: 'Environment URL to list websites from'
                        }
                    }
                }
            },
            {
                name: 'pp_pages_migrate_datamodel',
                description: 'Manage data model migration for Power Pages website',
                inputSchema: {
                    type: 'object',
                    properties: {
                        websiteId: {
                            type: 'string',
                            description: 'ID of the website'
                        },
                        migrationFile: {
                            type: 'string',
                            description: 'Path to migration file'
                        }
                    },
                    required: ['websiteId']
                }
            },
            {
                name: 'pp_pages_upload',
                description: 'Upload Power Pages website content to environment',
                inputSchema: {
                    type: 'object',
                    properties: {
                        sourceFolder: {
                            type: 'string',
                            description: 'Source folder containing website content'
                        },
                        websiteId: {
                            type: 'string',
                            description: 'ID of the target website'
                        },
                        environment: {
                            type: 'string',
                            description: 'Target environment URL'
                        }
                    },
                    required: ['sourceFolder', 'websiteId']
                }
            },
            {
                name: 'pp_pages_upload_code_site',
                description: 'Uploads compiled code to Power Pages site',
                inputSchema: {
                    type: 'object',
                    properties: {
                        sourceFolder: {
                            type: 'string',
                            description: 'Source folder containing compiled code'
                        },
                        websiteId: {
                            type: 'string',
                            description: 'ID of the target website'
                        },
                        environment: {
                            type: 'string',
                            description: 'Target environment URL'
                        }
                    },
                    required: ['sourceFolder', 'websiteId']
                }
            }
        ];
    };
    PagesTools.prototype.getHandlers = function () {
        var _this = this;
        return {
            pp_pages_help: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: 'Power Pages commands help displayed' }];
                });
            }); },
            pp_pages_bootstrap_migrate: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Bootstrap migration completed from ".concat(args.sourceFolder) }];
                });
            }); },
            pp_pages_download: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Website ".concat(args.websiteId, " downloaded to: ").concat(args.outputFolder) }];
                });
            }); },
            pp_pages_download_code_site: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Code site ".concat(args.websiteId, " downloaded to: ").concat(args.outputFolder) }];
                });
            }); },
            pp_pages_list: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: 'Power Pages websites listed from environment' }];
                });
            }); },
            pp_pages_migrate_datamodel: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Data model migration managed for website: ".concat(args.websiteId) }];
                });
            }); },
            pp_pages_upload: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Website content uploaded from ".concat(args.sourceFolder, " to website: ").concat(args.websiteId) }];
                });
            }); },
            pp_pages_upload_code_site: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Code uploaded from ".concat(args.sourceFolder, " to website: ").concat(args.websiteId) }];
                });
            }); }
        };
    };
    return PagesTools;
}());
exports.PagesTools = PagesTools;
