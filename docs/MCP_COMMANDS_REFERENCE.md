# Power Agent MCP Commands Reference

This document provides a comprehensive reference for all Model Context Protocol (MCP) commands available in the Power Agent MCP server.

## Overview

Power Agent MCP provides 32 tools that expose the complete functionality of Microsoft Power Platform Build Tools through the Model Context Protocol. These tools cover the full Power Platform DevOps lifecycle including environment management, solution development, deployment, governance, and monitoring.

## Tool Categories

### Environment Management (6 tools)

#### `pp_create_environment`
Create a new Power Platform environment with customizable settings.

**Parameters:**
- `displayName` (required): Display name for the environment
- `environmentType` (required): Type of environment (`Production`, `Sandbox`, `Trial`, `Developer`)
- `region`: Azure region for the environment
- `currency`: Currency code (e.g., USD, EUR)
- `language`: Language code (e.g., en-US, fr-FR)
- `domainName`: Domain name for the environment
- `securityGroupId`: Security group ID for environment access

**Example:**
```json
{
  "displayName": "Development Environment",
  "environmentType": "Sandbox",
  "region": "unitedstates",
  "currency": "USD",
  "language": "en-US"
}
```

#### `pp_delete_environment`
Delete a Power Platform environment and clean up resources.

**Parameters:**
- `environmentUrl` (required): URL of the environment to delete
- `environmentId`: ID of the environment to delete

#### `pp_backup_environment`
Create a backup of a Power Platform environment.

**Parameters:**
- `environmentUrl` (required): URL of the environment to backup
- `backupLabel` (required): Label for the backup
- `notes`: Notes for the backup

#### `pp_restore_environment`
Restore a Power Platform environment from backup.

**Parameters:**
- `sourceEnvironmentUrl` (required): URL of the source environment
- `targetEnvironmentUrl` (required): URL of the target environment
- `backupDateTime`: Date and time of the backup to restore
- `skipAuditData`: Skip audit data during restore
- `maxAsyncWaitTimeInMin`: Maximum wait time for async operation in minutes

#### `pp_copy_environment`
Copy a Power Platform environment for dev/test scenarios.

**Parameters:**
- `sourceEnvironmentUrl` (required): URL of the source environment
- `targetEnvironmentUrl` (required): URL of the target environment
- `copyType`: Type of copy operation (`Full`, `Minimal`)
- `skipAuditData`: Skip audit data during copy
- `maxAsyncWaitTimeInMin`: Maximum wait time for async operation in minutes

#### `pp_reset_environment`
Reset a Power Platform environment to factory defaults.

**Parameters:**
- `environmentUrl` (required): URL of the environment to reset
- `currency`: Currency code for the reset environment
- `language`: Language code for the reset environment
- `purpose`: Purpose of the environment reset

### Solution Management (8 tools)

#### `pp_export_solution`
Export managed and unmanaged solutions with advanced settings.

**Parameters:**
- `solutionName` (required): Name of the solution to export
- `solutionOutputFile` (required): Output file path for the solution
- `managed`: Export as managed solution
- `exportAutoNumberingSettings`: Include auto numbering settings
- `exportCalendarSettings`: Include calendar settings
- `exportCustomizationSettings`: Include customization settings
- `exportEmailTrackingSettings`: Include email tracking settings
- `exportGeneralSettings`: Include general settings
- `exportMarketingSettings`: Include marketing settings
- `exportOutlookSynchronizationSettings`: Include Outlook sync settings
- `exportRelationshipRoles`: Include relationship roles
- `exportIsvConfig`: Include ISV configuration
- `exportSales`: Include sales settings
- `exportExternalApplications`: Include external applications

#### `pp_import_solution`
Import solutions with dependency handling and upgrade support.

**Parameters:**
- `solutionInputFile` (required): Path to the solution file to import
- `publishWorkflows`: Publish workflows after import
- `overwriteUnmanagedCustomizations`: Overwrite unmanaged customizations
- `skipProductUpdateDependencies`: Skip product update dependencies
- `importAsHolding`: Import as holding solution
- `stageAndUpgrade`: Stage and upgrade in single operation
- `forceOverwrite`: Force overwrite of existing solution
- `useAsyncMode`: Use asynchronous import mode
- `maxAsyncWaitTime`: Maximum wait time for async operation
- `deploymentSettingsFile`: Path to deployment settings file

#### `pp_pack_solution`
Package solutions from source control with Canvas app processing.

**Parameters:**
- `solutionOutputFile` (required): Output file path for packed solution
- `solutionSourceFolder` (required): Source folder containing unpacked solution
- `solutionType`: Type of solution to pack (`Unmanaged`, `Managed`, `Both`)
- `processCanvasApps`: Process Canvas apps during packing
- `packageType`: Package type for Canvas apps (`Unmanaged`, `Managed`)

#### `pp_unpack_solution`
Unpack solutions for source control integration.

**Parameters:**
- `solutionInputFile` (required): Path to the solution file to unpack
- `solutionTargetFolder` (required): Target folder for unpacked solution
- `solutionType`: Type of solution to unpack (`Unmanaged`, `Managed`, `Both`)
- `processCanvasApps`: Process Canvas apps during unpacking
- `packageType`: Package type for Canvas apps (`Unmanaged`, `Managed`)
- `allowDelete`: Allow deletion of files in target folder
- `allowWrite`: Allow writing to target folder

#### `pp_set_solution_version`
Set solution version with semantic versioning support.

**Parameters:**
- `solutionName` (required): Name of the solution
- `solutionVersionNumber` (required): Version number (e.g., 1.0.0.0)

#### `pp_add_solution_component`
Add components to solutions with dependency tracking.

**Parameters:**
- `solutionName` (required): Name of the solution
- `component` (required): Component to add to solution
- `componentType` (required): Type of component
- `addRequiredComponents`: Add required components automatically

#### `pp_apply_solution_upgrade`
Apply solution upgrades with automated processing.

**Parameters:**
- `solutionName` (required): Name of the solution to upgrade
- `async`: Run upgrade asynchronously
- `maxAsyncWaitTime`: Maximum wait time for async operation

#### `pp_delete_solution`
Delete solutions with dependency checks.

**Parameters:**
- `solutionName` (required): Name of the solution to delete

### Data Management (2 tools)

#### `pp_export_data`
Export configuration data with schema validation.

**Parameters:**
- `schemaFile` (required): Path to the data schema file
- `dataFile` (required): Output file for exported data

#### `pp_import_data`
Import data with transformation and validation.

**Parameters:**
- `dataFile` (required): Path to the data file to import
- `connectionCount`: Number of connections to use for import

### Quality Assurance (1 tool)

#### `pp_solution_checker`
Run automated solution analysis with PowerApps checker integration.

**Parameters:**
- `solutionInputFile` (required): Path to the solution file to analyze
- `solutionCheckerResult`: Output path for checker results
- `ruleSet`: Rule set to use for analysis (`AppSource Certification`, `Solution Checker`)
- `level`: Minimum issue level to report (`High`, `Medium`, `Low`)
- `geography`: Geography for the checker service
- `excludedFiles`: Files to exclude from analysis

### User & Security Management (2 tools)

#### `pp_assign_user`
Assign user roles and manage permissions.

**Parameters:**
- `user` (required): User identifier (email or ID)
- `role` (required): Security role to assign
- `businessUnit`: Business unit for the user
- `applicationUser`: Whether this is an application user

#### `pp_assign_group`
Manage group-based access control and team management.

**Parameters:**
- `aadGroupId` (required): Azure AD group ID
- `dataverseTeamType` (required): Type of Dataverse team (`AadSecurityGroup`, `AadOfficeGroup`)
- `teamName` (required): Name for the Dataverse team
- `role` (required): Security role to assign to the group
- `aadGroupName`: Azure AD group name
- `membershipType`: Group membership type (`Members`, `Owners`, `MembersAndGuests`)
- `businessUnit`: Business unit for the team

### Application Lifecycle (4 tools)

#### `pp_install_application`
Install applications from catalog or AppSource.

**Parameters:**
- `applicationName` (required): Name of the application to install
- `applicationId`: ID of the application to install
- `targetEnvironment`: Target environment for installation

#### `pp_deploy_package`
Deploy packages with settings management.

**Parameters:**
- `packageFile` (required): Path to the package file
- `packageName`: Name of the package
- `useDeploymentSettingsFile`: Use deployment settings file
- `deploymentSettingsFile`: Path to deployment settings file
- `packageRuntimeSettingsFile`: Path to package runtime settings file

#### `pp_install_catalog`
Install catalog applications.

**Parameters:**
- `catalogItemId` (required): ID of the catalog item to install
- `targetEnvironment`: Target environment for installation
- `targetVersion`: Target version to install

#### `pp_submit_catalog`
Submit applications to catalog.

**Parameters:**
- `catalogSubmissionFile` (required): Path to catalog submission file
- `packageSolutionZipFile`: Path to package solution zip file
- `packageZipFile`: Path to package zip file
- `solutionZipFile`: Path to solution zip file
- `pollStatus`: Poll submission status

### Portal Management (2 tools)

#### `pp_download_portal`
Download Power Apps portal for backup and source control.

**Parameters:**
- `websiteId` (required): ID of the portal website to download
- `path` (required): Path where portal files will be downloaded
- `overwriteFiles`: Overwrite existing files during download
- `excludeEntities`: Comma-separated list of entities to exclude

#### `pp_upload_portal`
Upload and deploy Power Apps portal configuration.

**Parameters:**
- `path` (required): Path to portal files to upload
- `deploymentProfile`: Deployment profile to use
- `modelVersion`: Portal model version
- `excludeEntities`: Comma-separated list of entities to exclude

### Configuration & Governance (4 tools)

#### `pp_set_connection_variables`
Manage connection variables and environment-specific settings.

**Parameters:**
- `connectionVariablesFile` (required): Path to connection variables JSON file

#### `pp_set_governance_config`
Configure governance policies and compliance settings.

**Parameters:**
- `configurationFile` (required): Path to governance configuration file

#### `pp_update_org_settings`
Update organization settings and preferences.

**Parameters:**
- `settingsFile` (required): Path to organization settings file

#### `pp_publish_customizations`
Publish customizations and activate changes.

**Parameters:**
- `async`: Run publish operation asynchronously

### Utilities & Diagnostics (3 tools)

#### `pp_tool_installer`
Install and manage Power Platform CLI tools.

**Parameters:**
- `addToolsToPath`: Add PAC CLI tools to system PATH

#### `pp_whoami`
Validate authentication and connection status.

**Parameters:** None

#### `pp_catalog_status`
Monitor catalog submission status.

**Parameters:**
- `catalogSubmissionId`: ID of the catalog submission to check
- `requestId`: Request ID for status tracking

## Common Workflows

### Complete Environment-to-Production Pipeline
```
1. pp_tool_installer → Install Power Platform CLI
2. pp_create_environment → Provision development environment
3. pp_whoami → Validate authentication
4. pp_unpack_solution → Extract solution from source control
5. pp_pack_solution → Package solution
6. pp_solution_checker → Run quality analysis
7. pp_import_solution → Deploy to environment
8. pp_export_data → Backup configuration data
9. pp_set_solution_version → Update version for release
10. pp_export_solution → Generate deployment package
```

### Multi-Environment Promotion
```
1. pp_copy_environment → Clone environment for testing
2. pp_import_solution → Deploy solution to test environment
3. pp_apply_solution_upgrade → Upgrade existing solution
4. pp_assign_user → Configure user permissions
5. pp_publish_customizations → Activate changes
```

## Error Handling

All tools return structured responses with success indicators and error messages. Common error scenarios include:
- Authentication failures
- Network connectivity issues
- Invalid parameter values
- Resource conflicts
- Insufficient permissions

## Authentication

Tools inherit authentication from the environment where the MCP server is running. Ensure proper Power Platform credentials are configured before using the tools.