// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Tool } from '@modelcontextprotocol/sdk/types.js';

export class EnvironmentTools {
  getTools(): Tool[] {
    return [
      {
        name: 'pp_create_environment',
        description: 'Create a new Power Platform environment with customizable settings',
        inputSchema: {
          type: 'object',
          properties: {
            displayName: {
              type: 'string',
              description: 'Display name for the environment'
            },
            environmentType: {
              type: 'string',
              enum: ['Production', 'Sandbox', 'Trial', 'Developer'],
              description: 'Type of environment to create'
            },
            region: {
              type: 'string',
              description: 'Azure region for the environment'
            },
            currency: {
              type: 'string',
              description: 'Currency code (e.g., USD, EUR)'
            },
            language: {
              type: 'string',
              description: 'Language code (e.g., en-US, fr-FR)'
            },
            domainName: {
              type: 'string',
              description: 'Domain name for the environment'
            },
            securityGroupId: {
              type: 'string',
              description: 'Security group ID for environment access'
            }
          },
          required: ['displayName', 'environmentType']
        }
      },
      {
        name: 'pp_delete_environment',
        description: 'Delete a Power Platform environment and clean up resources',
        inputSchema: {
          type: 'object',
          properties: {
            environmentUrl: {
              type: 'string',
              description: 'URL of the environment to delete'
            },
            environmentId: {
              type: 'string',
              description: 'ID of the environment to delete'
            }
          },
          required: ['environmentUrl']
        }
      },
      {
        name: 'pp_backup_environment',
        description: 'Create a backup of a Power Platform environment',
        inputSchema: {
          type: 'object',
          properties: {
            environmentUrl: {
              type: 'string',
              description: 'URL of the environment to backup'
            },
            backupLabel: {
              type: 'string',
              description: 'Label for the backup'
            },
            notes: {
              type: 'string',
              description: 'Notes for the backup'
            }
          },
          required: ['environmentUrl', 'backupLabel']
        }
      },
      {
        name: 'pp_restore_environment',
        description: 'Restore a Power Platform environment from backup',
        inputSchema: {
          type: 'object',
          properties: {
            sourceEnvironmentUrl: {
              type: 'string',
              description: 'URL of the source environment'
            },
            targetEnvironmentUrl: {
              type: 'string',
              description: 'URL of the target environment'
            },
            backupDateTime: {
              type: 'string',
              description: 'Date and time of the backup to restore'
            },
            skipAuditData: {
              type: 'boolean',
              description: 'Skip audit data during restore'
            },
            maxAsyncWaitTimeInMin: {
              type: 'number',
              description: 'Maximum wait time for async operation in minutes'
            }
          },
          required: ['sourceEnvironmentUrl', 'targetEnvironmentUrl']
        }
      },
      {
        name: 'pp_copy_environment',
        description: 'Copy a Power Platform environment for dev/test scenarios',
        inputSchema: {
          type: 'object',
          properties: {
            sourceEnvironmentUrl: {
              type: 'string',
              description: 'URL of the source environment'
            },
            targetEnvironmentUrl: {
              type: 'string',
              description: 'URL of the target environment'
            },
            copyType: {
              type: 'string',
              enum: ['Full', 'Minimal'],
              description: 'Type of copy operation'
            },
            skipAuditData: {
              type: 'boolean',
              description: 'Skip audit data during copy'
            },
            maxAsyncWaitTimeInMin: {
              type: 'number',
              description: 'Maximum wait time for async operation in minutes'
            }
          },
          required: ['sourceEnvironmentUrl', 'targetEnvironmentUrl']
        }
      },
      {
        name: 'pp_reset_environment',
        description: 'Reset a Power Platform environment to factory defaults',
        inputSchema: {
          type: 'object',
          properties: {
            environmentUrl: {
              type: 'string',
              description: 'URL of the environment to reset'
            },
            currency: {
              type: 'string',
              description: 'Currency code for the reset environment'
            },
            language: {
              type: 'string',
              description: 'Language code for the reset environment'
            },
            purpose: {
              type: 'string',
              description: 'Purpose of the environment reset'
            }
          },
          required: ['environmentUrl']
        }
      }
    ];
  }

  getHandlers(): Record<string, (args: any) => Promise<any>> {
    return {
      pp_create_environment: this.createEnvironment.bind(this),
      pp_delete_environment: this.deleteEnvironment.bind(this),
      pp_backup_environment: this.backupEnvironment.bind(this),
      pp_restore_environment: this.restoreEnvironment.bind(this),
      pp_copy_environment: this.copyEnvironment.bind(this),
      pp_reset_environment: this.resetEnvironment.bind(this)
    };
  }

  private async createEnvironment(args: any): Promise<any> {
    // Import the actual task implementation
    const { main: createEnvironmentMain } = await import('../../tasks/create-environment/create-environment-v2/index.js');
    
    // Set up task library inputs
    process.env.INPUT_DISPLAYNAME = args.displayName;
    process.env.INPUT_ENVIRONMENTTYPE = args.environmentType;
    if (args.region) process.env.INPUT_REGION = args.region;
    if (args.currency) process.env.INPUT_CURRENCY = args.currency;
    if (args.language) process.env.INPUT_LANGUAGE = args.language;
    if (args.domainName) process.env.INPUT_DOMAINNAME = args.domainName;
    if (args.securityGroupId) process.env.INPUT_SECURITYGROUPID = args.securityGroupId;

    try {
      await createEnvironmentMain();
      return {
        success: true,
        message: `Environment '${args.displayName}' created successfully`,
        displayName: args.displayName,
        environmentType: args.environmentType
      };
    } catch (error) {
      throw new Error(`Failed to create environment: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private async deleteEnvironment(args: any): Promise<any> {
    const { main: deleteEnvironmentMain } = await import('../../tasks/delete-environment/delete-environment-v2/index.js');
    
    process.env.INPUT_ENVIRONMENTURL = args.environmentUrl;
    if (args.environmentId) process.env.INPUT_ENVIRONMENTID = args.environmentId;

    try {
      await deleteEnvironmentMain();
      return {
        success: true,
        message: 'Environment deleted successfully',
        environmentUrl: args.environmentUrl
      };
    } catch (error) {
      throw new Error(`Failed to delete environment: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private async backupEnvironment(args: any): Promise<any> {
    const { main: backupEnvironmentMain } = await import('../../tasks/backup-environment/backup-environment-v2/index.js');
    
    process.env.INPUT_ENVIRONMENTURL = args.environmentUrl;
    process.env.INPUT_BACKUPLABEL = args.backupLabel;
    if (args.notes) process.env.INPUT_NOTES = args.notes;

    try {
      await backupEnvironmentMain();
      return {
        success: true,
        message: 'Environment backup created successfully',
        environmentUrl: args.environmentUrl,
        backupLabel: args.backupLabel
      };
    } catch (error) {
      throw new Error(`Failed to backup environment: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private async restoreEnvironment(args: any): Promise<any> {
    const { main: restoreEnvironmentMain } = await import('../../tasks/restore-environment/restore-environment-v2/index.js');
    
    process.env.INPUT_SOURCEENVIRONMENTURL = args.sourceEnvironmentUrl;
    process.env.INPUT_TARGETENVIRONMENTURL = args.targetEnvironmentUrl;
    if (args.backupDateTime) process.env.INPUT_BACKUPDATETIME = args.backupDateTime;
    if (args.skipAuditData !== undefined) process.env.INPUT_SKIPAUDITDATA = String(args.skipAuditData);
    if (args.maxAsyncWaitTimeInMin) process.env.INPUT_MAXASYNCWAITTIMEINMIN = String(args.maxAsyncWaitTimeInMin);

    try {
      await restoreEnvironmentMain();
      return {
        success: true,
        message: 'Environment restored successfully',
        sourceEnvironmentUrl: args.sourceEnvironmentUrl,
        targetEnvironmentUrl: args.targetEnvironmentUrl
      };
    } catch (error) {
      throw new Error(`Failed to restore environment: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private async copyEnvironment(args: any): Promise<any> {
    const { main: copyEnvironmentMain } = await import('../../tasks/copy-environment/copy-environment-v2/index.js');
    
    process.env.INPUT_SOURCEENVIRONMENTURL = args.sourceEnvironmentUrl;
    process.env.INPUT_TARGETENVIRONMENTURL = args.targetEnvironmentUrl;
    if (args.copyType) process.env.INPUT_COPYTYPE = args.copyType;
    if (args.skipAuditData !== undefined) process.env.INPUT_SKIPAUDITDATA = String(args.skipAuditData);
    if (args.maxAsyncWaitTimeInMin) process.env.INPUT_MAXASYNCWAITTIMEINMIN = String(args.maxAsyncWaitTimeInMin);

    try {
      await copyEnvironmentMain();
      return {
        success: true,
        message: 'Environment copied successfully',
        sourceEnvironmentUrl: args.sourceEnvironmentUrl,
        targetEnvironmentUrl: args.targetEnvironmentUrl
      };
    } catch (error) {
      throw new Error(`Failed to copy environment: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private async resetEnvironment(args: any): Promise<any> {
    const { main: resetEnvironmentMain } = await import('../../tasks/reset-environment/reset-environment-v2/index.js');
    
    process.env.INPUT_ENVIRONMENTURL = args.environmentUrl;
    if (args.currency) process.env.INPUT_CURRENCY = args.currency;
    if (args.language) process.env.INPUT_LANGUAGE = args.language;
    if (args.purpose) process.env.INPUT_PURPOSE = args.purpose;

    try {
      await resetEnvironmentMain();
      return {
        success: true,
        message: 'Environment reset successfully',
        environmentUrl: args.environmentUrl
      };
    } catch (error) {
      throw new Error(`Failed to reset environment: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}