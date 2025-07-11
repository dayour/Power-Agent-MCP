import { should, expect } from 'chai';
import { fail } from 'assert';
import { isRunningOnAgent } from '../../src/params/auth/isRunningOnAgent';
import { TaskTestBuilder, TaskRunner } from './functional-test-lib';
import * as path from 'path';
import { deleteEnvironmentTaskName, tasksToTest } from './taskTestInput';
should();
const testTaskRootPathName = 'testTasksRootPath';
const outDir = path.resolve(__dirname, '..', '..', 'out');
const packagesRoot = path.resolve(outDir, 'packages');
const testBuilder = new TaskTestBuilder("PowerPlatformEnvironment" /* AuthTypes.Legacy */, packagesRoot);
let isEnvironmentCreated = false;
let isEnvironmentDeleted = false;
describe('Build tools functional tests', function () {
    this.beforeAll(function (done) {
        try {
            process.env[testTaskRootPathName] = testBuilder.initializeTestFiles(() => { done(); });
        }
        catch (error) {
            fail(`${error}`);
        }
    });
    it('## Should run using agent context for functional tests', () => {
        isRunningOnAgent().should.be.true;
    });
    tasksToTest.forEach((taskInfo) => {
        it(`Should run ${taskInfo.name} task succesfully.`, function (done) {
            let testTasksRootPath = process.env[testTaskRootPathName] ?? fail(`Environment variable ${testTaskRootPathName} is not defined`);
            try {
                const taskRunner = new TaskRunner(taskInfo, testTasksRootPath);
                const result = taskRunner.runTask();
                expect(result.processResult.status).to.satisfy((status) => status == null || (Number.isInteger(status) && status === 0));
                if (taskInfo.name === deleteEnvironmentTaskName)
                    isEnvironmentCreated = true;
                if (taskInfo.name === deleteEnvironmentTaskName)
                    isEnvironmentDeleted = true;
                done();
            }
            catch (error) {
                fail(`Failed to run task: ${taskInfo.name}; error: ${error}`);
            }
        });
    });
    this.afterAll(function (done) {
        let testTasksRootPath = process.env[testTaskRootPathName] ?? fail(`Environment variable ${testTaskRootPathName} is not defined`);
        const deleteEnvironment = {
            name: 'delete-environment',
            path: '/tasks/delete-environment/delete-environment-v2'
        };
        if (isEnvironmentCreated && !isEnvironmentDeleted) {
            const taskRunner = new TaskRunner(deleteEnvironment, testTasksRootPath);
            taskRunner.runTask();
        }
        done();
    });
});
