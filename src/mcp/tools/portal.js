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
exports.PortalTools = void 0;
var PortalTools = /** @class */ (function () {
    function PortalTools() {
    }
    PortalTools.prototype.getTools = function () {
        return [
            {
                name: 'pp_download_portal',
                description: 'Download Power Apps portal for backup and source control',
                inputSchema: {
                    type: 'object',
                    properties: {
                        websiteId: {
                            type: 'string',
                            description: 'ID of the portal website to download'
                        },
                        path: {
                            type: 'string',
                            description: 'Path where portal files will be downloaded'
                        },
                        overwriteFiles: {
                            type: 'boolean',
                            description: 'Overwrite existing files during download'
                        },
                        excludeEntities: {
                            type: 'string',
                            description: 'Comma-separated list of entities to exclude'
                        }
                    },
                    required: ['websiteId', 'path']
                }
            },
            {
                name: 'pp_upload_portal',
                description: 'Upload and deploy Power Apps portal configuration',
                inputSchema: {
                    type: 'object',
                    properties: {
                        path: {
                            type: 'string',
                            description: 'Path to portal files to upload'
                        },
                        deploymentProfile: {
                            type: 'string',
                            description: 'Deployment profile to use'
                        },
                        modelVersion: {
                            type: 'string',
                            description: 'Portal model version'
                        },
                        excludeEntities: {
                            type: 'string',
                            description: 'Comma-separated list of entities to exclude'
                        }
                    },
                    required: ['path']
                }
            }
        ];
    };
    PortalTools.prototype.getHandlers = function () {
        return {
            pp_download_portal: this.downloadPortal.bind(this),
            pp_upload_portal: this.uploadPortal.bind(this)
        };
    };
    PortalTools.prototype.downloadPortal = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var downloadPortalMain, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/download-paportal/download-paportal-v2/index.js'); })];
                    case 1:
                        downloadPortalMain = (_a.sent()).main;
                        process.env.INPUT_WEBSITEID = args.websiteId;
                        process.env.INPUT_PATH = args.path;
                        if (args.overwriteFiles !== undefined)
                            process.env.INPUT_OVERWRITEFILES = String(args.overwriteFiles);
                        if (args.excludeEntities)
                            process.env.INPUT_EXCLUDEENTITIES = args.excludeEntities;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, downloadPortalMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: 'Portal downloaded successfully',
                                websiteId: args.websiteId,
                                path: args.path
                            }];
                    case 4:
                        error_1 = _a.sent();
                        throw new Error("Failed to download portal: ".concat(error_1 instanceof Error ? error_1.message : String(error_1)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PortalTools.prototype.uploadPortal = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var uploadPortalMain, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/upload-paportal/upload-paportal-v2/index.js'); })];
                    case 1:
                        uploadPortalMain = (_a.sent()).main;
                        process.env.INPUT_PATH = args.path;
                        if (args.deploymentProfile)
                            process.env.INPUT_DEPLOYMENTPROFILE = args.deploymentProfile;
                        if (args.modelVersion)
                            process.env.INPUT_MODELVERSION = args.modelVersion;
                        if (args.excludeEntities)
                            process.env.INPUT_EXCLUDEENTITIES = args.excludeEntities;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, uploadPortalMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: 'Portal uploaded successfully',
                                path: args.path
                            }];
                    case 4:
                        error_2 = _a.sent();
                        throw new Error("Failed to upload portal: ".concat(error_2 instanceof Error ? error_2.message : String(error_2)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return PortalTools;
}());
exports.PortalTools = PortalTools;
