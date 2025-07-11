"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = require("fs-extra");
var path = require("path");
var os = require("os");
var process = require("process");
var cp = require("child_process");
var chai_1 = require("chai");
var unzip = require("unzip-stream");
var isRunningOnAgent_1 = require("../src/params/auth/isRunningOnAgent");
var assert_1 = require("assert");
if (process.env.NODE_ENV === 'development') {
    // create a .env file in root directory for testing locally with NODE_ENV = "development"
    require('dotenv').config();
}
var testOutDir = 'out/test';
// convince tasks-under-test to run as if they were launched on an AzDevOps agent:
process.env['AGENT_JOBNAME'] = "AzDO job";
var authType = "PowerPlatformEnvironment" /* AuthTypes.Legacy */;
process.env['INPUT_AUTHENTICATIONTYPE'] = authType;
console.log("Selected authN mode: ".concat(process.env.INPUT_AUTHENTICATIONTYPE, " "));
// for inner dev loop facilitation, specify the below env variables to override the given defaults here:
var username = (_a = process.env['PA_BT_ORG_USER']) !== null && _a !== void 0 ? _a : 'ppdevautomation@ppdevtools.onmicrosoft.com';
var password = process.env['PA_BT_ORG_PASSWORD'];
if (!password && authType === "PowerPlatformEnvironment" /* AuthTypes.Legacy */) {
    throw new Error("Require PA_BT_ORG_PASSWORD env variable to be set!");
}
var envUrl = (_b = process.env['PA_BT_ORG_URL']) !== null && _b !== void 0 ? _b : 'https://ppbt-comp-test.crm.dynamics.com';
var appId = (_c = process.env['PA_BT_ORG_SPN_ID']) !== null && _c !== void 0 ? _c : '8a7729e0-2b71-4919-a89a-c789d0a9720a';
var tenantId = (_d = process.env['PA_BT_ORG_SPN_TENANT_ID']) !== null && _d !== void 0 ? _d : '3041a058-5110-495a-a575-b2a5571d9eac';
var clientSecret = process.env['PA_BT_ORG_SPNKEY'];
if (!clientSecret && authType === "PowerPlatformSPN" /* AuthTypes.SPN */) {
    throw new Error("Require PA_BT_ORG_SPNKEY env variable to be set!");
}
process.env['INPUT_POWERPLATFORMENVIRONMENT'] = "CDS_ORG";
process.env['ENDPOINT_AUTH_CDS_ORG'] = "{ \"parameters\": { \"username\": \"".concat(username, "\", \"password\": \"").concat(password, "\" } }");
process.env['ENDPOINT_URL_CDS_ORG'] = envUrl;
process.env['INPUT_PowerPlatformSpn'] = 'PP_SPN';
process.env['ENDPOINT_AUTH_PP_SPN'] = "{ \"parameters\": { \"applicationId\": \"".concat(appId, "\", \"tenantId\": \"").concat(tenantId, "\", \"clientSecret\": \"").concat(clientSecret, "\" } }");
process.env['ENDPOINT_URL_PP_SPN'] = envUrl;
//checker inputs
process.env['INPUT_FilesToAnalyze'] = path.join(__dirname, 'Test-Data', 'componentsTestSolution_1_0_0_1.zip');
process.env['INPUT_ArtifactDestinationName'] = 'PA-Checker-logs';
process.env['INPUT_RuleSet'] = '0ad12346-e108-40b8-a956-9a8f95ea18c9'; // SolutionChecker, see task.json
//unpack solution inputs
var emptySolutionPath = path.join(__dirname, 'Test-Data', 'emptySolution_0_1_0_0.zip');
var output = "".concat(testOutDir, "/output");
process.env['INPUT_SolutionInputFile'] = emptySolutionPath;
process.env['INPUT_SolutionTargetFolder'] = output;
//pack solution inputs
process.env['INPUT_SolutionOutputFile'] = path.join(testOutDir, 'packed', 'solution.zip');
process.env['INPUT_SolutionSourceFolder'] = output;
process.env['ProcessCanvasApps'] = 'true';
//import solution inputs
process.env['INPUT_SolutionInputFile'] = emptySolutionPath;
process.env['INPUT_AsyncOperation'] = "true";
process.env['INPUT_MaxAsyncWaitTime'] = "60";
process.env['INPUT_ConvertToManaged'] = "false";
process.env['INPUT_SkipProductUpdateDependencies'] = "false";
process.env['INPUT_SkipLowerVersion'] = "false";
process.env['INPUT_OverwriteUnmanagedCustomizations'] = "false";
process.env['INPUT_HoldingSolution'] = "false";
// deploy package
process.env['INPUT_PackageFile'] = "".concat(path.join(__dirname, 'Test-Data', 'testPkg', 'bin', 'Debug', 'testPkg.1.0.0.pdpkg.zip'));
//export solution inputs
process.env['INPUT_SolutionName'] = "emptySolution";
process.env['INPUT_SolutionVersionNumber'] = "0.42.0.0";
//create environment inputs
process.env["INPUT_LocationName"] = "unitedstates";
process.env["INPUT_EnvironmentSku"] = "Sandbox";
process.env["INPUT_CurrencyName"] = "USD";
var friendlyName = "ppbt-comp-test-".concat(process.platform == "win32" ? 'win' : 'linux');
process.env["INPUT_DisplayName"] = friendlyName;
process.env["INPUT_DomainName"] = friendlyName;
//process.env["INPUT_AppsTemplate"] ="D365_Sales"; #bug2471609
process.env["INPUT_LanguageName"] = "English";
//create assign-user inputs
process.env['INPUT_user'] = "85fd1857-ddef-46f6-acf4-22a0d1df2cda";
process.env['INPUT_role'] = "System Customizer";
//create add-solution-component inputs
process.env['INPUT_SolutionName'] = "emptySolution";
process.env['INPUT_Component'] = "account";
process.env['INPUT_ComponentType'] = "1";
var outDir = path.resolve(__dirname, '..', 'out');
var packagesRoot = path.resolve(outDir, 'packages');
var packageToTest = (0, fs_extra_1.readdirSync)(packagesRoot)
    .filter(function (file) { return file.startsWith('microsoft-IsvExpTools.PowerPlatform-BuildTools-EXPERIMENTAL-') && file.endsWith('.vsix'); })
    .map(function (file) { return path.resolve(packagesRoot, file); })
    .slice(0, 1)[0];
if (!(0, fs_extra_1.pathExistsSync)(packageToTest)) {
    throw new Error("Cannot run component tests before the tasks are packaged! Run 'gulp pack' first.");
}
console.log("Running component tests with .vsix package: ".concat(packageToTest, "..."));
var tasksRoot = path.resolve(os.tmpdir(), 'pp-bt-test');
var createEnv = 'create-environment';
var deleteEnv = 'delete-environment';
var tasks = [
    { name: 'tool-installer', path: "".concat(tasksRoot, "/tasks/tool-installer/tool-installer-v2") },
    { name: createEnv, path: "".concat(tasksRoot, "/tasks/create-environment/create-environment-v2") },
    { name: 'who-am-i', path: "".concat(tasksRoot, "/tasks/whoami/whoami-v2") },
    { name: 'unpack-solution', path: "".concat(tasksRoot, "/tasks/unpack-solution/unpack-solution-v2") },
    { name: 'pack-solution', path: "".concat(tasksRoot, "/tasks/pack-solution/pack-solution-v2") },
    { name: 'checker', path: "".concat(tasksRoot, "/tasks/checker/checker-v2") },
    { name: 'deploy-package', path: "".concat(tasksRoot, "/tasks/deploy-package/deploy-package-v2") },
    { name: 'import-solution', path: "".concat(tasksRoot, "/tasks/import-solution/import-solution-v2") },
    { name: 'set-solution-version', path: "".concat(tasksRoot, "/tasks/set-solution-version/set-solution-version-v2") },
    // { name: 'export-solution', path: `${tasksRoot}/tasks/export-solution/export-solution-v2` },
    // { name: 'assign-user', path: `${tasksRoot}/tasks/assign-user/assign-user-v2` },
    // { name: 'add-solution-component', path: `${tasksRoot}/tasks/add-solution-component/add-solution-component-v2` },
    { name: deleteEnv, path: "".concat(tasksRoot, "/tasks/delete-environment/delete-environment-v2") },
].filter(function (task) {
    if (os.platform() === 'win32') {
        return true;
    }
    // can't run on non-windows OS:
    return task.name !== 'deploy-package';
});
describe('Tasks component tests', function () {
    var completedTasks = [];
    before('Unzip experimental .vsix', function (done) {
        // needs to be function () definition; arrow definition will not correctly set the this context
        this.timeout(50 * 1000);
        (0, fs_extra_1.ensureDirSync)(tasksRoot);
        console.log("Unzipping VSIX ".concat(packageToTest, " into folder: ").concat(tasksRoot, " ..."));
        (0, fs_extra_1.emptyDirSync)(tasksRoot);
        (0, fs_extra_1.createReadStream)(packageToTest)
            .pipe(unzip.Extract({ path: tasksRoot }))
            .on("close", function () {
            done();
            console.log('Unzip complete.');
        })
            .on("error", function (error) {
            done(error);
        });
    });
    it('## running context for component test tasks', function () {
        (0, chai_1.expect)((0, isRunningOnAgent_1.isRunningOnAgent)()).to.be.true;
    });
    var _loop_1 = function (task) {
        it("## task ".concat(task.name, " "), function (done) {
            console.log(">>> start testing ".concat(task.name, " (loaded from: ").concat(task.path, ")..."));
            try {
                var res = cp.spawnSync('node', [task.path], { encoding: 'utf-8', cwd: tasksRoot });
                if (res.status != 0) {
                    throw new Error("Failed to run task: ".concat(task.name, "; stderr: ").concat(res.stderr));
                }
                var issues = extractIssues(res.stdout);
                if (issues[1] === 'error') {
                    throw new Error("tasks component test failed at: ".concat(task.name, " (loaded from: ").concat(task.path, ")...\nstdout: ").concat(res.stdout));
                }
                var setVars = extractSetVars(res.stdout);
                if (setVars[1]) {
                    var varName = setVars[1].split(';')[0];
                    var varValue = setVars[2];
                    console.debug("Setting pipeline var: ".concat(varName, " to: ").concat(varValue));
                    process.env[varName] = varValue;
                }
                completedTasks.push(task);
                done();
            }
            catch (error) {
                (0, assert_1.fail)("Failed to run task: ".concat(task.name, "; error: ").concat(error));
            }
        }).timeout(10 * 60 * 1000);
    };
    for (var _i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
        var task = tasks_1[_i];
        _loop_1(task);
    }
    after('Cleanup', function () {
        this.timeout(6 * 60 * 1000);
        cleanupEnvironmentIfDeleteIsNotRun(completedTasks);
    });
});
function extractIssues(output) {
    var regex = /^##vso\[task\.issue\s+type=(\S+);\](.+$)/m;
    var matches = output.match(regex);
    return matches || ['', ''];
}
function extractSetVars(output) {
    var regex = /^##vso\[task\.setvariable\s+variable=(\S+);\](.+$)/m;
    var matches = output.match(regex);
    return matches || [];
}
function cleanupEnvironmentIfDeleteIsNotRun(completedTasks) {
    var createTaskFoundCompleted = completedTasks.find(function (t) { return t.name === createEnv; });
    var deleteTaskCompleted = completedTasks.find(function (t) { return t.name === deleteEnv; });
    var deleteTaskFound = tasks.find(function (t) { return t.name === deleteEnv; });
    if (createTaskFoundCompleted && !deleteTaskCompleted && deleteTaskFound) {
        console.log(">>> Attempting to cleaning up environment(".concat(envUrl, ")..."));
        cp.spawnSync('node', [deleteTaskFound.path], { encoding: 'utf-8', cwd: tasksRoot });
        console.log(">>> Attempting to clean up environment(".concat(envUrl, ")... done"));
    }
}
