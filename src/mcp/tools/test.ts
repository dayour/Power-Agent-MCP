// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Tool } from '@modelcontextprotocol/sdk/types.js';

export class TestTools {
  getTools(): Tool[] {
    return [
      {
        name: 'pp_test_help',
        description: 'Show help for test commands',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'pp_test_run',
        description: 'Execute tests defined in a Test Plan file',
        inputSchema: {
          type: 'object',
          properties: {
            testPlanFile: {
              type: 'string',
              description: 'Path to the test plan file'
            },
            environment: {
              type: 'string',
              description: 'Target environment URL'
            }
          },
          required: ['testPlanFile']
        }
      }
    ];
  }

  getHandlers(): Record<string, (args: any) => Promise<any>> {
    return {
      pp_test_help: async () => {
        return { content: 'Test commands help displayed' };
      },
      pp_test_run: async (args: any) => {
        return { content: `Tests executed from plan: ${args.testPlanFile}` };
      }
    };
  }
}