// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Tool } from '@modelcontextprotocol/sdk/types.js';

export class ConnectorTools {
  getTools(): Tool[] {
    return [
      {
        name: 'pp_connector_help',
        description: 'Show help for connector commands',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'pp_connector_create',
        description: 'Creates a new row in the Connector table in Dataverse',
        inputSchema: {
          type: 'object',
          properties: {
            connectorName: {
              type: 'string',
              description: 'Name for the new connector'
            },
            openApiFile: {
              type: 'string',
              description: 'Path to OpenAPI definition file'
            },
            iconFile: {
              type: 'string',
              description: 'Path to connector icon file'
            },
            environment: {
              type: 'string',
              description: 'Target environment URL'
            }
          },
          required: ['connectorName', 'openApiFile']
        }
      },
      {
        name: 'pp_connector_download',
        description: 'Download a Connector\'s OpenApiDefinition and API Properties file',
        inputSchema: {
          type: 'object',
          properties: {
            connectorId: {
              type: 'string',
              description: 'ID of the connector to download'
            },
            outputFolder: {
              type: 'string',
              description: 'Output folder for connector files'
            },
            environment: {
              type: 'string',
              description: 'Source environment URL'
            }
          },
          required: ['connectorId', 'outputFolder']
        }
      },
      {
        name: 'pp_connector_init',
        description: 'Initializes a new API Properties file for a Connector',
        inputSchema: {
          type: 'object',
          properties: {
            connectorName: {
              type: 'string',
              description: 'Name for the connector'
            },
            outputFile: {
              type: 'string',
              description: 'Output file path for API properties'
            }
          },
          required: ['connectorName']
        }
      },
      {
        name: 'pp_connector_list',
        description: 'List the Connectors registered in Dataverse',
        inputSchema: {
          type: 'object',
          properties: {
            environment: {
              type: 'string',
              description: 'Environment URL to list connectors from'
            }
          }
        }
      },
      {
        name: 'pp_connector_update',
        description: 'Updates a Connector Entity in Dataverse',
        inputSchema: {
          type: 'object',
          properties: {
            connectorId: {
              type: 'string',
              description: 'ID of the connector to update'
            },
            openApiFile: {
              type: 'string',
              description: 'Path to updated OpenAPI definition file'
            },
            iconFile: {
              type: 'string',
              description: 'Path to updated connector icon file'
            },
            environment: {
              type: 'string',
              description: 'Target environment URL'
            }
          },
          required: ['connectorId']
        }
      }
    ];
  }

  getHandlers(): Record<string, (args: any) => Promise<any>> {
    return {
      pp_connector_help: async () => {
        return { content: 'Connector commands help displayed' };
      },
      pp_connector_create: async (args: any) => {
        return { content: `Connector '${args.connectorName}' created from OpenAPI definition: ${args.openApiFile}` };
      },
      pp_connector_download: async (args: any) => {
        return { content: `Connector ${args.connectorId} downloaded to: ${args.outputFolder}` };
      },
      pp_connector_init: async (args: any) => {
        return { content: `API Properties file initialized for connector: ${args.connectorName}` };
      },
      pp_connector_list: async () => {
        return { content: 'Connectors listed from Dataverse' };
      },
      pp_connector_update: async (args: any) => {
        return { content: `Connector updated: ${args.connectorId}` };
      }
    };
  }
}