import { pathExistsSync, createReadStream, readdirSync, emptyDirSync, ensureDirSync, existsSync } from 'fs-extra';
import * as Debug from 'debug';
const debug = Debug('taskTest:builder');
const packageNamePrefix = 'microsoft-IsvExpTools.PowerPlatform-BuildTools-EXPERIMENTAL-';
const packageExtenstion = '.vsix';
const testTempDir = 'pp-bt-test';
export class TaskTestBuilder {
    packageDirectory;
    taskRootPath;
    outDir;
    constructor(authType, packageDirectory) {
        if (process.env.NODE_ENV === 'development') {
            // create a .env file in root directory for testing locally with NODE_ENV = "development"
            require('dotenv').config();
        }
        this.outDir = path.resolve(__dirname, '..', '..', '..', 'out');
        // convince tasks-under-test to run as if they were launched on an AzDevOps agent:
        process.env['AGENT_JOBNAME'] = "AzDO job";
        process.env['INPUT_AUTHENTICATIONTYPE'] = authType;
        debug(`Selected authentication mode: ${process.env.INPUT_AUTHENTICATIONTYPE} `);
        const envUrl = process.env['PA_BT_ORG_URL'] ?? 'https://ppbt-comp-test.crm.dynamics.com';
        if (authType == "PowerPlatformEnvironment" /* AuthTypes.Legacy */)
            this.setPasswordBasedAuthEnvironmentVariables(authType, envUrl);
        if (authType == "PowerPlatformSPN" /* AuthTypes.SPN */)
            this.setSpnBasedAuthEnvironmentvariables(authType, envUrl);
        this.packageDirectory = packageDirectory;
        this.taskRootPath = path.resolve(this.outDir, testTempDir);
    }
    setPasswordBasedAuthEnvironmentVariables(authType, envUrl) {
        const username = process.env['PA_BT_ORG_USER'] ?? 'ppdevautomation@ppdevtools.onmicrosoft.com';
        const password = process.env['PA_BT_ORG_PASSWORD'];
        if (!password && authType === "PowerPlatformEnvironment" /* AuthTypes.Legacy */) {
            throw new Error("Require PA_BT_ORG_PASSWORD environment variable to be set!");
        }
        process.env['INPUT_POWERPLATFORMENVIRONMENT'] = "CDS_ORG";
        process.env['ENDPOINT_AUTH_CDS_ORG'] = `{ "parameters": { "username": "${username}", "password": "${password}" } }`;
        process.env['ENDPOINT_URL_CDS_ORG'] = envUrl;
    }
    setSpnBasedAuthEnvironmentvariables(authType, envUrl) {
        const appId = process.env['PA_BT_ORG_SPN_ID'] ?? '8a7729e0-2b71-4919-a89a-c789d0a9720a';
        const tenantId = process.env['PA_BT_ORG_SPN_TENANT_ID'] ?? '3041a058-5110-495a-a575-b2a5571d9eac';
        const clientSecret = process.env['PA_BT_ORG_SPNKEY'];
        if (!clientSecret && authType === "PowerPlatformSPN" /* AuthTypes.SPN */) {
            throw new Error("Require PA_BT_ORG_SPNKEY env variable to be set!");
        }
        process.env['INPUT_PowerPlatformSpn'] = 'PP_SPN';
        process.env['ENDPOINT_AUTH_PP_SPN'] = `{ "parameters": { "applicationId": "${appId}", "tenantId": "${tenantId}", "clientSecret": "${clientSecret}" } }`;
        process.env['ENDPOINT_URL_PP_SPN'] = envUrl;
    }
    initializeTestFiles(successCallBack) {
        const packageToTestPath = this.resolvePackageToTestPath();
        this.unzipVsix(packageToTestPath, successCallBack);
        return this.taskRootPath;
    }
    resolvePackageToTestPath() {
        if (!existsSync(this.packageDirectory))
            throw new Error(`Packages directory does not exist: ${this.packageDirectory}`);
        const packageToTest = readdirSync(this.packageDirectory)
            .filter((file) => file.startsWith(packageNamePrefix) && file.endsWith(packageExtenstion))
            .map(file => path.resolve(this.packageDirectory, file))
            .slice(0, 1)[0];
        if (!pathExistsSync(packageToTest)) {
            throw new Error(`Cannot run component tests before the tasks are packaged! Run 'gulp pack | repack' first.`);
        }
        return packageToTest;
    }
    unzipVsix(packageToTest, callBack) {
        ensureDirSync(this.taskRootPath);
        this.cleanUpTestFiles();
        debug(`Unzipping ${packageToTest} to ${this.taskRootPath}...`);
        createReadStream(packageToTest)
            .pipe(unzip.Extract({ path: this.taskRootPath }))
            .on("close", callBack.bind(this))
            .on("error", (error) => {
            throw new Error(`Failed to extract ${packageToTest} to ${this.taskRootPath}: error: ${error}`);
        });
    }
    cleanUpTestFiles() {
        debug(`Cleaning up test files from ${this.taskRootPath}...`);
        emptyDirSync(this.taskRootPath);
    }
}
