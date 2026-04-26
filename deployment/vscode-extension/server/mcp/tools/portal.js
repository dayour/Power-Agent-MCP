// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { runPacCommand } from '../runtime/pac.js';
export class PortalTools {
    getTools() {
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
    getHandlers() {
        return {
            pp_download_portal: this.downloadPortal.bind(this),
            pp_upload_portal: this.uploadPortal.bind(this)
        };
    }
    async downloadPortal(args) {
        const result = await runPacCommand(['paportal', 'download'], {
            websiteId: args.websiteId,
            path: args.path,
            overwriteFiles: args.overwriteFiles,
            excludeEntities: args.excludeEntities,
        });
        return {
            success: true,
            message: 'Portal downloaded successfully',
            websiteId: args.websiteId,
            path: args.path,
            output: result.stdout,
        };
    }
    async uploadPortal(args) {
        const result = await runPacCommand(['paportal', 'upload'], {
            path: args.path,
            deploymentProfile: args.deploymentProfile,
            modelVersion: args.modelVersion,
            excludeEntities: args.excludeEntities,
        });
        return {
            success: true,
            message: 'Portal uploaded successfully',
            path: args.path,
            output: result.stdout,
        };
    }
}
//# sourceMappingURL=portal.js.map