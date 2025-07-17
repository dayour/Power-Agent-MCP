import * as vscode from 'vscode';

export interface MSALConfig {
    clientId: string;
    authority: string;
    redirectUri?: string;
}

export interface MSALAuthResult {
    accessToken: string;
    account: {
        username: string;
        homeAccountId: string;
        tenantId: string;
    };
    scopes: string[];
}

/**
 * Microsoft Authentication Library (MSAL) integration for Power Platform
 * Uses VS Code's built-in authentication provider for Microsoft
 */
export class MSALAuthenticationProvider {
    
    private readonly scopes = [
        'https://service.powerapps.com/user_impersonation',
        'https://graph.microsoft.com/User.Read'
    ];
    
    private readonly providerId = 'microsoft';
    
    /**
     * Sign in using VS Code's Microsoft authentication provider
     */
    async signIn(): Promise<MSALAuthResult | null> {
        try {
            const session = await vscode.authentication.getSession(this.providerId, this.scopes, { 
                createIfNone: true 
            });
            
            if (session) {
                return {
                    accessToken: session.accessToken,
                    account: {
                        username: session.account.label,
                        homeAccountId: session.account.id,
                        tenantId: this.extractTenantFromAccount(session.account)
                    },
                    scopes: [...session.scopes]
                };
            }
            
            return null;
        } catch (error) {
            console.error('MSAL sign-in failed:', error);
            throw new Error(`Microsoft authentication failed: ${error}`);
        }
    }
    
    /**
     * Get existing session without prompting for sign-in
     */
    async getExistingSession(): Promise<MSALAuthResult | null> {
        try {
            const session = await vscode.authentication.getSession(this.providerId, this.scopes, { 
                createIfNone: false,
                silent: true 
            });
            
            if (session) {
                return {
                    accessToken: session.accessToken,
                    account: {
                        username: session.account.label,
                        homeAccountId: session.account.id,
                        tenantId: this.extractTenantFromAccount(session.account)
                    },
                    scopes: [...session.scopes]
                };
            }
            
            return null;
        } catch (error) {
            console.error('Failed to get existing MSAL session:', error);
            return null;
        }
    }
    
    /**
     * Sign out from Microsoft authentication
     */
    async signOut(): Promise<void> {
        try {
            // VS Code handles session management automatically
            // We'll just clear our references to the session
            console.log('Microsoft sign-out requested');
        } catch (error) {
            console.error('MSAL sign-out failed:', error);
            throw new Error(`Microsoft sign-out failed: ${error}`);
        }
    }
    
    /**
     * Check if user is currently authenticated
     */
    async isAuthenticated(): Promise<boolean> {
        try {
            const session = await this.getExistingSession();
            return session !== null;
        } catch (error) {
            return false;
        }
    }
    
    /**
     * Get Power Platform environments using Microsoft Graph
     */
    async getPowerPlatformEnvironments(accessToken: string): Promise<any[]> {
        try {
            // Note: This would require Microsoft Graph API calls to discover Power Platform environments
            // For now, we'll return empty array and let other methods handle environment discovery
            return [];
        } catch (error) {
            console.error('Failed to get Power Platform environments:', error);
            return [];
        }
    }
    
    /**
     * Extract tenant ID from VS Code authentication account
     */
    private extractTenantFromAccount(account: vscode.AuthenticationSessionAccountInformation): string {
        // Try to extract tenant ID from account ID or other properties
        // VS Code's Microsoft provider typically includes tenant info in the account ID
        
        if (account.id.includes('-')) {
            // Account ID might contain tenant information
            const parts = account.id.split('-');
            // Look for a GUID pattern (tenant ID is typically a GUID)
            for (const part of parts) {
                if (part.length === 32 && /^[a-f0-9]{32}$/i.test(part)) {
                    // Format as GUID
                    return [
                        part.substring(0, 8),
                        part.substring(8, 12),
                        part.substring(12, 16),
                        part.substring(16, 20),
                        part.substring(20, 32)
                    ].join('-');
                }
            }
        }
        
        // Fallback: return a placeholder that indicates tenant ID extraction failed
        return 'unknown-tenant';
    }
    
    /**
     * Validate if the access token has Power Platform permissions
     */
    async validatePowerPlatformAccess(accessToken: string): Promise<boolean> {
        try {
            // Make a simple API call to verify Power Platform access
            const response = await fetch('https://api.bap.microsoft.com/providers/Microsoft.BusinessAppPlatform/environments', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            
            return response.ok;
        } catch (error) {
            console.error('Power Platform access validation failed:', error);
            return false;
        }
    }
    
    /**
     * Get available authentication scopes for Power Platform
     */
    getPowerPlatformScopes(): string[] {
        return [
            'https://service.powerapps.com/user_impersonation',
            'https://service.flow.microsoft.com/user_impersonation',
            'https://graph.microsoft.com/User.Read'
        ];
    }
    
    /**
     * Register authentication change listeners
     */
    onAuthenticationChanged(callback: (session: vscode.AuthenticationSession | undefined) => void): vscode.Disposable {
        return vscode.authentication.onDidChangeSessions((e) => {
            if (e.provider.id === this.providerId) {
                // Get the current session and notify callback
                this.getExistingSession().then((result) => {
                    if (result) {
                        // Convert MSALAuthResult back to session format for callback
                        const session: vscode.AuthenticationSession = {
                            id: result.account.homeAccountId,
                            accessToken: result.accessToken,
                            account: {
                                id: result.account.homeAccountId,
                                label: result.account.username
                            },
                            scopes: result.scopes
                        };
                        callback(session);
                    } else {
                        callback(undefined);
                    }
                });
            }
        });
    }
}