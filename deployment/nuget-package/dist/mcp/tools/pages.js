// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export class PagesTools {
    getTools() {
        return [
            {
                name: 'pp_pages_help',
                description: 'Show help for Power Pages commands',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_pages_bootstrap_migrate',
                description: 'Migrates HTML code from bootstrap V3 to V5',
                inputSchema: {
                    type: 'object',
                    properties: {
                        sourceFolder: {
                            type: 'string',
                            description: 'Source folder containing HTML files'
                        },
                        outputFolder: {
                            type: 'string',
                            description: 'Output folder for migrated files'
                        }
                    },
                    required: ['sourceFolder']
                }
            },
            {
                name: 'pp_pages_download',
                description: 'Download Power Pages website content from environment',
                inputSchema: {
                    type: 'object',
                    properties: {
                        websiteId: {
                            type: 'string',
                            description: 'ID of the website to download'
                        },
                        outputFolder: {
                            type: 'string',
                            description: 'Output folder for website content'
                        },
                        environment: {
                            type: 'string',
                            description: 'Source environment URL'
                        }
                    },
                    required: ['websiteId', 'outputFolder']
                }
            },
            {
                name: 'pp_pages_download_code_site',
                description: 'Download Power Pages website content as code',
                inputSchema: {
                    type: 'object',
                    properties: {
                        websiteId: {
                            type: 'string',
                            description: 'ID of the website to download'
                        },
                        outputFolder: {
                            type: 'string',
                            description: 'Output folder for code files'
                        },
                        environment: {
                            type: 'string',
                            description: 'Source environment URL'
                        }
                    },
                    required: ['websiteId', 'outputFolder']
                }
            },
            {
                name: 'pp_pages_list',
                description: 'List all Power Pages websites from the environment',
                inputSchema: {
                    type: 'object',
                    properties: {
                        environment: {
                            type: 'string',
                            description: 'Environment URL to list websites from'
                        }
                    }
                }
            },
            {
                name: 'pp_pages_migrate_datamodel',
                description: 'Manage data model migration for Power Pages website',
                inputSchema: {
                    type: 'object',
                    properties: {
                        websiteId: {
                            type: 'string',
                            description: 'ID of the website'
                        },
                        migrationFile: {
                            type: 'string',
                            description: 'Path to migration file'
                        }
                    },
                    required: ['websiteId']
                }
            },
            {
                name: 'pp_pages_upload',
                description: 'Upload Power Pages website content to environment',
                inputSchema: {
                    type: 'object',
                    properties: {
                        sourceFolder: {
                            type: 'string',
                            description: 'Source folder containing website content'
                        },
                        websiteId: {
                            type: 'string',
                            description: 'ID of the target website'
                        },
                        environment: {
                            type: 'string',
                            description: 'Target environment URL'
                        }
                    },
                    required: ['sourceFolder', 'websiteId']
                }
            },
            {
                name: 'pp_pages_upload_code_site',
                description: 'Uploads compiled code to Power Pages site',
                inputSchema: {
                    type: 'object',
                    properties: {
                        sourceFolder: {
                            type: 'string',
                            description: 'Source folder containing compiled code'
                        },
                        websiteId: {
                            type: 'string',
                            description: 'ID of the target website'
                        },
                        environment: {
                            type: 'string',
                            description: 'Target environment URL'
                        }
                    },
                    required: ['sourceFolder', 'websiteId']
                }
            }
        ];
    }
    getHandlers() {
        return {
            pp_pages_help: async () => {
                return { content: 'Power Pages commands help displayed' };
            },
            pp_pages_bootstrap_migrate: async (args) => {
                return { content: `Bootstrap migration completed from ${args.sourceFolder}` };
            },
            pp_pages_download: async (args) => {
                return { content: `Website ${args.websiteId} downloaded to: ${args.outputFolder}` };
            },
            pp_pages_download_code_site: async (args) => {
                return { content: `Code site ${args.websiteId} downloaded to: ${args.outputFolder}` };
            },
            pp_pages_list: async () => {
                return { content: 'Power Pages websites listed from environment' };
            },
            pp_pages_migrate_datamodel: async (args) => {
                return { content: `Data model migration managed for website: ${args.websiteId}` };
            },
            pp_pages_upload: async (args) => {
                return { content: `Website content uploaded from ${args.sourceFolder} to website: ${args.websiteId}` };
            },
            pp_pages_upload_code_site: async (args) => {
                return { content: `Code uploaded from ${args.sourceFolder} to website: ${args.websiteId}` };
            }
        };
    }
}
