// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { runPacCommand } from '../runtime/pac.js';

export class SecurityTools {
  getTools(): Tool[] {
    return [
      {
        name: 'pp_assign_user',
        description: 'Assign user roles and manage permissions',
        inputSchema: {
          type: 'object',
          properties: {
            user: {
              type: 'string',
              description: 'User identifier (email or ID)'
            },
            role: {
              type: 'string',
              description: 'Security role to assign'
            },
            businessUnit: {
              type: 'string',
              description: 'Business unit for the user'
            },
            applicationUser: {
              type: 'boolean',
              description: 'Whether this is an application user'
            }
          },
          required: ['user', 'role']
        }
      },
      {
        name: 'pp_assign_group',
        description: 'Manage group-based access control and team management',
        inputSchema: {
          type: 'object',
          properties: {
            aadGroupId: {
              type: 'string',
              description: 'Azure AD group ID'
            },
            aadGroupName: {
              type: 'string',
              description: 'Azure AD group name'
            },
            dataverseTeamType: {
              type: 'string',
              enum: ['AadSecurityGroup', 'AadOfficeGroup'],
              description: 'Type of Dataverse team'
            },
            membershipType: {
              type: 'string',
              enum: ['Members', 'Owners', 'MembersAndGuests'],
              description: 'Group membership type'
            },
            teamName: {
              type: 'string',
              description: 'Name for the Dataverse team'
            },
            role: {
              type: 'string',
              description: 'Security role to assign to the group'
            },
            businessUnit: {
              type: 'string',
              description: 'Business unit for the team'
            }
          },
          required: ['aadGroupId', 'dataverseTeamType', 'teamName', 'role']
        }
      }
    ];
  }

  getHandlers(): Record<string, (args: any) => Promise<any>> {
    return {
      pp_assign_user: this.assignUser.bind(this),
      pp_assign_group: this.assignGroup.bind(this)
    };
  }

  private async assignUser(args: any): Promise<any> {
    const result = await runPacCommand(['admin', 'assign-user'], {
      user: args.user,
      role: args.role,
      businessUnit: args.businessUnit,
      applicationUser: args.applicationUser,
    });
    return {
      success: true,
      message: 'User role assigned successfully',
      user: args.user,
      role: args.role,
      output: result.stdout,
    };
  }

  private async assignGroup(args: any): Promise<any> {
    const result = await runPacCommand(['admin', 'assign-group'], {
      azureAadGroupId: args.aadGroupId,
      groupName: args.aadGroupName,
      teamType: args.dataverseTeamType,
      membershipType: args.membershipType,
      teamName: args.teamName,
      role: args.role,
      businessUnit: args.businessUnit,
    });
    return {
      success: true,
      message: 'Group assigned successfully',
      aadGroupId: args.aadGroupId,
      teamName: args.teamName,
      role: args.role,
      output: result.stdout,
    };
  }
}