// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';

// Import Power Platform task handlers
import { PowerPlatformToolHandler } from './tools/handler.js';
import { VSCodeHierarchicalTools } from './tools/vscode-hierarchy.js';

interface ToolProvider {
  getAllTools(): Tool[];
  callTool(name: string, args: any): Promise<any>;
}

class PowerPlatformMCPServer {
  private server: Server;
  private toolProvider: ToolProvider;

  constructor() {
    this.server = new Server(
      {
        name: 'power-platform-build-tools',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // Check if running in VSCode mode (environment variable or detect based on usage)
    const mcpMode = process.env.POWERPLATFORM_MCP_MODE || 'full';
    
    if (mcpMode === 'vscode' || mcpMode === 'hierarchical') {
      // Use hierarchical tools for VSCode compatibility (10 parent tools)
      const fullHandler = new PowerPlatformToolHandler();
      const vsCodeTools = new VSCodeHierarchicalTools(fullHandler);
      
      this.toolProvider = {
        getAllTools: () => vsCodeTools.getParentTools(),
        callTool: async (name: string, args: any) => {
          const handlers = vsCodeTools.getHandlers();
          const handler = handlers[name];
          if (!handler) {
            throw new Error(`Unknown tool: ${name}`);
          }
          return await handler(args);
        }
      };
    } else {
      // Use full tool exposure for Claude and other MCP clients (229 tools)
      this.toolProvider = new PowerPlatformToolHandler();
    }
    
    this.setupToolHandlers();
  }

  private setupToolHandlers(): void {
    // Handle tool listing
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: this.toolProvider.getAllTools(),
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        const result = await this.toolProvider.callTool(name, args || {});
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        if (error instanceof McpError) {
          throw error;
        }
        throw new McpError(
          ErrorCode.InternalError,
          `Tool execution failed: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    });
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}

// Start the server
const server = new PowerPlatformMCPServer();
server.run().catch((error) => {
  console.error('Server failed to start:', error);
  process.exit(1);
});