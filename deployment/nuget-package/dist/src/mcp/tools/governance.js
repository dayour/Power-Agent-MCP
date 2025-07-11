// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export class GovernanceTools {
    getTools() {
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
    getHandlers() {
        return {
            pp_set_connection_variables: this.setConnectionVariables.bind(this),
            pp_set_governance_config: this.setGovernanceConfig.bind(this),
            pp_update_org_settings: this.updateOrgSettings.bind(this),
            pp_publish_customizations: this.publishCustomizations.bind(this)
        };
    }
    async setConnectionVariables(args) {
        const { main: setConnectionVariablesMain } = await import('../../tasks/set-connection-variables/set-connection-variables-v2/index.js');
        process.env.INPUT_CONNECTIONVARIABLESFILE = args.connectionVariablesFile;
        try {
            await setConnectionVariablesMain();
            return {
                success: true,
                message: 'Connection variables set successfully',
                connectionVariablesFile: args.connectionVariablesFile
            };
        }
        catch (error) {
            throw new Error(`Failed to set connection variables: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async setGovernanceConfig(args) {
        const { main: setGovernanceConfigMain } = await import('../../tasks/set-governance-config/set-governance-config-v2/index.js');
        process.env.INPUT_CONFIGURATIONFILE = args.configurationFile;
        try {
            await setGovernanceConfigMain();
            return {
                success: true,
                message: 'Governance configuration set successfully',
                configurationFile: args.configurationFile
            };
        }
        catch (error) {
            throw new Error(`Failed to set governance config: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async updateOrgSettings(args) {
        const { main: updateOrgSettingsMain } = await import('../../tasks/update-org-settings/update-org-settings-v2/index.js');
        process.env.INPUT_SETTINGSFILE = args.settingsFile;
        try {
            await updateOrgSettingsMain();
            return {
                success: true,
                message: 'Organization settings updated successfully',
                settingsFile: args.settingsFile
            };
        }
        catch (error) {
            throw new Error(`Failed to update org settings: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async publishCustomizations(args) {
        const { main: publishCustomizationsMain } = await import('../../tasks/publish-customizations/publish-customizations-v2/index.js');
        if (args.async !== undefined)
            process.env.INPUT_ASYNC = String(args.async);
        try {
            await publishCustomizationsMain();
            return {
                success: true,
                message: 'Customizations published successfully'
            };
        }
        catch (error) {
            throw new Error(`Failed to publish customizations: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}
