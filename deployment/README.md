# Power Agent MCP - Deployment Guide

This directory contains all the necessary assets and guides for deploying Power Agent MCP to production environments and marketplaces.

## 📦 Deployment Assets

### VSCode Marketplace
- `vscode-extension/` - VSCode extension packaging and submission
  - `assets/` - Extension icons and visual assets
  - `assets/screenshots/` - Marketplace screenshots and documentation
- `vscode-marketplace-setup.md` - Step-by-step VSCode marketplace publication guide

### NuGet Packages
- `nuget-package/` - NuGet package specification and build assets
  - `assets/` - Package icons and branding
- `nuget-publishing-setup.md` - Step-by-step NuGet publication guide

### Marketing Assets
- `marketing-assets/` - Complete icon package with all required sizes
  - VSCode optimized icons (`mcp_vscode_*.png`)
  - Store/marketplace icons (`mcp_store_*.png`)
  - Teams integration icons (`mcp_teams_*.png`)
  - General purpose icons in multiple sizes (16x16 to 1024x1024)

### Production Deployment
- `production-setup/` - Production environment setup and configuration
- `ci-cd-pipeline/` - Automated deployment and CI/CD configurations

## 🚀 Quick Start Deployment

### 0. Setup Deployment Assets (First Time)
```bash
# Setup all deployment assets from icon package
.\setup-deployment-assets.ps1

# Validate all assets are properly configured
.\validate-deployment-assets.ps1
```

### 1. VSCode Extension Deployment
```bash
cd deployment/vscode-extension
npm install
npm run package
npm run publish
```

### 2. NuGet Package Deployment
```bash
cd deployment/nuget-package
dotnet pack
dotnet nuget push *.nupkg
```

### 3. Production Environment Setup
```bash
cd deployment/production-setup
./deploy-production.sh
```

## 📋 Publication Checklist

### Pre-Publication Requirements
- [ ] All 254 tools validated and tested
- [ ] Documentation complete and up-to-date
- [ ] Security review completed
- [ ] Performance testing passed
- [ ] Legal review and licensing approved

### VSCode Marketplace Publication
- [ ] Extension manifest configured
- [ ] Publisher account setup (@darbotlabs)
- [ ] Extension tested in VSCode environment
- [ ] Marketplace listing created
- [ ] Screenshots and documentation prepared

### NuGet Package Publication
- [ ] Package specification (.nuspec) created
- [ ] NuGet account configured (@darbotlabs)
- [ ] Package dependencies resolved
- [ ] API key configured for publishing
- [ ] Package metadata complete

### Production Deployment
- [ ] Production environment prepared
- [ ] Monitoring and logging configured
- [ ] Backup and recovery procedures tested
- [ ] Support documentation created
- [ ] Team training completed

## 🎨 Asset Management

### Icon Package
The `power_agent_mcp_icon_package/` contains comprehensive branding assets:
- **VSCode Icons**: Optimized for extension marketplace (`mcp_vscode_*.png`)
- **Store Icons**: For various app stores (`mcp_store_*.png`)
- **Teams Icons**: For Microsoft Teams integration (`mcp_teams_*.png`)
- **General Icons**: Multiple sizes from 16x16 to 1024x1024 pixels
- **ICO Format**: Windows-compatible icon file (`mcp_icon.ico`)

### Asset Management Scripts
- `setup-deployment-assets.ps1` - Automatically organizes all icons into correct locations
- `validate-deployment-assets.ps1` - Validates all required assets are present

### Usage
```powershell
# First-time setup (organizes all assets)
.\setup-deployment-assets.ps1 -Force

# Validate deployment readiness
.\validate-deployment-assets.ps1

# Update assets (preserves existing)
.\setup-deployment-assets.ps1
```

## 📞 Support

For deployment assistance:
- Documentation: [Complete Setup Guide](../docs/MCP_CONNECTOR_SETUP.md)
- Issues: [GitHub Issues](https://github.com/dayour/Power-Agent-MCP/issues)
