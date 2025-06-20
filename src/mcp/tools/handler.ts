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
import { AuthTools } from './auth.js';
import { CanvasTools } from './canvas.js';
import { CopilotTools } from './copilot.js';
import { EnvTools } from './env.js';
import { CodeTools } from './code.js';
import { ConnectionTools } from './connection.js';
import { ConnectorTools } from './connector.js';
import { PcfTools } from './pcf.js';
import { PluginTools } from './plugin.js';
import { PackageTools } from './package.js';
import { PagesTools } from './pages.js';
import { PowerFxTools } from './powerfx.js';
import { PipelineTools } from './pipeline.js';
import { TestTools } from './test.js';
import { TelemetryTools } from './telemetry.js';
import { ToolsManagementTools } from './toolsmanagement.js';
import { ModelBuilderTools } from './modelbuilder.js';
import { HelpTools } from './help.js';
import { AdaptiveCardTools } from './adaptivecards.js';

interface ToolCategory {
  getTools(): Tool[];
  getHandlers(): Record<string, (args: any) => Promise<any>>;
}

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
    const authTools = new AuthTools();
    const canvasTools = new CanvasTools();
    const copilotTools = new CopilotTools();
    const envTools = new EnvTools();
    const codeTools = new CodeTools();
    const connectionTools = new ConnectionTools();
    const connectorTools = new ConnectorTools();
    const pcfTools = new PcfTools();
    const telemetryTools = new TelemetryTools();
    const pluginTools = new PluginTools();
    const packageTools = new PackageTools();
    const pagesTools = new PagesTools();
    const powerFxTools = new PowerFxTools();
    const pipelineTools = new PipelineTools();
    const testTools = new TestTools();
    const toolsManagementTools = new ToolsManagementTools();
    const modelBuilderTools = new ModelBuilderTools();
    const helpTools = new HelpTools();
    const adaptiveCardTools = new AdaptiveCardTools();

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
    this.registerToolCategory(authTools);
    this.registerToolCategory(canvasTools);
    this.registerToolCategory(copilotTools);
    this.registerToolCategory(envTools);
    this.registerToolCategory(codeTools);
    this.registerToolCategory(connectionTools);
    this.registerToolCategory(connectorTools);
    this.registerToolCategory(pcfTools);
    this.registerToolCategory(telemetryTools);
    this.registerToolCategory(pluginTools);
    this.registerToolCategory(packageTools);
    this.registerToolCategory(pagesTools);
    this.registerToolCategory(powerFxTools);
    this.registerToolCategory(pipelineTools);
    this.registerToolCategory(testTools);
    this.registerToolCategory(toolsManagementTools);
    this.registerToolCategory(modelBuilderTools);
    this.registerToolCategory(helpTools);
    this.registerToolCategory(adaptiveCardTools);
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