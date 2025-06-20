// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { PowerPlatformToolHandler } from './handler.js';

/**
 * VSCode-compatible hierarchical tool structure
 * Provides 10 parent tools that dispatch to sub-tools to work within VSCode's 125 tool limit
 */
export class VSCodeHierarchicalTools {
  private fullHandler: PowerPlatformToolHandler;

  constructor(fullHandler: PowerPlatformToolHandler) {
    this.fullHandler = fullHandler;
  }

  getParentTools(): Tool[] {
    return [
      {
        name: 'pp_environment',
        description: 'Environment and administration operations - manage Power Platform environments, users, roles, and administrative tasks',
        inputSchema: {
          type: 'object',
          properties: {
            command: {
              type: 'string',
              description: 'Specific command to execute',
              enum: [
                'create_environment', 'delete_environment', 'backup_environment', 'restore_environment', 'copy_environment', 'reset_environment',
                'admin_help', 'admin_add_group', 'admin_list_applications', 'admin_register_application', 'admin_unregister_application',
                'admin_create_service_principal', 'admin_list_environments', 'admin_list_app_templates', 'admin_assign_user',
                'admin_backup', 'admin_copy', 'admin_create', 'admin_delete', 'admin_governance_configuration', 'admin_list',
                'admin_restore', 'admin_update', 'admin_create_application_user', 'admin_delete_application_user',
                'admin_list_application_users', 'admin_create_user', 'admin_delete_user', 'admin_list_users',
                'admin_assign_group', 'admin_create_group', 'admin_delete_group', 'admin_list_groups',
                'admin_list_role_assignments', 'admin_list_security_roles', 'env_help', 'env_fetch', 'env_list',
                'env_list_settings', 'env_select', 'env_update_settings', 'env_who'
              ]
            },
            parameters: {
              type: 'object',
              description: 'Parameters specific to the command being executed'
            }
          },
          required: ['command']
        }
      },
      {
        name: 'pp_solution',
        description: 'Solution development lifecycle - export, import, pack, unpack solutions and manage solution components',
        inputSchema: {
          type: 'object',
          properties: {
            command: {
              type: 'string',
              description: 'Specific command to execute',
              enum: [
                'export_solution', 'import_solution', 'pack_solution', 'unpack_solution', 'set_solution_version',
                'add_solution_component', 'apply_solution_upgrade', 'delete_solution', 'solution_help',
                'solution_add_license', 'solution_clone', 'solution_create_settings', 'solution_init',
                'solution_list', 'solution_online_version', 'solution_sync', 'solution_upgrade'
              ]
            },
            parameters: {
              type: 'object',
              description: 'Parameters specific to the command being executed'
            }
          },
          required: ['command']
        }
      },
      {
        name: 'pp_application',
        description: 'Application development - canvas apps, PCF components, plugins, Power Pages and code development',
        inputSchema: {
          type: 'object',
          properties: {
            command: {
              type: 'string',
              description: 'Specific command to execute',
              enum: [
                'canvas_help', 'canvas_create', 'canvas_download', 'canvas_list', 'canvas_pack', 'canvas_unpack', 'canvas_validate',
                'pcf_help', 'pcf_init', 'pcf_push', 'pcf_version', 'plugin_help', 'plugin_init', 'plugin_push',
                'pages_help', 'pages_download', 'pages_download_code_site', 'pages_list', 'pages_migrate_datamodel',
                'pages_upload', 'pages_upload_code_site', 'code_help', 'code_add_data_source', 'code_delete_data_source',
                'code_init', 'code_push', 'code_run', 'application_help', 'install_application', 'application_list',
                'deploy_package', 'install_catalog', 'submit_catalog'
              ]
            },
            parameters: {
              type: 'object',
              description: 'Parameters specific to the command being executed'
            }
          },
          required: ['command']
        }
      },
      {
        name: 'pp_copilot',
        description: 'AI copilot management - comprehensive copilot lifecycle, knowledge management, testing, deployment and monitoring',
        inputSchema: {
          type: 'object',
          properties: {
            command: {
              type: 'string',
              description: 'Specific command to execute',
              enum: [
                // Original copilot commands
                'copilot_help', 'copilot_create', 'copilot_extract_template', 'copilot_extract_translation',
                'copilot_list', 'copilot_merge_translation', 'copilot_model_list', 'copilot_model_predict',
                'copilot_model_prepare_fetch', 'copilot_publish', 'copilot_status',
                // New comprehensive commands
                'copilot_clone', 'copilot_fork', 'copilot_init', 'copilot_scaffold', 'copilot_export',
                'copilot_export_solution', 'copilot_export_knowledge', 'copilot_export_topics', 'copilot_import',
                'copilot_import_solution', 'copilot_import_knowledge', 'copilot_import_topics', 'copilot_pull',
                'copilot_push', 'copilot_edit_settings', 'copilot_edit_manifest', 'copilot_edit_topic',
                'copilot_transform_state', 'copilot_refactor_intents', 'copilot_add_knowledge', 'copilot_add_tool',
                'copilot_knowledge_scrub', 'copilot_knowledge_reindex', 'copilot_list_agents', 'copilot_get_agent',
                'copilot_delete_agent', 'copilot_list_topic', 'copilot_get_topic', 'copilot_delete_topic',
                'copilot_move_topic', 'copilot_topic_version', 'copilot_secure_roles', 'copilot_secure_secrets',
                'copilot_secure_dlp_check', 'copilot_audit_trail', 'copilot_compliance_export', 'copilot_test_conversation',
                'copilot_test_regression', 'copilot_validate_schema', 'copilot_validate_intents', 'copilot_lint_topics',
                'copilot_rollback', 'copilot_promote', 'copilot_package_init', 'copilot_package_deploy',
                'copilot_containerize', 'copilot_logs', 'copilot_metrics', 'copilot_trace', 'copilot_monitor',
                'copilot_env_set', 'copilot_env_diff', 'copilot_config_set', 'copilot_upgrade', 'copilot_version'
              ]
            },
            parameters: {
              type: 'object',
              description: 'Parameters specific to the command being executed'
            }
          },
          required: ['command']
        }
      },
      {
        name: 'pp_data',
        description: 'Data operations and SQL management - export/import data, SQL database operations and schema management',
        inputSchema: {
          type: 'object',
          properties: {
            command: {
              type: 'string',
              description: 'Specific command to execute',
              enum: [
                'export_data', 'import_data', 'sql_list_tables', 'sql_describe_table', 'sql_create_table',
                'sql_drop_table', 'sql_insert_data', 'sql_read_data', 'sql_update_data'
              ]
            },
            parameters: {
              type: 'object',
              description: 'Parameters specific to the command being executed'
            }
          },
          required: ['command']
        }
      },
      {
        name: 'pp_connector',
        description: 'Connections and connectors - manage Dataverse connections, custom connectors and adaptive cards',
        inputSchema: {
          type: 'object',
          properties: {
            command: {
              type: 'string',
              description: 'Specific command to execute',
              enum: [
                'connection_help', 'connection_create', 'connection_delete', 'connection_list', 'connection_update',
                'connector_help', 'connector_create', 'connector_download', 'connector_init', 'connector_list',
                'connector_update', 'adaptivecard_help', 'adaptivecard_create', 'adaptivecard_validate',
                'adaptivecard_generate_from_data', 'adaptivecard_deploy_to_copilot', 'adaptivecard_list_templates',
                'adaptivecard_convert_legacy', 'adaptivecard_test_rendering', 'adaptivecard_extract_from_copilot',
                'adaptivecard_data_binding'
              ]
            },
            parameters: {
              type: 'object',
              description: 'Parameters specific to the command being executed'
            }
          },
          required: ['command']
        }
      },
      {
        name: 'pp_security',
        description: 'Security and governance - authentication, user management, role assignments and compliance',
        inputSchema: {
          type: 'object',
          properties: {
            command: {
              type: 'string',
              description: 'Specific command to execute',
              enum: [
                'auth_help', 'auth_clear', 'auth_create', 'auth_delete', 'auth_list', 'auth_name', 'auth_select',
                'auth_update', 'assign_user', 'assign_group'
              ]
            },
            parameters: {
              type: 'object',
              description: 'Parameters specific to the command being executed'
            }
          },
          required: ['command']
        }
      },
      {
        name: 'pp_utility',
        description: 'Tools, help and diagnostics - help commands, tool management, telemetry and validation',
        inputSchema: {
          type: 'object',
          properties: {
            command: {
              type: 'string',
              description: 'Specific command to execute',
              enum: [
                'tool_help', 'tool_admin', 'tool_cmt', 'tool_list', 'tool_maker', 'tool_pd', 'tool_prt',
                'tool_installer', 'whoami', 'catalog_status', 'help_commands', 'telemetry_help',
                'telemetry_disable', 'telemetry_enable', 'telemetry_status'
              ]
            },
            parameters: {
              type: 'object',
              description: 'Parameters specific to the command being executed'
            }
          },
          required: ['command']
        }
      },
      {
        name: 'pp_pipeline',
        description: 'CI/CD and deployment - pipeline operations, package management and automated deployment',
        inputSchema: {
          type: 'object',
          properties: {
            command: {
              type: 'string',
              description: 'Specific command to execute',
              enum: [
                'pipeline_help', 'pipeline_deploy', 'pipeline_list', 'package_help', 'package_deploy',
                'package_init', 'package_show', 'package_update', 'package_version', 'download_portal',
                'upload_portal'
              ]
            },
            parameters: {
              type: 'object',
              description: 'Parameters specific to the command being executed'
            }
          },
          required: ['command']
        }
      },
      {
        name: 'pp_quality',
        description: 'Testing and quality assurance - solution checker, testing operations and Power Fx development',
        inputSchema: {
          type: 'object',
          properties: {
            command: {
              type: 'string',
              description: 'Specific command to execute',
              enum: [
                'solution_checker', 'test_help', 'test_run', 'power_fx_help', 'power_fx_repl', 'power_fx_run',
                'model_builder_build'
              ]
            },
            parameters: {
              type: 'object',
              description: 'Parameters specific to the command being executed'
            }
          },
          required: ['command']
        }
      }
    ];
  }

  getHandlers(): Record<string, (args: any) => Promise<any>> {
    const handlers: Record<string, (args: any) => Promise<any>> = {};

    // Create dispatch handlers for each parent tool
    const parentTools = this.getParentTools();
    
    parentTools.forEach(parentTool => {
      handlers[parentTool.name] = async (args: any) => {
        const { command, parameters = {} } = args;
        
        if (!command) {
          throw new Error(`Command parameter is required for ${parentTool.name}`);
        }

        // Map command to actual tool name
        const actualToolName = this.mapCommandToToolName(command);
        
        // Call the original tool handler
        return await this.fullHandler.callTool(actualToolName, parameters);
      };
    });

    return handlers;
  }

  private mapCommandToToolName(command: string): string {
    // Map simplified command names to actual tool names
    const commandMap: Record<string, string> = {
      // Environment commands
      'create_environment': 'pp_create_environment',
      'delete_environment': 'pp_delete_environment',
      'backup_environment': 'pp_backup_environment',
      'restore_environment': 'pp_restore_environment',
      'copy_environment': 'pp_copy_environment',
      'reset_environment': 'pp_reset_environment',
      'admin_help': 'pp_admin_help',
      'admin_add_group': 'pp_admin_add_group',
      'admin_list_applications': 'pp_admin_list_applications',
      'admin_register_application': 'pp_admin_register_application',
      'admin_unregister_application': 'pp_admin_unregister_application',
      'admin_create_service_principal': 'pp_admin_create_service_principal',
      'admin_list_environments': 'pp_admin_list_environments',
      'admin_list_app_templates': 'pp_admin_list_app_templates',
      'admin_assign_user': 'pp_admin_assign_user',
      'admin_backup': 'pp_admin_backup',
      'admin_copy': 'pp_admin_copy',
      'admin_create': 'pp_admin_create',
      'admin_delete': 'pp_admin_delete',
      'admin_governance_configuration': 'pp_admin_governance_configuration',
      'admin_list': 'pp_admin_list',
      'admin_restore': 'pp_admin_restore',
      'admin_update': 'pp_admin_update',
      'admin_create_application_user': 'pp_admin_create_application_user',
      'admin_delete_application_user': 'pp_admin_delete_application_user',
      'admin_list_application_users': 'pp_admin_list_application_users',
      'admin_create_user': 'pp_admin_create_user',
      'admin_delete_user': 'pp_admin_delete_user',
      'admin_list_users': 'pp_admin_list_users',
      'admin_assign_group': 'pp_admin_assign_group',
      'admin_create_group': 'pp_admin_create_group',
      'admin_delete_group': 'pp_admin_delete_group',
      'admin_list_groups': 'pp_admin_list_groups',
      'admin_list_role_assignments': 'pp_admin_list_role_assignments',
      'admin_list_security_roles': 'pp_admin_list_security_roles',
      'env_help': 'pp_env_help',
      'env_fetch': 'pp_env_fetch',
      'env_list': 'pp_env_list',
      'env_list_settings': 'pp_env_list_settings',
      'env_select': 'pp_env_select',
      'env_update_settings': 'pp_env_update_settings',
      'env_who': 'pp_env_who',
      
      // Solution commands
      'export_solution': 'pp_export_solution',
      'import_solution': 'pp_import_solution',
      'pack_solution': 'pp_pack_solution',
      'unpack_solution': 'pp_unpack_solution',
      'set_solution_version': 'pp_set_solution_version',
      'add_solution_component': 'pp_add_solution_component',
      'apply_solution_upgrade': 'pp_apply_solution_upgrade',
      'delete_solution': 'pp_delete_solution',
      'solution_help': 'pp_solution_help',
      'solution_add_license': 'pp_solution_add_license',
      'solution_clone': 'pp_solution_clone',
      'solution_create_settings': 'pp_solution_create_settings',
      'solution_init': 'pp_solution_init',
      'solution_list': 'pp_solution_list',
      'solution_online_version': 'pp_solution_online_version',
      'solution_sync': 'pp_solution_sync',
      'solution_upgrade': 'pp_solution_upgrade',
      
      // Application commands
      'canvas_help': 'pp_canvas_help',
      'canvas_create': 'pp_canvas_create',
      'canvas_download': 'pp_canvas_download',
      'canvas_list': 'pp_canvas_list',
      'canvas_pack': 'pp_canvas_pack',
      'canvas_unpack': 'pp_canvas_unpack',
      'canvas_validate': 'pp_canvas_validate',
      'pcf_help': 'pp_pcf_help',
      'pcf_init': 'pp_pcf_init',
      'pcf_push': 'pp_pcf_push',
      'pcf_version': 'pp_pcf_version',
      'plugin_help': 'pp_plugin_help',
      'plugin_init': 'pp_plugin_init',
      'plugin_push': 'pp_plugin_push',
      'pages_help': 'pp_pages_help',
      'pages_download': 'pp_pages_download',
      'pages_download_code_site': 'pp_pages_download_code_site',
      'pages_list': 'pp_pages_list',
      'pages_migrate_datamodel': 'pp_pages_migrate_datamodel',
      'pages_upload': 'pp_pages_upload',
      'pages_upload_code_site': 'pp_pages_upload_code_site',
      'code_help': 'pp_code_help',
      'code_add_data_source': 'pp_code_add_data_source',
      'code_delete_data_source': 'pp_code_delete_data_source',
      'code_init': 'pp_code_init',
      'code_push': 'pp_code_push',
      'code_run': 'pp_code_run',
      'application_help': 'pp_application_help',
      'install_application': 'pp_install_application',
      'application_list': 'pp_application_list',
      'deploy_package': 'pp_deploy_package',
      'install_catalog': 'pp_install_catalog',
      'submit_catalog': 'pp_submit_catalog',
      
      // Data commands
      'export_data': 'pp_export_data',
      'import_data': 'pp_import_data',
      'sql_list_tables': 'sql_list_tables',
      'sql_describe_table': 'sql_describe_table',
      'sql_create_table': 'sql_create_table',
      'sql_drop_table': 'sql_drop_table',
      'sql_insert_data': 'sql_insert_data',
      'sql_read_data': 'sql_read_data',
      'sql_update_data': 'sql_update_data',
      
      // Connector commands
      'connection_help': 'pp_connection_help',
      'connection_create': 'pp_connection_create',
      'connection_delete': 'pp_connection_delete',
      'connection_list': 'pp_connection_list',
      'connection_update': 'pp_connection_update',
      'connector_help': 'pp_connector_help',
      'connector_create': 'pp_connector_create',
      'connector_download': 'pp_connector_download',
      'connector_init': 'pp_connector_init',
      'connector_list': 'pp_connector_list',
      'connector_update': 'pp_connector_update',
      'adaptivecard_help': 'pp_adaptivecard_help',
      'adaptivecard_create': 'pp_adaptivecard_create',
      'adaptivecard_validate': 'pp_adaptivecard_validate',
      'adaptivecard_generate_from_data': 'pp_adaptivecard_generate_from_data',
      'adaptivecard_deploy_to_copilot': 'pp_adaptivecard_deploy_to_copilot',
      'adaptivecard_list_templates': 'pp_adaptivecard_list_templates',
      'adaptivecard_convert_legacy': 'pp_adaptivecard_convert_legacy',
      'adaptivecard_test_rendering': 'pp_adaptivecard_test_rendering',
      'adaptivecard_extract_from_copilot': 'pp_adaptivecard_extract_from_copilot',
      'adaptivecard_data_binding': 'pp_adaptivecard_data_binding',
      
      // Security commands
      'auth_help': 'pp_auth_help',
      'auth_clear': 'pp_auth_clear',
      'auth_create': 'pp_auth_create',
      'auth_delete': 'pp_auth_delete',
      'auth_list': 'pp_auth_list',
      'auth_name': 'pp_auth_name',
      'auth_select': 'pp_auth_select',
      'auth_update': 'pp_auth_update',
      'assign_user': 'pp_assign_user',
      'assign_group': 'pp_assign_group',
      
      // Utility commands
      'tool_help': 'pp_tool_help',
      'tool_admin': 'pp_tool_admin',
      'tool_cmt': 'pp_tool_cmt',
      'tool_list': 'pp_tool_list',
      'tool_maker': 'pp_tool_maker',
      'tool_pd': 'pp_tool_pd',
      'tool_prt': 'pp_tool_prt',
      'tool_installer': 'pp_tool_installer',
      'whoami': 'pp_whoami',
      'catalog_status': 'pp_catalog_status',
      'help_commands': 'pp_help_commands',
      'telemetry_help': 'pp_telemetry_help',
      'telemetry_disable': 'pp_telemetry_disable',
      'telemetry_enable': 'pp_telemetry_enable',
      'telemetry_status': 'pp_telemetry_status',
      
      // Pipeline commands
      'pipeline_help': 'pp_pipeline_help',
      'pipeline_deploy': 'pp_pipeline_deploy',
      'pipeline_list': 'pp_pipeline_list',
      'package_help': 'pp_package_help',
      'package_deploy': 'pp_package_deploy',
      'package_init': 'pp_package_init',
      'package_show': 'pp_package_show',
      'package_update': 'pp_package_update',
      'package_version': 'pp_package_version',
      'download_portal': 'pp_download_portal',
      'upload_portal': 'pp_upload_portal',
      
      // Quality commands
      'solution_checker': 'pp_solution_checker',
      'test_help': 'pp_test_help',
      'test_run': 'pp_test_run',
      'power_fx_help': 'pp_power_fx_help',
      'power_fx_repl': 'pp_power_fx_repl',
      'power_fx_run': 'pp_power_fx_run',
      'model_builder_build': 'pp_model_builder_build'
    };

    // Handle copilot commands (all start with copilot_)
    if (command.startsWith('copilot_')) {
      return `pp_${command}`;
    }

    const mappedName = commandMap[command];
    if (!mappedName) {
      throw new Error(`Unknown command: ${command}`);
    }
    
    return mappedName;
  }
}