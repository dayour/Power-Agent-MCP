# VSCode MCP Integration Guide

## Overview

Power Agent MCP provides seamless VSCode integration through a dedicated extension that includes a bundled MCP server. This eliminates the need for separate installation and configuration while providing access to all Power Platform capabilities.

## Integration Modes

Power Agent MCP supports two integration approaches:

1. **VSCode Extension** (Recommended) - Complete bundled solution with auto-configuration
2. **Manual MCP Configuration** - Traditional MCP setup for advanced scenarios

## VSCode Extension Setup (Recommended)

### ✅ Complete Bundled Solution

The Power Agent MCP VSCode Extension provides the most streamlined experience:

#### Installation
```bash
# Via VSCode Marketplace
code --install-extension darbotlabs.power-agent-mcp

# Or search "Power Agent MCP" in Extensions panel
```

#### Auto-Configuration Features
- ✅ **Bundled MCP Server**: Complete 21KB server included in extension
- ✅ **Pre-configured Credentials**: Default working credentials included
- ✅ **Auto-Start**: Server automatically starts when VSCode opens
- ✅ **Zero Dependencies**: No Node.js setup or separate installation required
- ✅ **10 Hierarchical Tools**: Optimized for VSCode's tool limitations

#### Extension Commands
- `Power Agent MCP: Start MCP Server`
- `Power Agent MCP: Stop MCP Server` 
- `Power Agent MCP: Show MCP Server Status`
- `Power Agent MCP: Validate All Tools`

#### VSCode Settings Configuration
Access via `File > Preferences > Settings` and search "Power Agent MCP":

- **Server Path**: Leave empty to use bundled server (default)
- **Auto Start**: Automatically start server (default: enabled)
- **Tenant ID**: Pre-configured default or your custom tenant
- **Application ID**: Pre-configured default or your custom app

## Manual MCP Configuration (Advanced)

### Setting Up Manual MCP Mode

For advanced scenarios or custom server builds, configure MCP manually by setting the `POWERPLATFORM_MCP_MODE` environment variable to `vscode`:

#### Manual MCP Configuration

Add to your VSCode MCP configuration:

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

## VSCode Hierarchical Tool Structure

In VSCode mode, you'll see 10 parent tools instead of 229 individual tools:

### 1. pp_environment
**Environment and administration operations**
- 41 sub-commands for managing Power Platform environments, users, roles, and administrative tasks
- Examples: `create_environment`, `admin_create_user`, `env_list`

### 2. pp_solution
**Solution development lifecycle**
- 16 sub-commands for export, import, pack, unpack solutions and manage solution components
- Examples: `export_solution`, `import_solution`, `pack_solution`

### 3. pp_application
**Application development**
- 30 sub-commands for canvas apps, PCF components, plugins, Power Pages and code development
- Examples: `canvas_create`, `pcf_init`, `pages_download`

### 4. pp_copilot
**AI copilot management**
- 71 sub-commands for comprehensive copilot lifecycle, knowledge management, testing, deployment and monitoring
- Examples: `copilot_create`, `copilot_add_knowledge`, `copilot_test_conversation`

### 5. pp_data
**Data operations and SQL management**
- 9 sub-commands for export/import data, SQL database operations and schema management
- Examples: `export_data`, `sql_list_tables`, `sql_create_table`

### 6. pp_connector
**Connections and connectors**
- 20 sub-commands for managing Dataverse connections, custom connectors and adaptive cards
- Examples: `connection_create`, `connector_download`, `adaptivecard_create`

### 7. pp_security
**Security and governance**
- 10 sub-commands for authentication, user management, role assignments and compliance
- Examples: `auth_create`, `assign_user`, `auth_list`

### 8. pp_utility
**Tools, help and diagnostics**
- 14 sub-commands for help commands, tool management, telemetry and validation
- Examples: `tool_list`, `whoami`, `telemetry_status`

### 9. pp_pipeline
**CI/CD and deployment**
- 11 sub-commands for pipeline operations, package management and automated deployment
- Examples: `pipeline_deploy`, `package_init`, `download_portal`

### 10. pp_quality
**Testing and quality assurance**
- 7 sub-commands for solution checker, testing operations and Power Fx development
- Examples: `solution_checker`, `test_run`, `power_fx_repl`

## Usage Examples in VSCode

### Creating an Environment
```json
{
  "tool": "pp_environment",
  "parameters": {
    "command": "create_environment",
    "parameters": {
      "name": "Development Environment",
      "region": "unitedstates",
      "currency": "USD",
      "language": "1033"
    }
  }
}
```

### Managing Copilots
```json
{
  "tool": "pp_copilot",
  "parameters": {
    "command": "copilot_create",
    "parameters": {
      "templateFile": "./templates/customer-service.json",
      "name": "Customer Support Bot",
      "environment": "https://dev.crm.dynamics.com/"
    }
  }
}
```

### Exporting Solutions
```json
{
  "tool": "pp_solution", 
  "parameters": {
    "command": "export_solution",
    "parameters": {
      "solutionName": "CustomerPortal",
      "outputFile": "./solutions/CustomerPortal.zip",
      "managed": true
    }
  }
}
```

### SQL Database Operations
```json
{
  "tool": "pp_data",
  "parameters": {
    "command": "sql_list_tables",
    "parameters": {
      "connectionString": "Server=localhost;Database=PowerApps;Trusted_Connection=True;"
    }
  }
}
```

## Mode Comparison

| Feature | Full Mode (Claude) | VSCode Mode |
|---------|-------------------|-------------|
| Total Tools Exposed | 229 | 10 |
| Tool Access | Direct | Hierarchical |
| Tool Discovery | All tools visible | Sub-commands in schemas |
| Performance | Direct execution | Single dispatch overhead |
| Compatibility | All MCP clients | VSCode MCP extension |

## Environment Variables

| Variable | Default | VSCode Value | Description |
|----------|---------|-------------|-------------|
| `POWERPLATFORM_MCP_MODE` | `full` | `vscode` | Controls tool exposure mode |

## Benefits of VSCode Mode

1. **Compliance**: Works within VSCode's 125 tool limit
2. **Organization**: Logical grouping of related commands
3. **Discovery**: Clear categorization helps users find relevant tools
4. **Flexibility**: All original functionality remains accessible
5. **Performance**: Reduced tool enumeration overhead

## Migration from Full to VSCode Mode

No changes are required to your scripts or automation. The hierarchical mode simply adds a layer of indirection while maintaining the same underlying functionality.

## Troubleshooting

### Extension Installation Issues

#### Extension Not Installing
1. **Check VSCode Version**: Ensure VSCode 1.74.0 or higher
2. **Check Internet Connection**: Extension requires download from marketplace
3. **Clear Extension Cache**: Restart VSCode and retry installation
4. **Manual Installation**: Download `.vsix` from GitHub releases

#### Bundled Server Not Starting
1. **Check Node.js**: Bundled server requires Node.js 18+ (install if missing)
2. **Check Extension Status**: Use Command Palette → "Power Agent MCP: Show MCP Server Status"
3. **Manual Start**: Use Command Palette → "Power Agent MCP: Start MCP Server"
4. **Check Logs**: Open VSCode Output panel and select "Power Agent MCP"

### Authentication Issues

#### Default Credentials Not Working
1. **Network Access**: Verify connection to Power Platform services
2. **Custom Credentials**: Configure your own Tenant ID and Application ID in VSCode Settings
3. **Permissions**: Ensure your account has appropriate Power Platform access
4. **Service Principal**: Consider creating dedicated service principal for production

#### Connection Failures
1. **Check Settings**: Verify Tenant ID and Application ID in VSCode Settings
2. **Test Authentication**: Use Command Palette → "Power Agent MCP: Validate All Tools"
3. **Network Issues**: Check firewall and proxy settings
4. **Credential Reset**: Clear VSCode settings and reconfigure

### Performance Issues

#### Slow Server Startup
1. **First Run**: Initial startup may take longer for dependency resolution
2. **Background Services**: Close unnecessary VSCode extensions
3. **System Resources**: Ensure adequate memory and CPU available
4. **Auto-Start**: Disable auto-start if not needed (VSCode Settings)

#### Tool Execution Timeouts
1. **Network Latency**: Check Power Platform service connectivity
2. **Complex Operations**: Large environments may require more time
3. **Increase Timeouts**: Adjust timeout settings in VSCode configuration
4. **Batch Operations**: Use bulk tools for large datasets

### Migration from Legacy Installation

#### Coming from Separate .NET Tool
1. **Uninstall Old Tool**: `dotnet tool uninstall --global DarBotLabs.PowerAgent.MCP`
2. **Remove Old Configuration**: Delete manual MCP server configurations
3. **Install Extension**: Use new bundled extension approach
4. **Verify Setup**: Confirm bundled server is running correctly

#### Manual MCP Configuration Conflicts
1. **Remove Duplicate Configs**: Check VSCode MCP settings for conflicts
2. **Single Configuration**: Use either bundled extension OR manual MCP, not both
3. **Path Conflicts**: Ensure server path is empty to use bundled server
4. **Environment Variables**: Clear old MCP environment variable overrides

### Tool Not Found Errors
If you get "Unknown command" errors:
1. **Verify Tool Names**: Check command matches enum values in parent tool schema
2. **Correct Parent Tool**: Ensure you're using the right parent tool for the operation
3. **VSCode Mode**: Extension automatically uses VSCode hierarchical mode
4. **Tool Validation**: Use "Validate All Tools" command to test connectivity

### Legacy vs New Installation

| **Legacy (Pre-v1.0.3)** | **New Bundled (v1.0.3+)** |
|-------------------------|---------------------------|
| ❌ Required separate .NET tool | ✅ Bundled server included |
| ❌ Manual configuration needed | ✅ Auto-configured defaults |
| ❌ Complex troubleshooting | ✅ Simplified diagnostics |
| ❌ Multiple failure points | ✅ Single installation process |

## Support

### Extension-Specific Issues
- **Extension Logs**: VSCode Output panel → "Power Agent MCP"
- **Extension Commands**: Use Command Palette for diagnostics
- **Server Status**: Monitor real-time server health

### General MCP Issues  
- **GitHub Issues**: Report bugs and feature requests
- **Documentation**: Comprehensive guides and API reference
- **Community Support**: Discussion forums and Q&A