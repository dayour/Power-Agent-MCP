// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export class PluginTools {
    getTools() {
        return [
            {
                name: 'pp_plugin_help',
                description: 'Show help for plugin commands',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_plugin_init',
                description: 'Initializes a directory with a new Dataverse plug-in class library',
                inputSchema: {
                    type: 'object',
                    properties: {
                        outputDirectory: {
                            type: 'string',
                            description: 'Output directory for the plugin project'
                        },
                        namespace: {
                            type: 'string',
                            description: 'Namespace for the plugin'
                        },
                        lang: {
                            type: 'string',
                            description: 'Programming language (C# or VB.NET)'
                        }
                    }
                }
            },
            {
                name: 'pp_plugin_push',
                description: 'Import plug-in into Dataverse',
                inputSchema: {
                    type: 'object',
                    properties: {
                        assemblyPath: {
                            type: 'string',
                            description: 'Path to the plugin assembly'
                        },
                        environment: {
                            type: 'string',
                            description: 'Target environment URL'
                        }
                    },
                    required: ['assemblyPath']
                }
            }
        ];
    }
    getHandlers() {
        return {
            pp_plugin_help: async () => {
                return { content: 'Plugin commands help displayed' };
            },
            pp_plugin_init: async (args) => {
                return { content: `Plugin project initialized${args.namespace ? ` with namespace: ${args.namespace}` : ''}` };
            },
            pp_plugin_push: async (args) => {
                return { content: `Plugin imported from assembly: ${args.assemblyPath}` };
            }
        };
    }
}
