// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { runPacCommand } from '../runtime/pac.js';

export class DataTools {
  getTools(): Tool[] {
    return [
      {
        name: 'pp_export_data',
        description: 'Export configuration data with schema validation',
        inputSchema: {
          type: 'object',
          properties: {
            schemaFile: {
              type: 'string',
              description: 'Path to the data schema file'
            },
            dataFile: {
              type: 'string',
              description: 'Output file for exported data'
            }
          },
          required: ['schemaFile', 'dataFile']
        }
      },
      {
        name: 'pp_import_data',
        description: 'Import data with transformation and validation',
        inputSchema: {
          type: 'object',
          properties: {
            dataFile: {
              type: 'string',
              description: 'Path to the data file to import'
            },
            connectionCount: {
              type: 'number',
              description: 'Number of connections to use for import'
            }
          },
          required: ['dataFile']
        }
      }
    ];
  }

  getHandlers(): Record<string, (args: any) => Promise<any>> {
    return {
      pp_export_data: this.exportData.bind(this),
      pp_import_data: this.importData.bind(this)
    };
  }

  private async exportData(args: any): Promise<any> {
    const result = await runPacCommand(['data', 'export'], {
      schemaFile: args.schemaFile,
      dataFile: args.dataFile,
    });
    return {
      success: true,
      message: 'Data exported successfully',
      schemaFile: args.schemaFile,
      dataFile: args.dataFile,
      output: result.stdout,
    };
  }

  private async importData(args: any): Promise<any> {
    const result = await runPacCommand(['data', 'import'], {
      dataFile: args.dataFile,
      connectionCount: args.connectionCount,
    });
    return {
      success: true,
      message: 'Data imported successfully',
      dataFile: args.dataFile,
      output: result.stdout,
    };
  }
}