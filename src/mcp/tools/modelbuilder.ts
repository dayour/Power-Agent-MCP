// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Tool } from '@modelcontextprotocol/sdk/types.js';

export class ModelBuilderTools {
  getTools(): Tool[] {
    return [
      {
        name: 'pp_modelbuilder_help',
        description: 'Show help for model builder commands',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'pp_modelbuilder_build',
        description: 'Builds a code model for Dataverse APIs and Tables',
        inputSchema: {
          type: 'object',
          properties: {
            outputDirectory: {
              type: 'string',
              description: 'Output directory for generated code'
            },
            namespace: {
              type: 'string',
              description: 'Namespace for generated classes'
            },
            language: {
              type: 'string',
              description: 'Programming language for code generation'
            },
            environment: {
              type: 'string',
              description: 'Source environment URL'
            }
          }
        }
      }
    ];
  }

  getHandlers(): Record<string, (args: any) => Promise<any>> {
    return {
      pp_modelbuilder_help: async () => {
        return { content: 'Model builder commands help displayed' };
      },
      pp_modelbuilder_build: async (args: any) => {
        return { content: `Code model built for Dataverse APIs${args.outputDirectory ? ` in directory: ${args.outputDirectory}` : ''}` };
      }
    };
  }
}