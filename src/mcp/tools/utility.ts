// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { runPacCommand } from '../runtime/pac.js';
import { legacyTaskUnavailable } from '../runtime/legacy.js';

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

  private async toolInstaller(_args: any): Promise<any> {
    return legacyTaskUnavailable(
      'pp_tool_installer',
      'Install the Power Platform CLI from https://aka.ms/PowerPlatformCLI and ensure `pac` is on PATH.'
    );
  }

  private async whoami(_args: any): Promise<any> {
    const result = await runPacCommand(['org', 'who'], {});
    return {
      success: true,
      message: 'Authentication validated successfully',
      output: result.stdout,
    };
  }

  private async catalogStatus(args: any): Promise<any> {
    const result = await runPacCommand(['catalog', 'status'], {
      catalogSubmissionId: args.catalogSubmissionId,
      requestId: args.requestId,
    });
    return {
      success: true,
      message: 'Catalog status retrieved successfully',
      catalogSubmissionId: args.catalogSubmissionId,
      requestId: args.requestId,
      output: result.stdout,
    };
  }
}