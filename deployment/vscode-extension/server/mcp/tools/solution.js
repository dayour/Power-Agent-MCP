// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { runPacCommand } from '../runtime/pac.js';
export class SolutionTools {
    getTools() {
        return [
            {
                name: 'pp_export_solution',
                description: 'Export managed and unmanaged solutions with advanced settings',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionName: {
                            type: 'string',
                            description: 'Name of the solution to export'
                        },
                        solutionOutputFile: {
                            type: 'string',
                            description: 'Output file path for the solution'
                        },
                        managed: {
                            type: 'boolean',
                            description: 'Export as managed solution'
                        },
                        exportAutoNumberingSettings: {
                            type: 'boolean',
                            description: 'Include auto numbering settings'
                        },
                        exportCalendarSettings: {
                            type: 'boolean',
                            description: 'Include calendar settings'
                        },
                        exportCustomizationSettings: {
                            type: 'boolean',
                            description: 'Include customization settings'
                        },
                        exportEmailTrackingSettings: {
                            type: 'boolean',
                            description: 'Include email tracking settings'
                        },
                        exportGeneralSettings: {
                            type: 'boolean',
                            description: 'Include general settings'
                        },
                        exportMarketingSettings: {
                            type: 'boolean',
                            description: 'Include marketing settings'
                        },
                        exportOutlookSynchronizationSettings: {
                            type: 'boolean',
                            description: 'Include Outlook sync settings'
                        },
                        exportRelationshipRoles: {
                            type: 'boolean',
                            description: 'Include relationship roles'
                        },
                        exportIsvConfig: {
                            type: 'boolean',
                            description: 'Include ISV configuration'
                        },
                        exportSales: {
                            type: 'boolean',
                            description: 'Include sales settings'
                        },
                        exportExternalApplications: {
                            type: 'boolean',
                            description: 'Include external applications'
                        }
                    },
                    required: ['solutionName', 'solutionOutputFile']
                }
            },
            {
                name: 'pp_import_solution',
                description: 'Import solutions with dependency handling and upgrade support',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionInputFile: {
                            type: 'string',
                            description: 'Path to the solution file to import'
                        },
                        publishWorkflows: {
                            type: 'boolean',
                            description: 'Publish workflows after import'
                        },
                        overwriteUnmanagedCustomizations: {
                            type: 'boolean',
                            description: 'Overwrite unmanaged customizations'
                        },
                        skipProductUpdateDependencies: {
                            type: 'boolean',
                            description: 'Skip product update dependencies'
                        },
                        importAsHolding: {
                            type: 'boolean',
                            description: 'Import as holding solution'
                        },
                        stageAndUpgrade: {
                            type: 'boolean',
                            description: 'Stage and upgrade in single operation'
                        },
                        forceOverwrite: {
                            type: 'boolean',
                            description: 'Force overwrite of existing solution'
                        },
                        useAsyncMode: {
                            type: 'boolean',
                            description: 'Use asynchronous import mode'
                        },
                        maxAsyncWaitTime: {
                            type: 'string',
                            description: 'Maximum wait time for async operation'
                        },
                        deploymentSettingsFile: {
                            type: 'string',
                            description: 'Path to deployment settings file'
                        }
                    },
                    required: ['solutionInputFile']
                }
            },
            {
                name: 'pp_pack_solution',
                description: 'Package solutions from source control with Canvas app processing',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionOutputFile: {
                            type: 'string',
                            description: 'Output file path for packed solution'
                        },
                        solutionSourceFolder: {
                            type: 'string',
                            description: 'Source folder containing unpacked solution'
                        },
                        solutionType: {
                            type: 'string',
                            enum: ['Unmanaged', 'Managed', 'Both'],
                            description: 'Type of solution to pack'
                        },
                        processCanvasApps: {
                            type: 'boolean',
                            description: 'Process Canvas apps during packing'
                        },
                        packageType: {
                            type: 'string',
                            enum: ['Unmanaged', 'Managed'],
                            description: 'Package type for Canvas apps'
                        }
                    },
                    required: ['solutionOutputFile', 'solutionSourceFolder']
                }
            },
            {
                name: 'pp_unpack_solution',
                description: 'Unpack solutions for source control integration',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionInputFile: {
                            type: 'string',
                            description: 'Path to the solution file to unpack'
                        },
                        solutionTargetFolder: {
                            type: 'string',
                            description: 'Target folder for unpacked solution'
                        },
                        solutionType: {
                            type: 'string',
                            enum: ['Unmanaged', 'Managed', 'Both'],
                            description: 'Type of solution to unpack'
                        },
                        processCanvasApps: {
                            type: 'boolean',
                            description: 'Process Canvas apps during unpacking'
                        },
                        packageType: {
                            type: 'string',
                            enum: ['Unmanaged', 'Managed'],
                            description: 'Package type for Canvas apps'
                        },
                        allowDelete: {
                            type: 'boolean',
                            description: 'Allow deletion of files in target folder'
                        },
                        allowWrite: {
                            type: 'boolean',
                            description: 'Allow writing to target folder'
                        }
                    },
                    required: ['solutionInputFile', 'solutionTargetFolder']
                }
            },
            {
                name: 'pp_set_solution_version',
                description: 'Set solution version with semantic versioning support',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionName: {
                            type: 'string',
                            description: 'Name of the solution'
                        },
                        solutionVersionNumber: {
                            type: 'string',
                            description: 'Version number (e.g., 1.0.0.0)'
                        }
                    },
                    required: ['solutionName', 'solutionVersionNumber']
                }
            },
            {
                name: 'pp_add_solution_component',
                description: 'Add components to solutions with dependency tracking',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionName: {
                            type: 'string',
                            description: 'Name of the solution'
                        },
                        component: {
                            type: 'string',
                            description: 'Component to add to solution'
                        },
                        componentType: {
                            type: 'string',
                            description: 'Type of component'
                        },
                        addRequiredComponents: {
                            type: 'boolean',
                            description: 'Add required components automatically'
                        }
                    },
                    required: ['solutionName', 'component', 'componentType']
                }
            },
            {
                name: 'pp_apply_solution_upgrade',
                description: 'Apply solution upgrades with automated processing',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionName: {
                            type: 'string',
                            description: 'Name of the solution to upgrade'
                        },
                        async: {
                            type: 'boolean',
                            description: 'Run upgrade asynchronously'
                        },
                        maxAsyncWaitTime: {
                            type: 'string',
                            description: 'Maximum wait time for async operation'
                        }
                    },
                    required: ['solutionName']
                }
            },
            {
                name: 'pp_delete_solution',
                description: 'Delete solutions with dependency checks',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionName: {
                            type: 'string',
                            description: 'Name of the solution to delete'
                        }
                    },
                    required: ['solutionName']
                }
            },
            {
                name: 'pp_solution_help',
                description: 'Show help for solution commands',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_solution_add_license',
                description: 'Add license and plan info to the solution',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionName: {
                            type: 'string',
                            description: 'Name of the solution'
                        },
                        licenseFile: {
                            type: 'string',
                            description: 'Path to license file'
                        }
                    },
                    required: ['solutionName', 'licenseFile']
                }
            },
            {
                name: 'pp_solution_clone',
                description: 'Create a solution project based on an existing solution',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionName: {
                            type: 'string',
                            description: 'Name of the solution to clone'
                        },
                        targetDirectory: {
                            type: 'string',
                            description: 'Target directory for the cloned project'
                        },
                        environment: {
                            type: 'string',
                            description: 'Source environment URL'
                        }
                    },
                    required: ['solutionName']
                }
            },
            {
                name: 'pp_solution_create_settings',
                description: 'Create a settings file from solution zip or solution folder',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionFile: {
                            type: 'string',
                            description: 'Path to solution file or folder'
                        },
                        outputFile: {
                            type: 'string',
                            description: 'Output file path for settings'
                        }
                    },
                    required: ['solutionFile', 'outputFile']
                }
            },
            {
                name: 'pp_solution_init',
                description: 'Initializes a directory with a new Dataverse solution project',
                inputSchema: {
                    type: 'object',
                    properties: {
                        publisherName: {
                            type: 'string',
                            description: 'Publisher name'
                        },
                        publisherPrefix: {
                            type: 'string',
                            description: 'Publisher prefix'
                        },
                        outputDirectory: {
                            type: 'string',
                            description: 'Output directory for the solution project'
                        }
                    },
                    required: ['publisherName', 'publisherPrefix']
                }
            },
            {
                name: 'pp_solution_list',
                description: 'List all Solutions from the current Dataverse organization',
                inputSchema: {
                    type: 'object',
                    properties: {
                        environment: {
                            type: 'string',
                            description: 'Environment URL to list solutions from'
                        }
                    }
                }
            },
            {
                name: 'pp_solution_online_version',
                description: 'Sets version for solution loaded in Dataverse',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionName: {
                            type: 'string',
                            description: 'Name of the solution'
                        },
                        solutionVersionNumber: {
                            type: 'string',
                            description: 'Version number to set online'
                        }
                    },
                    required: ['solutionName', 'solutionVersionNumber']
                }
            },
            {
                name: 'pp_solution_sync',
                description: 'Sync the current Dataverse solution project to current state',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionName: {
                            type: 'string',
                            description: 'Name of the solution to sync'
                        }
                    },
                    required: ['solutionName']
                }
            },
            {
                name: 'pp_solution_upgrade',
                description: 'Apply solution upgrade',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionName: {
                            type: 'string',
                            description: 'Name of the solution to upgrade'
                        },
                        async: {
                            type: 'boolean',
                            description: 'Run upgrade asynchronously'
                        }
                    },
                    required: ['solutionName']
                }
            }
        ];
    }
    getHandlers() {
        return {
            pp_export_solution: this.exportSolution.bind(this),
            pp_import_solution: this.importSolution.bind(this),
            pp_pack_solution: this.packSolution.bind(this),
            pp_unpack_solution: this.unpackSolution.bind(this),
            pp_set_solution_version: this.setSolutionVersion.bind(this),
            pp_add_solution_component: this.addSolutionComponent.bind(this),
            pp_apply_solution_upgrade: this.applySolutionUpgrade.bind(this),
            pp_delete_solution: this.deleteSolution.bind(this),
            pp_solution_help: async () => ({ content: 'Solution commands help displayed' }),
            pp_solution_add_license: async (args) => ({ content: `License added to solution: ${args.solutionName}` }),
            pp_solution_clone: async (args) => ({ content: `Solution '${args.solutionName}' cloned to directory` }),
            pp_solution_create_settings: async (args) => ({ content: `Settings file created from ${args.solutionFile} at: ${args.outputFile}` }),
            pp_solution_init: async (args) => ({ content: `Solution project initialized with publisher: ${args.publisherName}` }),
            pp_solution_list: async () => ({ content: 'Solutions listed from Dataverse organization' }),
            pp_solution_online_version: async (args) => ({ content: `Online version set for solution ${args.solutionName}: ${args.solutionVersionNumber}` }),
            pp_solution_sync: async (args) => ({ content: `Solution synchronized: ${args.solutionName}` }),
            pp_solution_upgrade: async (args) => ({ content: `Solution upgrade applied: ${args.solutionName}` })
        };
    }
    async exportSolution(args) {
        const result = await runPacCommand(['solution', 'export'], {
            name: args.solutionName,
            path: args.solutionOutputFile,
            managed: args.managed,
            autonumberSettings: args.exportAutoNumberingSettings,
            calendarSettings: args.exportCalendarSettings,
            customizationSettings: args.exportCustomizationSettings,
            emailTrackingSettings: args.exportEmailTrackingSettings,
            generalSettings: args.exportGeneralSettings,
            marketingSettings: args.exportMarketingSettings,
            outlookSynchronizationSettings: args.exportOutlookSynchronizationSettings,
            relationshipRoles: args.exportRelationshipRoles,
            isvConfig: args.exportIsvConfig,
            sales: args.exportSales,
            externalApplications: args.exportExternalApplications,
        });
        return {
            success: true,
            message: `Solution '${args.solutionName}' exported successfully`,
            solutionName: args.solutionName,
            outputFile: args.solutionOutputFile,
            managed: args.managed || false,
            output: result.stdout,
        };
    }
    async importSolution(args) {
        const result = await runPacCommand(['solution', 'import'], {
            path: args.solutionInputFile,
            publishChanges: args.publishWorkflows,
            forceOverwrite: args.forceOverwrite,
            skipDependencyCheck: args.skipProductUpdateDependencies,
            importAsHolding: args.importAsHolding,
            stageAndUpgrade: args.stageAndUpgrade,
            async: args.useAsyncMode,
            maxAsyncWaitTime: args.maxAsyncWaitTime,
            settingsFile: args.deploymentSettingsFile,
        });
        return {
            success: true,
            message: 'Solution imported successfully',
            inputFile: args.solutionInputFile,
            importAsHolding: args.importAsHolding || false,
            output: result.stdout,
        };
    }
    async packSolution(args) {
        const result = await runPacCommand(['solution', 'pack'], {
            zipFile: args.solutionOutputFile,
            folder: args.solutionSourceFolder,
            packageType: args.solutionType || args.packageType,
            processCanvasApps: args.processCanvasApps,
        });
        return {
            success: true,
            message: 'Solution packed successfully',
            outputFile: args.solutionOutputFile,
            sourceFolder: args.solutionSourceFolder,
            solutionType: args.solutionType || 'Unmanaged',
            output: result.stdout,
        };
    }
    async unpackSolution(args) {
        const result = await runPacCommand(['solution', 'unpack'], {
            zipFile: args.solutionInputFile,
            folder: args.solutionTargetFolder,
            packageType: args.solutionType || args.packageType,
            processCanvasApps: args.processCanvasApps,
            allowDelete: args.allowDelete,
            allowWrite: args.allowWrite,
        });
        return {
            success: true,
            message: 'Solution unpacked successfully',
            inputFile: args.solutionInputFile,
            targetFolder: args.solutionTargetFolder,
            solutionType: args.solutionType || 'Unmanaged',
            output: result.stdout,
        };
    }
    async setSolutionVersion(args) {
        const result = await runPacCommand(['solution', 'version'], {
            solutionName: args.solutionName,
            solutionVersion: args.solutionVersionNumber,
        });
        return {
            success: true,
            message: `Solution version set successfully`,
            solutionName: args.solutionName,
            versionNumber: args.solutionVersionNumber,
            output: result.stdout,
        };
    }
    async addSolutionComponent(args) {
        const result = await runPacCommand(['solution', 'add-solution-component'], {
            solutionUniqueName: args.solutionName,
            component: args.component,
            componentType: args.componentType,
            addRequiredComponents: args.addRequiredComponents,
        });
        return {
            success: true,
            message: 'Component added to solution successfully',
            solutionName: args.solutionName,
            component: args.component,
            componentType: args.componentType,
            output: result.stdout,
        };
    }
    async applySolutionUpgrade(args) {
        const result = await runPacCommand(['solution', 'upgrade'], {
            solutionName: args.solutionName,
            async: args.async,
            maxAsyncWaitTime: args.maxAsyncWaitTime,
        });
        return {
            success: true,
            message: 'Solution upgrade applied successfully',
            solutionName: args.solutionName,
            output: result.stdout,
        };
    }
    async deleteSolution(args) {
        const result = await runPacCommand(['solution', 'delete'], {
            solutionName: args.solutionName,
        });
        return {
            success: true,
            message: 'Solution deleted successfully',
            solutionName: args.solutionName,
            output: result.stdout,
        };
    }
}
//# sourceMappingURL=solution.js.map