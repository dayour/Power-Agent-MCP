"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildToolsRunnerParams = exports.PacPathEnvVarName = void 0;
var tl = require("azure-pipelines-task-lib/task");
var process_1 = require("process");
var logger_1 = require("./logger");
var EnvVarPrefix = 'POWERPLATFORMTOOLS_';
exports.PacPathEnvVarName = "".concat(EnvVarPrefix, "PACCLIPATH");
var BuildToolsRunnerParams = /** @class */ (function () {
    function BuildToolsRunnerParams() {
        this._workingDir = (0, process_1.cwd)();
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        var jsonPackage = require("../../package.json");
        var productName = jsonPackage.name.split("/")[1];
        this._agent = "".concat(productName, "/").concat(jsonPackage.version);
    }
    Object.defineProperty(BuildToolsRunnerParams.prototype, "logger", {
        get: function () {
            return logger_1.default;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BuildToolsRunnerParams.prototype, "runnersDir", {
        get: function () {
            // lazy evaluation to determine pac CLI location from ToolInstaller task's discovery:
            if (!this._runnersDir) {
                var pacPath = tl.getVariable(exports.PacPathEnvVarName);
                if (!pacPath) {
                    if (isPPBT_v0()) {
                        throw new Error('It appears this pipeline was initialized with a v0 ToolInstaller task. Mixing v0 and v2 PP-BT tasks is NOT supported; please consult https://aka.ms/pp-bt-migrate-to-v2 on how to migrate to PP-BT v2.');
                    }
                    else {
                        throw new Error("Cannot find required pac CLI, Tool-Installer task was not called before this task!");
                    }
                }
                this._runnersDir = pacPath;
            }
            return this._runnersDir;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BuildToolsRunnerParams.prototype, "workingDir", {
        get: function () {
            return this._workingDir;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BuildToolsRunnerParams.prototype, "agent", {
        get: function () {
            return this._agent;
        },
        enumerable: false,
        configurable: true
    });
    return BuildToolsRunnerParams;
}());
exports.BuildToolsRunnerParams = BuildToolsRunnerParams;
function isPPBT_v0() {
    // check if one of the PS modules env variables that ToolInstaller@0 set?
    return !!process.env['PowerPlatformTools_Microsoft_Xrm_WebApi_PowerShell'];
}
