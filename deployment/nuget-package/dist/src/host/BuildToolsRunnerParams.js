// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as tl from 'azure-pipelines-task-lib/task';
import { cwd } from "process";
import buildToolsLogger from "./logger";
const EnvVarPrefix = 'POWERPLATFORMTOOLS_';
export const PacPathEnvVarName = `${EnvVarPrefix}PACCLIPATH`;
export class BuildToolsRunnerParams {
    _workingDir;
    _runnersDir;
    _agent;
    constructor() {
        this._workingDir = cwd();
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const jsonPackage = require("../../package.json");
        const productName = jsonPackage.name.split("/")[1];
        this._agent = `${productName}/${jsonPackage.version}`;
    }
    get logger() {
        return buildToolsLogger;
    }
    get runnersDir() {
        // lazy evaluation to determine pac CLI location from ToolInstaller task's discovery:
        if (!this._runnersDir) {
            const pacPath = tl.getVariable(PacPathEnvVarName);
            if (!pacPath) {
                if (isPPBT_v0()) {
                    throw new Error('It appears this pipeline was initialized with a v0 ToolInstaller task. Mixing v0 and v2 PP-BT tasks is NOT supported; please consult https://aka.ms/pp-bt-migrate-to-v2 on how to migrate to PP-BT v2.');
                }
                else {
                    throw new Error(`Cannot find required pac CLI, Tool-Installer task was not called before this task!`);
                }
            }
            this._runnersDir = pacPath;
        }
        return this._runnersDir;
    }
    get workingDir() {
        return this._workingDir;
    }
    get agent() {
        return this._agent;
    }
}
function isPPBT_v0() {
    // check if one of the PS modules env variables that ToolInstaller@0 set?
    return !!process.env['PowerPlatformTools_Microsoft_Xrm_WebApi_PowerShell'];
}
