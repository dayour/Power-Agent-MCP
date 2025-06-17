// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Tool } from '@modelcontextprotocol/sdk/types.js';

export class PortalTools {
  getTools(): Tool[] {
    return [
      {
        name: 'pp_download_portal',
        description: 'Download Power Apps portal for backup and source control',
        inputSchema: {
          type: 'object',
          properties: {
            websiteId: {
              type: 'string',
              description: 'ID of the portal website to download'
            },
            path: {
              type: 'string',
              description: 'Path where portal files will be downloaded'
            },
            overwriteFiles: {
              type: 'boolean',
              description: 'Overwrite existing files during download'
            },
            excludeEntities: {
              type: 'string',
              description: 'Comma-separated list of entities to exclude'
            }
          },
          required: ['websiteId', 'path']
        }
      },
      {
        name: 'pp_upload_portal',
        description: 'Upload and deploy Power Apps portal configuration',
        inputSchema: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
              description: 'Path to portal files to upload'
            },
            deploymentProfile: {
              type: 'string',
              description: 'Deployment profile to use'
            },
            modelVersion: {
              type: 'string',
              description: 'Portal model version'
            },
            excludeEntities: {
              type: 'string',
              description: 'Comma-separated list of entities to exclude'
            }
          },
          required: ['path']
        }
      }
    ];
  }

  getHandlers(): Record<string, (args: any) => Promise<any>> {
    return {
      pp_download_portal: this.downloadPortal.bind(this),
      pp_upload_portal: this.uploadPortal.bind(this)
    };
  }

  private async downloadPortal(args: any): Promise<any> {
    const { main: downloadPortalMain } = await import('../../tasks/download-paportal/download-paportal-v2/index.js');
    
    process.env.INPUT_WEBSITEID = args.websiteId;
    process.env.INPUT_PATH = args.path;
    if (args.overwriteFiles !== undefined) process.env.INPUT_OVERWRITEFILES = String(args.overwriteFiles);
    if (args.excludeEntities) process.env.INPUT_EXCLUDEENTITIES = args.excludeEntities;

    try {
      await downloadPortalMain();
      return {
        success: true,
        message: 'Portal downloaded successfully',
        websiteId: args.websiteId,
        path: args.path
      };
    } catch (error) {
      throw new Error(`Failed to download portal: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private async uploadPortal(args: any): Promise<any> {
    const { main: uploadPortalMain } = await import('../../tasks/upload-paportal/upload-paportal-v2/index.js');
    
    process.env.INPUT_PATH = args.path;
    if (args.deploymentProfile) process.env.INPUT_DEPLOYMENTPROFILE = args.deploymentProfile;
    if (args.modelVersion) process.env.INPUT_MODELVERSION = args.modelVersion;
    if (args.excludeEntities) process.env.INPUT_EXCLUDEENTITIES = args.excludeEntities;

    try {
      await uploadPortalMain();
      return {
        success: true,
        message: 'Portal uploaded successfully',
        path: args.path
      };
    } catch (error) {
      throw new Error(`Failed to upload portal: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}