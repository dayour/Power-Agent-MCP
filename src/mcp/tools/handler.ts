// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { EnvironmentTools } from './environment.js';
import { SolutionTools } from './solution.js';
import { DataTools } from './data.js';
import { QualityTools } from './quality.js';
import { SecurityTools } from './security.js';
import { ApplicationTools } from './application.js';
import { PortalTools } from './portal.js';
import { GovernanceTools } from './governance.js';
import { UtilityTools } from './utility.js';
import { SqlTools } from './sql.js';

export class PowerPlatformToolHandler {
  private tools: Map<string, Tool> = new Map();
  private handlers: Map<string, (args: any) => Promise<any>> = new Map();

  constructor() {
    this.initializeTools();
  }

  private initializeTools(): void {
    // Initialize all tool categories
    const environmentTools = new EnvironmentTools();
    const solutionTools = new SolutionTools();
    const dataTools = new DataTools();
    const qualityTools = new QualityTools();
    const securityTools = new SecurityTools();
    const applicationTools = new ApplicationTools();
    const portalTools = new PortalTools();
    const governanceTools = new GovernanceTools();
    const utilityTools = new UtilityTools();
    const sqlTools = new SqlTools();

    // Register all tools
    this.registerToolCategory(environmentTools);
    this.registerToolCategory(solutionTools);
    this.registerToolCategory(dataTools);
    this.registerToolCategory(qualityTools);
    this.registerToolCategory(securityTools);
    this.registerToolCategory(applicationTools);
    this.registerToolCategory(portalTools);
    this.registerToolCategory(governanceTools);
    this.registerToolCategory(utilityTools);
    this.registerToolCategory(sqlTools);
  }

  private registerToolCategory(toolCategory: ToolCategory): void {
    const tools = toolCategory.getTools();
    const handlers = toolCategory.getHandlers();

    tools.forEach((tool: Tool) => {
      this.tools.set(tool.name, tool);
    });

    Object.entries(handlers).forEach(([name, handler]) => {
      this.handlers.set(name, handler as (args: any) => Promise<any>);
    });
  }

  getAllTools(): Tool[] {
    return Array.from(this.tools.values());
  }

  async callTool(name: string, args: any): Promise<any> {
    const handler = this.handlers.get(name);
    if (!handler) {
      throw new Error(`Unknown tool: ${name}`);
    }

    return await handler(args);
  }
}