import * as vscode from 'vscode';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as os from 'os';

const execAsync = promisify(exec);

export interface DetectedCredential {
    source: 'azure-cli' | 'windows-credential-manager' | 'msal' | 'pac-cli';
    tenantId?: string;
    environmentUrl?: string;
    environmentName?: string;
    userPrincipalName?: string;
    accessToken?: string;
    refreshToken?: string;
}

export interface AzureCliContext {
    isAuthenticated: boolean;
    tenant?: {
        id: string;
        displayName: string;
    };
    subscription?: {
        id: string;
        name: string;
    };
    user?: {
        name: string;
        type: string;
    };
}

/**
 * Auto-detect existing Microsoft credentials from various sources
 */
export class MicrosoftCredentialDetector {
    
    /**
     * Detect credentials from all available sources
     */
    async detectCredentials(): Promise<DetectedCredential[]> {
        const credentials: DetectedCredential[] = [];
        
        try {
            // Try Azure CLI first
            const azureCliCredential = await this.detectAzureCliCredentials();
            if (azureCliCredential) {
                credentials.push(azureCliCredential);
            }
        } catch (error) {
            console.log('Azure CLI detection failed:', error);
        }
        
        try {
            // Try PAC CLI
            const pacCliCredential = await this.detectPacCliCredentials();
            if (pacCliCredential) {
                credentials.push(pacCliCredential);
            }
        } catch (error) {
            console.log('PAC CLI detection failed:', error);
        }
        
        // Windows Credential Manager (Windows only)
        if (os.platform() === 'win32') {
            try {
                const windowsCredentials = await this.detectWindowsCredentials();
                credentials.push(...windowsCredentials);
            } catch (error) {
                console.log('Windows Credential Manager detection failed:', error);
            }
        }
        
        return credentials;
    }
    
    /**
     * Detect Azure CLI authentication context
     */
    async getAzureCliContext(): Promise<AzureCliContext> {
        try {
            const { stdout } = await execAsync('az account show --output json');
            const accountInfo = JSON.parse(stdout);
            
            return {
                isAuthenticated: true,
                tenant: {
                    id: accountInfo.tenantId,
                    displayName: accountInfo.tenantDisplayName || accountInfo.tenantId
                },
                subscription: {
                    id: accountInfo.id,
                    name: accountInfo.name
                },
                user: {
                    name: accountInfo.user.name,
                    type: accountInfo.user.type
                }
            };
        } catch (error) {
            return { isAuthenticated: false };
        }
    }
    
    /**
     * Detect credentials from Azure CLI
     */
    private async detectAzureCliCredentials(): Promise<DetectedCredential | null> {
        try {
            const azureContext = await this.getAzureCliContext();
            
            if (!azureContext.isAuthenticated) {
                return null;
            }
            
            // Try to get Azure CLI access token for Power Platform
            try {
                const { stdout: tokenResponse } = await execAsync('az account get-access-token --resource https://service.powerapps.com/ --output json');
                const tokenInfo = JSON.parse(tokenResponse);
                
                return {
                    source: 'azure-cli',
                    tenantId: azureContext.tenant?.id,
                    userPrincipalName: azureContext.user?.name,
                    accessToken: tokenInfo.accessToken
                };
            } catch (tokenError) {
                // Even without Power Platform token, we can use the tenant info
                return {
                    source: 'azure-cli',
                    tenantId: azureContext.tenant?.id,
                    userPrincipalName: azureContext.user?.name
                };
            }
        } catch (error) {
            return null;
        }
    }
    
    /**
     * Detect credentials from PAC CLI
     */
    private async detectPacCliCredentials(): Promise<DetectedCredential | null> {
        try {
            // Check if PAC CLI is available and authenticated
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
                    const envUrlMatch = envInfo.match(/Environment Url:\s*(.+)/);
                    const tenantIdMatch = envInfo.match(/Tenant Id:\s*(.+)/);
                    const userMatch = envInfo.match(/User Id:\s*(.+)/);
                    
                    if (envUrlMatch && tenantIdMatch) {
                        return {
                            source: 'pac-cli',
                            environmentUrl: envUrlMatch[1].trim(),
                            tenantId: tenantIdMatch[1].trim(),
                            environmentName: envName,
                            userPrincipalName: userMatch ? userMatch[1].trim() : undefined
                        };
                    }
                }
            }
            
            return null;
        } catch (error) {
            return null;
        }
    }
    
    /**
     * Detect credentials from Windows Credential Manager (Windows only)
     */
    private async detectWindowsCredentials(): Promise<DetectedCredential[]> {
        if (os.platform() !== 'win32') {
            return [];
        }
        
        try {
            // Use PowerShell to enumerate Windows credentials
            const powershellCommand = `
                Get-StoredCredential | Where-Object {
                    $_.Target -like "*Microsoft_PowerPlatform*" -or 
                    $_.Target -like "*dynamics.com*" -or
                    $_.Target -like "*powerapps.com*"
                } | ForEach-Object {
                    @{
                        Target = $_.Target
                        UserName = $_.UserName
                        Type = $_.Type
                    }
                } | ConvertTo-Json
            `;
            
            const { stdout } = await execAsync(`powershell -Command "${powershellCommand}"`);
            
            if (stdout.trim()) {
                const credentialData = JSON.parse(stdout);
                const credentials: DetectedCredential[] = [];
                
                // Handle both single object and array responses
                const credentialArray = Array.isArray(credentialData) ? credentialData : [credentialData];
                
                for (const cred of credentialArray) {
                    if (cred.Target && cred.UserName) {
                        // Extract environment URL from target if available
                        const urlMatch = cred.Target.match(/(https:\/\/[^\/]+)/);
                        const environmentUrl = urlMatch ? urlMatch[1] : undefined;
                        
                        credentials.push({
                            source: 'windows-credential-manager',
                            environmentUrl,
                            userPrincipalName: cred.UserName
                        });
                    }
                }
                
                return credentials;
            }
            
            return [];
        } catch (error) {
            return [];
        }
    }
    
    /**
     * Get the best credential to use (prioritize by source reliability)
     */
    getBestCredential(credentials: DetectedCredential[]): DetectedCredential | null {
        if (credentials.length === 0) {
            return null;
        }
        
        // Priority order: PAC CLI > Azure CLI > Windows Credential Manager > MSAL
        const priorityOrder = ['pac-cli', 'azure-cli', 'windows-credential-manager', 'msal'];
        
        for (const source of priorityOrder) {
            const credential = credentials.find(c => c.source === source);
            if (credential) {
                return credential;
            }
        }
        
        // Return first available if no priority match
        return credentials[0];
    }
    
    /**
     * Validate if a credential has sufficient information for Power Platform access
     */
    isCredentialSufficient(credential: DetectedCredential): boolean {
        return !!(credential.tenantId || credential.environmentUrl);
    }
}