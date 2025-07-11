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
exports.SecurityTools = void 0;
var SecurityTools = /** @class */ (function () {
    function SecurityTools() {
    }
    SecurityTools.prototype.getTools = function () {
        return [
            {
                name: 'pp_assign_user',
                description: 'Assign user roles and manage permissions',
                inputSchema: {
                    type: 'object',
                    properties: {
                        user: {
                            type: 'string',
                            description: 'User identifier (email or ID)'
                        },
                        role: {
                            type: 'string',
                            description: 'Security role to assign'
                        },
                        businessUnit: {
                            type: 'string',
                            description: 'Business unit for the user'
                        },
                        applicationUser: {
                            type: 'boolean',
                            description: 'Whether this is an application user'
                        }
                    },
                    required: ['user', 'role']
                }
            },
            {
                name: 'pp_assign_group',
                description: 'Manage group-based access control and team management',
                inputSchema: {
                    type: 'object',
                    properties: {
                        aadGroupId: {
                            type: 'string',
                            description: 'Azure AD group ID'
                        },
                        aadGroupName: {
                            type: 'string',
                            description: 'Azure AD group name'
                        },
                        dataverseTeamType: {
                            type: 'string',
                            enum: ['AadSecurityGroup', 'AadOfficeGroup'],
                            description: 'Type of Dataverse team'
                        },
                        membershipType: {
                            type: 'string',
                            enum: ['Members', 'Owners', 'MembersAndGuests'],
                            description: 'Group membership type'
                        },
                        teamName: {
                            type: 'string',
                            description: 'Name for the Dataverse team'
                        },
                        role: {
                            type: 'string',
                            description: 'Security role to assign to the group'
                        },
                        businessUnit: {
                            type: 'string',
                            description: 'Business unit for the team'
                        }
                    },
                    required: ['aadGroupId', 'dataverseTeamType', 'teamName', 'role']
                }
            }
        ];
    };
    SecurityTools.prototype.getHandlers = function () {
        return {
            pp_assign_user: this.assignUser.bind(this),
            pp_assign_group: this.assignGroup.bind(this)
        };
    };
    SecurityTools.prototype.assignUser = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var assignUserMain, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/assign-user/assign-user-v2/index.js'); })];
                    case 1:
                        assignUserMain = (_a.sent()).main;
                        process.env.INPUT_USER = args.user;
                        process.env.INPUT_ROLE = args.role;
                        if (args.businessUnit)
                            process.env.INPUT_BUSINESSUNIT = args.businessUnit;
                        if (args.applicationUser !== undefined)
                            process.env.INPUT_APPLICATIONUSER = String(args.applicationUser);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, assignUserMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: 'User role assigned successfully',
                                user: args.user,
                                role: args.role
                            }];
                    case 4:
                        error_1 = _a.sent();
                        throw new Error("Failed to assign user: ".concat(error_1 instanceof Error ? error_1.message : String(error_1)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SecurityTools.prototype.assignGroup = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var assignGroupMain, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../tasks/assign-group/assign-group-v2/index.js'); })];
                    case 1:
                        assignGroupMain = (_a.sent()).main;
                        process.env.INPUT_AADGROUPID = args.aadGroupId;
                        if (args.aadGroupName)
                            process.env.INPUT_AADGROUPNAME = args.aadGroupName;
                        process.env.INPUT_DATAVERSETEAMTYPE = args.dataverseTeamType;
                        if (args.membershipType)
                            process.env.INPUT_MEMBERSHIPTYPE = args.membershipType;
                        process.env.INPUT_TEAMNAME = args.teamName;
                        process.env.INPUT_ROLE = args.role;
                        if (args.businessUnit)
                            process.env.INPUT_BUSINESSUNIT = args.businessUnit;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, assignGroupMain()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: 'Group assigned successfully',
                                aadGroupId: args.aadGroupId,
                                teamName: args.teamName,
                                role: args.role
                            }];
                    case 4:
                        error_2 = _a.sent();
                        throw new Error("Failed to assign group: ".concat(error_2 instanceof Error ? error_2.message : String(error_2)));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return SecurityTools;
}());
exports.SecurityTools = SecurityTools;
