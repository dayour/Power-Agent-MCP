"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const child_process_1 = require("child_process");
const path = require("path");
let mcpServer;
function activate(context) {
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
function startMCPServer(context) {
    if (mcpServer) {
        vscode.window.showWarningMessage('Power Agent MCP server is already running');
        return;
    }
    try {
        // Get the server path from the workspace or use the bundled version
        const serverPath = getServerPath();
        mcpServer = (0, child_process_1.spawn)('node', [serverPath], {
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
    }
    catch (error) {
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
function getServerPath() {
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
function deactivate() {
    if (mcpServer) {
        mcpServer.kill();
    }
}
//# sourceMappingURL=extension.js.map