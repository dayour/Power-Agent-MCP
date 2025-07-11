"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskTestBuilder = void 0;
var fs_extra_1 = require("fs-extra");
var path = require("path");
var unzip = require("unzip-stream");
var process = require("process");
var Debug = require("debug");
var debug = Debug('taskTest:builder');
var packageNamePrefix = 'microsoft-IsvExpTools.PowerPlatform-BuildTools-EXPERIMENTAL-';
var packageExtenstion = '.vsix';
var testTempDir = 'pp-bt-test';
var TaskTestBuilder = /** @class */ (function () {
    function TaskTestBuilder(authType, packageDirectory) {
        var _a;
        if (process.env.NODE_ENV === 'development') {
            // create a .env file in root directory for testing locally with NODE_ENV = "development"
            require('dotenv').config();
        }
        this.outDir = path.resolve(__dirname, '..', '..', '..', 'out');
        // convince tasks-under-test to run as if they were launched on an AzDevOps agent:
        process.env['AGENT_JOBNAME'] = "AzDO job";
        process.env['INPUT_AUTHENTICATIONTYPE'] = authType;
        debug("Selected authentication mode: ".concat(process.env.INPUT_AUTHENTICATIONTYPE, " "));
        var envUrl = (_a = process.env['PA_BT_ORG_URL']) !== null && _a !== void 0 ? _a : 'https://ppbt-comp-test.crm.dynamics.com';
        if (authType == "PowerPlatformEnvironment" /* AuthTypes.Legacy */)
            this.setPasswordBasedAuthEnvironmentVariables(authType, envUrl);
        if (authType == "PowerPlatformSPN" /* AuthTypes.SPN */)
            this.setSpnBasedAuthEnvironmentvariables(authType, envUrl);
        this.packageDirectory = packageDirectory;
        this.taskRootPath = path.resolve(this.outDir, testTempDir);
    }
    TaskTestBuilder.prototype.setPasswordBasedAuthEnvironmentVariables = function (authType, envUrl) {
        var _a;
        var username = (_a = process.env['PA_BT_ORG_USER']) !== null && _a !== void 0 ? _a : 'ppdevautomation@ppdevtools.onmicrosoft.com';
        var password = process.env['PA_BT_ORG_PASSWORD'];
        if (!password && authType === "PowerPlatformEnvironment" /* AuthTypes.Legacy */) {
            throw new Error("Require PA_BT_ORG_PASSWORD environment variable to be set!");
        }
        process.env['INPUT_POWERPLATFORMENVIRONMENT'] = "CDS_ORG";
        process.env['ENDPOINT_AUTH_CDS_ORG'] = "{ \"parameters\": { \"username\": \"".concat(username, "\", \"password\": \"").concat(password, "\" } }");
        process.env['ENDPOINT_URL_CDS_ORG'] = envUrl;
    };
    TaskTestBuilder.prototype.setSpnBasedAuthEnvironmentvariables = function (authType, envUrl) {
        var _a, _b;
        var appId = (_a = process.env['PA_BT_ORG_SPN_ID']) !== null && _a !== void 0 ? _a : '8a7729e0-2b71-4919-a89a-c789d0a9720a';
        var tenantId = (_b = process.env['PA_BT_ORG_SPN_TENANT_ID']) !== null && _b !== void 0 ? _b : '3041a058-5110-495a-a575-b2a5571d9eac';
        var clientSecret = process.env['PA_BT_ORG_SPNKEY'];
        if (!clientSecret && authType === "PowerPlatformSPN" /* AuthTypes.SPN */) {
            throw new Error("Require PA_BT_ORG_SPNKEY env variable to be set!");
        }
        process.env['INPUT_PowerPlatformSpn'] = 'PP_SPN';
        process.env['ENDPOINT_AUTH_PP_SPN'] = "{ \"parameters\": { \"applicationId\": \"".concat(appId, "\", \"tenantId\": \"").concat(tenantId, "\", \"clientSecret\": \"").concat(clientSecret, "\" } }");
        process.env['ENDPOINT_URL_PP_SPN'] = envUrl;
    };
    TaskTestBuilder.prototype.initializeTestFiles = function (successCallBack) {
        var packageToTestPath = this.resolvePackageToTestPath();
        this.unzipVsix(packageToTestPath, successCallBack);
        return this.taskRootPath;
    };
    TaskTestBuilder.prototype.resolvePackageToTestPath = function () {
        var _this = this;
        if (!(0, fs_extra_1.existsSync)(this.packageDirectory))
            throw new Error("Packages directory does not exist: ".concat(this.packageDirectory));
        var packageToTest = (0, fs_extra_1.readdirSync)(this.packageDirectory)
            .filter(function (file) { return file.startsWith(packageNamePrefix) && file.endsWith(packageExtenstion); })
            .map(function (file) { return path.resolve(_this.packageDirectory, file); })
            .slice(0, 1)[0];
        if (!(0, fs_extra_1.pathExistsSync)(packageToTest)) {
            throw new Error("Cannot run component tests before the tasks are packaged! Run 'gulp pack | repack' first.");
        }
        return packageToTest;
    };
    TaskTestBuilder.prototype.unzipVsix = function (packageToTest, callBack) {
        var _this = this;
        (0, fs_extra_1.ensureDirSync)(this.taskRootPath);
        this.cleanUpTestFiles();
        debug("Unzipping ".concat(packageToTest, " to ").concat(this.taskRootPath, "..."));
        (0, fs_extra_1.createReadStream)(packageToTest)
            .pipe(unzip.Extract({ path: this.taskRootPath }))
            .on("close", callBack.bind(this))
            .on("error", function (error) {
            throw new Error("Failed to extract ".concat(packageToTest, " to ").concat(_this.taskRootPath, ": error: ").concat(error));
        });
    };
    TaskTestBuilder.prototype.cleanUpTestFiles = function () {
        debug("Cleaning up test files from ".concat(this.taskRootPath, "..."));
        (0, fs_extra_1.emptyDirSync)(this.taskRootPath);
    };
    return TaskTestBuilder;
}());
exports.TaskTestBuilder = TaskTestBuilder;
