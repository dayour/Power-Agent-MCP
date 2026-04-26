// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { runPacCommand } from '../runtime/pac.js';
export class ApplicationTools {
    getTools() {
        return [
            {
                name: 'pp_application_help',
                description: 'Show help for application commands',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_install_application',
                description: 'Install applications from catalog or AppSource',
                inputSchema: {
                    type: 'object',
                    properties: {
                        applicationName: {
                            type: 'string',
                            description: 'Name of the application to install'
                        },
                        applicationId: {
                            type: 'string',
                            description: 'ID of the application to install'
                        },
                        targetEnvironment: {
                            type: 'string',
                            description: 'Target environment for installation'
                        }
                    },
                    required: ['applicationName']
                }
            },
            {
                name: 'pp_application_list',
                description: 'List available Dataverse applications from AppSource',
                inputSchema: {
                    type: 'object',
                    properties: {
                        environment: {
                            type: 'string',
                            description: 'Target environment URL'
                        }
                    }
                }
            },
            {
                name: 'pp_deploy_package',
                description: 'Deploy packages with settings management',
                inputSchema: {
                    type: 'object',
                    properties: {
                        packageFile: {
                            type: 'string',
                            description: 'Path to the package file'
                        },
                        packageName: {
                            type: 'string',
                            description: 'Name of the package'
                        },
                        useDeploymentSettingsFile: {
                            type: 'boolean',
                            description: 'Use deployment settings file'
                        },
                        deploymentSettingsFile: {
                            type: 'string',
                            description: 'Path to deployment settings file'
                        },
                        packageRuntimeSettingsFile: {
                            type: 'string',
                            description: 'Path to package runtime settings file'
                        }
                    },
                    required: ['packageFile']
                }
            },
            {
                name: 'pp_install_catalog',
                description: 'Install catalog applications',
                inputSchema: {
                    type: 'object',
                    properties: {
                        catalogItemId: {
                            type: 'string',
                            description: 'ID of the catalog item to install'
                        },
                        targetEnvironment: {
                            type: 'string',
                            description: 'Target environment for installation'
                        },
                        targetVersion: {
                            type: 'string',
                            description: 'Target version to install'
                        }
                    },
                    required: ['catalogItemId']
                }
            },
            {
                name: 'pp_submit_catalog',
                description: 'Submit applications to catalog',
                inputSchema: {
                    type: 'object',
                    properties: {
                        catalogSubmissionFile: {
                            type: 'string',
                            description: 'Path to catalog submission file'
                        },
                        packageSolutionZipFile: {
                            type: 'string',
                            description: 'Path to package solution zip file'
                        },
                        packageZipFile: {
                            type: 'string',
                            description: 'Path to package zip file'
                        },
                        solutionZipFile: {
                            type: 'string',
                            description: 'Path to solution zip file'
                        },
                        pollStatus: {
                            type: 'boolean',
                            description: 'Poll submission status'
                        }
                    },
                    required: ['catalogSubmissionFile']
                }
            }
        ];
    }
    getHandlers() {
        return {
            pp_install_application: this.installApplication.bind(this),
            pp_deploy_package: this.deployPackage.bind(this),
            pp_install_catalog: this.installCatalog.bind(this),
            pp_submit_catalog: this.submitCatalog.bind(this)
        };
    }
    async installApplication(args) {
        const result = await runPacCommand(['application', 'install'], {
            applicationName: args.applicationName,
            applicationId: args.applicationId,
            environment: args.targetEnvironment,
        });
        return {
            success: true,
            message: 'Application installed successfully',
            applicationName: args.applicationName,
            output: result.stdout,
        };
    }
    async deployPackage(args) {
        const result = await runPacCommand(['package', 'deploy'], {
            packageFile: args.packageFile,
            packageName: args.packageName,
            useDeploymentSettingsFile: args.useDeploymentSettingsFile,
            settingsFile: args.deploymentSettingsFile,
            packageRuntimeSettingsFile: args.packageRuntimeSettingsFile,
        });
        return {
            success: true,
            message: 'Package deployed successfully',
            packageFile: args.packageFile,
            output: result.stdout,
        };
    }
    async installCatalog(args) {
        const result = await runPacCommand(['catalog', 'install'], {
            catalogItemId: args.catalogItemId,
            targetEnvironment: args.targetEnvironment,
            targetVersion: args.targetVersion,
        });
        return {
            success: true,
            message: 'Catalog item installed successfully',
            catalogItemId: args.catalogItemId,
            output: result.stdout,
        };
    }
    async submitCatalog(args) {
        const result = await runPacCommand(['catalog', 'submit'], {
            submissionFile: args.catalogSubmissionFile,
            packageSolutionZipFile: args.packageSolutionZipFile,
            packageZipFile: args.packageZipFile,
            solutionZipFile: args.solutionZipFile,
            pollStatus: args.pollStatus,
        });
        return {
            success: true,
            message: 'Catalog submission completed',
            catalogSubmissionFile: args.catalogSubmissionFile,
            output: result.stdout,
        };
    }
}
//# sourceMappingURL=application.js.map