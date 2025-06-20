# Power Agent MCP Commands Reference

> Complete reference of all 159 MCP tools for Microsoft Power Platform and SQL Server operations through natural language AI interfaces.

## 🚀 Quick Start

Power Agent MCP provides AI assistants with natural language access to the complete Microsoft Power Platform ecosystem plus SQL Server database operations and adaptive cards for Copilot Studio agents. Simply describe what you want to accomplish in plain English.

**Examples:**
- "Create a new development environment called 'AI Team Dev' in East US region"
- "Export the CustomerPortal solution as managed and pack for deployment"
- "List all canvas apps and download the Sales Dashboard app"
- "Create a new copilot using the customer service template"
- "Show me all tables in the database and describe the Users table schema"
- "Create an adaptive card for customer feedback form in my Copilot Studio agent"
- "Generate a data display card from the Contacts entity"

---

## Adaptive Cards for Copilot Studio (10 tools)

- **pp_adaptivecard_help**: Show help for adaptive card commands and operations
- **pp_adaptivecard_create**: Create a new adaptive card template for Copilot Studio agents
- **pp_adaptivecard_validate**: Validate adaptive card JSON against schema and Copilot Studio requirements
- **pp_adaptivecard_generate_from_data**: Generate adaptive card from Dataverse entity or data source
- **pp_adaptivecard_deploy_to_copilot**: Deploy adaptive card to Copilot Studio agent as a topic or response
- **pp_adaptivecard_list_templates**: List available adaptive card templates for different scenarios
- **pp_adaptivecard_convert_legacy**: Convert legacy card formats to modern Adaptive Card format
- **pp_adaptivecard_test_rendering**: Test adaptive card rendering across different host applications
- **pp_adaptivecard_extract_from_copilot**: Extract adaptive cards from existing Copilot Studio agent
- **pp_adaptivecard_data_binding**: Configure data binding for adaptive cards with Dataverse or external sources

## Application Lifecycle Management (6 tools)

- **pp_application_help**: Show help for application commands
- **pp_install_application**: Install applications from catalog or AppSource
- **pp_application_list**: List available Dataverse applications from AppSource
- **pp_deploy_package**: Deploy packages with settings management
- **pp_install_catalog**: Install catalog applications
- **pp_submit_catalog**: Submit applications to catalog

## Authentication & Security (8 tools)

- **pp_auth_help**: Show help for authentication commands
- **pp_auth_clear**: Clear all authentication profiles stored on this computer
- **pp_auth_create**: Create and store authentication profiles on this computer
- **pp_auth_delete**: Delete a particular authentication profile
- **pp_auth_list**: List the authentication profiles stored on this computer
- **pp_auth_name**: Name or rename an existing authentication profile
- **pp_auth_select**: Select which authentication profile should be active
- **pp_auth_update**: Update name or target environment of an existing authentication profile

## Canvas App Development (7 tools)

- **pp_canvas_help**: Show help for canvas app commands
- **pp_canvas_create**: Generate a canvas app from a custom connector
- **pp_canvas_download**: Download canvas app as .msapp file
- **pp_canvas_list**: List canvas apps in the environment
- **pp_canvas_pack**: Pack canvas app sources into an msapp file
- **pp_canvas_unpack**: Extract an msapp file into source files
- **pp_canvas_validate**: Validate the .pa.yaml source for an unpacked canvas app

## Code Component Development (5 tools)

- **pp_code_help**: Show help for code app commands
- **pp_code_add_data_source**: Adds a new datasource to the code app
- **pp_code_delete_data_source**: Deletes a data source from the current code app
- **pp_code_init**: Initializes a Code app in the current directory
- **pp_code_push**: Publishes a new version of a Code app
- **pp_code_run**: Runs a local server for connections loading locally in the app

## Connection Management (4 tools)

- **pp_connection_help**: Show help for connection commands
- **pp_connection_create**: Create new Dataverse connection
- **pp_connection_delete**: Delete Dataverse connection
- **pp_connection_list**: List all Dataverse connections
- **pp_connection_update**: Update Dataverse connection

## Custom Connector Development (5 tools)

- **pp_connector_help**: Show help for connector commands
- **pp_connector_create**: Creates a new row in the Connector table in Dataverse
- **pp_connector_download**: Download a Connector's OpenApiDefinition and API Properties file
- **pp_connector_init**: Initializes a new API Properties file for a Connector
- **pp_connector_list**: List the Connectors registered in Dataverse
- **pp_connector_update**: Updates a Connector Entity in Dataverse

## AI Copilot Management (10 tools)

- **pp_copilot_help**: Show help for copilot commands
- **pp_copilot_create**: Creates a new copilot using an existing template file
- **pp_copilot_extract_template**: Extracts a template file from an existing copilot
- **pp_copilot_extract_translation**: Extracts file containing localized content for copilots
- **pp_copilot_list**: List copilots in the current environment
- **pp_copilot_merge_translation**: Merge files containing localized content for copilots
- **pp_copilot_model_list**: List AI Builder models in the current environment
- **pp_copilot_model_predict**: Sends text or prompt to AI Model for prediction
- **pp_copilot_model_prepare_fetch**: Prepares FetchXML from AI LLM for execution against environment
- **pp_copilot_publish**: Publish a Custom Copilot
- **pp_copilot_status**: Poll the deployment status of a specified copilot

## Data Management (2 tools)

- **pp_export_data**: Export configuration data with schema validation
- **pp_import_data**: Import data with transformation and validation

## Environment Operations (6 tools)

- **pp_env_help**: Show help for environment commands
- **pp_env_fetch**: Performs FetchXML query against Dataverse
- **pp_env_list**: List all Dataverse environments from Global Discovery Service
- **pp_env_list_settings**: List environment settings
- **pp_env_select**: Select default organization for current authentication profile
- **pp_env_update_settings**: Update environment settings
- **pp_env_who**: Displays information about the current Dataverse organization

## Environment Lifecycle (35 tools)

### Core Environment Management
- **pp_create_environment**: Create a new Power Platform environment with customizable settings
- **pp_delete_environment**: Delete a Power Platform environment and clean up resources
- **pp_backup_environment**: Create a backup of a Power Platform environment
- **pp_restore_environment**: Restore a Power Platform environment from backup
- **pp_copy_environment**: Copy a Power Platform environment for dev/test scenarios
- **pp_reset_environment**: Reset a Power Platform environment to factory defaults

### Administration Commands
- **pp_admin_help**: Show help for admin commands
- **pp_admin_add_group**: Add environment to a group
- **pp_admin_list_applications**: List Microsoft Entra ID applications registered under tenant
- **pp_admin_register_application**: Register Microsoft Entra ID application with tenant
- **pp_admin_unregister_application**: Unregister Microsoft Entra ID application from tenant
- **pp_admin_create_service_principal**: Add Microsoft Entra ID application and associated application user
- **pp_admin_list_environments**: List all environments from tenant
- **pp_admin_list_app_templates**: Lists all supported Dataverse templates of model-driven apps
- **pp_admin_assign_user**: Assign user permissions in environment
- **pp_admin_backup**: Create environment backup as an administrator
- **pp_admin_copy**: Copy environment as an administrator
- **pp_admin_create**: Create new environment as an administrator
- **pp_admin_delete**: Delete environment as an administrator
- **pp_admin_governance_configuration**: Configure governance policies for environment
- **pp_admin_list**: List all environments as an administrator
- **pp_admin_restore**: Restore environment from backup as an administrator
- **pp_admin_update**: Update environment settings as an administrator
- **pp_admin_create_application_user**: Create application user in environment
- **pp_admin_delete_application_user**: Delete application user from environment
- **pp_admin_list_application_users**: List application users in environment
- **pp_admin_create_user**: Create user in environment
- **pp_admin_delete_user**: Delete user from environment
- **pp_admin_list_users**: List users in environment
- **pp_admin_assign_group**: Assign group permissions in environment
- **pp_admin_create_group**: Create group in environment
- **pp_admin_delete_group**: Delete group from environment
- **pp_admin_list_groups**: List groups in environment
- **pp_admin_list_role_assignments**: List role assignments in environment
- **pp_admin_list_security_roles**: List security roles in environment

## Help & Documentation (1 tool)

- **pp_help_commands**: Show comprehensive help for all Power Platform CLI commands

## Model Builder & Code Generation (1 tool)

- **pp_model_builder_build**: Build model components using the model builder framework

## Package Management (6 tools)

- **pp_package_help**: Show help for package commands
- **pp_package_deploy**: Deploy packages to environment
- **pp_package_init**: Initialize new package project
- **pp_package_show**: Show package details and information
- **pp_package_update**: Update package configuration
- **pp_package_version**: Manage package version information

## Power Pages Development (7 tools)

- **pp_pages_help**: Show help for Power Pages commands
- **pp_pages_download**: Download Power Pages website content
- **pp_pages_download_code_site**: Download Power Pages website content as code
- **pp_pages_list**: List all Power Pages websites from the environment
- **pp_pages_migrate_datamodel**: Manage data model migration for Power Pages website
- **pp_pages_upload**: Upload Power Pages website content to environment
- **pp_pages_upload_code_site**: Uploads compiled code to Power Pages site

## PCF Component Development (3 tools)

- **pp_pcf_help**: Show help for PCF component commands
- **pp_pcf_init**: Initializes a directory with a new Power Apps component framework project
- **pp_pcf_push**: Import the Power Apps component framework project into Dataverse
- **pp_pcf_version**: Patch version for PCF controls

## Pipeline Operations (2 tools)

- **pp_pipeline_help**: Show help for pipeline commands
- **pp_pipeline_deploy**: Start pipeline deployment
- **pp_pipeline_list**: List pipelines

## Plugin Development (2 tools)

- **pp_plugin_help**: Show help for plugin commands
- **pp_plugin_init**: Initializes a directory with a new Dataverse plug-in class library
- **pp_plugin_push**: Import plug-in into Dataverse

## Portal Management (2 tools)

- **pp_download_portal**: Download Power Apps portal for backup and source control
- **pp_upload_portal**: Upload and deploy Power Apps portal configuration

## Power Fx Operations (2 tools)

- **pp_power_fx_help**: Show help for Power Fx commands
- **pp_power_fx_repl**: Launch interactive Power Fx Read-Eval-Print Loop
- **pp_power_fx_run**: Run a file of Power Fx instructions

## Quality Assurance (1 tool)

- **pp_solution_checker**: Run automated solution analysis with PowerApps checker integration

## Security & Access Management (2 tools)

- **pp_assign_user**: Assign user roles and manage permissions
- **pp_assign_group**: Manage group-based access control and team management

## Solution Development (16 tools)

### Core Solution Operations
- **pp_export_solution**: Export managed and unmanaged solutions with advanced settings
- **pp_import_solution**: Import solutions with dependency handling and upgrade support
- **pp_pack_solution**: Package solutions from source control with Canvas app processing
- **pp_unpack_solution**: Unpack solutions for source control integration
- **pp_set_solution_version**: Set solution version with semantic versioning support
- **pp_add_solution_component**: Add components to solutions with dependency tracking
- **pp_apply_solution_upgrade**: Apply solution upgrades with automated processing
- **pp_delete_solution**: Delete solutions with dependency checks

### Solution Management
- **pp_solution_help**: Show help for solution commands
- **pp_solution_add_license**: Add license and plan info to the solution
- **pp_solution_clone**: Create a solution project based on an existing solution
- **pp_solution_create_settings**: Create a settings file from solution zip or solution folder
- **pp_solution_init**: Initializes a directory with a new Dataverse solution project
- **pp_solution_list**: List all Solutions from the current Dataverse organization
- **pp_solution_online_version**: Sets version for solution loaded in Dataverse
- **pp_solution_sync**: Sync the current Dataverse solution project to current state
- **pp_solution_upgrade**: Apply solution upgrade

## SQL Database Management (7 tools)

- **sql_list_tables**: List all tables in the SQL Database
- **sql_describe_table**: Get table schema and details including columns, types, and indexes
- **sql_create_table**: Create a new table in the SQL Database
- **sql_drop_table**: Drop an existing table from the SQL Database
- **sql_insert_data**: Insert data into a table in the SQL Database
- **sql_read_data**: Execute SQL queries to read data from the SQL Database
- **sql_update_data**: Update data in a table in the SQL Database

## Telemetry Management (3 tools)

- **pp_telemetry_help**: Show help for telemetry commands
- **pp_telemetry_disable**: Choose to not send usage information to help Microsoft improve this product
- **pp_telemetry_enable**: Choose to send usage information to help Microsoft improve this product
- **pp_telemetry_status**: Show the current status of telemetry

## Testing Operations (1 tool)

- **pp_test_help**: Show help for test commands
- **pp_test_run**: Execute tests defined in a Test Plan file

## Tool Management (6 tools)

- **pp_tool_help**: Show help for tool management commands
- **pp_tool_admin**: Launch Power Platform Admin Center for the current environment
- **pp_tool_cmt**: Launch Configuration Migration Tool (CMT)
- **pp_tool_list**: List the launchable tools and their local install state and version
- **pp_tool_maker**: Launch Power Apps Maker Portal for the current environment
- **pp_tool_pd**: Launch Package Deployer (PD)
- **pp_tool_prt**: Launch Plug-in Registration Tool (PRT)

## Utilities & Diagnostics (3 tools)

- **pp_tool_installer**: Install and manage Power Platform CLI tools
- **pp_whoami**: Validate authentication and connection status
- **pp_catalog_status**: Monitor catalog submission status

---

## 📊 Summary

| Category | Tools | Key Use Cases |
|----------|-------|---------------|
| **Environment Management** | 41 | Create, backup, manage environments and admin operations |
| **Solution Development** | 16 | Complete solution lifecycle from dev to deployment |
| **AI & Copilot** | 10 | Build and manage AI copilots and models |
| **Adaptive Cards** | 10 | Create and manage adaptive cards for Copilot Studio agents |
| **Canvas Apps** | 7 | Develop and manage Power Apps canvas applications |
| **SQL Database** | 7 | Complete database operations and schema management |
| **Power Pages** | 7 | Build and deploy Power Pages websites |
| **Package Management** | 6 | Deploy and manage solution packages |
| **Tool Management** | 6 | Manage development tools and environments |
| **Code Components** | 5 | Build custom components and controls |
| **Custom Connectors** | 5 | Create and manage API connectors |
| **Connection Management** | 4 | Manage Dataverse connections |
| **PCF Development** | 3 | Power Apps Component Framework development |
| **Telemetry** | 3 | Usage tracking and diagnostics |
| **Utilities** | 3 | General tools and validation |
| **Other Categories** | 42 | Security, data, quality, testing, portals, plugins, etc. |

**Total: 169 MCP Tools** providing complete coverage of Microsoft Power Platform CLI functionality plus SQL Server database operations and adaptive cards for Copilot Studio.

## 🎯 Common Workflows

### Complete CI/CD Pipeline
```
1. pp_unpack_solution - Extract from source control
2. pp_pack_solution - Package for deployment  
3. pp_solution_checker - Run quality analysis
4. pp_import_solution - Deploy to test environment
5. pp_export_solution - Create managed artifact
6. pp_deploy_package - Deploy to production
```

### Environment Setup
```
1. pp_create_environment - Create new environment
2. pp_assign_user - Configure user access
3. pp_import_solution - Deploy base solutions
4. pp_set_governance_config - Apply policies
```

### Adaptive Cards Development
```
1. pp_adaptivecard_create - Create card template
2. pp_adaptivecard_generate_from_data - Generate from entity data
3. pp_adaptivecard_validate - Validate against schema
4. pp_adaptivecard_deploy_to_copilot - Deploy to Copilot Studio
5. pp_adaptivecard_test_rendering - Test across platforms
```

### Data Operations
```
1. pp_export_data - Extract configuration data
2. sql_create_table - Set up database schema
3. sql_insert_data - Load initial data
4. pp_import_data - Import to target environment
```

---

*For detailed parameter information and usage examples, see the [MCP Commands Reference](docs/MCP_COMMANDS_REFERENCE.md) documentation.*