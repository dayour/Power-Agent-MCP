// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export class TestTools {
    getTools() {
        return [
            {
                name: 'pp_test_help',
                description: 'Show help for test commands',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_test_run',
                description: 'Execute tests defined in a Test Plan file',
                inputSchema: {
                    type: 'object',
                    properties: {
                        testPlanFile: {
                            type: 'string',
                            description: 'Path to the test plan file'
                        },
                        environment: {
                            type: 'string',
                            description: 'Target environment URL'
                        }
                    },
                    required: ['testPlanFile']
                }
            }
        ];
    }
    getHandlers() {
        return {
            pp_test_help: async () => {
                return { content: 'Test commands help displayed' };
            },
            pp_test_run: async (args) => {
                return { content: `Tests executed from plan: ${args.testPlanFile}` };
            }
        };
    }
}
