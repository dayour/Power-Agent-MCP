import * as vscode from 'vscode';
import { spawn, ChildProcess } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import axios from 'axios';
import { MicrosoftCredentialDetector, DetectedCredential } from './credentialDetection';
import { DependencyManager } from './dependencyManager';
import { MSALAuthenticationProvider, MSALAuthResult } from './msalAuth';

let mcpServer: ChildProcess | undefined;
let credentialDetector: MicrosoftCredentialDetector;
let dependencyManager: DependencyManager;
let msalProvider: MSALAuthenticationProvider;

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

    // Initialize services
    credentialDetector = new MicrosoftCredentialDetector();
    dependencyManager = new DependencyManager();
    msalProvider = new MSALAuthenticationProvider();

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

    // New streamlined setup command
    let quickSetupCommand = vscode.commands.registerCommand('power-agent-mcp.quickSetup', () => {
        performQuickSetup(context);
    });

    context.subscriptions.push(
        startCommand, 
        stopCommand, 
        statusCommand, 
        validateCommand, 
        setupCommand, 
        loginCommand, 
        logoutCommand, 
        selectEnvironmentCommand,
        quickSetupCommand
    );

    // Check authentication status and start streamlined setup if needed
    checkAndInitializeStreamlinedSetup(context);
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

// Streamlined Setup Functions

/**
 * Perform one-click streamlined setup with auto-detection
 */
async function performQuickSetup(context: vscode.ExtensionContext): Promise<void> {
    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: 'Setting up Power Agent MCP',
        cancellable: false
    }, async (progress) => {
        progress.report({ increment: 10, message: 'Checking dependencies...' });
        
        // Step 1: Check and install dependencies
        await dependencyManager.installMissingDependencies(false);
        
        progress.report({ increment: 30, message: 'Detecting Microsoft credentials...' });
        
        // Step 2: Auto-detect Microsoft credentials
        const detectedCredentials = await credentialDetector.detectCredentials();
        
        if (detectedCredentials.length > 0) {
            progress.report({ increment: 20, message: 'Configuring with detected credentials...' });
            
            // Use the best available credential
            const bestCredential = credentialDetector.getBestCredential(detectedCredentials);
            if (bestCredential && credentialDetector.isCredentialSufficient(bestCredential)) {
                await configureWithDetectedCredential(context, bestCredential);
                
                progress.report({ increment: 20, message: 'Starting MCP server...' });
                
                // Start the MCP server
                await startMCPServer(context);
                
                progress.report({ increment: 20, message: 'Complete!' });
                
                // Show welcome tour
                await showWelcomeTour(context);
                return;
            }
        }
        
        progress.report({ increment: 20, message: 'Launching Microsoft sign-in...' });
        
        // Step 3: If no credentials detected, try MSAL authentication
        try {
            const msalResult = await msalProvider.signIn();
            if (msalResult) {
                await configureWithMSALResult(context, msalResult);
                
                progress.report({ increment: 20, message: 'Starting MCP server...' });
                await startMCPServer(context);
                
                progress.report({ increment: 20, message: 'Complete!' });
                await showWelcomeTour(context);
                return;
            }
        } catch (error) {
            console.log('MSAL authentication failed:', error);
        }
        
        // Step 4: Fallback to manual setup
        progress.report({ increment: 40, message: 'Manual setup required...' });
        await setupPowerPlatformAuthentication(context);
    });
}

/**
 * Check and initialize streamlined setup on activation
 */
async function checkAndInitializeStreamlinedSetup(context: vscode.ExtensionContext): Promise<void> {
    // Check if this is the first run or if authentication is missing
    const authContext = await getPowerPlatformAuthenticationContext(context);
    const hasCompletedSetup = context.globalState.get<boolean>('powerAgentMcp.setupCompleted', false);
    
    if (!hasCompletedSetup || (!authContext.environmentUrl && !authContext.tenantId)) {
        // Show welcome message with streamlined setup option
        const result = await vscode.window.showInformationMessage(
            '🚀 Welcome to Power Agent MCP! Get started with AI-powered Power Platform automation in minutes.',
            'Quick Setup (Recommended)',
            'Manual Setup',
            'Skip for now'
        );
        
        if (result === 'Quick Setup (Recommended)') {
            await performQuickSetup(context);
        } else if (result === 'Manual Setup') {
            await setupPowerPlatformAuthentication(context);
        }
    } else {
        // Existing setup detected, check dependencies and auto-start if enabled
        const missingDepsCount = await dependencyManager.getMissingDependenciesCount();
        
        if (missingDepsCount > 0) {
            const result = await vscode.window.showInformationMessage(
                `Power Agent MCP: ${missingDepsCount} dependencies are missing. Install them now?`,
                'Install Dependencies',
                'Skip'
            );
            
            if (result === 'Install Dependencies') {
                await dependencyManager.installMissingDependencies();
            }
        }
        
        // Check auto-start setting
        const config = vscode.workspace.getConfiguration('powerAgentMcp');
        const autoStart = config.get<boolean>('autoStart', true);
        
        if (autoStart) {
            // Delay auto-start slightly to let VS Code finish loading
            setTimeout(async () => {
                await startMCPServer(context);
            }, 2000);
        }
    }
}

/**
 * Configure authentication with detected credential
 */
async function configureWithDetectedCredential(context: vscode.ExtensionContext, credential: DetectedCredential): Promise<void> {
    // Store authentication information
    if (credential.environmentUrl) {
        await context.secrets.store('powerAgentMcp.environmentUrl', credential.environmentUrl);
    }
    if (credential.tenantId) {
        await context.secrets.store('powerAgentMcp.tenantId', credential.tenantId);
    }
    if (credential.accessToken) {
        await context.secrets.store('powerAgentMcp.accessToken', credential.accessToken);
    }
    if (credential.environmentName) {
        await context.workspaceState.update('powerAgentMcp.environmentName', credential.environmentName);
    }
    
    // Mark setup as completed
    await context.globalState.update('powerAgentMcp.setupCompleted', true);
    
    const sourceName = credential.source === 'azure-cli' ? 'Azure CLI' : 
                      credential.source === 'pac-cli' ? 'Power Platform CLI' :
                      credential.source === 'windows-credential-manager' ? 'Windows Credential Manager' : 'MSAL';
    
    vscode.window.showInformationMessage(
        `✅ Power Platform authentication configured automatically using ${sourceName}`
    );
}

/**
 * Configure authentication with MSAL result
 */
async function configureWithMSALResult(context: vscode.ExtensionContext, msalResult: MSALAuthResult): Promise<void> {
    // Store MSAL authentication information
    await context.secrets.store('powerAgentMcp.accessToken', msalResult.accessToken);
    await context.secrets.store('powerAgentMcp.tenantId', msalResult.account.tenantId);
    await context.workspaceState.update('powerAgentMcp.environmentName', 'Microsoft Account');
    
    // Mark setup as completed
    await context.globalState.update('powerAgentMcp.setupCompleted', true);
    
    vscode.window.showInformationMessage(
        `✅ Power Platform authentication configured using Microsoft Account (${msalResult.account.username})`
    );
}

/**
 * Show welcome tour and first Power Platform command
 */
async function showWelcomeTour(context: vscode.ExtensionContext): Promise<void> {
    const result = await vscode.window.showInformationMessage(
        '🎉 Power Agent MCP is ready! You now have access to 12 Power Platform automation tools through AI assistants.',
        'Try First Command',
        'View Tools',
        'Open Documentation'
    );
    
    if (result === 'Try First Command') {
        await showFirstCommandDemo();
    } else if (result === 'View Tools') {
        await showAvailableTools();
    } else if (result === 'Open Documentation') {
        vscode.env.openExternal(vscode.Uri.parse('https://github.com/dayour/Power-Agent-MCP#readme'));
    }
}

/**
 * Show first command demonstration
 */
async function showFirstCommandDemo(): Promise<void> {
    const commands = [
        '"Check my Power Platform authentication status"',
        '"List all my Power Platform environments"',
        '"Show me available Power Platform tools"',
        '"Create a new development environment called \'AI Test Lab\'"'
    ];
    
    const selectedCommand = await vscode.window.showQuickPick(commands, {
        placeHolder: 'Select a command to try with your AI assistant (Claude Desktop, GitHub Copilot, etc.)'
    });
    
    if (selectedCommand) {
        await vscode.env.clipboard.writeText(selectedCommand);
        vscode.window.showInformationMessage(
            `Command copied to clipboard! Open your AI assistant and paste: ${selectedCommand}`
        );
    }
}

/**
 * Show available tools summary
 */
async function showAvailableTools(): Promise<void> {
    const toolsSummary = `
Power Agent MCP Tools Available:

🔐 Authentication (3 tools):
• pp_whoami - Check authentication status
• pp_auth_create - Create authentication profiles
• pp_auth_list - List authentication profiles

🌐 Environment Management (3 tools):
• pp_create_environment - Create new environments
• pp_list_environments - List all environments
• pp_delete_environment - Delete environments

📦 Solution Operations (4 tools):
• pp_export_solution - Export solutions
• pp_import_solution - Import solutions
• pp_pack_solution - Package solutions
• pp_unpack_solution - Unpack solutions

🔍 Diagnostics (2 tools):
• pp_list_solutions - List solutions
• Connection validation and health checks

Total: 12 production-ready tools for AI-powered Power Platform automation
    `;
    
    const result = await vscode.window.showInformationMessage(
        toolsSummary,
        'Copy Tool List',
        'Open Documentation'
    );
    
    if (result === 'Copy Tool List') {
        await vscode.env.clipboard.writeText(toolsSummary);
        vscode.window.showInformationMessage('Tools summary copied to clipboard!');
    } else if (result === 'Open Documentation') {
        vscode.env.openExternal(vscode.Uri.parse('https://github.com/dayour/Power-Agent-MCP/blob/main/power-mcp.md'));
    }
}

// End of Streamlined Setup Functions
// Power Platform Authentication Functions
async function checkPowerPlatformAuthenticationStatus(context: vscode.ExtensionContext) {
    // This function is now replaced by checkAndInitializeStreamlinedSetup
    // Keep for backward compatibility but redirect to new function
    await checkAndInitializeStreamlinedSetup(context);
}

async function setupPowerPlatformAuthentication(context: vscode.ExtensionContext) {
    // First try auto-detection
    const detectedCredentials = await credentialDetector.detectCredentials();
    
    if (detectedCredentials.length > 0) {
        const credentialOptions = detectedCredentials.map(cred => {
            const sourceName = cred.source === 'azure-cli' ? 'Azure CLI' : 
                              cred.source === 'pac-cli' ? 'Power Platform CLI' :
                              cred.source === 'windows-credential-manager' ? 'Windows Credential Manager' : 'MSAL';
            return `Use ${sourceName} (${cred.userPrincipalName || cred.environmentName || 'detected'})`;
        });
        
        const choices = [
            ...credentialOptions,
            'Microsoft Sign-in (MSAL)',
            'Use Power Platform CLI (pac auth)',
            'Interactive Environment Selection',
            'Manual Environment Configuration'
        ];
        
        const choice = await vscode.window.showQuickPick(choices, {
            placeHolder: 'Select authentication method (auto-detected options available)'
        });

        if (!choice) {
            return;
        }

        // Handle auto-detected credentials
        for (let i = 0; i < credentialOptions.length; i++) {
            if (choice === credentialOptions[i]) {
                const credential = detectedCredentials[i];
                await configureWithDetectedCredential(context, credential);
                
                // Ask if user wants to start the server now
                const startNow = await vscode.window.showQuickPick(['Yes', 'No'], {
                    placeHolder: 'Start Power Agent MCP server now?'
                });
                
                if (startNow === 'Yes') {
                    await startMCPServer(context);
                }
                return;
            }
        }
        
        // Handle MSAL authentication
        if (choice === 'Microsoft Sign-in (MSAL)') {
            try {
                const msalResult = await msalProvider.signIn();
                if (msalResult) {
                    await configureWithMSALResult(context, msalResult);
                    
                    const startNow = await vscode.window.showQuickPick(['Yes', 'No'], {
                        placeHolder: 'Start Power Agent MCP server now?'
                    });
                    
                    if (startNow === 'Yes') {
                        await startMCPServer(context);
                    }
                }
                return;
            } catch (error: any) {
                vscode.window.showErrorMessage(`Microsoft authentication failed: ${error.message}`);
                // Fall through to other options
            }
        }
    } else {
        // No auto-detected credentials, show all manual options including MSAL
        const choices = [
            'Microsoft Sign-in (MSAL)',
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
        
        // Handle MSAL authentication
        if (choice === 'Microsoft Sign-in (MSAL)') {
            try {
                const msalResult = await msalProvider.signIn();
                if (msalResult) {
                    await configureWithMSALResult(context, msalResult);
                    
                    const startNow = await vscode.window.showQuickPick(['Yes', 'No'], {
                        placeHolder: 'Start Power Agent MCP server now?'
                    });
                    
                    if (startNow === 'Yes') {
                        await startMCPServer(context);
                    }
                }
                return;
            } catch (error: any) {
                vscode.window.showErrorMessage(`Microsoft authentication failed: ${error.message}`);
                // Fall through to other options
            }
        }
    }

    // Handle existing manual methods
    const choice = await vscode.window.showQuickPick([
        'Use Power Platform CLI (pac auth)',
        'Interactive Environment Selection',
        'Manual Environment Configuration'
    ], {
        placeHolder: 'Select manual authentication method'
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
