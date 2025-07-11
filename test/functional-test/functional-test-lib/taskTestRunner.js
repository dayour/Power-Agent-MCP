"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRunner = void 0;
var cp = require("child_process");
var path = require("path");
var process = require("process");
var Debug = require("debug");
var debug = Debug('taskTest:runner');
var logStdout = Debug('taskTest:runner:stdout');
Debug.formatters.h = function (message) {
    return "<+><+><+> ".concat(message, " <+><+><+>");
};
var TaskRunner = /** @class */ (function () {
    function TaskRunner(taskInfo, taskDirectory) {
        this.taskResult = undefined;
        this.taskInfo = taskInfo;
        this.taskDirectory = taskDirectory;
    }
    TaskRunner.prototype.runTask = function () {
        debug('%h', "Running task: ".concat(this.taskInfo.name, "..."));
        var normalizedTaskPath = this.normalizeAbsoluteTaskPath();
        if (this.taskInfo.inputVariables)
            this.setInputVariables(this.taskInfo.inputVariables);
        debug("Executing task from path: ".concat(normalizedTaskPath));
        this.taskResult = cp.spawnSync('node', [normalizedTaskPath], { encoding: 'utf-8', cwd: this.taskDirectory });
        //console.debug(this.taskResult.stdout);
        this.validateTaskRun();
        var envVar = this.setOutputEnvironmentVariables();
        logStdout(this.taskResult.stdout);
        debug("Task: ".concat(this.taskInfo.name, " completed successfully."));
        return { processResult: this.taskResult, outputEnvironmentVariable: envVar };
    };
    TaskRunner.prototype.normalizeAbsoluteTaskPath = function () {
        return (path.join(this.taskDirectory, this.taskInfo.path)).replace(/\\/g, '/');
    };
    TaskRunner.prototype.setInputVariables = function (inputVariables) {
        if (!inputVariables)
            return;
        debug('Setting input variables: %O', inputVariables);
        inputVariables.forEach(function (inputVariable) {
            process.env["INPUT_".concat(inputVariable.name)] = inputVariable.value;
        });
    };
    TaskRunner.prototype.validateTaskRun = function () {
        if (!this.taskResult)
            return;
        if (this.taskResult.status != 0) {
            throw new Error("Failed to run task: ".concat(this.taskInfo.name, "; stderr: ").concat(this.taskResult.stderr));
        }
        var extractedErrors = this.extractErrorTypeIssues(this.taskResult);
        if (extractedErrors.length > 0) {
            throw new Error("tasks component test failed at: ".concat(this.taskInfo.name, " (loaded from: ").concat(this.taskInfo.path, ")...\nstdout: ").concat(this.taskResult.stdout));
        }
    };
    // useful regex tester https://regexkit.com/javascript-regex
    TaskRunner.prototype.extractErrorTypeIssues = function (output) {
        var regex = /^##vso\[task\.issue\s+type=error;\](.+$)/mi;
        var stdoutMatches = output.stdout.match(regex);
        var stderrMatches = output.stderr.match(regex);
        if (stdoutMatches && stderrMatches) {
            return __spreadArray(__spreadArray([], stdoutMatches, true), stderrMatches, true);
        }
        var matches = stdoutMatches || stderrMatches;
        if (matches)
            debug('Error found: %O', matches[1]);
        return matches || [];
    };
    TaskRunner.prototype.setOutputEnvironmentVariables = function () {
        if (!this.taskResult)
            return;
        var setVars = this.extractSetVars(this.taskResult.stdout);
        if (setVars[1]) {
            var envVar = { name: setVars[1].split(';')[0], value: setVars[2] };
            debug('Setting output environment variable: %O', envVar);
            process.env[envVar.name] = envVar.value;
        }
    };
    TaskRunner.prototype.extractSetVars = function (stdout) {
        var regex = /^##vso\[task\.setvariable\s+variable=(\S+);\](.+$)/m;
        var matches = stdout.match(regex);
        return matches || [];
    };
    return TaskRunner;
}());
exports.TaskRunner = TaskRunner;
