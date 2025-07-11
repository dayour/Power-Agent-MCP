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
exports.AuthTools = void 0;
var AuthTools = /** @class */ (function () {
    function AuthTools() {
    }
    AuthTools.prototype.getTools = function () {
        return [
            {
                name: 'pp_auth_help',
                description: 'Show help for authentication commands',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_auth_clear',
                description: 'Clear all authentication profiles stored on this computer',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_auth_create',
                description: 'Create and store authentication profiles on this computer',
                inputSchema: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Name for the authentication profile'
                        },
                        url: {
                            type: 'string',
                            description: 'URL of the environment'
                        },
                        applicationId: {
                            type: 'string',
                            description: 'Azure AD application ID'
                        },
                        clientSecret: {
                            type: 'string',
                            description: 'Azure AD application secret'
                        },
                        tenant: {
                            type: 'string',
                            description: 'Azure AD tenant ID'
                        },
                        username: {
                            type: 'string',
                            description: 'Username for authentication'
                        },
                        password: {
                            type: 'string',
                            description: 'Password for authentication'
                        }
                    }
                }
            },
            {
                name: 'pp_auth_delete',
                description: 'Delete a particular authentication profile',
                inputSchema: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Name of the authentication profile to delete'
                        },
                        index: {
                            type: 'number',
                            description: 'Index of the authentication profile to delete'
                        }
                    }
                }
            },
            {
                name: 'pp_auth_list',
                description: 'List the authentication profiles stored on this computer',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_auth_name',
                description: 'Name or rename an existing authentication profile',
                inputSchema: {
                    type: 'object',
                    properties: {
                        index: {
                            type: 'number',
                            description: 'Index of the authentication profile to rename'
                        },
                        name: {
                            type: 'string',
                            description: 'New name for the authentication profile'
                        }
                    },
                    required: ['index', 'name']
                }
            },
            {
                name: 'pp_auth_select',
                description: 'Select which authentication profile should be active',
                inputSchema: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Name of the authentication profile to select'
                        },
                        index: {
                            type: 'number',
                            description: 'Index of the authentication profile to select'
                        }
                    }
                }
            },
            {
                name: 'pp_auth_update',
                description: 'Update name or target environment of an existing authentication profile',
                inputSchema: {
                    type: 'object',
                    properties: {
                        index: {
                            type: 'number',
                            description: 'Index of the authentication profile to update'
                        },
                        name: {
                            type: 'string',
                            description: 'New name for the authentication profile'
                        },
                        url: {
                            type: 'string',
                            description: 'New environment URL'
                        }
                    },
                    required: ['index']
                }
            }
        ];
    };
    AuthTools.prototype.getHandlers = function () {
        var _this = this;
        return {
            pp_auth_help: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: 'Authentication commands help displayed' }];
                });
            }); },
            pp_auth_clear: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: 'All authentication profiles cleared' }];
                });
            }); },
            pp_auth_create: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Authentication profile created with name: ".concat(args.name) }];
                });
            }); },
            pp_auth_delete: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Authentication profile deleted: ".concat(args.name || args.index) }];
                });
            }); },
            pp_auth_list: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: 'Authentication profiles listed' }];
                });
            }); },
            pp_auth_name: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Authentication profile renamed to: ".concat(args.name) }];
                });
            }); },
            pp_auth_select: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Authentication profile selected: ".concat(args.name || args.index) }];
                });
            }); },
            pp_auth_update: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Authentication profile updated: ".concat(args.index) }];
                });
            }); }
        };
    };
    return AuthTools;
}());
exports.AuthTools = AuthTools;
