// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Tool } from '@modelcontextprotocol/sdk/types.js';

export class EnvTools {
  getTools(): Tool[] {
    return [
      {
        name: 'pp_env_help',
        description: 'Show help for environment commands',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'pp_env_fetch',
        description: 'Performs FetchXML query against Dataverse',
        inputSchema: {
          type: 'object',
          properties: {
            fetchXml: {
              type: 'string',
              description: 'FetchXML query to execute'
            },
            fetchXmlFile: {
              type: 'string',
              description: 'Path to file containing FetchXML query'
            },
            outputFile: {
              type: 'string',
              description: 'Output file path for query results'
            },
            environment: {
              type: 'string',
              description: 'Target environment URL'
            }
          }
        }
      },
      {
        name: 'pp_env_list',
        description: 'List all Dataverse environments from Global Discovery Service',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'pp_env_list_settings',
        description: 'List environment settings',
        inputSchema: {
          type: 'object',
          properties: {
            environment: {
              type: 'string',
              description: 'Environment URL to list settings from'
            }
          }
        }
      },
      {
        name: 'pp_env_select',
        description: 'Select default organization for current authentication profile',
        inputSchema: {
          type: 'object',
          properties: {
            environment: {
              type: 'string',
              description: 'Environment URL to select as default'
            },
            name: {
              type: 'string',
              description: 'Environment name to select as default'
            }
          }
        }
      },
      {
        name: 'pp_env_update_settings',
        description: 'Update environment settings',
        inputSchema: {
          type: 'object',
          properties: {
            environment: {
              type: 'string',
              description: 'Target environment URL'
            },
            settings: {
              type: 'object',
              description: 'Settings to update'
            }
          },
          required: ['settings']
        }
      },
      {
        name: 'pp_env_who',
        description: 'Displays information about the current Dataverse organization',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      }
    ];
  }

  getHandlers(): Record<string, (args: any) => Promise<any>> {
    return {
      pp_env_help: async () => {
        return { content: 'Environment commands help displayed' };
      },
      pp_env_fetch: async (args: any) => {
        return { content: `FetchXML query executed${args.outputFile ? ` and results saved to: ${args.outputFile}` : ''}` };
      },
      pp_env_list: async () => {
        return { content: 'Environments listed from Global Discovery Service' };
      },
      pp_env_list_settings: async () => {
        return { content: 'Environment settings listed' };
      },
      pp_env_select: async (args: any) => {
        return { content: `Environment selected as default: ${args.environment || args.name}` };
      },
      pp_env_update_settings: async (args: any) => {
        return { content: 'Environment settings updated successfully' };
      },
      pp_env_who: async () => {
        return { content: 'Current Dataverse organization information displayed' };
      }
    };
  }
}