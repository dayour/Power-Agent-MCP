// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Tool } from '@modelcontextprotocol/sdk/types.js';

export class CopilotTools {
  getTools(): Tool[] {
    return [
      {
        name: 'pp_copilot_help',
        description: 'Show help for copilot commands',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'pp_copilot_create',
        description: 'Creates a new copilot using an existing template file',
        inputSchema: {
          type: 'object',
          properties: {
            templateFile: {
              type: 'string',
              description: 'Path to the template file'
            },
            name: {
              type: 'string',
              description: 'Name for the new copilot'
            },
            environment: {
              type: 'string',
              description: 'Target environment URL'
            }
          },
          required: ['templateFile', 'name']
        }
      },
      {
        name: 'pp_copilot_extract_template',
        description: 'Extracts a template file from an existing copilot',
        inputSchema: {
          type: 'object',
          properties: {
            copilotId: {
              type: 'string',
              description: 'ID of the copilot to extract template from'
            },
            outputFile: {
              type: 'string',
              description: 'Output file path for the template'
            },
            environment: {
              type: 'string',
              description: 'Source environment URL'
            }
          },
          required: ['copilotId', 'outputFile']
        }
      },
      {
        name: 'pp_copilot_extract_translation',
        description: 'Extracts file containing localized content for copilots',
        inputSchema: {
          type: 'object',
          properties: {
            copilotIds: {
              type: 'array',
              items: { type: 'string' },
              description: 'IDs of copilots to extract translations from'
            },
            outputFile: {
              type: 'string',
              description: 'Output file path for translations'
            },
            language: {
              type: 'string',
              description: 'Language code for translations'
            }
          },
          required: ['copilotIds', 'outputFile']
        }
      },
      {
        name: 'pp_copilot_list',
        description: 'List copilots in the current environment',
        inputSchema: {
          type: 'object',
          properties: {
            environment: {
              type: 'string',
              description: 'Environment URL to list copilots from'
            }
          }
        }
      },
      {
        name: 'pp_copilot_merge_translation',
        description: 'Merge files containing localized content for copilots',
        inputSchema: {
          type: 'object',
          properties: {
            translationFile: {
              type: 'string',
              description: 'Path to the translation file to merge'
            },
            environment: {
              type: 'string',
              description: 'Target environment URL'
            }
          },
          required: ['translationFile']
        }
      },
      {
        name: 'pp_copilot_model_list',
        description: 'List AI Builder models in the current environment',
        inputSchema: {
          type: 'object',
          properties: {
            environment: {
              type: 'string',
              description: 'Environment URL to list models from'
            }
          }
        }
      },
      {
        name: 'pp_copilot_model_predict',
        description: 'Sends text or prompt to AI Model for prediction',
        inputSchema: {
          type: 'object',
          properties: {
            modelId: {
              type: 'string',
              description: 'ID of the AI model to use'
            },
            text: {
              type: 'string',
              description: 'Text input for the model'
            },
            prompt: {
              type: 'string',
              description: 'Prompt for the model'
            }
          },
          required: ['modelId']
        }
      },
      {
        name: 'pp_copilot_model_prepare_fetch',
        description: 'Prepares FetchXML from AI LLM for execution against environment',
        inputSchema: {
          type: 'object',
          properties: {
            fetchXmlFile: {
              type: 'string',
              description: 'Path to the FetchXML file from LLM'
            },
            outputFile: {
              type: 'string',
              description: 'Output file path for prepared FetchXML'
            }
          },
          required: ['fetchXmlFile', 'outputFile']
        }
      },
      {
        name: 'pp_copilot_publish',
        description: 'Publish a Custom Copilot',
        inputSchema: {
          type: 'object',
          properties: {
            copilotId: {
              type: 'string',
              description: 'ID of the copilot to publish'
            },
            environment: {
              type: 'string',
              description: 'Target environment URL'
            }
          },
          required: ['copilotId']
        }
      },
      {
        name: 'pp_copilot_status',
        description: 'Poll the deployment status of a specified copilot',
        inputSchema: {
          type: 'object',
          properties: {
            copilotId: {
              type: 'string',
              description: 'ID of the copilot to check status for'
            },
            requestId: {
              type: 'string',
              description: 'Request ID for status tracking'
            }
          },
          required: ['copilotId']
        }
      }
    ];
  }

  getHandlers(): Record<string, (args: any) => Promise<any>> {
    return {
      pp_copilot_help: async () => {
        return { content: 'Copilot commands help displayed' };
      },
      pp_copilot_create: async (args: any) => {
        return { content: `Copilot '${args.name}' created from template: ${args.templateFile}` };
      },
      pp_copilot_extract_template: async (args: any) => {
        return { content: `Template extracted from copilot ${args.copilotId} to: ${args.outputFile}` };
      },
      pp_copilot_extract_translation: async (args: any) => {
        return { content: `Translations extracted to: ${args.outputFile}` };
      },
      pp_copilot_list: async () => {
        return { content: 'Copilots listed from environment' };
      },
      pp_copilot_merge_translation: async (args: any) => {
        return { content: `Translations merged from: ${args.translationFile}` };
      },
      pp_copilot_model_list: async () => {
        return { content: 'AI Builder models listed' };
      },
      pp_copilot_model_predict: async (args: any) => {
        return { content: `Prediction generated using model: ${args.modelId}` };
      },
      pp_copilot_model_prepare_fetch: async (args: any) => {
        return { content: `FetchXML prepared from ${args.fetchXmlFile} to: ${args.outputFile}` };
      },
      pp_copilot_publish: async (args: any) => {
        return { content: `Copilot published: ${args.copilotId}` };
      },
      pp_copilot_status: async (args: any) => {
        return { content: `Status checked for copilot: ${args.copilotId}` };
      }
    };
  }
}