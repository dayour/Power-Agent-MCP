// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Tool } from '@modelcontextprotocol/sdk/types.js';

export class CodeTools {
  getTools(): Tool[] {
    return [
      {
        name: 'pp_code_help',
        description: 'Show help for code app commands',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'pp_code_add_data_source',
        description: 'Adds a new datasource to the code app',
        inputSchema: {
          type: 'object',
          properties: {
            dataSourceName: {
              type: 'string',
              description: 'Name of the data source to add'
            },
            dataSourceType: {
              type: 'string',
              description: 'Type of the data source'
            },
            connectionString: {
              type: 'string',
              description: 'Connection string for the data source'
            }
          },
          required: ['dataSourceName', 'dataSourceType']
        }
      },
      {
        name: 'pp_code_delete_data_source',
        description: 'Deletes a data source from the current code app',
        inputSchema: {
          type: 'object',
          properties: {
            dataSourceName: {
              type: 'string',
              description: 'Name of the data source to delete'
            }
          },
          required: ['dataSourceName']
        }
      },
      {
        name: 'pp_code_init',
        description: 'Initializes a Code app in the current directory',
        inputSchema: {
          type: 'object',
          properties: {
            appName: {
              type: 'string',
              description: 'Name for the new code app'
            },
            template: {
              type: 'string',
              description: 'Template to use for initialization'
            }
          },
          required: ['appName']
        }
      },
      {
        name: 'pp_code_push',
        description: 'Publishes a new version of a Code app',
        inputSchema: {
          type: 'object',
          properties: {
            environment: {
              type: 'string',
              description: 'Target environment URL'
            }
          }
        }
      },
      {
        name: 'pp_code_run',
        description: 'Runs a local server for connections loading locally in the app',
        inputSchema: {
          type: 'object',
          properties: {
            port: {
              type: 'number',
              description: 'Port number for the local server'
            }
          }
        }
      }
    ];
  }

  getHandlers(): Record<string, (args: any) => Promise<any>> {
    return {
      pp_code_help: async () => {
        return { content: 'Code app commands help displayed' };
      },
      pp_code_add_data_source: async (args: any) => {
        return { content: `Data source '${args.dataSourceName}' of type '${args.dataSourceType}' added to code app` };
      },
      pp_code_delete_data_source: async (args: any) => {
        return { content: `Data source '${args.dataSourceName}' deleted from code app` };
      },
      pp_code_init: async (args: any) => {
        return { content: `Code app '${args.appName}' initialized in current directory` };
      },
      pp_code_push: async (args: any) => {
        return { content: 'New version of Code app published successfully' };
      },
      pp_code_run: async (args: any) => {
        return { content: `Local server running${args.port ? ` on port ${args.port}` : ''}` };
      }
    };
  }
}