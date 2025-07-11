// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export class AuthTools {
    getTools() {
        return [
            {
                name: 'pp_auth_help',
                description: 'Show help for authentication commands',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_auth_clear',
                description: 'Clear all authentication profiles stored on this computer',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_auth_create',
                description: 'Create and store authentication profiles on this computer',
                inputSchema: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Name for the authentication profile'
                        },
                        url: {
                            type: 'string',
                            description: 'URL of the environment'
                        },
                        applicationId: {
                            type: 'string',
                            description: 'Azure AD application ID'
                        },
                        clientSecret: {
                            type: 'string',
                            description: 'Azure AD application secret'
                        },
                        tenant: {
                            type: 'string',
                            description: 'Azure AD tenant ID'
                        },
                        username: {
                            type: 'string',
                            description: 'Username for authentication'
                        },
                        password: {
                            type: 'string',
                            description: 'Password for authentication'
                        }
                    }
                }
            },
            {
                name: 'pp_auth_delete',
                description: 'Delete a particular authentication profile',
                inputSchema: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Name of the authentication profile to delete'
                        },
                        index: {
                            type: 'number',
                            description: 'Index of the authentication profile to delete'
                        }
                    }
                }
            },
            {
                name: 'pp_auth_list',
                description: 'List the authentication profiles stored on this computer',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_auth_name',
                description: 'Name or rename an existing authentication profile',
                inputSchema: {
                    type: 'object',
                    properties: {
                        index: {
                            type: 'number',
                            description: 'Index of the authentication profile to rename'
                        },
                        name: {
                            type: 'string',
                            description: 'New name for the authentication profile'
                        }
                    },
                    required: ['index', 'name']
                }
            },
            {
                name: 'pp_auth_select',
                description: 'Select which authentication profile should be active',
                inputSchema: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Name of the authentication profile to select'
                        },
                        index: {
                            type: 'number',
                            description: 'Index of the authentication profile to select'
                        }
                    }
                }
            },
            {
                name: 'pp_auth_update',
                description: 'Update name or target environment of an existing authentication profile',
                inputSchema: {
                    type: 'object',
                    properties: {
                        index: {
                            type: 'number',
                            description: 'Index of the authentication profile to update'
                        },
                        name: {
                            type: 'string',
                            description: 'New name for the authentication profile'
                        },
                        url: {
                            type: 'string',
                            description: 'New environment URL'
                        }
                    },
                    required: ['index']
                }
            }
        ];
    }
    getHandlers() {
        return {
            pp_auth_help: async () => {
                return { content: 'Authentication commands help displayed' };
            },
            pp_auth_clear: async () => {
                return { content: 'All authentication profiles cleared' };
            },
            pp_auth_create: async (args) => {
                return { content: `Authentication profile created with name: ${args.name}` };
            },
            pp_auth_delete: async (args) => {
                return { content: `Authentication profile deleted: ${args.name || args.index}` };
            },
            pp_auth_list: async () => {
                return { content: 'Authentication profiles listed' };
            },
            pp_auth_name: async (args) => {
                return { content: `Authentication profile renamed to: ${args.name}` };
            },
            pp_auth_select: async (args) => {
                return { content: `Authentication profile selected: ${args.name || args.index}` };
            },
            pp_auth_update: async (args) => {
                return { content: `Authentication profile updated: ${args.index}` };
            }
        };
    }
}
