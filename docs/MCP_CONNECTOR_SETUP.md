# Power Agent MCP Configuration Guide

This guide provides comprehensive instructions for configuring and using the Power Agent MCP server with AI assistants like Claude.

## Overview

Power Agent MCP is a comprehensive Model Context Protocol server that enables AI assistants to interact with Microsoft Power Platform environments AND SQL Server databases through natural language. It provides access to all 141 Power Platform CLI commands plus additional functionality through 152 MCP tools and 7 SQL Server operations, covering the complete Power Platform ecosystem including environment management, solution development, deployment, governance, monitoring, authentication, canvas apps, copilots, connectors, and database management.

## Prerequisites

### System Requirements
- Node.js 20.0.0 or higher
- Power Platform CLI installed and configured
- Valid Power Platform credentials
- Network access to Power Platform services
- SQL Server access (for SQL database operations)
- Valid SQL Server connection strings (for SQL features)

### Authentication Setup
Before using Power Agent MCP, ensure you have configured authentication for Power Platform:

#### Service Principal Authentication (Recommended for Production)
1. Create an Azure App Registration in the Azure Portal
2. Configure API permissions for Power Platform
3. Create a client secret
4. Set environment variables:
   ```bash
   export POWERPLATFORM_TENANT_ID="your-tenant-id"
   export POWERPLATFORM_APPLICATION_ID="your-app-id"
   export POWERPLATFORM_CLIENT_SECRET="your-client-secret"
   ```

#### Interactive Authentication (For Development)
1. Install Power Platform CLI: `pac auth create`
2. Authenticate interactively: `pac auth list`

### SQL Server Configuration

Power Agent MCP includes integrated SQL Server capabilities that require proper connection configuration:

#### SQL Server Connection Strings
SQL Server tools require connection strings that will be provided as parameters when using the tools. Common connection string formats:

**SQL Server with Windows Authentication:**
```
Server=server_name;Database=database_name;Trusted_Connection=True;TrustServerCertificate=True
```

**SQL Server with SQL Authentication:**
```
Server=server_name;Database=database_name;User Id=username;Password=password;TrustServerCertificate=True
```

**Azure SQL Database:**
```
Server=tcp:server_name.database.windows.net,1433;Initial Catalog=database_name;Encrypt=Mandatory;TrustServerCertificate=False;Connection Timeout=30;Authentication=Active Directory Interactive
```

#### SQL Server Requirements
- SQL Server 2012 or higher, or Azure SQL Database
- Appropriate database permissions for the operations you plan to perform
- Network connectivity to the SQL Server instance
- The `mssql` Node.js package will be automatically installed with Power Agent MCP

## Installation

### Option 1: VSCode Extension (Recommended - Bundled Server)

**🚀 Easiest Installation - Zero Setup Required!**

The VSCode extension now includes a complete bundled MCP server - no separate installation needed:

1. **Install Extension:**
   ```bash
   # Via VSCode Marketplace
   code --install-extension darbotlabs.power-agent-mcp
   
   # Or search "Power Agent MCP" in Extensions panel
   ```

2. **Auto-Configuration:**
   - Extension includes bundled MCP server (no separate installation needed)
   - Pre-configured with default credentials:
     - Tenant ID: `6b104499-c49f-45dc-b3a2-df95efd6eeb4`
     - Application ID: `445ff173-a811-4760-a05c-3c37454f23d8`
   - Auto-starts when VSCode opens

3. **Ready to Use:**
   - Open Command Palette: `Power Agent MCP: Show MCP Server Status`
   - Server runs automatically in background
   - Access 254 Power Platform tools via AI assistants

### Option 2: Standalone Server Installation

For Claude Desktop or other MCP clients:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dayour/Power-Agent-MCP.git
   cd Power-Agent-MCP
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the MCP server:**
   ```bash
   npm run build
   ```

4. **Add MCP dependencies:**
   ```bash
   npm install @modelcontextprotocol/sdk
   ```

### Option 3: Building from Source

1. **Clone and build:**
   ```bash
   git clone https://github.com/dayour/Power-Agent-MCP.git
   cd Power-Agent-MCP
   npm ci
   npm run build
   ```

## Configuration

### Claude Desktop Configuration

To use Power Agent MCP with Claude Desktop, add the following configuration to your Claude Desktop settings:

#### On macOS
Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "power-agent-mcp": {
      "command": "node",
      "args": ["/path/to/Power-Agent-MCP/dist/mcp/server.js"],
      "env": {
        "POWERPLATFORM_TENANT_ID": "your-tenant-id",
        "POWERPLATFORM_APPLICATION_ID": "your-app-id",
        "POWERPLATFORM_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

#### On Windows
Edit `%APPDATA%\Claude\claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "power-agent-mcp": {
      "command": "node",
      "args": ["C:\\path\\to\\Power-Agent-MCP\\dist\\mcp\\server.js"],
      "env": {
        "POWERPLATFORM_TENANT_ID": "your-tenant-id",
        "POWERPLATFORM_APPLICATION_ID": "your-app-id",
        "POWERPLATFORM_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

### VSCode Extension Configuration

**🚀 Recommended for Development - No Manual Configuration Required!**

The Power Agent MCP VSCode Extension provides the easiest integration experience:

#### Quick Setup (Bundled Server)
1. **Install Extension:** Search "Power Agent MCP" in VSCode Extensions or use `code --install-extension darbotlabs.power-agent-mcp`
2. **Auto-Start:** Server automatically starts when VSCode opens (can be disabled in settings)
3. **Pre-Configured:** Default credentials work immediately, or customize in VSCode Settings
4. **Zero Dependencies:** No separate server installation or Node.js setup required

#### VSCode Settings Configuration
Access via `File > Preferences > Settings` and search for "Power Agent MCP":

- **Server Path:** Leave empty to use bundled server (recommended)
- **Auto Start:** Enable/disable automatic startup (default: enabled)  
- **Tenant ID:** Pre-configured with `6b104499-c49f-45dc-b3a2-df95efd6eeb4`
- **Application ID:** Pre-configured with `445ff173-a811-4760-a05c-3c37454f23d8`

#### Alternative: Custom Server Configuration
For development or custom server paths, use traditional MCP configuration:

```json
{
  "mcpServers": {
    "power-agent-mcp": {
      "command": "node",
      "args": ["/path/to/Power-Agent-MCP/dist/mcp/server.js"],
      "env": {
        "POWERPLATFORM_MCP_MODE": "vscode",
        "POWERPLATFORM_TENANT_ID": "your-tenant-id",
        "POWERPLATFORM_APPLICATION_ID": "your-app-id",
        "POWERPLATFORM_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

**Note**: VSCode mode exposes 10 hierarchical parent tools instead of all 254 individual tools. See [VSCode MCP Integration Guide](docs/VSCODE_MCP_INTEGRATION.md) for detailed usage instructions.

### Alternative Authentication Methods

#### Using Managed Identity (Azure)
```json
{
  "mcpServers": {
    "power-agent-mcp": {
      "command": "node",
      "args": ["/path/to/Power-Agent-MCP/dist/mcp/server.js"],
      "env": {
        "POWERPLATFORM_AUTH_TYPE": "managedidentity",
        "POWERPLATFORM_TENANT_ID": "your-tenant-id"
      }
    }
  }
}
```

#### Using Workload Identity Federation
```json
{
  "mcpServers": {
    "power-agent-mcp": {
      "command": "node",
      "args": ["/path/to/Power-Agent-MCP/dist/mcp/server.js"],
      "env": {
        "POWERPLATFORM_AUTH_TYPE": "workloadidentity",
        "POWERPLATFORM_TENANT_ID": "your-tenant-id",
        "POWERPLATFORM_CLIENT_ID": "your-client-id",
        "AZURE_FEDERATED_TOKEN_FILE": "/path/to/token/file"
      }
    }
  }
}
```

## Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `POWERPLATFORM_TENANT_ID` | Azure tenant ID | Yes | `00000000-0000-0000-0000-000000000000` |
| `POWERPLATFORM_APPLICATION_ID` | Azure app registration ID | Yes* | `00000000-0000-0000-0000-000000000000` |
| `POWERPLATFORM_CLIENT_SECRET` | Client secret for app registration | Yes* | `your-secret-value` |
| `POWERPLATFORM_AUTH_TYPE` | Authentication method | No | `spn`, `managedidentity`, `workloadidentity` |
| `POWERPLATFORM_ENVIRONMENT_URL` | Default environment URL | No | `https://org.crm.dynamics.com/` |
| `POWERPLATFORM_CLI_PATH` | Custom PAC CLI path | No | `/usr/local/bin/pac` |
| `POWERPLATFORM_MCP_MODE` | Tool exposure mode | No | `full` (default), `vscode`, `hierarchical` |

*Required when using Service Principal authentication

## Usage Examples

### Basic Environment Operations

#### Create a new environment:
```
I need to create a new development environment called "Dev Team Alpha" in the US region with USD currency.
```

#### Export a solution:
```
Please export the "CustomerPortal" solution as an unmanaged solution to "./solutions/CustomerPortal.zip" with all settings included.
```

#### Import a solution:
```
Import the solution from "./solutions/CustomerPortal.zip" and publish all workflows after import.
```

### Advanced Workflows

#### Complete CI/CD Pipeline:
```
I need to set up a complete CI/CD pipeline:
1. Create a new sandbox environment called "Integration Test"
2. Import the solution from "./builds/latest/solution.zip"
3. Run solution checker analysis
4. Export configuration data for backup
5. Set solution version to "1.2.0.0"
6. Export the solution as managed for production deployment
```

#### Environment Management:
```
Please help me manage environments:
1. Create a backup of the production environment with label "Pre-Release-Backup"
2. Copy the production environment to a new sandbox called "UAT Environment"
3. Reset the development environment to clean state
```

### Data and Configuration

#### Export and Import Data:
```
Export all configuration data using the schema file "./config/data-schema.xml" and save to "./backups/config-data.zip"
```

#### Governance and Security:
```
Configure the environment:
1. Set connection variables from "./config/connection-vars.json"
2. Apply governance configuration from "./policies/governance-config.json"
3. Assign the "System Administrator" role to user "admin@company.com"
4. Publish all customizations
```

## Troubleshooting

### Common Issues

#### 1. Authentication Failures
**Error:** "401 Unauthorized"
**Solution:** 
- Verify your tenant ID, application ID, and client secret
- Ensure the service principal has proper permissions in Power Platform
- Check if the application user is created in Dataverse

#### 2. PAC CLI Not Found
**Error:** "Cannot find required pac CLI executable"
**Solution:**
- Install Power Platform CLI: `npm install -g @microsoft/powerapps-cli`
- Set `POWERPLATFORM_CLI_PATH` environment variable if using custom installation

#### 3. Network Connectivity Issues
**Error:** "Connection timeout" or "Network error"
**Solution:**
- Verify network connectivity to Power Platform services
- Check firewall settings and proxy configuration
- Ensure URLs are accessible: `*.dynamics.com`, `*.powerapps.com`

#### 4. Permission Errors
**Error:** "Insufficient privileges"
**Solution:**
- Verify service principal has required permissions
- Check environment security roles and business unit assignments
- Ensure the user/service principal is not disabled

### Debugging Tips

#### Enable Verbose Logging
Set the following environment variable for detailed logs:
```bash
export DEBUG="power-platform:*"
```

#### Validate Authentication
Use the `pp_whoami` tool to test authentication:
```
Please run the whoami command to validate my Power Platform authentication.
```

#### Test Basic Functionality
Start with simple operations before complex workflows:
```
Please list available environments using the tool installer and whoami commands.
```

## Security Considerations

### Production Deployment
- Use Service Principal authentication with minimal required permissions
- Store secrets securely (Azure Key Vault, environment variables, etc.)
- Implement proper network security and access controls
- Regular credential rotation

### Development Environment
- Use separate service principals for development and production
- Implement proper logging and monitoring
- Test authentication and permissions before deployment

## Performance Optimization

### Connection Management
- Reuse authentication tokens when possible
- Implement connection pooling for high-throughput scenarios
- Use async operations for long-running tasks

### Resource Usage
- Monitor memory usage for large solution operations
- Implement proper error handling and retry logic
- Use appropriate timeout settings for operations

## Support and Resources

### Documentation
- [Power Platform Build Tools Documentation](https://docs.microsoft.com/en-us/power-platform/alm/devops-build-tools)
- [Power Platform CLI Reference](https://docs.microsoft.com/en-us/powerapps/developer/data-platform/powerapps-cli)
- [MCP Commands Reference](./MCP_COMMANDS_REFERENCE.md)

### Community
- [Power Platform Community](https://powerusers.microsoft.com/)
- [GitHub Issues](https://github.com/dayour/Power-Agent-MCP/issues)
- [Power Platform DevOps](https://docs.microsoft.com/en-us/power-platform/alm/)

### Microsoft Support
- [Power Platform Support](https://docs.microsoft.com/en-us/power-platform/admin/get-help-support)
- [Azure Active Directory Support](https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-support)

## Version Compatibility

| MCP Connector Version | Power Platform CLI | Node.js | Supported Environments |
|----------------------|-------------------|---------|----------------------|
| 1.0.x | 1.33+ | 20.0.0+ | All Power Platform |
| 1.1.x | 1.34+ | 20.0.0+ | All Power Platform |

## License

This MCP connector is licensed under the MIT License. See [LICENSE](../LICENSE) for details.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.