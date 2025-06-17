// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Tool } from '@modelcontextprotocol/sdk/types.js';

export class CanvasTools {
  getTools(): Tool[] {
    return [
      {
        name: 'pp_canvas_help',
        description: 'Show help for canvas app commands',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'pp_canvas_create',
        description: 'Generate a canvas app from a custom connector',
        inputSchema: {
          type: 'object',
          properties: {
            connectorName: {
              type: 'string',
              description: 'Name of the custom connector'
            },
            appName: {
              type: 'string',
              description: 'Name for the new canvas app'
            },
            environment: {
              type: 'string',
              description: 'Target environment URL'
            }
          },
          required: ['connectorName', 'appName']
        }
      },
      {
        name: 'pp_canvas_download',
        description: 'Download canvas app as .msapp file',
        inputSchema: {
          type: 'object',
          properties: {
            appId: {
              type: 'string',
              description: 'ID of the canvas app to download'
            },
            appName: {
              type: 'string',
              description: 'Name of the canvas app to download'
            },
            outputFile: {
              type: 'string',
              description: 'Output file path for the .msapp file'
            },
            environment: {
              type: 'string',
              description: 'Source environment URL'
            }
          },
          required: ['outputFile']
        }
      },
      {
        name: 'pp_canvas_list',
        description: 'List canvas apps in the environment',
        inputSchema: {
          type: 'object',
          properties: {
            environment: {
              type: 'string',
              description: 'Environment URL to list apps from'
            }
          }
        }
      },
      {
        name: 'pp_canvas_pack',
        description: 'Pack canvas app sources into an msapp file',
        inputSchema: {
          type: 'object',
          properties: {
            sourceFolder: {
              type: 'string',
              description: 'Source folder containing unpacked canvas app'
            },
            outputFile: {
              type: 'string',
              description: 'Output .msapp file path'
            }
          },
          required: ['sourceFolder', 'outputFile']
        }
      },
      {
        name: 'pp_canvas_unpack',
        description: 'Extract an msapp file into source files',
        inputSchema: {
          type: 'object',
          properties: {
            msappFile: {
              type: 'string',
              description: 'Path to the .msapp file to unpack'
            },
            outputFolder: {
              type: 'string',
              description: 'Output folder for source files'
            }
          },
          required: ['msappFile', 'outputFolder']
        }
      },
      {
        name: 'pp_canvas_validate',
        description: 'Validate the .pa.yaml source for an unpacked canvas app',
        inputSchema: {
          type: 'object',
          properties: {
            sourceFolder: {
              type: 'string',
              description: 'Source folder containing unpacked canvas app'
            }
          },
          required: ['sourceFolder']
        }
      }
    ];
  }

  getHandlers(): Record<string, (args: any) => Promise<any>> {
    return {
      pp_canvas_help: async () => {
        return { content: 'Canvas app commands help displayed' };
      },
      pp_canvas_create: async (args: any) => {
        return { content: `Canvas app '${args.appName}' created from connector '${args.connectorName}'` };
      },
      pp_canvas_download: async (args: any) => {
        return { content: `Canvas app downloaded to: ${args.outputFile}` };
      },
      pp_canvas_list: async (args: any) => {
        return { content: 'Canvas apps listed from environment' };
      },
      pp_canvas_pack: async (args: any) => {
        return { content: `Canvas app packed from '${args.sourceFolder}' to '${args.outputFile}'` };
      },
      pp_canvas_unpack: async (args: any) => {
        return { content: `Canvas app unpacked from '${args.msappFile}' to '${args.outputFolder}'` };
      },
      pp_canvas_validate: async (args: any) => {
        return { content: `Canvas app sources validated in: ${args.sourceFolder}` };
      }
    };
  }
}