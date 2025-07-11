import * as vscode from 'vscode';
import { spawn, ChildProcess } from 'child_process';
import * as path from 'path';

let mcpServer: ChildProcess | undefined;

export function activate(context: vscode.ExtensionContext) {
    console.log('Power Agent MCP extension is now active!');

    // Register commands
    let startCommand = vscode.commands.registerCommand('power-agent-mcp.start', () => {
        startMCPServer(context);
    });

    let stopCommand = vscode.commands.registerCommand('power-agent-mcp.stop', () => {
        stopMCPServer();
    });

    let statusCommand = vscode.commands.registerCommand('power-agent-mcp.status', () => {
        showMCPStatus();
    });

    let validateCommand = vscode.commands.registerCommand('power-agent-mcp.validateTools', () => {
        validateAllTools();
    });

    context.subscriptions.push(startCommand, stopCommand, statusCommand, validateCommand);

    // Auto-start if enabled
    const config = vscode.workspace.getConfiguration('powerAgentMcp');
    const autoStart = config.get<boolean>('autoStart', true);
    
    if (autoStart) {
        // Delay auto-start slightly to let VSCode finish loading
        setTimeout(() => {
            startMCPServer(context);
        }, 2000);
    }
}

function startMCPServer(context: vscode.ExtensionContext) {
    if (mcpServer) {
        vscode.window.showWarningMessage('Power Agent MCP server is already running');
        return;
    }

    try {
        // Get the server path from the workspace or use the bundled version
        const serverPath = getServerPath();
        
        // Get configuration values
        const config = vscode.workspace.getConfiguration('powerAgentMcp');
        const tenantId = config.get<string>('environment.tenantId', '');
        const applicationId = config.get<string>('environment.applicationId', '');

        const serverEnv: { [key: string]: string | undefined } = {
            ...process.env,
            POWERPLATFORM_MCP_MODE: 'vscode'
        };

        // Add Power Platform environment variables if configured
        if (tenantId) {
            serverEnv.POWERPLATFORM_TENANT_ID = tenantId;
        }
        if (applicationId) {
            serverEnv.POWERPLATFORM_APPLICATION_ID = applicationId;
        }

        mcpServer = spawn('node', [serverPath], {
            env: serverEnv
        });

        mcpServer.on('spawn', () => {
            vscode.window.showInformationMessage('Power Agent MCP server started successfully');
        });

        mcpServer.on('error', (error) => {
            vscode.window.showErrorMessage(`Failed to start Power Agent MCP server: ${error.message}`);
            mcpServer = undefined;
        });

        mcpServer.on('exit', (code) => {
            vscode.window.showInformationMessage(`Power Agent MCP server stopped (exit code: ${code})`);
            mcpServer = undefined;
        });

    } catch (error: any) {
        vscode.window.showErrorMessage(`Error starting Power Agent MCP server: ${error.message}`);
    }
}

function stopMCPServer() {
    if (!mcpServer) {
        vscode.window.showWarningMessage('Power Agent MCP server is not running');
        return;
    }

    mcpServer.kill();
    mcpServer = undefined;
    vscode.window.showInformationMessage('Power Agent MCP server stopped');
}

function showMCPStatus() {
    const status = mcpServer ? 'Running' : 'Stopped';
    const pid = mcpServer ? mcpServer.pid : 'N/A';

    vscode.window.showInformationMessage(`Power Agent MCP Server Status: ${status} (PID: ${pid})`);
}

function validateAllTools() {
    if (!mcpServer) {
        vscode.window.showWarningMessage('Power Agent MCP server is not running. Please start it first.');
        return;
    }

    vscode.window.showInformationMessage('Validating Power Agent MCP tools... (This feature requires an MCP client connection)');
}

function getServerPath(): string {
    const config = vscode.workspace.getConfiguration('powerAgentMcp');
    const configuredPath = config.get<string>('serverPath');
    
    // If user has configured a specific path, use it
    if (configuredPath && configuredPath.trim() !== '') {
        return configuredPath.trim();
    }

    // Try to find the server in common locations
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (workspaceFolders) {
        // Look in workspace for local development
        const workspacePath = path.join(workspaceFolders[0].uri.fsPath, 'dist', 'mcp', 'server.js');
        if (require('fs').existsSync(workspacePath)) {
            return workspacePath;
        }
    }

    // Default to bundled server (included with extension)
    const bundledServerPath = path.join(__dirname, '..', 'server', 'server.js');
    if (require('fs').existsSync(bundledServerPath)) {
        return bundledServerPath;
    }

    // If bundled server not found, show error with helpful message
    vscode.window.showErrorMessage(
        'Power Agent MCP server not found. Please ensure the extension is properly installed or configure a custom server path in settings.'
    );
    throw new Error('MCP server not found');
}

export function deactivate() {
    if (mcpServer) {
        mcpServer.kill();
    }
}
