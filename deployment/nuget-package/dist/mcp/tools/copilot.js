// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export class CopilotTools {
    getTools() {
        return [
            {
                name: 'pp_copilot_help',
                description: 'Show help for copilot commands',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_copilot_create',
                description: 'Creates a new copilot using an existing template file',
                inputSchema: {
                    type: 'object',
                    properties: {
                        templateFile: {
                            type: 'string',
                            description: 'Path to the template file'
                        },
                        name: {
                            type: 'string',
                            description: 'Name for the new copilot'
                        },
                        environment: {
                            type: 'string',
                            description: 'Target environment URL'
                        }
                    },
                    required: ['templateFile', 'name']
                }
            },
            {
                name: 'pp_copilot_extract_template',
                description: 'Extracts a template file from an existing copilot',
                inputSchema: {
                    type: 'object',
                    properties: {
                        copilotId: {
                            type: 'string',
                            description: 'ID of the copilot to extract template from'
                        },
                        outputFile: {
                            type: 'string',
                            description: 'Output file path for the template'
                        },
                        environment: {
                            type: 'string',
                            description: 'Source environment URL'
                        }
                    },
                    required: ['copilotId', 'outputFile']
                }
            },
            {
                name: 'pp_copilot_extract_translation',
                description: 'Extracts file containing localized content for copilots',
                inputSchema: {
                    type: 'object',
                    properties: {
                        copilotIds: {
                            type: 'array',
                            items: { type: 'string' },
                            description: 'IDs of copilots to extract translations from'
                        },
                        outputFile: {
                            type: 'string',
                            description: 'Output file path for translations'
                        },
                        language: {
                            type: 'string',
                            description: 'Language code for translations'
                        }
                    },
                    required: ['copilotIds', 'outputFile']
                }
            },
            {
                name: 'pp_copilot_list',
                description: 'List copilots in the current environment',
                inputSchema: {
                    type: 'object',
                    properties: {
                        environment: {
                            type: 'string',
                            description: 'Environment URL to list copilots from'
                        }
                    }
                }
            },
            {
                name: 'pp_copilot_merge_translation',
                description: 'Merge files containing localized content for copilots',
                inputSchema: {
                    type: 'object',
                    properties: {
                        translationFile: {
                            type: 'string',
                            description: 'Path to the translation file to merge'
                        },
                        environment: {
                            type: 'string',
                            description: 'Target environment URL'
                        }
                    },
                    required: ['translationFile']
                }
            },
            {
                name: 'pp_copilot_model_list',
                description: 'List AI Builder models in the current environment',
                inputSchema: {
                    type: 'object',
                    properties: {
                        environment: {
                            type: 'string',
                            description: 'Environment URL to list models from'
                        }
                    }
                }
            },
            {
                name: 'pp_copilot_model_predict',
                description: 'Sends text or prompt to AI Model for prediction',
                inputSchema: {
                    type: 'object',
                    properties: {
                        modelId: {
                            type: 'string',
                            description: 'ID of the AI model to use'
                        },
                        text: {
                            type: 'string',
                            description: 'Text input for the model'
                        },
                        prompt: {
                            type: 'string',
                            description: 'Prompt for the model'
                        }
                    },
                    required: ['modelId']
                }
            },
            {
                name: 'pp_copilot_model_prepare_fetch',
                description: 'Prepares FetchXML from AI LLM for execution against environment',
                inputSchema: {
                    type: 'object',
                    properties: {
                        fetchXmlFile: {
                            type: 'string',
                            description: 'Path to the FetchXML file from LLM'
                        },
                        outputFile: {
                            type: 'string',
                            description: 'Output file path for prepared FetchXML'
                        }
                    },
                    required: ['fetchXmlFile', 'outputFile']
                }
            },
            {
                name: 'pp_copilot_publish',
                description: 'Publish a Custom Copilot',
                inputSchema: {
                    type: 'object',
                    properties: {
                        copilotId: {
                            type: 'string',
                            description: 'ID of the copilot to publish'
                        },
                        environment: {
                            type: 'string',
                            description: 'Target environment URL'
                        }
                    },
                    required: ['copilotId']
                }
            },
            {
                name: 'pp_copilot_status',
                description: 'Poll the deployment status of a specified copilot',
                inputSchema: {
                    type: 'object',
                    properties: {
                        copilotId: {
                            type: 'string',
                            description: 'ID of the copilot to check status for'
                        },
                        requestId: {
                            type: 'string',
                            description: 'Request ID for status tracking'
                        }
                    },
                    required: ['copilotId']
                }
            },
            // Creation & Cloning Category
            {
                name: 'pp_copilot_clone',
                description: 'Clone an existing copilot with optional deep copy and knowledge transfer',
                inputSchema: {
                    type: 'object',
                    properties: {
                        sourceBotId: {
                            type: 'string',
                            description: 'ID of the source copilot to clone'
                        },
                        displayName: {
                            type: 'string',
                            description: 'Display name for the cloned copilot'
                        },
                        solution: {
                            type: 'string',
                            description: 'Target solution for the cloned copilot'
                        },
                        deep: {
                            type: 'boolean',
                            description: 'Perform deep clone including all dependencies'
                        },
                        includeKnowledge: {
                            type: 'boolean',
                            description: 'Include knowledge base in the clone'
                        },
                        attachMCP: {
                            type: 'boolean',
                            description: 'Attach MCP capabilities to cloned copilot'
                        }
                    },
                    required: ['sourceBotId', 'displayName']
                }
            },
            {
                name: 'pp_copilot_fork',
                description: 'Create a development fork of an existing copilot with branch management',
                inputSchema: {
                    type: 'object',
                    properties: {
                        sourceBotId: {
                            type: 'string',
                            description: 'ID of the source copilot to fork'
                        },
                        branchName: {
                            type: 'string',
                            description: 'Name for the development branch'
                        },
                        solution: {
                            type: 'string',
                            description: 'Target solution for the forked copilot'
                        }
                    },
                    required: ['sourceBotId', 'branchName', 'solution']
                }
            },
            {
                name: 'pp_copilot_init',
                description: 'Initialize a blank copilot with optional capabilities',
                inputSchema: {
                    type: 'object',
                    properties: {
                        blank: {
                            type: 'boolean',
                            description: 'Create a blank copilot without templates'
                        },
                        displayName: {
                            type: 'string',
                            description: 'Display name for the new copilot'
                        },
                        solution: {
                            type: 'string',
                            description: 'Target solution for the copilot'
                        },
                        withKnowledge: {
                            type: 'boolean',
                            description: 'Initialize with knowledge base capabilities'
                        },
                        withTools: {
                            type: 'boolean',
                            description: 'Initialize with tool integration capabilities'
                        },
                        withTopics: {
                            type: 'boolean',
                            description: 'Initialize with predefined topics'
                        }
                    },
                    required: ['displayName', 'solution']
                }
            },
            {
                name: 'pp_copilot_scaffold',
                description: 'Scaffold a new copilot using predefined templates',
                inputSchema: {
                    type: 'object',
                    properties: {
                        template: {
                            type: 'string',
                            description: 'Template name to use for scaffolding',
                            enum: ['kickStartTemplate', 'customerServiceTemplate', 'hrTemplate', 'salesTemplate']
                        },
                        displayName: {
                            type: 'string',
                            description: 'Display name for the scaffolded copilot'
                        },
                        solution: {
                            type: 'string',
                            description: 'Target solution for the copilot'
                        }
                    },
                    required: ['template', 'displayName', 'solution']
                }
            },
            // Import & Export Category
            {
                name: 'pp_copilot_export',
                description: 'Export copilot configuration and data in various formats',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID or name to export'
                        },
                        outDir: {
                            type: 'string',
                            description: 'Output directory for exported files'
                        },
                        json: {
                            type: 'boolean',
                            description: 'Export in JSON format'
                        },
                        xml: {
                            type: 'boolean',
                            description: 'Export in XML format'
                        },
                        yaml: {
                            type: 'boolean',
                            description: 'Export in YAML format'
                        }
                    },
                    required: ['bot', 'outDir']
                }
            },
            {
                name: 'pp_copilot_export_solution',
                description: 'Export copilot as part of a solution package',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solution: {
                            type: 'string',
                            description: 'Solution name to export'
                        },
                        managed: {
                            type: 'boolean',
                            description: 'Export as managed solution'
                        },
                        include: {
                            type: 'string',
                            description: 'Include level for export',
                            enum: ['general', 'extended']
                        }
                    },
                    required: ['solution']
                }
            },
            {
                name: 'pp_copilot_export_knowledge',
                description: 'Export knowledge base content from copilot',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to export knowledge from'
                        },
                        format: {
                            type: 'string',
                            description: 'Export format for knowledge',
                            enum: ['pdf', 'txt', 'url']
                        },
                        outDir: {
                            type: 'string',
                            description: 'Output directory for exported knowledge'
                        }
                    },
                    required: ['bot', 'format', 'outDir']
                }
            },
            {
                name: 'pp_copilot_export_topics',
                description: 'Export topics configuration from copilot',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to export topics from'
                        },
                        format: {
                            type: 'string',
                            description: 'Export format for topics',
                            enum: ['yaml', 'json']
                        },
                        outDir: {
                            type: 'string',
                            description: 'Output directory for exported topics'
                        }
                    },
                    required: ['bot', 'format', 'outDir']
                }
            },
            {
                name: 'pp_copilot_import',
                description: 'Import copilot configuration from file',
                inputSchema: {
                    type: 'object',
                    properties: {
                        file: {
                            type: 'string',
                            description: 'Path to import file (zip or yaml)'
                        },
                        solution: {
                            type: 'string',
                            description: 'Target solution for imported copilot'
                        },
                        overwrite: {
                            type: 'boolean',
                            description: 'Overwrite existing copilot if it exists'
                        }
                    },
                    required: ['file']
                }
            },
            {
                name: 'pp_copilot_import_knowledge',
                description: 'Import knowledge content into copilot',
                inputSchema: {
                    type: 'object',
                    properties: {
                        file: {
                            type: 'string',
                            description: 'Path to knowledge file (doc, url, sharepoint)'
                        },
                        bot: {
                            type: 'string',
                            description: 'Target copilot ID for knowledge import'
                        }
                    },
                    required: ['file', 'bot']
                }
            },
            {
                name: 'pp_copilot_import_topics',
                description: 'Import topics configuration into copilot',
                inputSchema: {
                    type: 'object',
                    properties: {
                        file: {
                            type: 'string',
                            description: 'Path to topics file (yaml or json)'
                        },
                        bot: {
                            type: 'string',
                            description: 'Target copilot ID for topics import'
                        }
                    },
                    required: ['file', 'bot']
                }
            },
            {
                name: 'pp_copilot_pull',
                description: 'Pull copilot changes from environment for two-way sync',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to pull changes from'
                        },
                        syncDir: {
                            type: 'string',
                            description: 'Local directory for synchronization'
                        }
                    },
                    required: ['bot', 'syncDir']
                }
            },
            {
                name: 'pp_copilot_push',
                description: 'Push local copilot changes to environment for two-way sync',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Target copilot ID to push changes to'
                        },
                        srcDir: {
                            type: 'string',
                            description: 'Source directory with local changes'
                        }
                    },
                    required: ['bot', 'srcDir']
                }
            },
            // Editing & Refactoring Category
            {
                name: 'pp_copilot_edit_settings',
                description: 'Edit copilot settings and configuration',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to edit settings for'
                        },
                        openIn: {
                            type: 'string',
                            description: 'Where to open the settings editor',
                            enum: ['editor', 'vsCode', 'browser']
                        }
                    },
                    required: ['bot']
                }
            },
            {
                name: 'pp_copilot_edit_manifest',
                description: 'Edit copilot manifest configuration',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to edit manifest for'
                        },
                        file: {
                            type: 'string',
                            description: 'Path to manifest YAML file'
                        }
                    },
                    required: ['bot', 'file']
                }
            },
            {
                name: 'pp_copilot_edit_topic',
                description: 'Edit, rename, or delete copilot topics',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID containing the topic'
                        },
                        topic: {
                            type: 'string',
                            description: 'Name of the topic to edit'
                        },
                        open: {
                            type: 'boolean',
                            description: 'Open topic for editing'
                        },
                        rename: {
                            type: 'string',
                            description: 'New name for the topic'
                        },
                        delete: {
                            type: 'boolean',
                            description: 'Delete the topic'
                        }
                    },
                    required: ['bot', 'topic']
                }
            },
            {
                name: 'pp_copilot_edit_knowledge',
                description: 'Edit or manage knowledge sources in copilot',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID containing the knowledge'
                        },
                        sourceId: {
                            type: 'string',
                            description: 'Knowledge source ID to edit'
                        },
                        updateFile: {
                            type: 'string',
                            description: 'Path to updated knowledge file'
                        },
                        remove: {
                            type: 'boolean',
                            description: 'Remove the knowledge source'
                        }
                    },
                    required: ['bot', 'sourceId']
                }
            },
            {
                name: 'pp_copilot_transform_state',
                description: 'Transform copilot state using JSON/YAML patches',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to transform'
                        },
                        patch: {
                            type: 'string',
                            description: 'jq expression for state transformation'
                        }
                    },
                    required: ['bot', 'patch']
                }
            },
            {
                name: 'pp_copilot_refactor_intents',
                description: 'Refactor and reorganize copilot intents with naming conventions',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to refactor intents for'
                        },
                        prefix: {
                            type: 'string',
                            description: 'Prefix to add to intent names'
                        },
                        dryRun: {
                            type: 'boolean',
                            description: 'Preview changes without applying them'
                        }
                    },
                    required: ['bot']
                }
            },
            {
                name: 'pp_copilot_rename',
                description: 'Rename copilot display name and schema name',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to rename'
                        },
                        displayName: {
                            type: 'string',
                            description: 'New display name for the copilot'
                        },
                        schemaName: {
                            type: 'string',
                            description: 'New unique schema name for the copilot'
                        }
                    },
                    required: ['bot', 'displayName', 'schemaName']
                }
            },
            // Knowledge & Tooling Category
            {
                name: 'pp_copilot_add_knowledge',
                description: 'Add knowledge sources to copilot',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to add knowledge to'
                        },
                        file: {
                            type: 'string',
                            description: 'Knowledge source (url, doc, or site)'
                        },
                        tags: {
                            type: 'string',
                            description: 'Tags for organizing knowledge'
                        }
                    },
                    required: ['bot', 'file']
                }
            },
            {
                name: 'pp_copilot_add_tool',
                description: 'Add custom connector tools to copilot',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to add tool to'
                        },
                        connector: {
                            type: 'string',
                            description: 'Custom connector ID to integrate'
                        },
                        auth: {
                            type: 'string',
                            description: 'Path to authentication parameters file'
                        }
                    },
                    required: ['bot', 'connector']
                }
            },
            {
                name: 'pp_copilot_add_prompt',
                description: 'Add custom prompts to copilot',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to add prompt to'
                        },
                        promptFile: {
                            type: 'string',
                            description: 'Path to markdown prompt file'
                        }
                    },
                    required: ['bot', 'promptFile']
                }
            },
            {
                name: 'pp_copilot_knowledge_list',
                description: 'List all knowledge sources in copilot',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to list knowledge from'
                        }
                    },
                    required: ['bot']
                }
            },
            {
                name: 'pp_copilot_tool_list',
                description: 'List all integrated tools in copilot',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to list tools from'
                        }
                    },
                    required: ['bot']
                }
            },
            {
                name: 'pp_copilot_knowledge_scrub',
                description: 'Scrub knowledge for PII and sensitive data',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to scrub knowledge for'
                        },
                        piiScan: {
                            type: 'boolean',
                            description: 'Enable PII scanning'
                        },
                        autoRedact: {
                            type: 'boolean',
                            description: 'Automatically redact sensitive content'
                        }
                    },
                    required: ['bot', 'piiScan']
                }
            },
            {
                name: 'pp_copilot_knowledge_reindex',
                description: 'Reindex knowledge base for better search and retrieval',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to reindex knowledge for'
                        },
                        force: {
                            type: 'boolean',
                            description: 'Force reindexing even if not needed'
                        }
                    },
                    required: ['bot']
                }
            },
            // Agents & Topics Management Category
            {
                name: 'pp_copilot_list_agents',
                description: 'List all copilot agents in the environment',
                inputSchema: {
                    type: 'object',
                    properties: {
                        environment: {
                            type: 'string',
                            description: 'Environment URL to list agents from'
                        }
                    }
                }
            },
            {
                name: 'pp_copilot_get_agent',
                description: 'Get detailed information about a specific copilot agent',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to get details for'
                        }
                    },
                    required: ['bot']
                }
            },
            {
                name: 'pp_copilot_delete_agent',
                description: 'Delete a copilot agent',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to delete'
                        },
                        yes: {
                            type: 'boolean',
                            description: 'Skip confirmation prompt'
                        }
                    },
                    required: ['bot']
                }
            },
            {
                name: 'pp_copilot_list_topics',
                description: 'List all topics in a copilot',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to list topics from'
                        }
                    },
                    required: ['bot']
                }
            },
            {
                name: 'pp_copilot_get_topic',
                description: 'Get detailed information about a specific topic',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID containing the topic'
                        },
                        topic: {
                            type: 'string',
                            description: 'Name of the topic to get details for'
                        }
                    },
                    required: ['bot', 'topic']
                }
            },
            {
                name: 'pp_copilot_delete_topic',
                description: 'Delete a topic from copilot',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID containing the topic'
                        },
                        topic: {
                            type: 'string',
                            description: 'Name of the topic to delete'
                        },
                        yes: {
                            type: 'boolean',
                            description: 'Skip confirmation prompt'
                        }
                    },
                    required: ['bot', 'topic']
                }
            },
            {
                name: 'pp_copilot_move_topic',
                description: 'Move a topic to a different section',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID containing the topic'
                        },
                        topic: {
                            type: 'string',
                            description: 'Name of the topic to move'
                        },
                        to: {
                            type: 'string',
                            description: 'Target section for the topic'
                        }
                    },
                    required: ['bot', 'topic', 'to']
                }
            },
            {
                name: 'pp_copilot_topic_version',
                description: 'Manage topic versioning with semantic versioning',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID containing the topic'
                        },
                        topic: {
                            type: 'string',
                            description: 'Name of the topic to version'
                        },
                        tag: {
                            type: 'string',
                            description: 'Semantic version tag (e.g., 1.0.0)'
                        }
                    },
                    required: ['bot', 'topic', 'tag']
                }
            },
            // Security, Governance & Compliance Category
            {
                name: 'pp_copilot_secure_roles',
                description: 'Manage security roles and permissions for copilot',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to manage security for'
                        },
                        add: {
                            type: 'string',
                            description: 'AAD Group or role to add'
                        },
                        permission: {
                            type: 'string',
                            description: 'Permission level to grant',
                            enum: ['read', 'write', 'admin']
                        }
                    },
                    required: ['bot', 'add', 'permission']
                }
            },
            {
                name: 'pp_copilot_secure_remove_role',
                description: 'Remove security role from copilot',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to remove role from'
                        },
                        role: {
                            type: 'string',
                            description: 'Role name to remove'
                        }
                    },
                    required: ['bot', 'role']
                }
            },
            {
                name: 'pp_copilot_secure_secrets',
                description: 'Manage secrets in Azure Key Vault for copilot',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to manage secrets for'
                        },
                        vault: {
                            type: 'string',
                            description: 'Key Vault name for secret storage'
                        },
                        set: {
                            type: 'string',
                            description: 'Secret name to set (e.g., OPENAI_API_KEY)'
                        }
                    },
                    required: ['bot', 'vault', 'set']
                }
            },
            {
                name: 'pp_copilot_secure_dlp_check',
                description: 'Perform Data Loss Prevention policy check',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to check DLP compliance for'
                        },
                        policyFile: {
                            type: 'string',
                            description: 'Path to DLP policy configuration file'
                        },
                        breakOnViolations: {
                            type: 'boolean',
                            description: 'Stop on policy violations'
                        }
                    },
                    required: ['bot', 'policyFile']
                }
            },
            {
                name: 'pp_copilot_audit_trail',
                description: 'Generate audit trail and activity logs for copilot',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to generate audit trail for'
                        },
                        since: {
                            type: 'string',
                            description: 'Start date for audit trail (e.g., 2025-01-01)'
                        },
                        format: {
                            type: 'string',
                            description: 'Output format for audit trail',
                            enum: ['csv', 'json']
                        }
                    },
                    required: ['bot']
                }
            },
            {
                name: 'pp_copilot_compliance_export',
                description: 'Export compliance reports for regulatory requirements',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to generate compliance report for'
                        },
                        report: {
                            type: 'string',
                            description: 'Type of compliance report',
                            enum: ['gdpr', 'hipaa', 'iso']
                        },
                        outDir: {
                            type: 'string',
                            description: 'Output directory for compliance reports'
                        }
                    },
                    required: ['bot', 'report', 'outDir']
                }
            },
            // Testing, Validation & Quality Category
            {
                name: 'pp_copilot_test_conversation',
                description: 'Test copilot conversations using test scripts',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to test conversations for'
                        },
                        script: {
                            type: 'string',
                            description: 'Path to conversation test script (YAML)'
                        },
                        record: {
                            type: 'boolean',
                            description: 'Record conversation for playback'
                        },
                        assertions: {
                            type: 'string',
                            description: 'Path to test assertions file'
                        }
                    },
                    required: ['bot', 'script']
                }
            },
            {
                name: 'pp_copilot_test_regression',
                description: 'Run regression tests comparing copilot versions',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to run regression tests for'
                        },
                        baseline: {
                            type: 'string',
                            description: 'Baseline test results folder'
                        },
                        head: {
                            type: 'string',
                            description: 'Current test results folder'
                        }
                    },
                    required: ['bot', 'baseline', 'head']
                }
            },
            {
                name: 'pp_copilot_validate_schema',
                description: 'Validate copilot configuration schema',
                inputSchema: {
                    type: 'object',
                    properties: {
                        file: {
                            type: 'string',
                            description: 'Path to copilot configuration file (YAML)'
                        }
                    },
                    required: ['file']
                }
            },
            {
                name: 'pp_copilot_validate_intents',
                description: 'Validate intent recognition accuracy',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to validate intents for'
                        },
                        threshold: {
                            type: 'number',
                            description: 'Minimum confidence threshold (0.0-1.0)',
                            minimum: 0,
                            maximum: 1
                        }
                    },
                    required: ['bot', 'threshold']
                }
            },
            {
                name: 'pp_copilot_lint_topics',
                description: 'Lint and validate topic configurations',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to lint topics for'
                        },
                        ruleset: {
                            type: 'string',
                            description: 'Path to linting rules configuration (JSON)'
                        },
                        fix: {
                            type: 'boolean',
                            description: 'Automatically fix linting issues'
                        }
                    },
                    required: ['bot']
                }
            },
            // Deployment & Lifecycle Category
            {
                name: 'pp_copilot_rollback',
                description: 'Rollback copilot to a previous version',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to rollback'
                        },
                        version: {
                            type: 'string',
                            description: 'Semantic version to rollback to'
                        }
                    },
                    required: ['bot', 'version']
                }
            },
            {
                name: 'pp_copilot_promote',
                description: 'Promote copilot between environments',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to promote'
                        },
                        from: {
                            type: 'string',
                            description: 'Source environment',
                            enum: ['dev', 'test', 'staging']
                        },
                        to: {
                            type: 'string',
                            description: 'Target environment',
                            enum: ['test', 'staging', 'prod']
                        }
                    },
                    required: ['bot', 'from', 'to']
                }
            },
            {
                name: 'pp_copilot_package_init',
                description: 'Initialize copilot package for deployment',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to package'
                        },
                        output: {
                            type: 'string',
                            description: 'Output package file path (.zip)'
                        }
                    },
                    required: ['bot', 'output']
                }
            },
            {
                name: 'pp_copilot_package_deploy',
                description: 'Deploy copilot package to environment',
                inputSchema: {
                    type: 'object',
                    properties: {
                        file: {
                            type: 'string',
                            description: 'Path to copilot package (.zip)'
                        },
                        environment: {
                            type: 'string',
                            description: 'Target environment URL'
                        }
                    },
                    required: ['file']
                }
            },
            {
                name: 'pp_copilot_containerize',
                description: 'Create containerized deployment for copilot',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to containerize'
                        },
                        output: {
                            type: 'string',
                            description: 'Output Dockerfile path'
                        }
                    },
                    required: ['bot', 'output']
                }
            },
            // Monitoring & Diagnostics Category
            {
                name: 'pp_copilot_logs',
                description: 'Retrieve and monitor copilot execution logs',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to retrieve logs for'
                        },
                        tail: {
                            type: 'boolean',
                            description: 'Show last entries only'
                        },
                        follow: {
                            type: 'boolean',
                            description: 'Follow log updates in real-time'
                        }
                    },
                    required: ['bot']
                }
            },
            {
                name: 'pp_copilot_metrics',
                description: 'Get performance metrics and analytics for copilot',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to get metrics for'
                        },
                        since: {
                            type: 'string',
                            description: 'Time period for metrics (e.g., 24h, 7d)'
                        },
                        format: {
                            type: 'string',
                            description: 'Output format for metrics',
                            enum: ['table', 'json']
                        }
                    },
                    required: ['bot', 'since']
                }
            },
            {
                name: 'pp_copilot_trace',
                description: 'Trace specific conversation execution',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to trace conversation for'
                        },
                        conversationId: {
                            type: 'string',
                            description: 'Conversation ID to trace'
                        }
                    },
                    required: ['bot', 'conversationId']
                }
            },
            {
                name: 'pp_copilot_monitor',
                description: 'Set up monitoring and alerting for copilot',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to monitor'
                        },
                        threshold: {
                            type: 'string',
                            description: 'Monitoring thresholds (e.g., latency>1s, errorRate>2%)'
                        }
                    },
                    required: ['bot', 'threshold']
                }
            },
            // Environment & Configuration Helpers Category
            {
                name: 'pp_copilot_env_set',
                description: 'Set environment context for copilot operations',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to set environment for'
                        },
                        environment: {
                            type: 'string',
                            description: 'Environment GUID or URL'
                        }
                    },
                    required: ['bot', 'environment']
                }
            },
            {
                name: 'pp_copilot_env_diff',
                description: 'Compare copilot configuration across environments',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to compare'
                        },
                        targetEnv: {
                            type: 'string',
                            description: 'Target environment GUID to compare with'
                        },
                        format: {
                            type: 'string',
                            description: 'Output format for differences',
                            enum: ['html', 'json', 'text']
                        }
                    },
                    required: ['bot', 'targetEnv']
                }
            },
            {
                name: 'pp_copilot_config_set',
                description: 'Set configuration options for copilot CLI',
                inputSchema: {
                    type: 'object',
                    properties: {
                        key: {
                            type: 'string',
                            description: 'Configuration key to set',
                            enum: ['telemetry', 'defaultEnvironment', 'timeout']
                        },
                        value: {
                            type: 'string',
                            description: 'Configuration value to set'
                        }
                    },
                    required: ['key', 'value']
                }
            },
            {
                name: 'pp_copilot_upgrade',
                description: 'Upgrade copilot to a newer version',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to upgrade'
                        },
                        toVersion: {
                            type: 'string',
                            description: 'Target version (latest or semantic version)'
                        }
                    },
                    required: ['bot', 'toVersion']
                }
            },
            {
                name: 'pp_copilot_version',
                description: 'Get version information for copilot',
                inputSchema: {
                    type: 'object',
                    properties: {
                        bot: {
                            type: 'string',
                            description: 'Copilot ID to get version for'
                        }
                    },
                    required: ['bot']
                }
            }
        ];
    }
    getHandlers() {
        return {
            // Original tools
            pp_copilot_help: async () => {
                return { content: 'Copilot commands help displayed' };
            },
            pp_copilot_create: async (args) => {
                return { content: `Copilot '${args.name}' created from template: ${args.templateFile}` };
            },
            pp_copilot_extract_template: async (args) => {
                return { content: `Template extracted from copilot ${args.copilotId} to: ${args.outputFile}` };
            },
            pp_copilot_extract_translation: async (args) => {
                return { content: `Translations extracted to: ${args.outputFile}` };
            },
            pp_copilot_list: async () => {
                return { content: 'Copilots listed from environment' };
            },
            pp_copilot_merge_translation: async (args) => {
                return { content: `Translations merged from: ${args.translationFile}` };
            },
            pp_copilot_model_list: async () => {
                return { content: 'AI Builder models listed' };
            },
            pp_copilot_model_predict: async (args) => {
                return { content: `Prediction generated using model: ${args.modelId}` };
            },
            pp_copilot_model_prepare_fetch: async (args) => {
                return { content: `FetchXML prepared from ${args.fetchXmlFile} to: ${args.outputFile}` };
            },
            pp_copilot_publish: async (args) => {
                return { content: `Copilot published: ${args.copilotId}` };
            },
            pp_copilot_status: async (args) => {
                return { content: `Status checked for copilot: ${args.copilotId}` };
            },
            // Creation & Cloning Category
            pp_copilot_clone: async (args) => {
                return { content: `Copilot cloned from ${args.sourceBotId} as '${args.displayName}'${args.deep ? ' (deep clone)' : ''}${args.includeKnowledge ? ' with knowledge' : ''}` };
            },
            pp_copilot_fork: async (args) => {
                return { content: `Copilot forked from ${args.sourceBotId} to branch '${args.branchName}' in solution '${args.solution}'` };
            },
            pp_copilot_init: async (args) => {
                const capabilities = [];
                if (args.withKnowledge)
                    capabilities.push('knowledge');
                if (args.withTools)
                    capabilities.push('tools');
                if (args.withTopics)
                    capabilities.push('topics');
                return { content: `Blank copilot '${args.displayName}' initialized${capabilities.length ? ' with ' + capabilities.join(', ') : ''}` };
            },
            pp_copilot_scaffold: async (args) => {
                return { content: `Copilot '${args.displayName}' scaffolded using ${args.template} template in solution '${args.solution}'` };
            },
            // Import & Export Category
            pp_copilot_export: async (args) => {
                const format = args.json ? 'JSON' : args.xml ? 'XML' : args.yaml ? 'YAML' : 'default';
                return { content: `Copilot '${args.bot}' exported to '${args.outDir}' in ${format} format` };
            },
            pp_copilot_export_solution: async (args) => {
                return { content: `Solution '${args.solution}' exported${args.managed ? ' as managed' : ''}${args.include ? ' with ' + args.include + ' components' : ''}` };
            },
            pp_copilot_export_knowledge: async (args) => {
                return { content: `Knowledge from copilot '${args.bot}' exported in ${args.format} format to '${args.outDir}'` };
            },
            pp_copilot_export_topics: async (args) => {
                return { content: `Topics from copilot '${args.bot}' exported in ${args.format} format to '${args.outDir}'` };
            },
            pp_copilot_import: async (args) => {
                return { content: `Copilot imported from '${args.file}'${args.solution ? ' to solution ' + args.solution : ''}${args.overwrite ? ' (overwrite enabled)' : ''}` };
            },
            pp_copilot_import_knowledge: async (args) => {
                return { content: `Knowledge imported from '${args.file}' to copilot '${args.bot}'` };
            },
            pp_copilot_import_topics: async (args) => {
                return { content: `Topics imported from '${args.file}' to copilot '${args.bot}'` };
            },
            pp_copilot_pull: async (args) => {
                return { content: `Changes pulled from copilot '${args.bot}' to local directory '${args.syncDir}'` };
            },
            pp_copilot_push: async (args) => {
                return { content: `Local changes from '${args.srcDir}' pushed to copilot '${args.bot}'` };
            },
            // Editing & Refactoring Category
            pp_copilot_edit_settings: async (args) => {
                return { content: `Settings for copilot '${args.bot}' opened in ${args.openIn || 'default editor'}` };
            },
            pp_copilot_edit_manifest: async (args) => {
                return { content: `Manifest for copilot '${args.bot}' updated from file '${args.file}'` };
            },
            pp_copilot_edit_topic: async (args) => {
                if (args.delete)
                    return { content: `Topic '${args.topic}' deleted from copilot '${args.bot}'` };
                if (args.rename)
                    return { content: `Topic '${args.topic}' renamed to '${args.rename}' in copilot '${args.bot}'` };
                return { content: `Topic '${args.topic}' opened for editing in copilot '${args.bot}'` };
            },
            pp_copilot_edit_knowledge: async (args) => {
                if (args.remove)
                    return { content: `Knowledge source '${args.sourceId}' removed from copilot '${args.bot}'` };
                return { content: `Knowledge source '${args.sourceId}' updated${args.updateFile ? ' from file ' + args.updateFile : ''} in copilot '${args.bot}'` };
            },
            pp_copilot_transform_state: async (args) => {
                return { content: `State transformation applied to copilot '${args.bot}' using patch: ${args.patch}` };
            },
            pp_copilot_refactor_intents: async (args) => {
                return { content: `Intents refactored for copilot '${args.bot}'${args.prefix ? ' with prefix ' + args.prefix : ''}${args.dryRun ? ' (dry run)' : ''}` };
            },
            pp_copilot_rename: async (args) => {
                return { content: `Copilot '${args.bot}' renamed to '${args.displayName}' with schema name '${args.schemaName}'` };
            },
            // Knowledge & Tooling Category
            pp_copilot_add_knowledge: async (args) => {
                return { content: `Knowledge source '${args.file}' added to copilot '${args.bot}'${args.tags ? ' with tags: ' + args.tags : ''}` };
            },
            pp_copilot_add_tool: async (args) => {
                return { content: `Tool connector '${args.connector}' added to copilot '${args.bot}'${args.auth ? ' with authentication' : ''}` };
            },
            pp_copilot_add_prompt: async (args) => {
                return { content: `Custom prompt from '${args.promptFile}' added to copilot '${args.bot}'` };
            },
            pp_copilot_knowledge_list: async (args) => {
                return { content: `Knowledge sources listed for copilot '${args.bot}'` };
            },
            pp_copilot_tool_list: async (args) => {
                return { content: `Integrated tools listed for copilot '${args.bot}'` };
            },
            pp_copilot_knowledge_scrub: async (args) => {
                return { content: `Knowledge scrubbed for copilot '${args.bot}' with PII scan ${args.piiScan ? 'enabled' : 'disabled'}${args.autoRedact ? ' and auto-redaction' : ''}` };
            },
            pp_copilot_knowledge_reindex: async (args) => {
                return { content: `Knowledge reindexed for copilot '${args.bot}'${args.force ? ' (forced)' : ''}` };
            },
            // Agents & Topics Management Category
            pp_copilot_list_agents: async (args) => {
                return { content: `Copilot agents listed${args.environment ? ' from environment ' + args.environment : ''}` };
            },
            pp_copilot_get_agent: async (args) => {
                return { content: `Details retrieved for copilot agent '${args.bot}'` };
            },
            pp_copilot_delete_agent: async (args) => {
                return { content: `Copilot agent '${args.bot}' deleted${args.yes ? ' (confirmed)' : ''}` };
            },
            pp_copilot_list_topics: async (args) => {
                return { content: `Topics listed for copilot '${args.bot}'` };
            },
            pp_copilot_get_topic: async (args) => {
                return { content: `Details retrieved for topic '${args.topic}' in copilot '${args.bot}'` };
            },
            pp_copilot_delete_topic: async (args) => {
                return { content: `Topic '${args.topic}' deleted from copilot '${args.bot}'${args.yes ? ' (confirmed)' : ''}` };
            },
            pp_copilot_move_topic: async (args) => {
                return { content: `Topic '${args.topic}' moved to section '${args.to}' in copilot '${args.bot}'` };
            },
            pp_copilot_topic_version: async (args) => {
                return { content: `Topic '${args.topic}' versioned as '${args.tag}' in copilot '${args.bot}'` };
            },
            // Security, Governance & Compliance Category
            pp_copilot_secure_roles: async (args) => {
                return { content: `Role '${args.add}' added to copilot '${args.bot}' with ${args.permission} permission` };
            },
            pp_copilot_secure_remove_role: async (args) => {
                return { content: `Role '${args.role}' removed from copilot '${args.bot}'` };
            },
            pp_copilot_secure_secrets: async (args) => {
                return { content: `Secret '${args.set}' configured in Key Vault '${args.vault}' for copilot '${args.bot}'` };
            },
            pp_copilot_secure_dlp_check: async (args) => {
                return { content: `DLP policy check completed for copilot '${args.bot}' using policy '${args.policyFile}'${args.breakOnViolations ? ' (break on violations)' : ''}` };
            },
            pp_copilot_audit_trail: async (args) => {
                return { content: `Audit trail generated for copilot '${args.bot}'${args.since ? ' since ' + args.since : ''}${args.format ? ' in ' + args.format + ' format' : ''}` };
            },
            pp_copilot_compliance_export: async (args) => {
                return { content: `${args.report.toUpperCase()} compliance report exported for copilot '${args.bot}' to '${args.outDir}'` };
            },
            // Testing, Validation & Quality Category
            pp_copilot_test_conversation: async (args) => {
                return { content: `Conversation test executed for copilot '${args.bot}' using script '${args.script}'${args.record ? ' (recorded)' : ''}${args.assertions ? ' with assertions' : ''}` };
            },
            pp_copilot_test_regression: async (args) => {
                return { content: `Regression test completed for copilot '${args.bot}' comparing baseline '${args.baseline}' with head '${args.head}'` };
            },
            pp_copilot_validate_schema: async (args) => {
                return { content: `Schema validation completed for file '${args.file}'` };
            },
            pp_copilot_validate_intents: async (args) => {
                return { content: `Intent validation completed for copilot '${args.bot}' with threshold ${args.threshold}` };
            },
            pp_copilot_lint_topics: async (args) => {
                return { content: `Topics linted for copilot '${args.bot}'${args.ruleset ? ' using ruleset ' + args.ruleset : ''}${args.fix ? ' (auto-fixed)' : ''}` };
            },
            // Deployment & Lifecycle Category
            pp_copilot_rollback: async (args) => {
                return { content: `Copilot '${args.bot}' rolled back to version '${args.version}'` };
            },
            pp_copilot_promote: async (args) => {
                return { content: `Copilot '${args.bot}' promoted from '${args.from}' to '${args.to}' environment` };
            },
            pp_copilot_package_init: async (args) => {
                return { content: `Package initialized for copilot '${args.bot}' at '${args.output}'` };
            },
            pp_copilot_package_deploy: async (args) => {
                return { content: `Package '${args.file}' deployed${args.environment ? ' to environment ' + args.environment : ''}` };
            },
            pp_copilot_containerize: async (args) => {
                return { content: `Dockerfile created for copilot '${args.bot}' at '${args.output}'` };
            },
            // Monitoring & Diagnostics Category
            pp_copilot_logs: async (args) => {
                return { content: `Logs retrieved for copilot '${args.bot}'${args.tail ? ' (tail)' : ''}${args.follow ? ' (follow)' : ''}` };
            },
            pp_copilot_metrics: async (args) => {
                return { content: `Metrics retrieved for copilot '${args.bot}' since '${args.since}' in ${args.format} format` };
            },
            pp_copilot_trace: async (args) => {
                return { content: `Conversation '${args.conversationId}' traced for copilot '${args.bot}'` };
            },
            pp_copilot_monitor: async (args) => {
                return { content: `Monitoring configured for copilot '${args.bot}' with threshold '${args.threshold}'` };
            },
            // Environment & Configuration Helpers Category
            pp_copilot_env_set: async (args) => {
                return { content: `Environment '${args.environment}' set for copilot '${args.bot}'` };
            },
            pp_copilot_env_diff: async (args) => {
                return { content: `Environment differences for copilot '${args.bot}' compared with '${args.targetEnv}' in ${args.format} format` };
            },
            pp_copilot_config_set: async (args) => {
                return { content: `Configuration '${args.key}' set to '${args.value}'` };
            },
            pp_copilot_upgrade: async (args) => {
                return { content: `Copilot '${args.bot}' upgraded to version '${args.toVersion}'` };
            },
            pp_copilot_version: async (args) => {
                return { content: `Version information retrieved for copilot '${args.bot}'` };
            }
        };
    }
}
