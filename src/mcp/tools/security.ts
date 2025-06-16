// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Tool } from '@modelcontextprotocol/sdk/types.js';

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
    const { main: assignUserMain } = await import('../../tasks/assign-user/assign-user-v2/index.js');
    
    process.env.INPUT_USER = args.user;
    process.env.INPUT_ROLE = args.role;
    if (args.businessUnit) process.env.INPUT_BUSINESSUNIT = args.businessUnit;
    if (args.applicationUser !== undefined) process.env.INPUT_APPLICATIONUSER = String(args.applicationUser);

    try {
      await assignUserMain();
      return {
        success: true,
        message: 'User role assigned successfully',
        user: args.user,
        role: args.role
      };
    } catch (error) {
      throw new Error(`Failed to assign user: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private async assignGroup(args: any): Promise<any> {
    const { main: assignGroupMain } = await import('../../tasks/assign-group/assign-group-v2/index.js');
    
    process.env.INPUT_AADGROUPID = args.aadGroupId;
    if (args.aadGroupName) process.env.INPUT_AADGROUPNAME = args.aadGroupName;
    process.env.INPUT_DATAVERSETEAMTYPE = args.dataverseTeamType;
    if (args.membershipType) process.env.INPUT_MEMBERSHIPTYPE = args.membershipType;
    process.env.INPUT_TEAMNAME = args.teamName;
    process.env.INPUT_ROLE = args.role;
    if (args.businessUnit) process.env.INPUT_BUSINESSUNIT = args.businessUnit;

    try {
      await assignGroupMain();
      return {
        success: true,
        message: 'Group assigned successfully',
        aadGroupId: args.aadGroupId,
        teamName: args.teamName,
        role: args.role
      };
    } catch (error) {
      throw new Error(`Failed to assign group: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}