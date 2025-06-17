// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Tool } from '@modelcontextprotocol/sdk/types.js';

export class PowerFxTools {
  getTools(): Tool[] {
    return [
      {
        name: 'pp_power_fx_help',
        description: 'Show help for Power Fx commands',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'pp_power_fx_repl',
        description: 'Launch interactive Power Fx Read-Eval-Print Loop',
        inputSchema: {
          type: 'object',
          properties: {
            environment: {
              type: 'string',
              description: 'Environment URL for context'
            }
          }
        }
      },
      {
        name: 'pp_power_fx_run',
        description: 'Run a file of Power Fx instructions',
        inputSchema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              description: 'Path to Power Fx file to execute'
            },
            environment: {
              type: 'string',
              description: 'Environment URL for context'
            }
          },
          required: ['file']
        }
      }
    ];
  }

  getHandlers(): Record<string, (args: any) => Promise<any>> {
    return {
      pp_power_fx_help: async () => {
        return { content: 'Power Fx commands help displayed' };
      },
      pp_power_fx_repl: async () => {
        return { content: 'Power Fx REPL launched' };
      },
      pp_power_fx_run: async (args: any) => {
        return { content: `Power Fx file executed: ${args.file}` };
      }
    };
  }
}