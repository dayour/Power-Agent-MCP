// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { pathExistsSync, createReadStream, readdirSync, emptyDirSync, ensureDirSync } from 'fs-extra';
import * as cp from 'child_process';
import { expect } from "chai";
import { isRunningOnAgent } from '../src/params/auth/isRunningOnAgent';
import { fail } from 'assert';
if (process.env.NODE_ENV === 'development') {
    // create a .env file in root directory for testing locally with NODE_ENV = "development"
    require('dotenv').config();
}
const testOutDir = 'out/test';
// convince tasks-under-test to run as if they were launched on an AzDevOps agent:
process.env['AGENT_JOBNAME'] = "AzDO job";
const authType = "PowerPlatformEnvironment" /* AuthTypes.Legacy */;
process.env['INPUT_AUTHENTICATIONTYPE'] = authType;
console.log(`Selected authN mode: ${process.env.INPUT_AUTHENTICATIONTYPE} `);
// for inner dev loop facilitation, specify the below env variables to override the given defaults here:
const username = process.env['PA_BT_ORG_USER'] ?? 'ppdevautomation@ppdevtools.onmicrosoft.com';
const password = process.env['PA_BT_ORG_PASSWORD'];
if (!password && authType === "PowerPlatformEnvironment" /* AuthTypes.Legacy */) {
    throw new Error("Require PA_BT_ORG_PASSWORD env variable to be set!");
}
const envUrl = process.env['PA_BT_ORG_URL'] ?? 'https://ppbt-comp-test.crm.dynamics.com';
const appId = process.env['PA_BT_ORG_SPN_ID'] ?? '8a7729e0-2b71-4919-a89a-c789d0a9720a';
const tenantId = process.env['PA_BT_ORG_SPN_TENANT_ID'] ?? '3041a058-5110-495a-a575-b2a5571d9eac';
const clientSecret = process.env['PA_BT_ORG_SPNKEY'];
if (!clientSecret && authType === "PowerPlatformSPN" /* AuthTypes.SPN */) {
    throw new Error("Require PA_BT_ORG_SPNKEY env variable to be set!");
}
process.env['INPUT_POWERPLATFORMENVIRONMENT'] = "CDS_ORG";
process.env['ENDPOINT_AUTH_CDS_ORG'] = `{ "parameters": { "username": "${username}", "password": "${password}" } }`;
process.env['ENDPOINT_URL_CDS_ORG'] = envUrl;
process.env['INPUT_PowerPlatformSpn'] = 'PP_SPN';
process.env['ENDPOINT_AUTH_PP_SPN'] = `{ "parameters": { "applicationId": "${appId}", "tenantId": "${tenantId}", "clientSecret": "${clientSecret}" } }`;
process.env['ENDPOINT_URL_PP_SPN'] = envUrl;
//checker inputs
process.env['INPUT_FilesToAnalyze'] = path.join(__dirname, 'Test-Data', 'componentsTestSolution_1_0_0_1.zip');
process.env['INPUT_ArtifactDestinationName'] = 'PA-Checker-logs';
process.env['INPUT_RuleSet'] = '0ad12346-e108-40b8-a956-9a8f95ea18c9'; // SolutionChecker, see task.json
//unpack solution inputs
const emptySolutionPath = path.join(__dirname, 'Test-Data', 'emptySolution_0_1_0_0.zip');
const output = `${testOutDir}/output`;
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
process.env['INPUT_PackageFile'] = `${path.join(__dirname, 'Test-Data', 'testPkg', 'bin', 'Debug', 'testPkg.1.0.0.pdpkg.zip')}`;
//export solution inputs
process.env['INPUT_SolutionName'] = "emptySolution";
process.env['INPUT_SolutionVersionNumber'] = "0.42.0.0";
//create environment inputs
process.env["INPUT_LocationName"] = "unitedstates";
process.env["INPUT_EnvironmentSku"] = "Sandbox";
process.env["INPUT_CurrencyName"] = "USD";
const friendlyName = `ppbt-comp-test-${process.platform == "win32" ? 'win' : 'linux'}`;
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
const outDir = path.resolve(__dirname, '..', 'out');
const packagesRoot = path.resolve(outDir, 'packages');
const packageToTest = readdirSync(packagesRoot)
    .filter((file) => file.startsWith('microsoft-IsvExpTools.PowerPlatform-BuildTools-EXPERIMENTAL-') && file.endsWith('.vsix'))
    .map(file => path.resolve(packagesRoot, file))
    .slice(0, 1)[0];
if (!pathExistsSync(packageToTest)) {
    throw new Error(`Cannot run component tests before the tasks are packaged! Run 'gulp pack' first.`);
}
console.log(`Running component tests with .vsix package: ${packageToTest}...`);
const tasksRoot = path.resolve(os.tmpdir(), 'pp-bt-test');
const createEnv = 'create-environment';
const deleteEnv = 'delete-environment';
const tasks = [
    { name: 'tool-installer', path: `${tasksRoot}/tasks/tool-installer/tool-installer-v2` },
    { name: createEnv, path: `${tasksRoot}/tasks/create-environment/create-environment-v2` },
    { name: 'who-am-i', path: `${tasksRoot}/tasks/whoami/whoami-v2` },
    { name: 'unpack-solution', path: `${tasksRoot}/tasks/unpack-solution/unpack-solution-v2` },
    { name: 'pack-solution', path: `${tasksRoot}/tasks/pack-solution/pack-solution-v2` },
    { name: 'checker', path: `${tasksRoot}/tasks/checker/checker-v2` },
    { name: 'deploy-package', path: `${tasksRoot}/tasks/deploy-package/deploy-package-v2` },
    { name: 'import-solution', path: `${tasksRoot}/tasks/import-solution/import-solution-v2` },
    { name: 'set-solution-version', path: `${tasksRoot}/tasks/set-solution-version/set-solution-version-v2` },
    // { name: 'export-solution', path: `${tasksRoot}/tasks/export-solution/export-solution-v2` },
    // { name: 'assign-user', path: `${tasksRoot}/tasks/assign-user/assign-user-v2` },
    // { name: 'add-solution-component', path: `${tasksRoot}/tasks/add-solution-component/add-solution-component-v2` },
    { name: deleteEnv, path: `${tasksRoot}/tasks/delete-environment/delete-environment-v2` },
].filter(task => {
    if (os.platform() === 'win32') {
        return true;
    }
    // can't run on non-windows OS:
    return task.name !== 'deploy-package';
});
describe('Tasks component tests', () => {
    const completedTasks = [];
    before('Unzip experimental .vsix', function (done) {
        // needs to be function () definition; arrow definition will not correctly set the this context
        this.timeout(50 * 1000);
        ensureDirSync(tasksRoot);
        console.log(`Unzipping VSIX ${packageToTest} into folder: ${tasksRoot} ...`);
        emptyDirSync(tasksRoot);
        createReadStream(packageToTest)
            .pipe(unzip.Extract({ path: tasksRoot }))
            .on("close", () => {
            done();
            console.log('Unzip complete.');
        })
            .on("error", (error) => {
            done(error);
        });
    });
    it('## running context for component test tasks', () => {
        expect(isRunningOnAgent()).to.be.true;
    });
    for (const task of tasks) {
        it(`## task ${task.name} `, (done) => {
            console.log(`>>> start testing ${task.name} (loaded from: ${task.path})...`);
            try {
                const res = cp.spawnSync('node', [task.path], { encoding: 'utf-8', cwd: tasksRoot });
                if (res.status != 0) {
                    throw new Error(`Failed to run task: ${task.name}; stderr: ${res.stderr}`);
                }
                const issues = extractIssues(res.stdout);
                if (issues[1] === 'error') {
                    throw new Error(`tasks component test failed at: ${task.name} (loaded from: ${task.path})...\nstdout: ${res.stdout}`);
                }
                const setVars = extractSetVars(res.stdout);
                if (setVars[1]) {
                    const varName = setVars[1].split(';')[0];
                    const varValue = setVars[2];
                    console.debug(`Setting pipeline var: ${varName} to: ${varValue}`);
                    process.env[varName] = varValue;
                }
                completedTasks.push(task);
                done();
            }
            catch (error) {
                fail(`Failed to run task: ${task.name}; error: ${error}`);
            }
        }).timeout(10 * 60 * 1000);
    }
    after('Cleanup', function () {
        this.timeout(6 * 60 * 1000);
        cleanupEnvironmentIfDeleteIsNotRun(completedTasks);
    });
});
function extractIssues(output) {
    const regex = /^##vso\[task\.issue\s+type=(\S+);\](.+$)/m;
    const matches = output.match(regex);
    return matches || ['', ''];
}
function extractSetVars(output) {
    const regex = /^##vso\[task\.setvariable\s+variable=(\S+);\](.+$)/m;
    const matches = output.match(regex);
    return matches || [];
}
function cleanupEnvironmentIfDeleteIsNotRun(completedTasks) {
    const createTaskFoundCompleted = completedTasks.find(t => t.name === createEnv);
    const deleteTaskCompleted = completedTasks.find(t => t.name === deleteEnv);
    const deleteTaskFound = tasks.find(t => t.name === deleteEnv);
    if (createTaskFoundCompleted && !deleteTaskCompleted && deleteTaskFound) {
        console.log(`>>> Attempting to cleaning up environment(${envUrl})...`);
        cp.spawnSync('node', [deleteTaskFound.path], { encoding: 'utf-8', cwd: tasksRoot });
        console.log(`>>> Attempting to clean up environment(${envUrl})... done`);
    }
}
