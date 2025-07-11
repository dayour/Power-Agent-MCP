"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopilotTools = void 0;
var CopilotTools = /** @class */ (function () {
    function CopilotTools() {
    }
    CopilotTools.prototype.getTools = function () {
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
    };
    CopilotTools.prototype.getHandlers = function () {
        var _this = this;
        return {
            // Original tools
            pp_copilot_help: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: 'Copilot commands help displayed' }];
                });
            }); },
            pp_copilot_create: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Copilot '".concat(args.name, "' created from template: ").concat(args.templateFile) }];
                });
            }); },
            pp_copilot_extract_template: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Template extracted from copilot ".concat(args.copilotId, " to: ").concat(args.outputFile) }];
                });
            }); },
            pp_copilot_extract_translation: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Translations extracted to: ".concat(args.outputFile) }];
                });
            }); },
            pp_copilot_list: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: 'Copilots listed from environment' }];
                });
            }); },
            pp_copilot_merge_translation: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Translations merged from: ".concat(args.translationFile) }];
                });
            }); },
            pp_copilot_model_list: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: 'AI Builder models listed' }];
                });
            }); },
            pp_copilot_model_predict: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Prediction generated using model: ".concat(args.modelId) }];
                });
            }); },
            pp_copilot_model_prepare_fetch: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "FetchXML prepared from ".concat(args.fetchXmlFile, " to: ").concat(args.outputFile) }];
                });
            }); },
            pp_copilot_publish: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Copilot published: ".concat(args.copilotId) }];
                });
            }); },
            pp_copilot_status: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Status checked for copilot: ".concat(args.copilotId) }];
                });
            }); },
            // Creation & Cloning Category
            pp_copilot_clone: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Copilot cloned from ".concat(args.sourceBotId, " as '").concat(args.displayName, "'").concat(args.deep ? ' (deep clone)' : '').concat(args.includeKnowledge ? ' with knowledge' : '') }];
                });
            }); },
            pp_copilot_fork: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Copilot forked from ".concat(args.sourceBotId, " to branch '").concat(args.branchName, "' in solution '").concat(args.solution, "'") }];
                });
            }); },
            pp_copilot_init: function (args) { return __awaiter(_this, void 0, void 0, function () {
                var capabilities;
                return __generator(this, function (_a) {
                    capabilities = [];
                    if (args.withKnowledge)
                        capabilities.push('knowledge');
                    if (args.withTools)
                        capabilities.push('tools');
                    if (args.withTopics)
                        capabilities.push('topics');
                    return [2 /*return*/, { content: "Blank copilot '".concat(args.displayName, "' initialized").concat(capabilities.length ? ' with ' + capabilities.join(', ') : '') }];
                });
            }); },
            pp_copilot_scaffold: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Copilot '".concat(args.displayName, "' scaffolded using ").concat(args.template, " template in solution '").concat(args.solution, "'") }];
                });
            }); },
            // Import & Export Category
            pp_copilot_export: function (args) { return __awaiter(_this, void 0, void 0, function () {
                var format;
                return __generator(this, function (_a) {
                    format = args.json ? 'JSON' : args.xml ? 'XML' : args.yaml ? 'YAML' : 'default';
                    return [2 /*return*/, { content: "Copilot '".concat(args.bot, "' exported to '").concat(args.outDir, "' in ").concat(format, " format") }];
                });
            }); },
            pp_copilot_export_solution: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Solution '".concat(args.solution, "' exported").concat(args.managed ? ' as managed' : '').concat(args.include ? ' with ' + args.include + ' components' : '') }];
                });
            }); },
            pp_copilot_export_knowledge: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Knowledge from copilot '".concat(args.bot, "' exported in ").concat(args.format, " format to '").concat(args.outDir, "'") }];
                });
            }); },
            pp_copilot_export_topics: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Topics from copilot '".concat(args.bot, "' exported in ").concat(args.format, " format to '").concat(args.outDir, "'") }];
                });
            }); },
            pp_copilot_import: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Copilot imported from '".concat(args.file, "'").concat(args.solution ? ' to solution ' + args.solution : '').concat(args.overwrite ? ' (overwrite enabled)' : '') }];
                });
            }); },
            pp_copilot_import_knowledge: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Knowledge imported from '".concat(args.file, "' to copilot '").concat(args.bot, "'") }];
                });
            }); },
            pp_copilot_import_topics: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Topics imported from '".concat(args.file, "' to copilot '").concat(args.bot, "'") }];
                });
            }); },
            pp_copilot_pull: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Changes pulled from copilot '".concat(args.bot, "' to local directory '").concat(args.syncDir, "'") }];
                });
            }); },
            pp_copilot_push: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Local changes from '".concat(args.srcDir, "' pushed to copilot '").concat(args.bot, "'") }];
                });
            }); },
            // Editing & Refactoring Category
            pp_copilot_edit_settings: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Settings for copilot '".concat(args.bot, "' opened in ").concat(args.openIn || 'default editor') }];
                });
            }); },
            pp_copilot_edit_manifest: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Manifest for copilot '".concat(args.bot, "' updated from file '").concat(args.file, "'") }];
                });
            }); },
            pp_copilot_edit_topic: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (args.delete)
                        return [2 /*return*/, { content: "Topic '".concat(args.topic, "' deleted from copilot '").concat(args.bot, "'") }];
                    if (args.rename)
                        return [2 /*return*/, { content: "Topic '".concat(args.topic, "' renamed to '").concat(args.rename, "' in copilot '").concat(args.bot, "'") }];
                    return [2 /*return*/, { content: "Topic '".concat(args.topic, "' opened for editing in copilot '").concat(args.bot, "'") }];
                });
            }); },
            pp_copilot_edit_knowledge: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (args.remove)
                        return [2 /*return*/, { content: "Knowledge source '".concat(args.sourceId, "' removed from copilot '").concat(args.bot, "'") }];
                    return [2 /*return*/, { content: "Knowledge source '".concat(args.sourceId, "' updated").concat(args.updateFile ? ' from file ' + args.updateFile : '', " in copilot '").concat(args.bot, "'") }];
                });
            }); },
            pp_copilot_transform_state: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "State transformation applied to copilot '".concat(args.bot, "' using patch: ").concat(args.patch) }];
                });
            }); },
            pp_copilot_refactor_intents: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Intents refactored for copilot '".concat(args.bot, "'").concat(args.prefix ? ' with prefix ' + args.prefix : '').concat(args.dryRun ? ' (dry run)' : '') }];
                });
            }); },
            pp_copilot_rename: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Copilot '".concat(args.bot, "' renamed to '").concat(args.displayName, "' with schema name '").concat(args.schemaName, "'") }];
                });
            }); },
            // Knowledge & Tooling Category
            pp_copilot_add_knowledge: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Knowledge source '".concat(args.file, "' added to copilot '").concat(args.bot, "'").concat(args.tags ? ' with tags: ' + args.tags : '') }];
                });
            }); },
            pp_copilot_add_tool: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Tool connector '".concat(args.connector, "' added to copilot '").concat(args.bot, "'").concat(args.auth ? ' with authentication' : '') }];
                });
            }); },
            pp_copilot_add_prompt: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Custom prompt from '".concat(args.promptFile, "' added to copilot '").concat(args.bot, "'") }];
                });
            }); },
            pp_copilot_knowledge_list: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Knowledge sources listed for copilot '".concat(args.bot, "'") }];
                });
            }); },
            pp_copilot_tool_list: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Integrated tools listed for copilot '".concat(args.bot, "'") }];
                });
            }); },
            pp_copilot_knowledge_scrub: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Knowledge scrubbed for copilot '".concat(args.bot, "' with PII scan ").concat(args.piiScan ? 'enabled' : 'disabled').concat(args.autoRedact ? ' and auto-redaction' : '') }];
                });
            }); },
            pp_copilot_knowledge_reindex: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Knowledge reindexed for copilot '".concat(args.bot, "'").concat(args.force ? ' (forced)' : '') }];
                });
            }); },
            // Agents & Topics Management Category
            pp_copilot_list_agents: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Copilot agents listed".concat(args.environment ? ' from environment ' + args.environment : '') }];
                });
            }); },
            pp_copilot_get_agent: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Details retrieved for copilot agent '".concat(args.bot, "'") }];
                });
            }); },
            pp_copilot_delete_agent: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Copilot agent '".concat(args.bot, "' deleted").concat(args.yes ? ' (confirmed)' : '') }];
                });
            }); },
            pp_copilot_list_topics: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Topics listed for copilot '".concat(args.bot, "'") }];
                });
            }); },
            pp_copilot_get_topic: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Details retrieved for topic '".concat(args.topic, "' in copilot '").concat(args.bot, "'") }];
                });
            }); },
            pp_copilot_delete_topic: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Topic '".concat(args.topic, "' deleted from copilot '").concat(args.bot, "'").concat(args.yes ? ' (confirmed)' : '') }];
                });
            }); },
            pp_copilot_move_topic: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Topic '".concat(args.topic, "' moved to section '").concat(args.to, "' in copilot '").concat(args.bot, "'") }];
                });
            }); },
            pp_copilot_topic_version: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Topic '".concat(args.topic, "' versioned as '").concat(args.tag, "' in copilot '").concat(args.bot, "'") }];
                });
            }); },
            // Security, Governance & Compliance Category
            pp_copilot_secure_roles: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Role '".concat(args.add, "' added to copilot '").concat(args.bot, "' with ").concat(args.permission, " permission") }];
                });
            }); },
            pp_copilot_secure_remove_role: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Role '".concat(args.role, "' removed from copilot '").concat(args.bot, "'") }];
                });
            }); },
            pp_copilot_secure_secrets: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Secret '".concat(args.set, "' configured in Key Vault '").concat(args.vault, "' for copilot '").concat(args.bot, "'") }];
                });
            }); },
            pp_copilot_secure_dlp_check: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "DLP policy check completed for copilot '".concat(args.bot, "' using policy '").concat(args.policyFile, "'").concat(args.breakOnViolations ? ' (break on violations)' : '') }];
                });
            }); },
            pp_copilot_audit_trail: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Audit trail generated for copilot '".concat(args.bot, "'").concat(args.since ? ' since ' + args.since : '').concat(args.format ? ' in ' + args.format + ' format' : '') }];
                });
            }); },
            pp_copilot_compliance_export: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "".concat(args.report.toUpperCase(), " compliance report exported for copilot '").concat(args.bot, "' to '").concat(args.outDir, "'") }];
                });
            }); },
            // Testing, Validation & Quality Category
            pp_copilot_test_conversation: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Conversation test executed for copilot '".concat(args.bot, "' using script '").concat(args.script, "'").concat(args.record ? ' (recorded)' : '').concat(args.assertions ? ' with assertions' : '') }];
                });
            }); },
            pp_copilot_test_regression: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Regression test completed for copilot '".concat(args.bot, "' comparing baseline '").concat(args.baseline, "' with head '").concat(args.head, "'") }];
                });
            }); },
            pp_copilot_validate_schema: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Schema validation completed for file '".concat(args.file, "'") }];
                });
            }); },
            pp_copilot_validate_intents: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Intent validation completed for copilot '".concat(args.bot, "' with threshold ").concat(args.threshold) }];
                });
            }); },
            pp_copilot_lint_topics: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Topics linted for copilot '".concat(args.bot, "'").concat(args.ruleset ? ' using ruleset ' + args.ruleset : '').concat(args.fix ? ' (auto-fixed)' : '') }];
                });
            }); },
            // Deployment & Lifecycle Category
            pp_copilot_rollback: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Copilot '".concat(args.bot, "' rolled back to version '").concat(args.version, "'") }];
                });
            }); },
            pp_copilot_promote: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Copilot '".concat(args.bot, "' promoted from '").concat(args.from, "' to '").concat(args.to, "' environment") }];
                });
            }); },
            pp_copilot_package_init: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Package initialized for copilot '".concat(args.bot, "' at '").concat(args.output, "'") }];
                });
            }); },
            pp_copilot_package_deploy: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Package '".concat(args.file, "' deployed").concat(args.environment ? ' to environment ' + args.environment : '') }];
                });
            }); },
            pp_copilot_containerize: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Dockerfile created for copilot '".concat(args.bot, "' at '").concat(args.output, "'") }];
                });
            }); },
            // Monitoring & Diagnostics Category
            pp_copilot_logs: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Logs retrieved for copilot '".concat(args.bot, "'").concat(args.tail ? ' (tail)' : '').concat(args.follow ? ' (follow)' : '') }];
                });
            }); },
            pp_copilot_metrics: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Metrics retrieved for copilot '".concat(args.bot, "' since '").concat(args.since, "' in ").concat(args.format, " format") }];
                });
            }); },
            pp_copilot_trace: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Conversation '".concat(args.conversationId, "' traced for copilot '").concat(args.bot, "'") }];
                });
            }); },
            pp_copilot_monitor: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Monitoring configured for copilot '".concat(args.bot, "' with threshold '").concat(args.threshold, "'") }];
                });
            }); },
            // Environment & Configuration Helpers Category
            pp_copilot_env_set: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Environment '".concat(args.environment, "' set for copilot '").concat(args.bot, "'") }];
                });
            }); },
            pp_copilot_env_diff: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Environment differences for copilot '".concat(args.bot, "' compared with '").concat(args.targetEnv, "' in ").concat(args.format, " format") }];
                });
            }); },
            pp_copilot_config_set: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Configuration '".concat(args.key, "' set to '").concat(args.value, "'") }];
                });
            }); },
            pp_copilot_upgrade: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Copilot '".concat(args.bot, "' upgraded to version '").concat(args.toVersion, "'") }];
                });
            }); },
            pp_copilot_version: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { content: "Version information retrieved for copilot '".concat(args.bot, "'") }];
                });
            }); }
        };
    };
    return CopilotTools;
}());
exports.CopilotTools = CopilotTools;
