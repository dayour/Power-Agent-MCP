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
exports.MSALAuthenticationProvider = void 0;
const vscode = __importStar(require("vscode"));
/**
 * Microsoft Authentication Library (MSAL) integration for Power Platform
 * Uses VS Code's built-in authentication provider for Microsoft
 */
class MSALAuthenticationProvider {
    scopes = [
        'https://service.powerapps.com/user_impersonation',
        'https://graph.microsoft.com/User.Read'
    ];
    providerId = 'microsoft';
    /**
     * Sign in using VS Code's Microsoft authentication provider
     */
    async signIn() {
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
        }
        catch (error) {
            console.error('MSAL sign-in failed:', error);
            throw new Error(`Microsoft authentication failed: ${error}`);
        }
    }
    /**
     * Get existing session without prompting for sign-in
     */
    async getExistingSession() {
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
        }
        catch (error) {
            console.error('Failed to get existing MSAL session:', error);
            return null;
        }
    }
    /**
     * Sign out from Microsoft authentication
     */
    async signOut() {
        try {
            // VS Code handles session management automatically
            // We'll just clear our references to the session
            console.log('Microsoft sign-out requested');
        }
        catch (error) {
            console.error('MSAL sign-out failed:', error);
            throw new Error(`Microsoft sign-out failed: ${error}`);
        }
    }
    /**
     * Check if user is currently authenticated
     */
    async isAuthenticated() {
        try {
            const session = await this.getExistingSession();
            return session !== null;
        }
        catch (error) {
            return false;
        }
    }
    /**
     * Get Power Platform environments using Microsoft Graph
     */
    async getPowerPlatformEnvironments(accessToken) {
        try {
            // Note: This would require Microsoft Graph API calls to discover Power Platform environments
            // For now, we'll return empty array and let other methods handle environment discovery
            return [];
        }
        catch (error) {
            console.error('Failed to get Power Platform environments:', error);
            return [];
        }
    }
    /**
     * Extract tenant ID from VS Code authentication account
     */
    extractTenantFromAccount(account) {
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
    async validatePowerPlatformAccess(accessToken) {
        try {
            // Make a simple API call to verify Power Platform access
            const response = await fetch('https://api.bap.microsoft.com/providers/Microsoft.BusinessAppPlatform/environments', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.ok;
        }
        catch (error) {
            console.error('Power Platform access validation failed:', error);
            return false;
        }
    }
    /**
     * Get available authentication scopes for Power Platform
     */
    getPowerPlatformScopes() {
        return [
            'https://service.powerapps.com/user_impersonation',
            'https://service.flow.microsoft.com/user_impersonation',
            'https://graph.microsoft.com/User.Read'
        ];
    }
    /**
     * Register authentication change listeners
     */
    onAuthenticationChanged(callback) {
        return vscode.authentication.onDidChangeSessions((e) => {
            if (e.provider.id === this.providerId) {
                // Get the current session and notify callback
                this.getExistingSession().then((result) => {
                    if (result) {
                        // Convert MSALAuthResult back to session format for callback
                        const session = {
                            id: result.account.homeAccountId,
                            accessToken: result.accessToken,
                            account: {
                                id: result.account.homeAccountId,
                                label: result.account.username
                            },
                            scopes: result.scopes
                        };
                        callback(session);
                    }
                    else {
                        callback(undefined);
                    }
                });
            }
        });
    }
}
exports.MSALAuthenticationProvider = MSALAuthenticationProvider;
//# sourceMappingURL=msalAuth.js.map