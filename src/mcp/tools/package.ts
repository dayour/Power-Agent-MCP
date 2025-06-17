// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Tool } from '@modelcontextprotocol/sdk/types.js';

export class PackageTools {
  getTools(): Tool[] {
    return [
      {
        name: 'pp_package_help',
        description: 'Show help for package commands',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'pp_package_add_external',
        description: 'Adds a package external to the Dataverse solution system',
        inputSchema: {
          type: 'object',
          properties: {
            packagePath: {
              type: 'string',
              description: 'Path to the external package'
            },
            packageName: {
              type: 'string',
              description: 'Name of the external package'
            }
          },
          required: ['packagePath']
        }
      },
      {
        name: 'pp_package_add_reference',
        description: 'Adds reference to Dataverse solution project',
        inputSchema: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
              description: 'Path to the project to reference'
            },
            projectName: {
              type: 'string',
              description: 'Name of the project to reference'
            }
          },
          required: ['path']
        }
      },
      {
        name: 'pp_package_add_solution',
        description: 'Adds a prebuilt Dataverse solution file to a Package Deployer Package project',
        inputSchema: {
          type: 'object',
          properties: {
            solutionFile: {
              type: 'string',
              description: 'Path to the solution file'
            },
            solutionName: {
              type: 'string',
              description: 'Name of the solution'
            }
          },
          required: ['solutionFile']
        }
      },
      {
        name: 'pp_package_init',
        description: 'Initializes a directory with a new Dataverse package project',
        inputSchema: {
          type: 'object',
          properties: {
            outputDirectory: {
              type: 'string',
              description: 'Output directory for the package project'
            },
            packageName: {
              type: 'string',
              description: 'Name for the package'
            }
          },
          required: ['packageName']
        }
      },
      {
        name: 'pp_package_show',
        description: 'Shows details of Dataverse package',
        inputSchema: {
          type: 'object',
          properties: {
            packageFile: {
              type: 'string',
              description: 'Path to the package file'
            },
            packageName: {
              type: 'string',
              description: 'Name of the package'
            }
          }
        }
      }
    ];
  }

  getHandlers(): Record<string, (args: any) => Promise<any>> {
    return {
      pp_package_help: async () => {
        return { content: 'Package commands help displayed' };
      },
      pp_package_add_external: async (args: any) => {
        return { content: `External package added: ${args.packagePath}` };
      },
      pp_package_add_reference: async (args: any) => {
        return { content: `Reference added to project: ${args.path}` };
      },
      pp_package_add_solution: async (args: any) => {
        return { content: `Solution file added to package: ${args.solutionFile}` };
      },
      pp_package_init: async (args: any) => {
        return { content: `Package project initialized: ${args.packageName}` };
      },
      pp_package_show: async (args: any) => {
        return { content: `Package details displayed for: ${args.packageFile || args.packageName}` };
      }
    };
  }
}