# Power Agent MCP - Quick Start Guide

Get up and running with Power Agent MCP in minutes. This guide covers installation, configuration, and your first Power Platform automation.

## ⚡ Quick Installation

### 1. Prerequisites Check

Ensure you have the required components:

```bash
# Check Node.js version (18+ required)
node --version

# Check npm
npm --version

# Check if PAC CLI is available (install if missing)
pac --version
```

### 2. Install Power Agent MCP

```bash
# Clone the repository
git clone https://github.com/dayour/Power-Agent-MCP.git
cd Power-Agent-MCP

# Install dependencies and build
npm install
npm run build

# Verify installation
npm test
```

### 3. Install PAC CLI (if missing)

```bash
# Install .NET 6 SDK if not present
# Ubuntu/Debian:
sudo apt-get update
sudo apt-get install -y dotnet-sdk-6.0

# Install PAC CLI as global tool
dotnet tool install --global Microsoft.PowerPlatform.CLI.Tool
```

**Alternative for testing:** If PAC CLI installation fails, the repository includes a mock version for testing purposes.

## 🔐 Authentication Setup

### Option 1: Service Principal (Recommended for Production)

1. **Create Azure AD Application:**
   ```bash
   # Login to Azure CLI
   az login
   
   # Create application
   az ad app create --display-name "Power-Agent-MCP-Production"
   
   # Note the "appId" from the response
   # Create client secret
   az ad app credential reset --id YOUR-APPLICATION-ID
   ```

2. **Configure Environment Variables:**
   ```bash
   export POWERPLATFORM_TENANT_ID="your-tenant-id"
   export POWERPLATFORM_APPLICATION_ID="your-app-id"
   export POWERPLATFORM_CLIENT_SECRET="your-client-secret"
   ```

### Option 2: Interactive Authentication (Development)

For development and testing, you can use interactive authentication through the PAC CLI directly.

## 🤖 MCP Client Setup

### Claude Desktop Configuration

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "power-agent-mcp": {
      "command": "node",
      "args": ["/path/to/Power-Agent-MCP/dist/mcp/standalone-server.js"],
      "env": {
        "POWERPLATFORM_TENANT_ID": "your-tenant-id",
        "POWERPLATFORM_APPLICATION_ID": "your-app-id",
        "POWERPLATFORM_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

**Important:** Update `/path/to/Power-Agent-MCP` with your actual installation path.

### Other MCP Clients

The server works with any MCP-compatible client. Use the same configuration pattern with your preferred MCP client.

## 🎯 First Power Platform Automation

Once everything is configured, test these commands in your AI assistant:

### 1. Check Connection
```
"Check my Power Platform authentication status"
```

### 2. List Environments
```
"Show me all my Power Platform environments"
```

### 3. Create Test Environment
```
"Create a new development environment called 'AI Test Lab' in the United States region"
```

### 4. Solution Operations
```
"List all solutions in my current environment"
```

## 🔧 Available Tools Overview

Your Power Agent MCP provides these 12 core tools:

| Category | Tools | Description |
|----------|-------|-------------|
| **Authentication** | 3 tools | `pp_whoami`, `pp_auth_create`, `pp_auth_list`, `pp_auth_select` |
| **Environments** | 3 tools | `pp_create_environment`, `pp_list_environments`, `pp_delete_environment` |
| **Solutions** | 4 tools | `pp_export_solution`, `pp_import_solution`, `pp_pack_solution`, `pp_unpack_solution` |
| **Diagnostics** | 2 tools | `pp_list_solutions`, connection validation |

## 🚨 Troubleshooting

### PAC CLI Not Found
```bash
# Check PATH
echo $PATH

# Reinstall PAC CLI
dotnet tool uninstall --global Microsoft.PowerPlatform.CLI.Tool
dotnet tool install --global Microsoft.PowerPlatform.CLI.Tool

# Verify installation
pac --version
```

### Authentication Issues
```bash
# Test authentication manually
pac auth list
pac whoami

# Clear and recreate authentication
pac auth clear
pac auth create --name "test-profile" --url "https://your-env.crm.dynamics.com"
```

### MCP Connection Issues
1. Verify the path in `claude_desktop_config.json` is correct
2. Check that the server builds successfully: `npm run build`
3. Test server manually: `npm test`
4. Check environment variables are set correctly

### Build Issues
```bash
# Clean and rebuild
npm run clean
npm install
npm run build
```

## 📚 Next Steps

- Review the [complete tool documentation](power-mcp.md)
- Check out [usage examples](README.md#-usage-examples)
- Explore the [architecture documentation](README.md#-sdk-architecture--coverage)
- Consider the roadmap for additional capabilities

## 🆘 Getting Help

If you encounter issues:

1. **Check the troubleshooting section above**
2. **Run the production audit:** `npm test`
3. **Check the GitHub Issues:** [Report issues here](https://github.com/dayour/Power-Agent-MCP/issues)
4. **Review the logs:** Server output provides detailed error information

---

**🎉 Congratulations!** You now have Power Agent MCP running and can automate Power Platform operations through natural language AI interactions.