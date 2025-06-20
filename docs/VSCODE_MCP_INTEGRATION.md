# VSCode MCP Integration Guide

## Overview

Power Agent MCP supports two integration modes to accommodate different MCP clients:

1. **Full Mode** (Default) - Exposes all 229 tools for Claude Desktop and other MCP clients
2. **VSCode Mode** - Exposes 10 hierarchical parent tools to work within VSCode's 125 tool limit

## VSCode Configuration

### Setting Up VSCode Mode

To use Power Agent MCP with VSCode MCP extension, set the `POWERPLATFORM_MCP_MODE` environment variable to `vscode`:

#### VSCode MCP Extension Configuration

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

### Tool Not Found Errors
If you get "Unknown command" errors, ensure:
1. The command name matches the enum values in the parent tool schema
2. You're using the correct parent tool for the operation
3. The `POWERPLATFORM_MCP_MODE` is set to `vscode`

### Performance Issues
VSCode mode adds minimal overhead (single dispatch call), but if you experience issues:
1. Consider using Full mode for automation scripts
2. Use VSCode mode primarily for interactive development

## Support

For VSCode-specific issues:
- Check VSCode MCP extension logs
- Verify environment variable configuration
- Test with Full mode to isolate VSCode-specific problems