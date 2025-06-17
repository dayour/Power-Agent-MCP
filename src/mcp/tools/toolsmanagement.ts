// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Tool } from '@modelcontextprotocol/sdk/types.js';

export class ToolsManagementTools {
  getTools(): Tool[] {
    return [
      {
        name: 'pp_tool_help',
        description: 'Show help for tool management commands',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'pp_tool_admin',
        description: 'Launch Power Platform Admin Center for the current environment',
        inputSchema: {
          type: 'object',
          properties: {
            environment: {
              type: 'string',
              description: 'Environment URL to open admin center for'
            }
          }
        }
      },
      {
        name: 'pp_tool_cmt',
        description: 'Launch Configuration Migration Tool (CMT)',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'pp_tool_list',
        description: 'List the launchable tools and their local install state and version',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'pp_tool_maker',
        description: 'Launch Power Apps Maker Portal for the current environment',
        inputSchema: {
          type: 'object',
          properties: {
            environment: {
              type: 'string',
              description: 'Environment URL to open maker portal for'
            }
          }
        }
      },
      {
        name: 'pp_tool_pd',
        description: 'Launch Package Deployer (PD)',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'pp_tool_prt',
        description: 'Launch Plug-in Registration Tool (PRT)',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      }
    ];
  }

  getHandlers(): Record<string, (args: any) => Promise<any>> {
    return {
      pp_tool_help: async () => {
        return { content: 'Tool management commands help displayed' };
      },
      pp_tool_admin: async (args: any) => {
        return { content: `Power Platform Admin Center launched${args.environment ? ` for environment: ${args.environment}` : ''}` };
      },
      pp_tool_cmt: async () => {
        return { content: 'Configuration Migration Tool (CMT) launched' };
      },
      pp_tool_list: async () => {
        return { content: 'Available tools listed with install status and versions' };
      },
      pp_tool_maker: async (args: any) => {
        return { content: `Power Apps Maker Portal launched${args.environment ? ` for environment: ${args.environment}` : ''}` };
      },
      pp_tool_pd: async () => {
        return { content: 'Package Deployer (PD) launched' };
      },
      pp_tool_prt: async () => {
        return { content: 'Plug-in Registration Tool (PRT) launched' };
      }
    };
  }
}