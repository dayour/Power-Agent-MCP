// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
        const { main: installApplicationMain } = await import('../../tasks/install-application/install-application-v2/index.js');
        process.env.INPUT_APPLICATIONNAME = args.applicationName;
        if (args.applicationId)
            process.env.INPUT_APPLICATIONID = args.applicationId;
        if (args.targetEnvironment)
            process.env.INPUT_TARGETENVIRONMENT = args.targetEnvironment;
        try {
            await installApplicationMain();
            return {
                success: true,
                message: 'Application installed successfully',
                applicationName: args.applicationName
            };
        }
        catch (error) {
            throw new Error(`Failed to install application: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async deployPackage(args) {
        const { main: deployPackageMain } = await import('../../tasks/deploy-package/deploy-package-v2/index.js');
        process.env.INPUT_PACKAGEFILE = args.packageFile;
        if (args.packageName)
            process.env.INPUT_PACKAGENAME = args.packageName;
        if (args.useDeploymentSettingsFile !== undefined)
            process.env.INPUT_USEDEPLOYMENTSETTINGSFILE = String(args.useDeploymentSettingsFile);
        if (args.deploymentSettingsFile)
            process.env.INPUT_DEPLOYMENTSETTINGSFILE = args.deploymentSettingsFile;
        if (args.packageRuntimeSettingsFile)
            process.env.INPUT_PACKAGERUNTIMESETTINGSFILE = args.packageRuntimeSettingsFile;
        try {
            await deployPackageMain();
            return {
                success: true,
                message: 'Package deployed successfully',
                packageFile: args.packageFile
            };
        }
        catch (error) {
            throw new Error(`Failed to deploy package: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async installCatalog(args) {
        const { main: installCatalogMain } = await import('../../tasks/install-catalog/install-catalog-v2/index.js');
        process.env.INPUT_CATALOGITEMID = args.catalogItemId;
        if (args.targetEnvironment)
            process.env.INPUT_TARGETENVIRONMENT = args.targetEnvironment;
        if (args.targetVersion)
            process.env.INPUT_TARGETVERSION = args.targetVersion;
        try {
            await installCatalogMain();
            return {
                success: true,
                message: 'Catalog item installed successfully',
                catalogItemId: args.catalogItemId
            };
        }
        catch (error) {
            throw new Error(`Failed to install catalog item: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async submitCatalog(args) {
        const { main: submitCatalogMain } = await import('../../tasks/submit-catalog/submit-catalog-v2/index.js');
        process.env.INPUT_CATALOGSUBMISSIONFILE = args.catalogSubmissionFile;
        if (args.packageSolutionZipFile)
            process.env.INPUT_PACKAGESOLUTIONZIPFILE = args.packageSolutionZipFile;
        if (args.packageZipFile)
            process.env.INPUT_PACKAGEZIPFILE = args.packageZipFile;
        if (args.solutionZipFile)
            process.env.INPUT_SOLUTIONZIPFILE = args.solutionZipFile;
        if (args.pollStatus !== undefined)
            process.env.INPUT_POLLSTATUS = String(args.pollStatus);
        try {
            await submitCatalogMain();
            return {
                success: true,
                message: 'Catalog submission completed',
                catalogSubmissionFile: args.catalogSubmissionFile
            };
        }
        catch (error) {
            throw new Error(`Failed to submit to catalog: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}
