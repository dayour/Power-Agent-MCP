// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export class PipelineTools {
    getTools() {
        return [
            {
                name: 'pp_pipeline_help',
                description: 'Show help for pipeline commands',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_pipeline_deploy',
                description: 'Start pipeline deployment',
                inputSchema: {
                    type: 'object',
                    properties: {
                        pipelineId: {
                            type: 'string',
                            description: 'ID of the pipeline to deploy'
                        },
                        targetEnvironment: {
                            type: 'string',
                            description: 'Target environment for deployment'
                        }
                    },
                    required: ['pipelineId']
                }
            },
            {
                name: 'pp_pipeline_list',
                description: 'List pipelines',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            }
        ];
    }
    getHandlers() {
        return {
            pp_pipeline_help: async () => {
                return { content: 'Pipeline commands help displayed' };
            },
            pp_pipeline_deploy: async (args) => {
                return { content: `Pipeline deployment started: ${args.pipelineId}` };
            },
            pp_pipeline_list: async () => {
                return { content: 'Pipelines listed' };
            }
        };
    }
}
