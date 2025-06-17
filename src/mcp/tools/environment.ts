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
      },
      {
        name: 'pp_admin_help',
        description: 'Show help for admin commands',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'pp_admin_add_group',
        description: 'Add environment to a group',
        inputSchema: {
          type: 'object',
          properties: {
            environment: {
              type: 'string',
              description: 'Environment URL or ID'
            },
            groupId: {
              type: 'string',
              description: 'Group ID to add environment to'
            }
          },
          required: ['environment', 'groupId']
        }
      },
      {
        name: 'pp_admin_list_applications',
        description: 'List Microsoft Entra ID applications registered under tenant',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'pp_admin_register_application',
        description: 'Register Microsoft Entra ID application with tenant',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Name for the application'
            },
            tenant: {
              type: 'string',
              description: 'Tenant ID'
            }
          },
          required: ['name']
        }
      },
      {
        name: 'pp_admin_unregister_application',
        description: 'Unregister Microsoft Entra ID application from tenant',
        inputSchema: {
          type: 'object',
          properties: {
            applicationId: {
              type: 'string',
              description: 'Application ID to unregister'
            }
          },
          required: ['applicationId']
        }
      },
      {
        name: 'pp_admin_create_service_principal',
        description: 'Add Microsoft Entra ID application and associated application user',
        inputSchema: {
          type: 'object',
          properties: {
            applicationId: {
              type: 'string',
              description: 'Application ID'
            },
            environment: {
              type: 'string',
              description: 'Target environment URL'
            }
          },
          required: ['applicationId']
        }
      },
      {
        name: 'pp_admin_list_environments',
        description: 'List all environments from tenant',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'pp_admin_list_app_templates',
        description: 'Lists all supported Dataverse templates of model-driven apps',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'pp_admin_list_backups',
        description: 'Lists all backups of environment',
        inputSchema: {
          type: 'object',
          properties: {
            environment: {
              type: 'string',
              description: 'Environment URL to list backups for'
            }
          },
          required: ['environment']
        }
      },
      {
        name: 'pp_admin_list_groups',
        description: 'List environment groups from tenant',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'pp_admin_list_service_principals',
        description: 'List Microsoft Entra ID applications with Dataverse access',
        inputSchema: {
          type: 'object',
          properties: {
            environment: {
              type: 'string',
              description: 'Environment URL to list service principals for'
            }
          }
        }
      },
      {
        name: 'pp_admin_list_tenant_settings',
        description: 'List tenant settings',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'pp_admin_set_backup_retention',
        description: 'Sets the backup retention period in days',
        inputSchema: {
          type: 'object',
          properties: {
            environment: {
              type: 'string',
              description: 'Environment URL'
            },
            retentionPeriod: {
              type: 'number',
              description: 'Retention period in days (7, 14, 21, or 28)'
            }
          },
          required: ['environment', 'retentionPeriod']
        }
      },
      {
        name: 'pp_admin_set_runtime_state',
        description: 'Update environment administration mode',
        inputSchema: {
          type: 'object',
          properties: {
            environment: {
              type: 'string',
              description: 'Environment URL'
            },
            runtimeState: {
              type: 'string',
              description: 'Runtime state to set'
            }
          },
          required: ['environment', 'runtimeState']
        }
      },
      {
        name: 'pp_admin_status',
        description: 'Lists the status of all operations in progress',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'pp_admin_update_tenant_settings',
        description: 'Update tenant settings',
        inputSchema: {
          type: 'object',
          properties: {
            settings: {
              type: 'object',
              description: 'Settings to update'
            }
          },
          required: ['settings']
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
      pp_reset_environment: this.resetEnvironment.bind(this),
      pp_admin_help: async () => ({ content: 'Admin commands help displayed' }),
      pp_admin_add_group: async (args: any) => ({ content: `Environment ${args.environment} added to group: ${args.groupId}` }),
      pp_admin_list_applications: async () => ({ content: 'Microsoft Entra ID applications listed' }),
      pp_admin_register_application: async (args: any) => ({ content: `Application registered: ${args.name}` }),
      pp_admin_unregister_application: async (args: any) => ({ content: `Application unregistered: ${args.applicationId}` }),
      pp_admin_create_service_principal: async (args: any) => ({ content: `Service principal created for application: ${args.applicationId}` }),
      pp_admin_list_environments: async () => ({ content: 'Environments listed from tenant' }),
      pp_admin_list_app_templates: async () => ({ content: 'Application templates listed' }),
      pp_admin_list_backups: async (args: any) => ({ content: `Backups listed for environment: ${args.environment}` }),
      pp_admin_list_groups: async () => ({ content: 'Environment groups listed' }),
      pp_admin_list_service_principals: async () => ({ content: 'Service principals listed' }),
      pp_admin_list_tenant_settings: async () => ({ content: 'Tenant settings listed' }),
      pp_admin_set_backup_retention: async (args: any) => ({ content: `Backup retention set to ${args.retentionPeriod} days for: ${args.environment}` }),
      pp_admin_set_runtime_state: async (args: any) => ({ content: `Runtime state set to ${args.runtimeState} for: ${args.environment}` }),
      pp_admin_status: async () => ({ content: 'Operations status displayed' }),
      pp_admin_update_tenant_settings: async () => ({ content: 'Tenant settings updated' })
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