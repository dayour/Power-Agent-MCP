// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Tool } from '@modelcontextprotocol/sdk/types.js';

export class UtilityTools {
  getTools(): Tool[] {
    return [
      {
        name: 'pp_tool_installer',
        description: 'Install and manage Power Platform CLI tools',
        inputSchema: {
          type: 'object',
          properties: {
            addToolsToPath: {
              type: 'boolean',
              description: 'Add PAC CLI tools to system PATH'
            }
          }
        }
      },
      {
        name: 'pp_whoami',
        description: 'Validate authentication and connection status',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'pp_catalog_status',
        description: 'Monitor catalog submission status',
        inputSchema: {
          type: 'object',
          properties: {
            catalogSubmissionId: {
              type: 'string',
              description: 'ID of the catalog submission to check'
            },
            requestId: {
              type: 'string',
              description: 'Request ID for status tracking'
            }
          }
        }
      }
    ];
  }

  getHandlers(): Record<string, (args: any) => Promise<any>> {
    return {
      pp_tool_installer: this.toolInstaller.bind(this),
      pp_whoami: this.whoami.bind(this),
      pp_catalog_status: this.catalogStatus.bind(this)
    };
  }

  private async toolInstaller(args: any): Promise<any> {
    const { main: toolInstallerMain } = await import('../../tasks/tool-installer/tool-installer-v2/index.js');
    
    if (args.addToolsToPath !== undefined) process.env.INPUT_ADDTOOLSTOPATH = String(args.addToolsToPath);

    try {
      await toolInstallerMain();
      return {
        success: true,
        message: 'Power Platform CLI tools installed successfully',
        addToolsToPath: args.addToolsToPath || false
      };
    } catch (error) {
      throw new Error(`Failed to install tools: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private async whoami(args: any): Promise<any> {
    const { main: whoamiMain } = await import('../../tasks/whoami/whoami-v2/index.js');
    
    try {
      await whoamiMain();
      return {
        success: true,
        message: 'Authentication validated successfully'
      };
    } catch (error) {
      throw new Error(`Authentication validation failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private async catalogStatus(args: any): Promise<any> {
    const { main: catalogStatusMain } = await import('../../tasks/catalog-status/catalog-status-v2/index.js');
    
    if (args.catalogSubmissionId) process.env.INPUT_CATALOGSUBMISSIONID = args.catalogSubmissionId;
    if (args.requestId) process.env.INPUT_REQUESTID = args.requestId;

    try {
      await catalogStatusMain();
      return {
        success: true,
        message: 'Catalog status retrieved successfully',
        catalogSubmissionId: args.catalogSubmissionId,
        requestId: args.requestId
      };
    } catch (error) {
      throw new Error(`Failed to get catalog status: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}