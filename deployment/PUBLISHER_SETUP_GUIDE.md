# Publisher Account Setup Guide - @darbotlabs

## 🎯 Overview

This guide provides step-by-step instructions for setting up publisher accounts for Power Agent MCP deployment to VSCode Marketplace and NuGet.org under the @darbotlabs namespace.

## 📋 VSCode Marketplace Publisher Setup

### 1. Create Publisher Account

1. **Navigate to VSCode Marketplace Management**
   - Go to https://marketplace.visualstudio.com/manage
   - Sign in with your Microsoft account

2. **Create @darbotlabs Publisher**

   ```bash
   # Install VSCE CLI
   npm install -g vsce

   # Create publisher
   vsce create-publisher darbotlabs
   ```

3. **Publisher Information**
   - **Publisher ID**: `darbotlabs`
   - **Display Name**: `DarBot Labs`
   - **Description**: `Enterprise AI automation tools for Microsoft Power Platform`
   - **Website**: `https://github.com/dayour/Power-Agent-MCP`

### 2. Personal Access Token

   your-personal-access-token
   - **Name**: Power Agent MCP
   - **Scopes**: Marketplace (Manage)
   - **Organization**: All accessible organizations
   your-personal-access-token

3. **Configure VSCE Authentication**
   ```bash
   vsce login darbotlabs
   # Enter the Personal Access Token when prompted
   ```

### 3. Verify Publisher Setup
```bash
vsce verify-pat darbotlabs
vsce show darbotlabs
```

## 📦 NuGet.org Account Setup

### 1. Create NuGet Account

1. **Register at NuGet.org**
   - Go to https://www.nuget.org/users/account/LogOn
   - Sign up with Microsoft account

2. **Account Configuration**
   - **Username**: `DarBotLabs`
   - **Email**: Your email address
   - **Display Name**: `DarBot Labs`

### 2. Generate API Key

1. Go to https://www.nuget.org/account/apikeys
   - **Key Name**: `darbot`
   - **Package Glob Pattern**: `DarBotLabs.*`
   - **Scopes**: Push new packages and package versions

3. **Save API Key Securely**
   ```bash
   # Store in environment variable (Windows)
   $env:NUGET_API_KEY = "your-nuget-api-key"
   ```

### 3. Configure NuGet CLI
```bash
# Install NuGet CLI (already installed) ✅
# choco install nuget.commandline

# Verify installation ✅
nuget help

# Configure API key ✅
nuget setApiKey your-nuget-api-key -Source https://api.nuget.org/v3/index.json
```

## 🔑 Environment Variables Setup

Create `.env` file for local development:
```bash
# VSCode Marketplace
VSCE_PUBLISHER=your-publisher-id
VSCE_PAT=your-personal-access-token

# NuGet
NUGET_API_KEY=your-nuget-api-key
NUGET_SOURCE=https://api.nuget.org/v3/index.json

# Power Platform (for testing)
POWERPLATFORM_TENANT_ID=your-tenant-id
POWERPLATFORM_APPLICATION_ID=your-app-id
POWERPLATFORM_CLIENT_SECRET=your-client-secret
```

## ✅ Verification Checklist

### VSCode Marketplace
- [x] Publisher account created and verified
- [x] Personal Access Token generated and tested
- [x] VSCE CLI installed and authenticated
- [x] Publisher information complete

### NuGet.org
- [x] Account created and email verified
- [x] API key generated with proper scopes
- [x] NuGet CLI installed and configured
- [x] Package namespace reserved (DarBotLabs.*)

## 🚀 Next Steps

1. **Package VSCode Extension**
   ```bash
   cd deployment/vscode-extension
   vsce package
   ```

2. **Build NuGet Package**
   ```bash
   cd deployment/nuget-package
   nuget pack DarBotLabs.PowerAgent.MCP.nuspec
   ```

3. **Test Packages Locally**
   - Install VSCode extension from .vsix file
   - Test NuGet package installation

4. **Publish to Marketplaces**
   - Use automated deployment scripts
   - Monitor publication status

## 📞 Support

If you encounter issues during setup:
- VSCode Marketplace: https://code.visualstudio.com/api/working-with-extensions/publishing-extension
- NuGet: https://docs.microsoft.com/en-us/nuget/nuget-org/publish-a-package

---

**Status**: Ready for execution
**Last Updated**: December 2024
