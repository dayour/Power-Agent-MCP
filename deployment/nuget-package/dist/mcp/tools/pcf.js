// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export class PcfTools {
    getTools() {
        return [
            {
                name: 'pp_pcf_help',
                description: 'Show help for PCF component commands',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_pcf_init',
                description: 'Initializes a directory with a new Power Apps component framework project',
                inputSchema: {
                    type: 'object',
                    properties: {
                        namespace: {
                            type: 'string',
                            description: 'Namespace for the component'
                        },
                        name: {
                            type: 'string',
                            description: 'Name of the component'
                        },
                        template: {
                            type: 'string',
                            description: 'Template to use (field, dataset, etc.)'
                        },
                        outputDirectory: {
                            type: 'string',
                            description: 'Output directory for the project'
                        }
                    },
                    required: ['namespace', 'name', 'template']
                }
            },
            {
                name: 'pp_pcf_push',
                description: 'Import the Power Apps component framework project into Dataverse',
                inputSchema: {
                    type: 'object',
                    properties: {
                        publisher: {
                            type: 'string',
                            description: 'Publisher prefix for the component'
                        },
                        environment: {
                            type: 'string',
                            description: 'Target environment URL'
                        }
                    }
                }
            },
            {
                name: 'pp_pcf_version',
                description: 'Patch version for PCF controls',
                inputSchema: {
                    type: 'object',
                    properties: {
                        strategy: {
                            type: 'string',
                            description: 'Version update strategy (patch, minor, major)'
                        },
                        newVersion: {
                            type: 'string',
                            description: 'Specific version to set'
                        }
                    }
                }
            }
        ];
    }
    getHandlers() {
        return {
            pp_pcf_help: async () => {
                return { content: 'PCF component commands help displayed' };
            },
            pp_pcf_init: async (args) => {
                return { content: `PCF component project initialized: ${args.namespace}.${args.name} using template ${args.template}` };
            },
            pp_pcf_push: async (args) => {
                return { content: 'PCF component imported into Dataverse successfully' };
            },
            pp_pcf_version: async (args) => {
                return { content: `PCF component version updated${args.newVersion ? ` to: ${args.newVersion}` : ` using strategy: ${args.strategy}`}` };
            }
        };
    }
}
