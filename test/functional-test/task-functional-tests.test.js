"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var assert_1 = require("assert");
var process = require("process");
var isRunningOnAgent_1 = require("../../src/params/auth/isRunningOnAgent");
var functional_test_lib_1 = require("./functional-test-lib");
var path = require("path");
var taskTestInput_1 = require("./taskTestInput");
(0, chai_1.should)();
var testTaskRootPathName = 'testTasksRootPath';
var outDir = path.resolve(__dirname, '..', '..', 'out');
var packagesRoot = path.resolve(outDir, 'packages');
var testBuilder = new functional_test_lib_1.TaskTestBuilder("PowerPlatformEnvironment" /* AuthTypes.Legacy */, packagesRoot);
var isEnvironmentCreated = false;
var isEnvironmentDeleted = false;
describe('Build tools functional tests', function () {
    this.beforeAll(function (done) {
        try {
            process.env[testTaskRootPathName] = testBuilder.initializeTestFiles(function () { done(); });
        }
        catch (error) {
            (0, assert_1.fail)("".concat(error));
        }
    });
    it('## Should run using agent context for functional tests', function () {
        (0, isRunningOnAgent_1.isRunningOnAgent)().should.be.true;
    });
    taskTestInput_1.tasksToTest.forEach(function (taskInfo) {
        it("Should run ".concat(taskInfo.name, " task succesfully."), function (done) {
            var _a;
            var testTasksRootPath = (_a = process.env[testTaskRootPathName]) !== null && _a !== void 0 ? _a : (0, assert_1.fail)("Environment variable ".concat(testTaskRootPathName, " is not defined"));
            try {
                var taskRunner = new functional_test_lib_1.TaskRunner(taskInfo, testTasksRootPath);
                var result = taskRunner.runTask();
                (0, chai_1.expect)(result.processResult.status).to.satisfy(function (status) { return status == null || (Number.isInteger(status) && status === 0); });
                if (taskInfo.name === taskTestInput_1.deleteEnvironmentTaskName)
                    isEnvironmentCreated = true;
                if (taskInfo.name === taskTestInput_1.deleteEnvironmentTaskName)
                    isEnvironmentDeleted = true;
                done();
            }
            catch (error) {
                (0, assert_1.fail)("Failed to run task: ".concat(taskInfo.name, "; error: ").concat(error));
            }
        });
    });
    this.afterAll(function (done) {
        var _a;
        var testTasksRootPath = (_a = process.env[testTaskRootPathName]) !== null && _a !== void 0 ? _a : (0, assert_1.fail)("Environment variable ".concat(testTaskRootPathName, " is not defined"));
        var deleteEnvironment = {
            name: 'delete-environment',
            path: '/tasks/delete-environment/delete-environment-v2'
        };
        if (isEnvironmentCreated && !isEnvironmentDeleted) {
            var taskRunner = new functional_test_lib_1.TaskRunner(deleteEnvironment, testTasksRootPath);
            taskRunner.runTask();
        }
        done();
    });
});
