# VSCode Marketplace Publishing Guide

This guide covers the complete process for publishing Power Agent MCP to the VSCode Marketplace under the @darbotlabs publisher.

## Prerequisites

### 1. Publisher Account Setup
- [ ] Create Microsoft account for DarBot Labs
- [ ] Register as VSCode Marketplace publisher
- [ ] Verify publisher identity and organization
- [ ] Set up API access token

### 2. Development Environment
- [ ] Node.js 18+ installed
- [ ] VSCode Extension Manager (vsce) installed globally
- [ ] TypeScript compiler available
- [ ] Git repository access

## Publishing Process

### Step 1: Publisher Registration

1. **Create Publisher Account**
   ```bash
   # Install vsce globally
   npm install -g @vscode/vsce
   
   # Create publisher (one-time setup)
   vsce create-publisher darbotlabs
   ```

2. **Verify Publisher**
   - Visit [Visual Studio Marketplace Management](https://marketplace.visualstudio.com/manage)
   - Complete organization verification
   - Upload required documentation

### Step 2: Extension Preparation

1. **Build Extension**
   ```bash
   cd deployment/vscode-extension
   npm install
   npm run compile
   ```

2. **Create Assets**
   ```bash
   # Create icon and banner images
   mkdir -p assets
   # Add icon.png (128x128)
   # Add banner image for marketplace
   ```

3. **Package Extension**
   ```bash
   # Package for testing
   vsce package
   
   # Test installation
   code --install-extension power-agent-mcp-1.0.0.vsix
   ```

### Step 3: Quality Assurance

1. **Extension Testing**
   - [ ] Install extension in clean VSCode environment
   - [ ] Test all commands and configuration options
   - [ ] Verify MCP server integration works
   - [ ] Test with various Power Platform environments
   - [ ] Validate error handling and recovery

2. **Documentation Review**
   - [ ] README.md complete with setup instructions
   - [ ] CHANGELOG.md prepared with release notes
   - [ ] Screenshots and demo videos created
   - [ ] API documentation links verified

### Step 4: Marketplace Publication

1. **Initial Publication**
   ```bash
   # Login to marketplace
   vsce login darbotlabs
   
   # Publish extension
   vsce publish
   ```

2. **Marketplace Listing Configuration**
   - Update extension description
   - Add relevant tags and categories
   - Upload screenshots and demo videos
   - Configure pricing (free for community)
   - Set up support channels

### Step 5: Post-Publication

1. **Verification**
   - [ ] Extension appears in marketplace search
   - [ ] Installation works from marketplace
   - [ ] All links and documentation accessible
   - [ ] Community feedback channels operational

2. **Monitoring Setup**
   - [ ] Download and usage analytics enabled
   - [ ] Error reporting and telemetry configured  
   - [ ] User feedback collection setup
   - [ ] Support ticket routing established

## Release Management

### Version Updates
```bash
# Update version number
npm version patch  # or minor/major

# Update CHANGELOG.md
# Commit changes

# Publish update
vsce publish
```

### Release Channels
- **Stable**: Main marketplace distribution
- **Pre-release**: Beta testing channel
- **Development**: Internal testing builds

## Marketplace Optimization

### SEO and Discoverability
- **Keywords**: power platform, mcp, ai, copilot, dataverse
- **Categories**: Machine Learning, Extension Packs
- **Tags**: microsoft, dynamics, power-apps, automation

### Marketing Materials
- High-quality screenshots showing extension in action
- Demo video (2-3 minutes) showing key features
- Clear value proposition in description
- User testimonials and case studies

## Support and Maintenance

### Community Support
- GitHub Issues for bug reports
- Discussions for feature requests
- Documentation site for guides
- Video tutorials for complex scenarios

### Update Cadence
- **Major releases**: Quarterly (new tool categories)
- **Minor releases**: Monthly (new tools, improvements)
- **Patch releases**: As needed (bug fixes, security)

## Troubleshooting

### Common Publication Issues

1. **Publisher Verification Failed**
   - Ensure all required documents submitted
   - Contact support if verification delayed
   - Check email for verification requests

2. **Package Validation Errors**
   - Verify all required files included
   - Check package.json schema compliance
   - Validate TypeScript compilation

3. **Extension Installation Issues**
   - Test on clean VSCode installation
   - Verify Node.js version compatibility
   - Check extension activation events

### Support Contacts
- VSCode Marketplace Support: marketplace@microsoft.com
- Publisher Support: [Support Portal](https://docs.microsoft.com/en-us/azure/devops/extend/support)
- Community Forums: [VSCode Discussions](https://github.com/microsoft/vscode/discussions)

## Success Metrics

### Key Performance Indicators
- **Downloads**: Target 1000+ in first month
- **Rating**: Maintain 4.5+ star average
- **Usage**: Active users returning weekly
- **Support**: Response time under 24 hours

### Growth Milestones
- Week 1: 100 downloads
- Month 1: 1,000 downloads  
- Month 3: 5,000 downloads
- Month 6: 10,000+ downloads