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
var index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
var stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
var types_js_1 = require("@modelcontextprotocol/sdk/types.js");
// Import Power Platform task handlers
var handler_js_1 = require("./tools/handler.js");
var vscode_hierarchy_js_1 = require("./tools/vscode-hierarchy.js");
var PowerPlatformMCPServer = /** @class */ (function () {
    function PowerPlatformMCPServer() {
        var _this = this;
        this.server = new index_js_1.Server({
            name: 'power-platform-build-tools',
            version: '1.0.0',
        }, {
            capabilities: {
                tools: {},
            },
        });
        // Check if running in VSCode mode (environment variable or detect based on usage)
        var mcpMode = process.env.POWERPLATFORM_MCP_MODE || 'full';
        if (mcpMode === 'vscode' || mcpMode === 'hierarchical') {
            // Use hierarchical tools for VSCode compatibility (10 parent tools)
            var fullHandler = new handler_js_1.PowerPlatformToolHandler();
            var vsCodeTools_1 = new vscode_hierarchy_js_1.VSCodeHierarchicalTools(fullHandler);
            this.toolProvider = {
                getAllTools: function () { return vsCodeTools_1.getParentTools(); },
                callTool: function (name, args) { return __awaiter(_this, void 0, void 0, function () {
                    var handlers, handler;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                handlers = vsCodeTools_1.getHandlers();
                                handler = handlers[name];
                                if (!handler) {
                                    throw new Error("Unknown tool: ".concat(name));
                                }
                                return [4 /*yield*/, handler(args)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); }
            };
        }
        else {
            // Use full tool exposure for Claude and other MCP clients (229 tools)
            this.toolProvider = new handler_js_1.PowerPlatformToolHandler();
        }
        this.setupToolHandlers();
    }
    PowerPlatformMCPServer.prototype.setupToolHandlers = function () {
        var _this = this;
        // Handle tool listing
        this.server.setRequestHandler(types_js_1.ListToolsRequestSchema, function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        tools: this.toolProvider.getAllTools(),
                    }];
            });
        }); });
        // Handle tool calls
        this.server.setRequestHandler(types_js_1.CallToolRequestSchema, function (request) { return __awaiter(_this, void 0, void 0, function () {
            var _a, name, args, result, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.params, name = _a.name, args = _a.arguments;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.toolProvider.callTool(name, args || {})];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, {
                                content: [
                                    {
                                        type: 'text',
                                        text: JSON.stringify(result, null, 2),
                                    },
                                ],
                            }];
                    case 3:
                        error_1 = _b.sent();
                        if (error_1 instanceof types_js_1.McpError) {
                            throw error_1;
                        }
                        throw new types_js_1.McpError(types_js_1.ErrorCode.InternalError, "Tool execution failed: ".concat(error_1 instanceof Error ? error_1.message : String(error_1)));
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    PowerPlatformMCPServer.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var transport;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transport = new stdio_js_1.StdioServerTransport();
                        return [4 /*yield*/, this.server.connect(transport)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return PowerPlatformMCPServer;
}());
// Start the server
var server = new PowerPlatformMCPServer();
server.run().catch(function (error) {
    console.error('Server failed to start:', error);
    process.exit(1);
});
