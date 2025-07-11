# Power Agent MCP - VSCode Extension

[![Version](https://img.shields.io/visual-studio-marketplace/v/darbotlabs.power-agent-mcp?label=VS%20Code%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=darbotlabs.power-agent-mcp)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/darbotlabs.power-agent-mcp)](https://marketplace.visualstudio.com/items?itemName=darbotlabs.power-agent-mcp)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/darbotlabs.power-agent-mcp)](https://marketplace.visualstudio.com/items?itemName=darbotlabs.power-agent-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

The **Power Agent MCP** VSCode extension provides seamless integration with the Power Agent Model Context Protocol (MCP) server, enabling AI-powered development workflows for Microsoft Power Platform. This extension allows you to interact with Power Platform environments, solutions, applications, and data directly from your IDE through AI assistants like Claude and GitHub Copilot.

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
- **Automated Configuration**: Smart detection and setup of Power Platform connections
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

### Prerequisites
- **VSCode**: Version 1.74.0 or higher
- **Node.js**: Version 18.0.0 or higher (for MCP server runtime)
- **Power Platform Access**: Valid credentials for target environments

### Quick Start (Bundled Server)
The extension now includes a bundled MCP server - no separate installation required!

1. **Install Extension**:
   - Search for "Power Agent MCP" in VSCode Extensions
   - Click Install

2. **Configure Settings** (Optional):
   - Open VSCode Settings (Ctrl+,)
   - Search for "Power Agent MCP"
   - Set your Power Platform credentials:
     - Tenant ID: `6b104499-c49f-45dc-b3a2-df95efd6eeb4` (default)
     - Application ID: `445ff173-a811-4760-a05c-3c37454f23d8` (default)

3. **Start Using**:
   - The MCP server starts automatically when VSCode opens
   - Use Command Palette: "Power Agent MCP: Show MCP Server Status"

### Advanced Setup (Custom Server)
For development or custom server paths:
1. **Install MCP Server** (if using custom installation):
   ```bash
   dotnet tool install --global DarBotLabs.PowerAgent.MCP
   ```

2. **Configure Extension Settings**:
   - Set custom server path if not using bundled server
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
