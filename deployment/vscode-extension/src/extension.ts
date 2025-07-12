import * as vscode from 'vscode';
import { spawn, ChildProcess } from 'child_process';
import * as path from 'path';
import { PublicClientApplication, Configuration, DeviceCodeRequest } from '@azure/msal-node';
import { DefaultAzureCredential, ChainedTokenCredential, AzureCliCredential, InteractiveBrowserCredential } from '@azure/identity';

let mcpServer: ChildProcess | undefined;

// Azure authentication configuration
const AZURE_CONFIG: Configuration = {
    auth: {
        clientId: "04b07795-8ddb-461a-bbee-02f9e1bf7b46", // Azure CLI client ID (publicly known)
        authority: "https://login.microsoftonline.com/common"
    }
};

const POWER_PLATFORM_SCOPE = "https://service.powerapps.com/.default";

interface AuthContext {
    tenantId?: string;
    accessToken?: string;
    account?: any;
}

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

async function startMCPServer(context: vscode.ExtensionContext) {
    if (mcpServer) {
        vscode.window.showWarningMessage('Power Agent MCP server is already running');
        return;
    }

    try {
        // Check if authentication is configured
        const authContext = await getAuthenticationContext(context);
        if (!authContext.tenantId) {
            const result = await vscode.window.showInformationMessage(
                'Azure authentication is required to use Power Agent MCP. Would you like to set it up now?',
                'Setup Authentication',
                'Cancel'
            );
            if (result === 'Setup Authentication') {
                await setupAzureAuthentication(context);
                return; // Will retry starting after authentication
            } else {
                return;
            }
        }

        // Get the server path from the workspace or use the bundled version
        const serverPath = getServerPath();
        
        const serverEnv: { [key: string]: string | undefined } = {
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

// Authentication functions
async function checkAuthenticationStatus(context: vscode.ExtensionContext) {
    const authContext = await getAuthenticationContext(context);
    
    if (!authContext.tenantId) {
        // No authentication configured, show welcome message
        const result = await vscode.window.showInformationMessage(
            'Welcome to Power Agent MCP! Azure authentication is required to get started.',
            'Setup Authentication',
            'Skip for now'
        );
        if (result === 'Setup Authentication') {
            await setupAzureAuthentication(context);
        }
    } else {
        // Authentication configured, check if auto-start is enabled
        const config = vscode.workspace.getConfiguration('powerAgentMcp');
        const autoStart = config.get<boolean>('autoStart', true);
        
        if (autoStart) {
            // Delay auto-start slightly to let VSCode finish loading
            setTimeout(() => {
                startMCPServer(context);
            }, 2000);
        }
    }
}

async function setupAzureAuthentication(context: vscode.ExtensionContext) {
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
    } catch (error: any) {
        vscode.window.showErrorMessage(`Authentication setup failed: ${error.message}`);
    }
}

async function setupAzureCLIAuth(context: vscode.ExtensionContext) {
    try {
        vscode.window.showInformationMessage('Checking Azure CLI authentication...');
        
        const credential = new AzureCliCredential();
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
            
        } catch (cliError) {
            throw new Error('Azure CLI not authenticated. Please run "az login" first.');
        }
        
    } catch (error: any) {
        throw new Error(`Azure CLI authentication failed: ${error.message}`);
    }
}

async function setupInteractiveBrowserAuth(context: vscode.ExtensionContext) {
    try {
        vscode.window.showInformationMessage('Starting browser authentication...');
        
        const pca = new PublicClientApplication(AZURE_CONFIG);
        
        const deviceCodeRequest: DeviceCodeRequest = {
            scopes: [POWER_PLATFORM_SCOPE],
            deviceCodeCallback: (response) => {
                vscode.window.showInformationMessage(
                    `To sign in, use a web browser to open the page ${response.verificationUri} and enter the code ${response.userCode}`
                );
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
        
    } catch (error: any) {
        throw new Error(`Interactive authentication failed: ${error.message}`);
    }
}

async function setupManualConfiguration(context: vscode.ExtensionContext) {
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

async function loginToAzure(context: vscode.ExtensionContext) {
    await setupAzureAuthentication(context);
}

async function logoutFromAzure(context: vscode.ExtensionContext) {
    await context.secrets.delete('powerAgentMcp.tenantId');
    await context.secrets.delete('powerAgentMcp.accessToken');
    await context.workspaceState.update('powerAgentMcp.accountDisplayName', undefined);
    
    vscode.window.showInformationMessage('Successfully logged out from Azure');
    
    // Stop server if running
    if (mcpServer) {
        stopMCPServer();
    }
}

async function getAuthenticationContext(context: vscode.ExtensionContext): Promise<AuthContext> {
    const tenantId = await context.secrets.get('powerAgentMcp.tenantId');
    const accessToken = await context.secrets.get('powerAgentMcp.accessToken');
    
    return {
        tenantId,
        accessToken
    };
}
