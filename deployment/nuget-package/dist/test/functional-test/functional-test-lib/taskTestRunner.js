import * as cp from 'child_process';
import * as Debug from 'debug';
const debug = Debug('taskTest:runner');
const logStdout = Debug('taskTest:runner:stdout');
Debug.formatters.h = (message) => {
    return `<+><+><+> ${message} <+><+><+>`;
};
export class TaskRunner {
    taskResult = undefined;
    taskInfo;
    taskDirectory;
    constructor(taskInfo, taskDirectory) {
        this.taskInfo = taskInfo;
        this.taskDirectory = taskDirectory;
    }
    runTask() {
        debug('%h', `Running task: ${this.taskInfo.name}...`);
        const normalizedTaskPath = this.normalizeAbsoluteTaskPath();
        if (this.taskInfo.inputVariables)
            this.setInputVariables(this.taskInfo.inputVariables);
        debug(`Executing task from path: ${normalizedTaskPath}`);
        this.taskResult = cp.spawnSync('node', [normalizedTaskPath], { encoding: 'utf-8', cwd: this.taskDirectory });
        //console.debug(this.taskResult.stdout);
        this.validateTaskRun();
        const envVar = this.setOutputEnvironmentVariables();
        logStdout(this.taskResult.stdout);
        debug(`Task: ${this.taskInfo.name} completed successfully.`);
        return { processResult: this.taskResult, outputEnvironmentVariable: envVar };
    }
    normalizeAbsoluteTaskPath() {
        return (path.join(this.taskDirectory, this.taskInfo.path)).replace(/\\/g, '/');
    }
    setInputVariables(inputVariables) {
        if (!inputVariables)
            return;
        debug('Setting input variables: %O', inputVariables);
        inputVariables.forEach(inputVariable => {
            process.env[`INPUT_${inputVariable.name}`] = inputVariable.value;
        });
    }
    validateTaskRun() {
        if (!this.taskResult)
            return;
        if (this.taskResult.status != 0) {
            throw new Error(`Failed to run task: ${this.taskInfo.name}; stderr: ${this.taskResult.stderr}`);
        }
        const extractedErrors = this.extractErrorTypeIssues(this.taskResult);
        if (extractedErrors.length > 0) {
            throw new Error(`tasks component test failed at: ${this.taskInfo.name} (loaded from: ${this.taskInfo.path})...\nstdout: ${this.taskResult.stdout}`);
        }
    }
    // useful regex tester https://regexkit.com/javascript-regex
    extractErrorTypeIssues(output) {
        const regex = /^##vso\[task\.issue\s+type=error;\](.+$)/mi;
        const stdoutMatches = output.stdout.match(regex);
        const stderrMatches = output.stderr.match(regex);
        if (stdoutMatches && stderrMatches) {
            return [...stdoutMatches, ...stderrMatches];
        }
        const matches = stdoutMatches || stderrMatches;
        if (matches)
            debug('Error found: %O', matches[1]);
        return matches || [];
    }
    setOutputEnvironmentVariables() {
        if (!this.taskResult)
            return;
        const setVars = this.extractSetVars(this.taskResult.stdout);
        if (setVars[1]) {
            const envVar = { name: setVars[1].split(';')[0], value: setVars[2] };
            debug('Setting output environment variable: %O', envVar);
            process.env[envVar.name] = envVar.value;
        }
    }
    extractSetVars(stdout) {
        const regex = /^##vso\[task\.setvariable\s+variable=(\S+);\](.+$)/m;
        const matches = stdout.match(regex);
        return matches || [];
    }
}
