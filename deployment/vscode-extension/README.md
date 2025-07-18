# Power Agent MCP - VSCode Extension

[![Version](https://img.shields.io/visual-studio-marketplace/v/darbotlabs.power-agent-mcp?label=VS%20Code%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=darbotlabs.power-agent-mcp)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/darbotlabs.power-agent-mcp)](https://marketplace.visualstudio.com/items?itemName=darbotlabs.power-agent-mcp)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/darbotlabs.power-agent-mcp)](https://marketplace.visualstudio.com/items?itemName=darbotlabs.power-agent-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Major Update v2.0.0 - Secure Azure Authentication!

**✅ Secure Authentication**: Interactive Azure login with automatic tenant detection  
**✅ No Hardcoded Credentials**: Removed default tenant/app IDs for enterprise security  
**✅ Multiple Auth Methods**: Azure CLI, browser login, or manual configuration  
**✅ Self-Contained**: Complete bundled MCP server with 254 Power Platform tools

### Authentication Revolution
- **Before v2.0.0**: Hardcoded tenant/app IDs, security concerns for enterprise use
- **After v2.0.0**: Interactive Azure authentication, works with any tenant, enterprise-ready security

## Overview

The **Power Agent MCP** VSCode extension provides seamless integration with the Power Agent Model Context Protocol (MCP) server, enabling AI-powered development workflows for Microsoft Power Platform. This extension allows you to interact with Power Platform environments, solutions, applications, and data directly from your IDE through AI assistants like Claude and GitHub Copilot.

## 🔐 Authentication

### Secure Setup Process
1. **Install Extension**: No additional setup required
2. **Run Setup Wizard**: Extension prompts for authentication on first use
3. **Choose Auth Method**: 
   - **Azure CLI** (recommended): Uses existing `az login` session
   - **Interactive Browser**: Device code flow for secure authentication
   - **Manual Config**: For enterprise environments with specific requirements

### Supported Authentication Methods

#### Option 1: Azure CLI (Recommended)
```bash
az login
# Extension automatically detects your tenant and credentials
```

#### Option 2: Interactive Browser Login
- Extension opens secure Microsoft login flow
- Device code authentication for maximum compatibility
- Automatic tenant detection from your Azure account

#### Option 3: Manual Configuration
- For enterprise environments with specific tenant requirements
- Guided configuration with validation

## 🚀 Features

### Enterprise-Grade Power Platform Integration
- **Comprehensive Environment Management**: Connect to and manage multiple Power Platform environments
- **Solution Lifecycle Management**: Export, import, pack, and unpack solutions with full version control
- **Application Development**: Build canvas apps, PCF components, plugins, and Power Pages
- **AI Copilot Operations**: Create, deploy, and manage Power Platform copilots and agents
- **Data Operations**: Perform CRUD operations on Dataverse with intelligent schema discovery

### Advanced AI Capabilities
- **253+ Individual Tools**: Granular control over every aspect of Power Platform development
- **10 Hierarchical Tool Categories**: Organized access patterns for complex workflows
- **Intelligent Context**: AI assistants understand Power Platform concepts and relationships
- **Real-time Validation**: Immediate feedback on configurations and deployments

### Developer Experience
- **Visual Status Monitoring**: Real-time MCP server status in VSCode sidebar
- **Interactive Tool Explorer**: Browse and discover available Power Platform operations
- **Secure Authentication**: Enterprise-grade security with your Azure credentials
- **Comprehensive Logging**: Debug and troubleshoot with detailed operation logs

## 📦 Installation

### Method 1: VSCode Marketplace (Recommended)
1. Open VSCode
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Power Agent MCP"
4. Click "Install" on the extension by DarBotLabs

### Method 2: Command Line
```bash
code --install-extension darbotlabs.power-agent-mcp
```

### Method 3: VSIX Package
Download the latest `.vsix` file from the [releases page](https://github.com/dayour/Power-Agent-MCP/releases) and install manually.

## ⚙️ Setup & Configuration

## ⚙️ Setup & Configuration

### Prerequisites
- **VSCode**: Version 1.74.0 or higher
- **Node.js**: Version 18.0.0 or higher (for MCP server runtime)
- **Azure Account**: Access to Power Platform (any tenant)

### Quick Start Guide

1. **Install Extension**:
   - Search for "Power Agent MCP" in VSCode Extensions
   - Click Install

2. **First Launch Authentication**:
   - Extension automatically prompts for authentication setup
   - Choose your preferred authentication method:
     - **Azure CLI**: Use existing `az login` session (recommended)
     - **Interactive Browser**: Secure device code authentication
     - **Manual Config**: For enterprise-specific requirements

3. **Start Using**:
   - Server starts automatically after authentication
   - Access 254 Power Platform tools through AI assistants

### Authentication Setup Details

#### Option 1: Azure CLI (Recommended)
```bash
# First, ensure Azure CLI is logged in
az login

# Extension will automatically:
# - Detect your logged-in tenant
# - Use your existing credentials
# - Configure the MCP server
```

#### Option 2: Interactive Browser Login
1. Run: `Ctrl+Shift+P` → "Power Agent MCP: Setup Azure Authentication"
2. Choose "Interactive Browser Login"
3. Follow device code instructions in browser
4. Extension automatically saves your tenant information

#### Option 3: Manual Configuration
1. Run: `Ctrl+Shift+P` → "Power Agent MCP: Setup Azure Authentication"
2. Choose "Manual Configuration"
3. Enter your Azure Tenant ID when prompted
4. Additional authentication may be required at runtime

### Managing Authentication

- **View Status**: `Ctrl+Shift+P` → "Power Agent MCP: Show MCP Server Status"
- **Re-authenticate**: `Ctrl+Shift+P` → "Power Agent MCP: Login to Azure"
- **Logout**: `Ctrl+Shift+P` → "Power Agent MCP: Logout from Azure"
- **Change Auth Method**: `Ctrl+Shift+P` → "Power Agent MCP: Setup Azure Authentication"

### Advanced Configuration

#### Custom Server Path (Development)
For development with local server builds:
1. Open VSCode Settings (Ctrl+,)
2. Search for "Power Agent MCP"
3. Set "Server Path" to your custom server location

#### Environment Variables
The extension sets these automatically from your authentication:
- `POWERPLATFORM_TENANT_ID`: Your Azure tenant
- `POWERPLATFORM_ACCESS_TOKEN`: Your access token
- `POWERPLATFORM_MCP_MODE`: Set to 'vscode'
   - Configure authentication credentials
   - Adjust logging and performance settings

3. **Start MCP Server**:
   - Starts automatically by default
   - Manual control via Command Palette

## 🛠️ Usage

### Basic Operations

#### Environment Management
```typescript
// List all accessible environments
f1e_pp_environment: env_list

// Select working environment
f1e_pp_environment: env_select
```

#### Solution Development
```typescript
// Export solution for version control
f1e_pp_solution: export_solution

// Import solution to target environment
f1e_pp_solution: import_solution

// Pack solution for deployment
f1e_pp_solution: pack_solution
```

#### AI Copilot Management
```typescript
// List all copilots in environment
f1e_pp_copilot: copilot_list

// Create new copilot
f1e_pp_copilot: copilot_create

// Deploy copilot to production
f1e_pp_copilot: copilot_publish
```

### Advanced Workflows

#### Canvas App Development
```typescript
// Initialize new canvas app
f1e_pp_application: canvas_create

// Download app for local development
f1e_pp_application: canvas_download

// Validate app before deployment
f1e_pp_application: canvas_validate
```

#### Data Operations
```typescript
// Query Dataverse tables
f1e_pp_data: sql_read_data

// Create table with schema
f1e_pp_data: sql_create_table

// Export data for backup
f1e_pp_data: export_data
```

## 🎯 Tool Categories

### 1. Environment (`f1e_pp_environment`)
Manage Power Platform environments, users, roles, and administrative tasks.

### 2. Solution (`f1e_pp_solution`)
Complete solution development lifecycle - export, import, pack, unpack, and version management.

### 3. Application (`f1e_pp_application`)
Canvas apps, PCF components, plugins, Power Pages, and custom code development.

### 4. Copilot (`f1e_pp_copilot`)
Comprehensive AI copilot lifecycle, knowledge management, testing, and deployment.

### 5. Data (`f1e_pp_data`)
Data operations, SQL management, export/import, and schema operations.

### 6. Connector (`f1e_pp_connector`)
Manage Dataverse connections, custom connectors, and adaptive cards.

### 7. Security (`f1e_pp_security`)
Authentication, user management, role assignments, and compliance.

### 8. Utility (`f1e_pp_utility`)
Tools, help, diagnostics, and telemetry management.

### 9. Pipeline (`f1e_pp_pipeline`)
CI/CD operations, package management, and automated deployment.

### 10. Quality (`f1e_pp_quality`)
Testing, solution checker, Power Fx development, and quality assurance.

## 🔧 Extension Commands

| Command | Description |
|---------|-------------|
| `Power Agent MCP: Start MCP Server` | Initialize and start the MCP server |
| `Power Agent MCP: Stop MCP Server` | Gracefully stop the MCP server |
| `Power Agent MCP: Show MCP Server Status` | Display current server status and health |
| `Power Agent MCP: Validate All Tools` | Test connectivity to all 253 tools |

## ⚡ AI Assistant Integration

### Claude Integration
1. Install Claude Desktop or Web
2. Configure MCP settings to include Power Agent server
3. Start chatting with Power Platform context

### GitHub Copilot Integration
1. Ensure GitHub Copilot extension is active
2. Use natural language comments to trigger Power Platform operations
3. Leverage context-aware code suggestions

### Example AI Interactions

```
"Create a new canvas app for expense reporting in the development environment"

"Export the Customer Management solution and create a deployment package"

"Show me all copilots in production and their deployment status"

"Query the Account table for records created this month"
```

## 📊 Monitoring & Debugging

### Server Status Panel
- **Connection Status**: Real-time MCP server connectivity
- **Active Tools**: Currently available operations
- **Environment Info**: Connected Power Platform details
- **Performance Metrics**: Response times and success rates

### Logging Configuration
Configure logging levels in settings:
- **Error**: Critical issues only
- **Warn**: Warnings and errors
- **Info**: General information (default)
- **Debug**: Detailed operation logs

## 🔐 Security & Compliance

### Authentication
- **Azure AD Integration**: Native Microsoft identity support
- **Service Principal**: Automated authentication for CI/CD
- **Multi-Factor Authentication**: Enhanced security compliance
- **Conditional Access**: Respect organizational policies

### Data Protection
- **Encrypted Communications**: All MCP traffic is encrypted
- **Credential Management**: Secure storage of authentication tokens
- **Audit Logging**: Comprehensive operation tracking
- **GDPR Compliance**: Data handling follows regulations

## 🚀 Performance & Scalability

### Optimization Features
- **Connection Pooling**: Efficient Power Platform API usage
- **Intelligent Caching**: Reduce redundant API calls
- **Batch Operations**: Bulk processing capabilities
- **Async Processing**: Non-blocking operation execution

### Resource Management
- **Memory Efficient**: Minimal VSCode resource usage
- **Background Processing**: Operations don't block IDE
- **Configurable Timeouts**: Customize operation limits
- **Auto-Recovery**: Resilient connection handling

## 🔄 Migration from Legacy Installation

### Coming from Pre-v1.0.3 (Separate .NET Tool)

If you previously used the separate .NET tool installation:

#### 1. Clean Up Old Installation
```bash
# Remove the separate .NET tool
dotnet tool uninstall --global DarBotLabs.PowerAgent.MCP

# Clear old MCP configurations if any
```

#### 2. Install New Extension
```bash
# Install the new bundled extension
code --install-extension darbotlabs.power-agent-mcp
```

#### 3. Verify New Setup
- Extension automatically uses bundled server
- No manual configuration needed
- Pre-configured credentials work immediately
- Use Command Palette → "Power Agent MCP: Show MCP Server Status"

### Migration Benefits
| **Legacy (Pre-v1.0.3)** | **New Bundled (v1.0.3+)** |
|-------------------------|---------------------------|
| ❌ Required `dotnet tool install` | ✅ Bundled in extension |
| ❌ Manual tenant/app configuration | ✅ Pre-configured defaults |
| ❌ Server path management | ✅ Automatic server detection |
| ❌ Frequent connection issues | ✅ Reliable auto-start |
| ❌ Complex troubleshooting | ✅ Simple status commands |

## 🛠️ Troubleshooting

### Common Issues

#### MCP Server Won't Start
```bash
# If using bundled server (default), check Node.js installation
node --version

# If using custom server installation
dotnet tool list --global | grep DarBotLabs

# Reinstall custom server if needed
dotnet tool uninstall --global DarBotLabs.PowerAgent.MCP
dotnet tool install --global DarBotLabs.PowerAgent.MCP
```

#### Authentication Failures
1. Verify Tenant ID and Application ID in settings
2. Check Azure AD permissions for Power Platform
3. Clear cached credentials and re-authenticate
4. Validate network connectivity to Power Platform

#### Tool Execution Errors
1. Run "Validate All Tools" command
2. Check server logs for specific error details
3. Verify environment permissions
4. Update to latest extension version

### Debug Information
Enable debug logging to troubleshoot issues:
1. Open VSCode Settings
2. Set "Power Agent MCP: Log Level" to "debug"
3. Restart MCP server
4. Check Output panel for detailed logs

## 🔄 Updates & Versioning

### Automatic Updates
The extension automatically updates through VSCode's update mechanism. New versions include:
- Additional Power Platform tools and capabilities
- Performance improvements
- Security enhancements
- Bug fixes and stability improvements

### Manual Updates
Force update checking:
1. Open Extensions panel
2. Find Power Agent MCP extension
3. Click "Check for Updates"

## 🤝 Support & Community

### Documentation
- **GitHub Repository**: [Power-Agent-MCP](https://github.com/dayour/Power-Agent-MCP)
- **API Documentation**: Complete tool reference and examples
- **Video Tutorials**: Step-by-step setup and usage guides
- **Best Practices**: Enterprise deployment patterns

### Getting Help
- **GitHub Issues**: Bug reports and feature requests
- **Discussion Forums**: Community support and Q&A
- **Enterprise Support**: Professional consulting services
- **Documentation**: Comprehensive guides and API reference

### Contributing
We welcome contributions! See our [Contributing Guide](https://github.com/dayour/Power-Agent-MCP/blob/main/CONTRIBUTING.md) for:
- Code contribution guidelines
- Bug reporting procedures
- Feature request process
- Development environment setup

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏢 Enterprise

For enterprise deployments, custom integrations, or professional support:
- **Email**: contact@darbotlabs.com
- **Enterprise Features**: SSO, advanced security, custom tools
- **Professional Services**: Implementation and training support
- **SLA Options**: 24/7 support with guaranteed response times

---

**Power Agent MCP** - Empowering AI-driven Power Platform development workflows.

*Built with ❤️ by DarBotLabs*
