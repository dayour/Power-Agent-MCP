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
exports.PowerPlatformToolHandler = void 0;
var environment_js_1 = require("./environment.js");
var solution_js_1 = require("./solution.js");
var data_js_1 = require("./data.js");
var quality_js_1 = require("./quality.js");
var security_js_1 = require("./security.js");
var application_js_1 = require("./application.js");
var portal_js_1 = require("./portal.js");
var governance_js_1 = require("./governance.js");
var utility_js_1 = require("./utility.js");
var sql_js_1 = require("./sql.js");
var auth_js_1 = require("./auth.js");
var canvas_js_1 = require("./canvas.js");
var copilot_js_1 = require("./copilot.js");
var env_js_1 = require("./env.js");
var code_js_1 = require("./code.js");
var connection_js_1 = require("./connection.js");
var connector_js_1 = require("./connector.js");
var pcf_js_1 = require("./pcf.js");
var plugin_js_1 = require("./plugin.js");
var package_js_1 = require("./package.js");
var pages_js_1 = require("./pages.js");
var powerfx_js_1 = require("./powerfx.js");
var pipeline_js_1 = require("./pipeline.js");
var test_js_1 = require("./test.js");
var telemetry_js_1 = require("./telemetry.js");
var toolsmanagement_js_1 = require("./toolsmanagement.js");
var modelbuilder_js_1 = require("./modelbuilder.js");
var help_js_1 = require("./help.js");
var adaptivecards_js_1 = require("./adaptivecards.js");
var dataverse_js_1 = require("./dataverse.js");
var PowerPlatformToolHandler = /** @class */ (function () {
    function PowerPlatformToolHandler() {
        this.tools = new Map();
        this.handlers = new Map();
        this.initializeTools();
    }
    PowerPlatformToolHandler.prototype.initializeTools = function () {
        // Initialize all tool categories
        var environmentTools = new environment_js_1.EnvironmentTools();
        var solutionTools = new solution_js_1.SolutionTools();
        var dataTools = new data_js_1.DataTools();
        var qualityTools = new quality_js_1.QualityTools();
        var securityTools = new security_js_1.SecurityTools();
        var applicationTools = new application_js_1.ApplicationTools();
        var portalTools = new portal_js_1.PortalTools();
        var governanceTools = new governance_js_1.GovernanceTools();
        var utilityTools = new utility_js_1.UtilityTools();
        var sqlTools = new sql_js_1.SqlTools();
        var authTools = new auth_js_1.AuthTools();
        var canvasTools = new canvas_js_1.CanvasTools();
        var copilotTools = new copilot_js_1.CopilotTools();
        var envTools = new env_js_1.EnvTools();
        var codeTools = new code_js_1.CodeTools();
        var connectionTools = new connection_js_1.ConnectionTools();
        var connectorTools = new connector_js_1.ConnectorTools();
        var pcfTools = new pcf_js_1.PcfTools();
        var telemetryTools = new telemetry_js_1.TelemetryTools();
        var pluginTools = new plugin_js_1.PluginTools();
        var packageTools = new package_js_1.PackageTools();
        var pagesTools = new pages_js_1.PagesTools();
        var powerFxTools = new powerfx_js_1.PowerFxTools();
        var pipelineTools = new pipeline_js_1.PipelineTools();
        var testTools = new test_js_1.TestTools();
        var toolsManagementTools = new toolsmanagement_js_1.ToolsManagementTools();
        var modelBuilderTools = new modelbuilder_js_1.ModelBuilderTools();
        var helpTools = new help_js_1.HelpTools();
        var adaptiveCardTools = new adaptivecards_js_1.AdaptiveCardTools();
        var dataverseTools = new dataverse_js_1.DataverseTools();
        // Register all tools
        this.registerToolCategory(environmentTools);
        this.registerToolCategory(solutionTools);
        this.registerToolCategory(dataTools);
        this.registerToolCategory(qualityTools);
        this.registerToolCategory(securityTools);
        this.registerToolCategory(applicationTools);
        this.registerToolCategory(portalTools);
        this.registerToolCategory(governanceTools);
        this.registerToolCategory(utilityTools);
        this.registerToolCategory(sqlTools);
        this.registerToolCategory(authTools);
        this.registerToolCategory(canvasTools);
        this.registerToolCategory(copilotTools);
        this.registerToolCategory(envTools);
        this.registerToolCategory(codeTools);
        this.registerToolCategory(connectionTools);
        this.registerToolCategory(connectorTools);
        this.registerToolCategory(pcfTools);
        this.registerToolCategory(telemetryTools);
        this.registerToolCategory(pluginTools);
        this.registerToolCategory(packageTools);
        this.registerToolCategory(pagesTools);
        this.registerToolCategory(powerFxTools);
        this.registerToolCategory(pipelineTools);
        this.registerToolCategory(testTools);
        this.registerToolCategory(toolsManagementTools);
        this.registerToolCategory(modelBuilderTools);
        this.registerToolCategory(helpTools);
        this.registerToolCategory(adaptiveCardTools);
        this.registerToolCategory(dataverseTools);
    };
    PowerPlatformToolHandler.prototype.registerToolCategory = function (toolCategory) {
        var _this = this;
        var tools = toolCategory.getTools();
        var handlers = toolCategory.getHandlers();
        tools.forEach(function (tool) {
            _this.tools.set(tool.name, tool);
        });
        Object.entries(handlers).forEach(function (_a) {
            var name = _a[0], handler = _a[1];
            _this.handlers.set(name, handler);
        });
    };
    PowerPlatformToolHandler.prototype.getAllTools = function () {
        return Array.from(this.tools.values());
    };
    PowerPlatformToolHandler.prototype.callTool = function (name, args) {
        return __awaiter(this, void 0, void 0, function () {
            var handler;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        handler = this.handlers.get(name);
                        if (!handler) {
                            throw new Error("Unknown tool: ".concat(name));
                        }
                        return [4 /*yield*/, handler(args)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return PowerPlatformToolHandler;
}());
exports.PowerPlatformToolHandler = PowerPlatformToolHandler;
