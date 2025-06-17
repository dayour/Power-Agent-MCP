// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Tool } from '@modelcontextprotocol/sdk/types.js';

export class HelpTools {
  getTools(): Tool[] {
    return [
      {
        name: 'pp_help',
        description: 'Show help for the Microsoft Power Platform CLI',
        inputSchema: {
          type: 'object',
          properties: {
            command: {
              type: 'string',
              description: 'Specific command to get help for'
            }
          }
        }
      }
    ];
  }

  getHandlers(): Record<string, (args: any) => Promise<any>> {
    return {
      pp_help: async (args: any) => {
        return { content: `Power Platform CLI help displayed${args.command ? ` for command: ${args.command}` : ''}` };
      }
    };
  }
}