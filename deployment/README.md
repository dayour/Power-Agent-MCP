# Power Agent MCP - Deployment Guide

This directory contains all the necessary assets and guides for deploying Power Agent MCP to production environments and marketplaces.

## 📦 Deployment Assets

### VSCode Marketplace
- `vscode-extension/` - VSCode extension packaging and submission
- `vscode-marketplace-setup.md` - Step-by-step VSCode marketplace publication guide

### NuGet Packages  
- `nuget-package/` - NuGet package specification and build assets
- `nuget-publishing-setup.md` - Step-by-step NuGet publication guide

### Production Deployment
- `production-setup/` - Production environment setup and configuration
- `ci-cd-pipeline/` - Automated deployment and CI/CD configurations

## 🚀 Quick Start Deployment

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

## 📞 Support

For deployment assistance:
- Documentation: [Complete Setup Guide](../docs/MCP_CONNECTOR_SETUP.md)
- Issues: [GitHub Issues](https://github.com/dayour/Power-Agent-MCP/issues)
- Community: [Power Platform Community](https://aka.ms/community/home)