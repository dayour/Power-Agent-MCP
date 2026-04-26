// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { runPacCommand } from '../runtime/pac.js';
import { legacyTaskUnavailable } from '../runtime/legacy.js';

export class GovernanceTools {
  getTools(): Tool[] {
    return [
      {
        name: 'pp_set_connection_variables',
        description: 'Manage connection variables and environment-specific settings',
        inputSchema: {
          type: 'object',
          properties: {
            connectionVariablesFile: {
              type: 'string',
              description: 'Path to connection variables JSON file'
            }
          },
          required: ['connectionVariablesFile']
        }
      },
      {
        name: 'pp_set_governance_config',
        description: 'Configure governance policies and compliance settings',
        inputSchema: {
          type: 'object',
          properties: {
            configurationFile: {
              type: 'string',
              description: 'Path to governance configuration file'
            }
          },
          required: ['configurationFile']
        }
      },
      {
        name: 'pp_update_org_settings',
        description: 'Update organization settings and preferences',
        inputSchema: {
          type: 'object',
          properties: {
            settingsFile: {
              type: 'string',
              description: 'Path to organization settings file'
            }
          },
          required: ['settingsFile']
        }
      },
      {
        name: 'pp_publish_customizations',
        description: 'Publish customizations and activate changes',
        inputSchema: {
          type: 'object',
          properties: {
            async: {
              type: 'boolean',
              description: 'Run publish operation asynchronously'
            }
          }
        }
      }
    ];
  }

  getHandlers(): Record<string, (args: any) => Promise<any>> {
    return {
      pp_set_connection_variables: this.setConnectionVariables.bind(this),
      pp_set_governance_config: this.setGovernanceConfig.bind(this),
      pp_update_org_settings: this.updateOrgSettings.bind(this),
      pp_publish_customizations: this.publishCustomizations.bind(this)
    };
  }

  private async setConnectionVariables(args: any): Promise<any> {
    return legacyTaskUnavailable(
      'pp_set_connection_variables',
      `pac connection update --connection-variables-file ${args.connectionVariablesFile}`
    );
  }

  private async setGovernanceConfig(args: any): Promise<any> {
    return legacyTaskUnavailable(
      'pp_set_governance_config',
      `pac admin governance update --configuration-file ${args.configurationFile}`
    );
  }

  private async updateOrgSettings(args: any): Promise<any> {
    return legacyTaskUnavailable(
      'pp_update_org_settings',
      `pac org update-settings --settings-file ${args.settingsFile}`
    );
  }

  private async publishCustomizations(args: any): Promise<any> {
    const result = await runPacCommand(['solution', 'publish'], {
      async: args.async,
    });
    return {
      success: true,
      message: 'Customizations published successfully',
      output: result.stdout,
    };
  }
}