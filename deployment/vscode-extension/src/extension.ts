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

    context.subscriptions.push(startCommand, stopCommand, statusCommand);
}

function startMCPServer(context: vscode.ExtensionContext) {
    if (mcpServer) {
        vscode.window.showWarningMessage('Power Agent MCP server is already running');
        return;
    }

    try {
        // Get the server path from the workspace or use the bundled version
        const serverPath = getServerPath();

        mcpServer = spawn('node', [serverPath], {
            env: {
                ...process.env,
                POWERPLATFORM_MCP_MODE: 'vscode'
            }
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

function getServerPath(): string {
    // Try to find the server in common locations
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (workspaceFolders) {
        // Look in workspace for local development
        const workspacePath = path.join(workspaceFolders[0].uri.fsPath, 'dist', 'mcp', 'server.js');
        if (require('fs').existsSync(workspacePath)) {
            return workspacePath;
        }
    }

    // Default to a relative path (should be bundled with extension)
    return path.join(__dirname, '..', 'server', 'server.js');
}

export function deactivate() {
    if (mcpServer) {
        mcpServer.kill();
    }
}
