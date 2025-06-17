# Complete List of Power Agent MCP Commands

This document provides an extensive list of all 148 MCP commands available in the Power Agent MCP server, covering all 141 PAC CLI commands plus 7 SQL Server operations, organized by functional category.

## Environment Management Commands (6 commands)

| Command | Description | Key Parameters |
|---------|-------------|----------------|
| `pp_create_environment` | Create new Power Platform environment | `displayName`, `environmentType`, `region`, `currency` |
| `pp_delete_environment` | Delete environment and cleanup resources | `environmentUrl` |
| `pp_backup_environment` | Create environment backup | `environmentUrl`, `backupLabel` |
| `pp_restore_environment` | Restore environment from backup | `sourceEnvironmentUrl`, `targetEnvironmentUrl` |
| `pp_copy_environment` | Copy environment for dev/test | `sourceEnvironmentUrl`, `targetEnvironmentUrl`, `copyType` |
| `pp_reset_environment` | Reset environment to factory defaults | `environmentUrl` |

## Solution Management Commands (8 commands)

| Command | Description | Key Parameters |
|---------|-------------|----------------|
| `pp_export_solution` | Export solutions with advanced settings | `solutionName`, `solutionOutputFile`, `managed` |
| `pp_import_solution` | Import solutions with dependency handling | `solutionInputFile`, `importAsHolding`, `stageAndUpgrade` |
| `pp_pack_solution` | Package solutions from source control | `solutionOutputFile`, `solutionSourceFolder`, `processCanvasApps` |
| `pp_unpack_solution` | Unpack solutions for source control | `solutionInputFile`, `solutionTargetFolder`, `processCanvasApps` |
| `pp_set_solution_version` | Set solution version | `solutionName`, `solutionVersionNumber` |
| `pp_add_solution_component` | Add components to solutions | `solutionName`, `component`, `componentType` |
| `pp_apply_solution_upgrade` | Apply solution upgrades | `solutionName`, `async` |
| `pp_delete_solution` | Delete solutions with dependency checks | `solutionName` |

## Data Management Commands (2 commands)

| Command | Description | Key Parameters |
|---------|-------------|----------------|
| `pp_export_data` | Export configuration data | `schemaFile`, `dataFile` |
| `pp_import_data` | Import data with validation | `dataFile`, `connectionCount` |

## Quality Assurance Commands (1 command)

| Command | Description | Key Parameters |
|---------|-------------|----------------|
| `pp_solution_checker` | Run automated solution analysis | `solutionInputFile`, `ruleSet`, `level` |

## User & Security Management Commands (2 commands)

| Command | Description | Key Parameters |
|---------|-------------|----------------|
| `pp_assign_user` | Assign user roles and permissions | `user`, `role`, `businessUnit` |
| `pp_assign_group` | Manage group-based access control | `aadGroupId`, `dataverseTeamType`, `teamName`, `role` |

## Application Lifecycle Commands (4 commands)

| Command | Description | Key Parameters |
|---------|-------------|----------------|
| `pp_install_application` | Install applications from catalog | `applicationName`, `targetEnvironment` |
| `pp_deploy_package` | Deploy packages with settings | `packageFile`, `deploymentSettingsFile` |
| `pp_install_catalog` | Install catalog applications | `catalogItemId`, `targetVersion` |
| `pp_submit_catalog` | Submit applications to catalog | `catalogSubmissionFile`, `pollStatus` |

## Portal Management Commands (2 commands)

| Command | Description | Key Parameters |
|---------|-------------|----------------|
| `pp_download_portal` | Download portal for backup | `websiteId`, `path`, `overwriteFiles` |
| `pp_upload_portal` | Upload and deploy portal | `path`, `deploymentProfile` |

## Configuration & Governance Commands (4 commands)

| Command | Description | Key Parameters |
|---------|-------------|----------------|
| `pp_set_connection_variables` | Manage connection variables | `connectionVariablesFile` |
| `pp_set_governance_config` | Configure governance policies | `configurationFile` |
| `pp_update_org_settings` | Update organization settings | `settingsFile` |
| `pp_publish_customizations` | Publish customizations | `async` |

## Utilities & Diagnostics Commands (3 commands)

| Command | Description | Key Parameters |
|---------|-------------|----------------|
| `pp_tool_installer` | Install Power Platform CLI tools | `addToolsToPath` |
| `pp_whoami` | Validate authentication status | None |
| `pp_catalog_status` | Monitor catalog submission status | `catalogSubmissionId`, `requestId` |

## SQL Database Management Commands (7 commands)

| Command | Description | Key Parameters |
|---------|-------------|----------------|
| `sql_list_tables` | List all tables in SQL Database | `connectionString` |
| `sql_describe_table` | Get table schema and details | `connectionString`, `tableName` |
| `sql_create_table` | Create new table in SQL Database | `connectionString`, `sql` |
| `sql_drop_table` | Drop existing table from SQL Database | `connectionString`, `tableName` |
| `sql_insert_data` | Insert data into SQL Database table | `connectionString`, `sql` |
| `sql_read_data` | Execute SELECT queries on SQL Database | `connectionString`, `sql` |
| `sql_update_data` | Update data in SQL Database table | `connectionString`, `sql` |

## Command Usage Patterns

### Simple Operations
Commands requiring minimal parameters for basic operations:
- `pp_whoami` - No parameters needed
- `pp_tool_installer` - Optional `addToolsToPath` parameter
- `pp_publish_customizations` - Optional `async` parameter

### File-based Operations
Commands that work with files and paths:
- `pp_export_solution` - Exports to specified file path
- `pp_import_solution` - Imports from specified file path  
- `pp_pack_solution` - Packages from source folder to output file
- `pp_unpack_solution` - Unpacks from file to target folder
- `pp_export_data` / `pp_import_data` - Data file operations

### Environment Operations
Commands that target specific environments:
- `pp_create_environment` - Creates new environment
- `pp_delete_environment` - Removes existing environment
- `pp_backup_environment` / `pp_restore_environment` - Backup operations
- `pp_copy_environment` - Environment cloning

### Solution Lifecycle
Commands for complete solution management:
1. `pp_unpack_solution` - Extract from source control
2. `pp_pack_solution` - Package for deployment
3. `pp_solution_checker` - Quality analysis
4. `pp_import_solution` - Deploy to environment
5. `pp_set_solution_version` - Version management
6. `pp_export_solution` - Create deployment artifact

### Security and Governance
Commands for managing access and compliance:
- `pp_assign_user` / `pp_assign_group` - User management
- `pp_set_governance_config` - Policy configuration
- `pp_update_org_settings` - Organization settings

## Command Categories by Frequency of Use

### Daily Operations (High Frequency)
- `pp_export_solution`
- `pp_import_solution`
- `pp_pack_solution`
- `pp_unpack_solution`
- `pp_whoami`

### Development Workflows (Medium Frequency)
- `pp_solution_checker`
- `pp_set_solution_version`
- `pp_export_data`
- `pp_import_data`
- `pp_publish_customizations`

### Environment Management (Medium Frequency)
- `pp_create_environment`
- `pp_copy_environment`
- `pp_backup_environment`
- `pp_delete_environment`

### Advanced Operations (Lower Frequency)
- `pp_restore_environment`
- `pp_reset_environment`
- `pp_apply_solution_upgrade`
- `pp_add_solution_component`
- `pp_delete_solution`

### Administrative Tasks (Lower Frequency)
- `pp_assign_user`
- `pp_assign_group`
- `pp_set_governance_config`
- `pp_update_org_settings`
- `pp_tool_installer`

### Application Lifecycle (Project-based)
- `pp_install_application`
- `pp_deploy_package`
- `pp_install_catalog`
- `pp_submit_catalog`

### Portal Development (Specialized)
- `pp_download_portal`
- `pp_upload_portal`

### Monitoring and Status (As-needed)
- `pp_catalog_status`

## Command Dependencies and Prerequisites

### Authentication Required
All commands except `pp_tool_installer` require valid Power Platform authentication.

### CLI Installation Required
All commands require Power Platform CLI to be installed and accessible.

### Environment-specific Commands
Commands that require an active environment connection:
- All solution management commands
- Data management commands
- Security management commands
- Portal management commands
- Governance commands

### File System Access Required
Commands that read/write files:
- Solution pack/unpack operations
- Data export/import operations
- Configuration file operations
- Portal download/upload operations

## Error Handling Patterns

### Common Error Types
- **Authentication errors**: Invalid credentials or expired tokens
- **Permission errors**: Insufficient privileges for operation
- **Network errors**: Connectivity issues or timeouts
- **File errors**: Missing files or invalid file formats
- **Parameter errors**: Invalid or missing required parameters

### Retry Scenarios
- Network connectivity issues
- Temporary service unavailability
- Rate limiting responses

### Non-retryable Errors
- Authentication failures
- Permission denials
- Invalid parameter values
- File format errors

This comprehensive command reference provides the foundation for understanding and utilizing all Power Agent MCP capabilities.