"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const child_process_1 = require("child_process");
const path = __importStar(require("path"));
const msal_node_1 = require("@azure/msal-node");
const identity_1 = require("@azure/identity");
let mcpServer;
// Azure authentication configuration
const AZURE_CONFIG = {
    auth: {
        clientId: "04b07795-8ddb-461a-bbee-02f9e1bf7b46", // Azure CLI client ID (publicly known)
        authority: "https://login.microsoftonline.com/common"
    }
};
const POWER_PLATFORM_SCOPE = "https://service.powerapps.com/.default";
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
    let validateCommand = vscode.commands.registerCommand('power-agent-mcp.validateTools', () => {
        validateAllTools();
    });
    let setupCommand = vscode.commands.registerCommand('power-agent-mcp.setup', () => {
        setupAzureAuthentication(context);
    });
    let loginCommand = vscode.commands.registerCommand('power-agent-mcp.login', () => {
        loginToAzure(context);
    });
    let logoutCommand = vscode.commands.registerCommand('power-agent-mcp.logout', () => {
        logoutFromAzure(context);
    });
    context.subscriptions.push(startCommand, stopCommand, statusCommand, validateCommand, setupCommand, loginCommand, logoutCommand);
    // Check authentication status and prompt setup if needed
    checkAuthenticationStatus(context);
}
async function startMCPServer(context) {
    if (mcpServer) {
        vscode.window.showWarningMessage('Power Agent MCP server is already running');
        return;
    }
    try {
        // Check if authentication is configured
        const authContext = await getAuthenticationContext(context);
        if (!authContext.tenantId) {
            const result = await vscode.window.showInformationMessage('Azure authentication is required to use Power Agent MCP. Would you like to set it up now?', 'Setup Authentication', 'Cancel');
            if (result === 'Setup Authentication') {
                await setupAzureAuthentication(context);
                return; // Will retry starting after authentication
            }
            else {
                return;
            }
        }
        // Get the server path from the workspace or use the bundled version
        const serverPath = getServerPath();
        const serverEnv = {
            ...process.env,
            POWERPLATFORM_MCP_MODE: 'vscode'
        };
        // Add Power Platform environment variables from authentication
        if (authContext.tenantId) {
            serverEnv.POWERPLATFORM_TENANT_ID = authContext.tenantId;
        }
        if (authContext.accessToken) {
            serverEnv.POWERPLATFORM_ACCESS_TOKEN = authContext.accessToken;
        }
        mcpServer = (0, child_process_1.spawn)('node', [serverPath], {
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
function validateAllTools() {
    if (!mcpServer) {
        vscode.window.showWarningMessage('Power Agent MCP server is not running. Please start it first.');
        return;
    }
    vscode.window.showInformationMessage('Validating Power Agent MCP tools... (This feature requires an MCP client connection)');
}
function getServerPath() {
    const config = vscode.workspace.getConfiguration('powerAgentMcp');
    const configuredPath = config.get('serverPath');
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
    vscode.window.showErrorMessage('Power Agent MCP server not found. Please ensure the extension is properly installed or configure a custom server path in settings.');
    throw new Error('MCP server not found');
}
function deactivate() {
    if (mcpServer) {
        mcpServer.kill();
    }
}
// Authentication functions
async function checkAuthenticationStatus(context) {
    const authContext = await getAuthenticationContext(context);
    if (!authContext.tenantId) {
        // No authentication configured, show welcome message
        const result = await vscode.window.showInformationMessage('Welcome to Power Agent MCP! Azure authentication is required to get started.', 'Setup Authentication', 'Skip for now');
        if (result === 'Setup Authentication') {
            await setupAzureAuthentication(context);
        }
    }
    else {
        // Authentication configured, check if auto-start is enabled
        const config = vscode.workspace.getConfiguration('powerAgentMcp');
        const autoStart = config.get('autoStart', true);
        if (autoStart) {
            // Delay auto-start slightly to let VSCode finish loading
            setTimeout(() => {
                startMCPServer(context);
            }, 2000);
        }
    }
}
async function setupAzureAuthentication(context) {
    const choices = [
        'Use Azure CLI (recommended)',
        'Interactive Browser Login',
        'Manual Configuration'
    ];
    const choice = await vscode.window.showQuickPick(choices, {
        placeHolder: 'Select authentication method'
    });
    if (!choice) {
        return;
    }
    try {
        switch (choice) {
            case 'Use Azure CLI (recommended)':
                await setupAzureCLIAuth(context);
                break;
            case 'Interactive Browser Login':
                await setupInteractiveBrowserAuth(context);
                break;
            case 'Manual Configuration':
                await setupManualConfiguration(context);
                break;
        }
    }
    catch (error) {
        vscode.window.showErrorMessage(`Authentication setup failed: ${error.message}`);
    }
}
async function setupAzureCLIAuth(context) {
    try {
        vscode.window.showInformationMessage('Checking Azure CLI authentication...');
        const credential = new identity_1.AzureCliCredential();
        const token = await credential.getToken(POWER_PLATFORM_SCOPE);
        // Get tenant information from Azure CLI
        const { exec } = require('child_process');
        const { promisify } = require('util');
        const execAsync = promisify(exec);
        try {
            const { stdout } = await execAsync('az account show --query "{tenantId: tenantId, displayName: name}" -o json');
            const accountInfo = JSON.parse(stdout);
            // Store authentication information
            await context.secrets.store('powerAgentMcp.tenantId', accountInfo.tenantId);
            await context.secrets.store('powerAgentMcp.accessToken', token.token);
            await context.workspaceState.update('powerAgentMcp.accountDisplayName', accountInfo.displayName);
            vscode.window.showInformationMessage(`Successfully authenticated with Azure CLI (Tenant: ${accountInfo.displayName})`);
            // Ask if user wants to start the server now
            const startNow = await vscode.window.showQuickPick(['Yes', 'No'], {
                placeHolder: 'Start Power Agent MCP server now?'
            });
            if (startNow === 'Yes') {
                startMCPServer(context);
            }
        }
        catch (cliError) {
            throw new Error('Azure CLI not authenticated. Please run "az login" first.');
        }
    }
    catch (error) {
        throw new Error(`Azure CLI authentication failed: ${error.message}`);
    }
}
async function setupInteractiveBrowserAuth(context) {
    try {
        vscode.window.showInformationMessage('Starting browser authentication...');
        const pca = new msal_node_1.PublicClientApplication(AZURE_CONFIG);
        const deviceCodeRequest = {
            scopes: [POWER_PLATFORM_SCOPE],
            deviceCodeCallback: (response) => {
                vscode.window.showInformationMessage(`To sign in, use a web browser to open the page ${response.verificationUri} and enter the code ${response.userCode}`);
            }
        };
        const response = await pca.acquireTokenByDeviceCode(deviceCodeRequest);
        if (response && response.account) {
            // Store authentication information
            await context.secrets.store('powerAgentMcp.tenantId', response.account.tenantId || '');
            await context.secrets.store('powerAgentMcp.accessToken', response.accessToken);
            await context.workspaceState.update('powerAgentMcp.accountDisplayName', response.account.name || 'Unknown');
            vscode.window.showInformationMessage(`Successfully authenticated (Account: ${response.account.username})`);
            // Ask if user wants to start the server now
            const startNow = await vscode.window.showQuickPick(['Yes', 'No'], {
                placeHolder: 'Start Power Agent MCP server now?'
            });
            if (startNow === 'Yes') {
                startMCPServer(context);
            }
        }
    }
    catch (error) {
        throw new Error(`Interactive authentication failed: ${error.message}`);
    }
}
async function setupManualConfiguration(context) {
    const tenantId = await vscode.window.showInputBox({
        prompt: 'Enter your Azure Tenant ID',
        placeHolder: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        validateInput: (value) => {
            if (!value || !value.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
                return 'Please enter a valid UUID format for Tenant ID';
            }
            return undefined;
        }
    });
    if (!tenantId) {
        return;
    }
    // Store manual configuration
    await context.secrets.store('powerAgentMcp.tenantId', tenantId);
    await context.workspaceState.update('powerAgentMcp.accountDisplayName', 'Manual Configuration');
    vscode.window.showInformationMessage('Manual configuration saved. Note: You may need to provide additional authentication when the server starts.');
    // Ask if user wants to start the server now
    const startNow = await vscode.window.showQuickPick(['Yes', 'No'], {
        placeHolder: 'Start Power Agent MCP server now?'
    });
    if (startNow === 'Yes') {
        startMCPServer(context);
    }
}
async function loginToAzure(context) {
    await setupAzureAuthentication(context);
}
async function logoutFromAzure(context) {
    await context.secrets.delete('powerAgentMcp.tenantId');
    await context.secrets.delete('powerAgentMcp.accessToken');
    await context.workspaceState.update('powerAgentMcp.accountDisplayName', undefined);
    vscode.window.showInformationMessage('Successfully logged out from Azure');
    // Stop server if running
    if (mcpServer) {
        stopMCPServer();
    }
}
async function getAuthenticationContext(context) {
    const tenantId = await context.secrets.get('powerAgentMcp.tenantId');
    const accessToken = await context.secrets.get('powerAgentMcp.accessToken');
    return {
        tenantId,
        accessToken
    };
}
//# sourceMappingURL=extension.js.map