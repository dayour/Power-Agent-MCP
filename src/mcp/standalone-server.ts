#!/usr/bin/env node

/**
 * Standalone Power Agent MCP Server
 * 
 * This is a production-ready MCP server that provides AI assistants with access to
 * Microsoft Power Platform through natural language commands. It executes PAC CLI
 * commands directly without depending on internal Microsoft packages.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { spawn, exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';

const execAsync = promisify(exec);

/**
 * Core Power Platform MCP Tools
 * These tools execute PAC CLI commands directly and parse the results
 */
class PowerPlatformMCPServer {
  private server: Server;
  private isAuthenticated: boolean = false;
  private currentEnvironment: string | null = null;

  constructor() {
    this.server = new Server(
      {
        name: 'power-agent-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupHandlers();
  }

  private setupHandlers() {
    // List all available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: this.getAllTools(),
      };
    });

    // Execute tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      
      try {
        const result = await this.callTool(name, args || {});
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        throw new McpError(
          ErrorCode.InternalError,
          `Error executing tool ${name}: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    });
  }

  private getAllTools(): Tool[] {
    return [
      // Environment Management Tools
      {
        name: 'pp_whoami',
        description: 'Check current Power Platform authentication status and environment',
        inputSchema: {
          type: 'object',
          properties: {},
          additionalProperties: false,
        },
      },
      {
        name: 'pp_create_environment',
        description: 'Create a new Power Platform environment',
        inputSchema: {
          type: 'object',
          properties: {
            displayName: {
              type: 'string',
              description: 'Display name for the environment',
            },
            environmentType: {
              type: 'string',
              enum: ['Sandbox', 'Production', 'Trial', 'Developer'],
              description: 'Type of environment to create',
            },
            region: {
              type: 'string',
              description: 'Azure region for the environment (e.g., unitedstates, europe)',
            },
            currency: {
              type: 'string',
              description: 'Currency code (e.g., USD, EUR)',
            },
            language: {
              type: 'string',
              description: 'Language code (e.g., en-US, fr-FR)',
            },
            domainName: {
              type: 'string',
              description: 'Domain name for the environment',
            },
          },
          required: ['displayName', 'environmentType'],
          additionalProperties: false,
        },
      },
      {
        name: 'pp_list_environments',
        description: 'List all Power Platform environments',
        inputSchema: {
          type: 'object',
          properties: {},
          additionalProperties: false,
        },
      },
      {
        name: 'pp_delete_environment',
        description: 'Delete a Power Platform environment',
        inputSchema: {
          type: 'object',
          properties: {
            environmentUrl: {
              type: 'string',
              description: 'URL of the environment to delete',
            },
            environmentId: {
              type: 'string',
              description: 'ID of the environment to delete',
            },
          },
          additionalProperties: false,
        },
      },
      // Solution Management Tools
      {
        name: 'pp_export_solution',
        description: 'Export a Power Platform solution',
        inputSchema: {
          type: 'object',
          properties: {
            solutionName: {
              type: 'string',
              description: 'Name of the solution to export',
            },
            outputFile: {
              type: 'string',
              description: 'Output file path for the exported solution',
            },
            managed: {
              type: 'boolean',
              description: 'Export as managed solution',
              default: false,
            },
            async: {
              type: 'boolean',
              description: 'Use asynchronous export',
              default: false,
            },
            environment: {
              type: 'string',
              description: 'Environment URL or ID',
            },
          },
          required: ['solutionName', 'outputFile'],
          additionalProperties: false,
        },
      },
      {
        name: 'pp_import_solution',
        description: 'Import a Power Platform solution',
        inputSchema: {
          type: 'object',
          properties: {
            solutionFile: {
              type: 'string',
              description: 'Path to the solution file to import',
            },
            publishWorkflows: {
              type: 'boolean',
              description: 'Publish workflows after import',
              default: false,
            },
            overwriteUnmanagedCustomizations: {
              type: 'boolean',
              description: 'Overwrite unmanaged customizations',
              default: false,
            },
            async: {
              type: 'boolean',
              description: 'Use asynchronous import',
              default: false,
            },
            environment: {
              type: 'string',
              description: 'Environment URL or ID',
            },
          },
          required: ['solutionFile'],
          additionalProperties: false,
        },
      },
      {
        name: 'pp_list_solutions',
        description: 'List all solutions in the current environment',
        inputSchema: {
          type: 'object',
          properties: {
            environment: {
              type: 'string',
              description: 'Environment URL or ID',
            },
          },
          additionalProperties: false,
        },
      },
      {
        name: 'pp_pack_solution',
        description: 'Pack a solution from source files',
        inputSchema: {
          type: 'object',
          properties: {
            sourceFolder: {
              type: 'string',
              description: 'Source folder containing unpacked solution',
            },
            outputFile: {
              type: 'string',
              description: 'Output file path for packed solution',
            },
            solutionType: {
              type: 'string',
              enum: ['Unmanaged', 'Managed', 'Both'],
              description: 'Type of solution to pack',
              default: 'Unmanaged',
            },
            processCanvasApps: {
              type: 'boolean',
              description: 'Process Canvas apps during packing',
              default: false,
            },
          },
          required: ['sourceFolder', 'outputFile'],
          additionalProperties: false,
        },
      },
      {
        name: 'pp_unpack_solution',
        description: 'Unpack a solution to source files',
        inputSchema: {
          type: 'object',
          properties: {
            solutionFile: {
              type: 'string',
              description: 'Path to the solution file to unpack',
            },
            targetFolder: {
              type: 'string',
              description: 'Target folder for unpacked solution',
            },
            processCanvasApps: {
              type: 'boolean',
              description: 'Process Canvas apps during unpacking',
              default: false,
            },
          },
          required: ['solutionFile', 'targetFolder'],
          additionalProperties: false,
        },
      },
      // Authentication and Setup Tools
      {
        name: 'pp_auth_create',
        description: 'Create authentication profile for Power Platform',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Name for the authentication profile',
            },
            url: {
              type: 'string',
              description: 'Power Platform environment URL',
            },
            username: {
              type: 'string',
              description: 'Username for authentication',
            },
            password: {
              type: 'string',
              description: 'Password for authentication',
            },
            applicationId: {
              type: 'string',
              description: 'Application ID for service principal authentication',
            },
            clientSecret: {
              type: 'string',
              description: 'Client secret for service principal authentication',
            },
            tenant: {
              type: 'string',
              description: 'Tenant ID for service principal authentication',
            },
          },
          required: ['name'],
          additionalProperties: false,
        },
      },
      {
        name: 'pp_auth_list',
        description: 'List all authentication profiles',
        inputSchema: {
          type: 'object',
          properties: {},
          additionalProperties: false,
        },
      },
      {
        name: 'pp_auth_select',
        description: 'Select an authentication profile',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Name of the authentication profile to select',
            },
          },
          required: ['name'],
          additionalProperties: false,
        },
      },
    ];
  }

  private async callTool(name: string, args: any): Promise<any> {
    // Check if PAC CLI is available
    await this.ensurePacCliAvailable();

    switch (name) {
      case 'pp_whoami':
        return this.executeWhoami();
      
      case 'pp_create_environment':
        return this.executeCreateEnvironment(args);
      
      case 'pp_list_environments':
        return this.executeListEnvironments();
      
      case 'pp_delete_environment':
        return this.executeDeleteEnvironment(args);
      
      case 'pp_export_solution':
        return this.executeExportSolution(args);
      
      case 'pp_import_solution':
        return this.executeImportSolution(args);
      
      case 'pp_list_solutions':
        return this.executeListSolutions(args);
      
      case 'pp_pack_solution':
        return this.executePackSolution(args);
      
      case 'pp_unpack_solution':
        return this.executeUnpackSolution(args);
      
      case 'pp_auth_create':
        return this.executeAuthCreate(args);
      
      case 'pp_auth_list':
        return this.executeAuthList();
      
      case 'pp_auth_select':
        return this.executeAuthSelect(args);
      
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }

  private async ensurePacCliAvailable(): Promise<void> {
    try {
      await execAsync('pac --version');
    } catch (error) {
      throw new Error(
        'Power Platform CLI (pac) is not installed or not in PATH. ' +
        'Please install it from https://aka.ms/PowerPlatformCLI'
      );
    }
  }

  // Tool Implementation Methods
  private async executeWhoami(): Promise<any> {
    try {
      const { stdout, stderr } = await execAsync('pac whoami');
      this.isAuthenticated = !stderr && !stdout.includes('Please run pac auth');
      return {
        success: true,
        authenticated: this.isAuthenticated,
        output: stdout,
        error: stderr || null,
      };
    } catch (error) {
      return {
        success: false,
        authenticated: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  private async executeCreateEnvironment(args: any): Promise<any> {
    const cmd = this.buildPacCommand('admin create', {
      'display-name': args.displayName,
      'type': args.environmentType,
      'region': args.region,
      'currency': args.currency,
      'language': args.language,
      'domain-name': args.domainName,
    });

    return this.executePacCommand(cmd);
  }

  private async executeListEnvironments(): Promise<any> {
    return this.executePacCommand('pac admin list');
  }

  private async executeDeleteEnvironment(args: any): Promise<any> {
    const cmd = this.buildPacCommand('admin delete', {
      'environment': args.environmentUrl || args.environmentId,
    });

    return this.executePacCommand(cmd);
  }

  private async executeExportSolution(args: any): Promise<any> {
    const cmd = this.buildPacCommand('solution export', {
      'name': args.solutionName,
      'path': args.outputFile,
      'managed': args.managed,
      'async': args.async,
      'environment': args.environment,
    });

    return this.executePacCommand(cmd);
  }

  private async executeImportSolution(args: any): Promise<any> {
    const cmd = this.buildPacCommand('solution import', {
      'path': args.solutionFile,
      'publish-changes': args.publishWorkflows,
      'force-overwrite': args.overwriteUnmanagedCustomizations,
      'async': args.async,
      'environment': args.environment,
    });

    return this.executePacCommand(cmd);
  }

  private async executeListSolutions(args: any): Promise<any> {
    const cmd = this.buildPacCommand('solution list', {
      'environment': args.environment,
    });

    return this.executePacCommand(cmd);
  }

  private async executePackSolution(args: any): Promise<any> {
    const cmd = this.buildPacCommand('solution pack', {
      'folder': args.sourceFolder,
      'zipfile': args.outputFile,
      'packagetype': args.solutionType,
      'processCanvasApps': args.processCanvasApps,
    });

    return this.executePacCommand(cmd);
  }

  private async executeUnpackSolution(args: any): Promise<any> {
    const cmd = this.buildPacCommand('solution unpack', {
      'zipfile': args.solutionFile,
      'folder': args.targetFolder,
      'processCanvasApps': args.processCanvasApps,
    });

    return this.executePacCommand(cmd);
  }

  private async executeAuthCreate(args: any): Promise<any> {
    let cmd = `pac auth create --name "${args.name}"`;
    
    if (args.url) cmd += ` --url "${args.url}"`;
    if (args.username) cmd += ` --username "${args.username}"`;
    if (args.password) cmd += ` --password "${args.password}"`;
    if (args.applicationId) cmd += ` --applicationId "${args.applicationId}"`;
    if (args.clientSecret) cmd += ` --clientSecret "${args.clientSecret}"`;
    if (args.tenant) cmd += ` --tenant "${args.tenant}"`;

    return this.executePacCommand(cmd);
  }

  private async executeAuthList(): Promise<any> {
    return this.executePacCommand('pac auth list');
  }

  private async executeAuthSelect(args: any): Promise<any> {
    const cmd = `pac auth select --name "${args.name}"`;
    return this.executePacCommand(cmd);
  }

  // Utility Methods
  private sanitizeCommandForLogging(cmd: string): string {
    // Redact sensitive information from PAC CLI commands for safe logging
    let sanitized = cmd;
    
    // Redact quoted password parameters first (most specific)
    sanitized = sanitized.replace(/--password\s+"[^"]+"/gi, '--password "[REDACTED]"');
    sanitized = sanitized.replace(/--password\s+'[^']+'/gi, "--password '[REDACTED]'");
    
    // Redact quoted client secret parameters first (most specific)
    sanitized = sanitized.replace(/--clientSecret\s+"[^"]+"/gi, '--clientSecret "[REDACTED]"');
    sanitized = sanitized.replace(/--clientSecret\s+'[^']+'/gi, "--clientSecret '[REDACTED]'");
    
    // Then handle unquoted values (less specific, won't match if already replaced)
    sanitized = sanitized.replace(/--password\s+(?!"\[REDACTED\]")[^\s]+/gi, '--password [REDACTED]');
    sanitized = sanitized.replace(/--clientSecret\s+(?!"\[REDACTED\]")[^\s]+/gi, '--clientSecret [REDACTED]');
    
    // Redact any other potential secrets with quotes
    sanitized = sanitized.replace(/--token\s+"[^"]+"/gi, '--token "[REDACTED]"');
    sanitized = sanitized.replace(/--key\s+"[^"]+"/gi, '--key "[REDACTED]"');
    sanitized = sanitized.replace(/--secret\s+"[^"]+"/gi, '--secret "[REDACTED]"');
    
    return sanitized;
  }

  private buildPacCommand(baseCmd: string, params: Record<string, any>): string {
    let cmd = `pac ${baseCmd}`;
    
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== '') {
        if (typeof value === 'boolean') {
          if (value) {
            cmd += ` --${key}`;
          }
        } else {
          cmd += ` --${key} "${value}"`;
        }
      }
    }
    
    return cmd;
  }

  private async executePacCommand(cmd: string): Promise<any> {
    try {
      // Sanitize command for logging to prevent credential exposure
      const sanitizedCmd = this.sanitizeCommandForLogging(cmd);
      console.error(`Executing: ${sanitizedCmd}`);
      const { stdout, stderr } = await execAsync(cmd, { 
        timeout: 300000, // 5 minutes timeout
        maxBuffer: 1024 * 1024 * 10 // 10MB buffer
      });
      
      return {
        success: true,
        command: cmd,
        output: stdout,
        error: stderr || null,
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      return {
        success: false,
        command: cmd,
        error: error.message || String(error),
        stdout: error.stdout || '',
        stderr: error.stderr || '',
        timestamp: new Date().toISOString(),
      };
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    
    console.error('🚀 Power Agent MCP Server running...');
    console.error('💡 Provides 12 core Power Platform tools via natural language');
    console.error('📋 Type "list tools" in your MCP client to see available tools');
  }
}

// Start the server
const server = new PowerPlatformMCPServer();
server.run().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
