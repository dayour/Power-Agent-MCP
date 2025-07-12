import * as vscode from 'vscode';
import { spawn, ChildProcess } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import axios from 'axios';

let mcpServer: ChildProcess | undefined;

interface PowerPlatformEnvironment {
    environmentId: string;
    environmentName: string;
    tenantId: string;
    environmentUrl: string;
    location: string;
}

interface PowerPlatformAuthContext {
    environmentUrl?: string;
    tenantId?: string;
    accessToken?: string;
    environmentName?: string;
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
        setupPowerPlatformAuthentication(context);
    });

    let loginCommand = vscode.commands.registerCommand('power-agent-mcp.login', () => {
        loginToPowerPlatform(context);
    });

    let logoutCommand = vscode.commands.registerCommand('power-agent-mcp.logout', () => {
        logoutFromPowerPlatform(context);
    });

    let selectEnvironmentCommand = vscode.commands.registerCommand('power-agent-mcp.selectEnvironment', () => {
        selectPowerPlatformEnvironment(context);
    });

    context.subscriptions.push(startCommand, stopCommand, statusCommand, validateCommand, setupCommand, loginCommand, logoutCommand, selectEnvironmentCommand);

    // Check authentication status and prompt setup if needed
    checkPowerPlatformAuthenticationStatus(context);
}

async function startMCPServer(context: vscode.ExtensionContext) {
    if (mcpServer) {
        vscode.window.showWarningMessage('Power Agent MCP server is already running');
        return;
    }

    try {
        // Check if Power Platform authentication is configured
        const authContext = await getPowerPlatformAuthenticationContext(context);
        if (!authContext.environmentUrl || !authContext.tenantId) {
            const result = await vscode.window.showInformationMessage(
                'Power Platform authentication is required to use Power Agent MCP. Would you like to set it up now?',
                'Setup Authentication',
                'Cancel'
            );
            if (result === 'Setup Authentication') {
                await setupPowerPlatformAuthentication(context);
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
        if (authContext.environmentUrl) {
            serverEnv.POWERPLATFORM_ENVIRONMENT_URL = authContext.environmentUrl;
        }
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
            const envName = authContext.environmentName || 'Unknown Environment';
            vscode.window.showInformationMessage(`Power Agent MCP server started successfully (Environment: ${envName})`);
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
        if (fs.existsSync(workspacePath)) {
            return workspacePath;
        }
    }

    // Default to bundled server (included with extension)
    const bundledServerPath = path.join(__dirname, '..', 'server', 'server.js');
    if (fs.existsSync(bundledServerPath)) {
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

// Power Platform Authentication Functions
async function checkPowerPlatformAuthenticationStatus(context: vscode.ExtensionContext) {
    const authContext = await getPowerPlatformAuthenticationContext(context);
    
    if (!authContext.environmentUrl || !authContext.tenantId) {
        // No authentication configured, show welcome message
        const result = await vscode.window.showInformationMessage(
            'Welcome to Power Agent MCP! Power Platform authentication is required to get started.',
            'Setup Authentication',
            'Skip for now'
        );
        if (result === 'Setup Authentication') {
            await setupPowerPlatformAuthentication(context);
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

async function setupPowerPlatformAuthentication(context: vscode.ExtensionContext) {
    const choices = [
        'Use Power Platform CLI (pac auth)',
        'Interactive Environment Selection',
        'Manual Environment Configuration'
    ];
    
    const choice = await vscode.window.showQuickPick(choices, {
        placeHolder: 'Select authentication method'
    });

    if (!choice) {
        return;
    }

    try {
        switch (choice) {
            case 'Use Power Platform CLI (pac auth)':
                await setupPACAuthIntegration(context);
                break;
            case 'Interactive Environment Selection':
                await setupInteractiveEnvironmentSelection(context);
                break;
            case 'Manual Environment Configuration':
                await setupManualEnvironmentConfiguration(context);
                break;
        }
    } catch (error: any) {
        vscode.window.showErrorMessage(`Power Platform authentication setup failed: ${error.message}`);
    }
}

async function setupPACAuthIntegration(context: vscode.ExtensionContext) {
    try {
        vscode.window.showInformationMessage('Checking Power Platform CLI authentication...');
        
        const { exec } = require('child_process');
        const { promisify } = require('util');
        const execAsync = promisify(exec);
        
        try {
            // Check if pac CLI is available and authenticated
            const { stdout } = await execAsync('pac auth list');
            
            if (stdout.includes('*')) {
                // Parse the current active auth profile
                const lines = stdout.split('\n');
                const activeLine = lines.find((line: string) => line.includes('*'));
                
                if (activeLine) {
                    // Extract environment information from active profile
                    const envNameMatch = activeLine.match(/\*\s+(\S+)/);
                    const envName = envNameMatch ? envNameMatch[1] : 'Unknown';
                    
                    // Get detailed info about the current environment
                    const { stdout: envInfo } = await execAsync('pac org who');
                    const envUrlMatch = envInfo.match(/Environment Url:\s+(.+)/);
                    const tenantIdMatch = envInfo.match(/Tenant Id:\s+(.+)/);
                    
                    if (envUrlMatch && tenantIdMatch) {
                        const environmentUrl = envUrlMatch[1].trim();
                        const tenantId = tenantIdMatch[1].trim();
                        
                        // Store authentication information
                        await context.secrets.store('powerAgentMcp.environmentUrl', environmentUrl);
                        await context.secrets.store('powerAgentMcp.tenantId', tenantId);
                        await context.workspaceState.update('powerAgentMcp.environmentName', envName);
                        
                        vscode.window.showInformationMessage(`Successfully authenticated with Power Platform CLI (Environment: ${envName})`);
                        
                        // Ask if user wants to start the server now
                        const startNow = await vscode.window.showQuickPick(['Yes', 'No'], {
                            placeHolder: 'Start Power Agent MCP server now?'
                        });
                        
                        if (startNow === 'Yes') {
                            startMCPServer(context);
                        }
                        return;
                    }
                }
            }
            
            throw new Error('No active authentication profile found.');
            
        } catch (cliError) {
            throw new Error('Power Platform CLI not authenticated. Please run "pac auth create" first.');
        }
        
    } catch (error: any) {
        throw new Error(`Power Platform CLI authentication failed: ${error.message}`);
    }
}

async function setupInteractiveEnvironmentSelection(context: vscode.ExtensionContext) {
    try {
        // Show environment selection dialog
        const environmentUrl = await vscode.window.showInputBox({
            prompt: 'Enter your Power Platform Environment URL',
            placeHolder: 'https://yourorg.crm.dynamics.com',
            validateInput: (value) => {
                if (!value || !value.match(/^https:\/\/[a-zA-Z0-9\-]+\.(crm\d*\.)?dynamics\.com\/?$/)) {
                    return 'Please enter a valid Power Platform environment URL (e.g., https://yourorg.crm.dynamics.com)';
                }
                return undefined;
            }
        });

        if (!environmentUrl) {
            return;
        }

        // Extract tenant information from environment URL
        vscode.window.showInformationMessage('Discovering environment information...');
        
        try {
            const discoveryUrl = environmentUrl.replace(/\/$/, '') + '/api/discovery/v2.0/Instances';
            const response = await axios.get(discoveryUrl, { timeout: 10000 });
            
            if (response.data && response.data.value && response.data.value.length > 0) {
                const environment = response.data.value[0];
                const tenantId = environment.TenantId;
                const environmentName = environment.FriendlyName || environment.UniqueName;
                
                // Store authentication information
                await context.secrets.store('powerAgentMcp.environmentUrl', environmentUrl);
                await context.secrets.store('powerAgentMcp.tenantId', tenantId);
                await context.workspaceState.update('powerAgentMcp.environmentName', environmentName);
                
                vscode.window.showInformationMessage(`Successfully configured Power Platform environment (${environmentName})`);
                
                // Ask if user wants to start the server now
                const startNow = await vscode.window.showQuickPick(['Yes', 'No'], {
                    placeHolder: 'Start Power Agent MCP server now?'
                });
                
                if (startNow === 'Yes') {
                    startMCPServer(context);
                }
            } else {
                throw new Error('Could not discover environment information');
            }
            
        } catch (discoveryError) {
            // Fallback to manual tenant ID entry
            const tenantId = await vscode.window.showInputBox({
                prompt: 'Environment discovery failed. Please enter your Power Platform Tenant ID manually',
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
            await context.secrets.store('powerAgentMcp.environmentUrl', environmentUrl);
            await context.secrets.store('powerAgentMcp.tenantId', tenantId);
            await context.workspaceState.update('powerAgentMcp.environmentName', 'Custom Environment');
            
            vscode.window.showInformationMessage('Power Platform environment configured successfully');
            
            // Ask if user wants to start the server now
            const startNow = await vscode.window.showQuickPick(['Yes', 'No'], {
                placeHolder: 'Start Power Agent MCP server now?'
            });
            
            if (startNow === 'Yes') {
                startMCPServer(context);
            }
        }
        
    } catch (error: any) {
        throw new Error(`Interactive environment selection failed: ${error.message}`);
    }
}

async function setupManualEnvironmentConfiguration(context: vscode.ExtensionContext) {
    const environmentUrl = await vscode.window.showInputBox({
        prompt: 'Enter your Power Platform Environment URL',
        placeHolder: 'https://yourorg.crm.dynamics.com',
        validateInput: (value) => {
            if (!value || !value.match(/^https:\/\/[a-zA-Z0-9\-]+\.(crm\d*\.)?dynamics\.com\/?$/)) {
                return 'Please enter a valid Power Platform environment URL';
            }
            return undefined;
        }
    });

    if (!environmentUrl) {
        return;
    }

    const tenantId = await vscode.window.showInputBox({
        prompt: 'Enter your Power Platform Tenant ID',
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
    await context.secrets.store('powerAgentMcp.environmentUrl', environmentUrl);
    await context.secrets.store('powerAgentMcp.tenantId', tenantId);
    await context.workspaceState.update('powerAgentMcp.environmentName', 'Manual Configuration');
    
    vscode.window.showInformationMessage('Manual Power Platform configuration saved.');
    
    // Ask if user wants to start the server now
    const startNow = await vscode.window.showQuickPick(['Yes', 'No'], {
        placeHolder: 'Start Power Agent MCP server now?'
    });
    
    if (startNow === 'Yes') {
        startMCPServer(context);
    }
}

async function loginToPowerPlatform(context: vscode.ExtensionContext) {
    await setupPowerPlatformAuthentication(context);
}

async function logoutFromPowerPlatform(context: vscode.ExtensionContext) {
    await context.secrets.delete('powerAgentMcp.environmentUrl');
    await context.secrets.delete('powerAgentMcp.tenantId');
    await context.secrets.delete('powerAgentMcp.accessToken');
    await context.workspaceState.update('powerAgentMcp.environmentName', undefined);
    
    vscode.window.showInformationMessage('Successfully logged out from Power Platform');
    
    // Stop server if running
    if (mcpServer) {
        stopMCPServer();
    }
}

async function selectPowerPlatformEnvironment(context: vscode.ExtensionContext) {
    await setupInteractiveEnvironmentSelection(context);
}

async function getPowerPlatformAuthenticationContext(context: vscode.ExtensionContext): Promise<PowerPlatformAuthContext> {
    const environmentUrl = await context.secrets.get('powerAgentMcp.environmentUrl');
    const tenantId = await context.secrets.get('powerAgentMcp.tenantId');
    const accessToken = await context.secrets.get('powerAgentMcp.accessToken');
    const environmentName = context.workspaceState.get<string>('powerAgentMcp.environmentName');
    
    return {
        environmentUrl,
        tenantId,
        accessToken,
        environmentName
    };
}
