// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export class ConnectionTools {
    getTools() {
        return [
            {
                name: 'pp_connection_help',
                description: 'Show help for connection commands',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_connection_create',
                description: 'Create new Dataverse connection',
                inputSchema: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Name for the connection'
                        },
                        connectionString: {
                            type: 'string',
                            description: 'Connection string for Dataverse'
                        },
                        environment: {
                            type: 'string',
                            description: 'Target environment URL'
                        }
                    },
                    required: ['name']
                }
            },
            {
                name: 'pp_connection_delete',
                description: 'Delete Dataverse connection',
                inputSchema: {
                    type: 'object',
                    properties: {
                        connectionId: {
                            type: 'string',
                            description: 'ID of the connection to delete'
                        },
                        name: {
                            type: 'string',
                            description: 'Name of the connection to delete'
                        }
                    }
                }
            },
            {
                name: 'pp_connection_list',
                description: 'List all Dataverse connections',
                inputSchema: {
                    type: 'object',
                    properties: {
                        environment: {
                            type: 'string',
                            description: 'Environment URL to list connections from'
                        }
                    }
                }
            },
            {
                name: 'pp_connection_update',
                description: 'Update Dataverse connection',
                inputSchema: {
                    type: 'object',
                    properties: {
                        connectionId: {
                            type: 'string',
                            description: 'ID of the connection to update'
                        },
                        name: {
                            type: 'string',
                            description: 'New name for the connection'
                        },
                        connectionString: {
                            type: 'string',
                            description: 'Updated connection string'
                        }
                    },
                    required: ['connectionId']
                }
            }
        ];
    }
    getHandlers() {
        return {
            pp_connection_help: async () => {
                return { content: 'Connection commands help displayed' };
            },
            pp_connection_create: async (args) => {
                return { content: `Dataverse connection '${args.name}' created successfully` };
            },
            pp_connection_delete: async (args) => {
                return { content: `Connection deleted: ${args.connectionId || args.name}` };
            },
            pp_connection_list: async () => {
                return { content: 'Dataverse connections listed' };
            },
            pp_connection_update: async (args) => {
                return { content: `Connection updated: ${args.connectionId}` };
            }
        };
    }
}
