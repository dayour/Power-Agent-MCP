# Power Agent MCP - Enterprise AI SDK for Microsoft Power Platform

[![NuGet](https://img.shields.io/nuget/v/DarBotLabs.PowerAgent.MCP.svg)](https://www.nuget.org/packages/DarBotLabs.PowerAgent.MCP/)
[![Downloads](https://img.shields.io/nuget/dt/DarBotLabs.PowerAgent.MCP.svg)](https://www.nuget.org/packages/DarBotLabs.PowerAgent.MCP/)

**Enterprise-grade Model Context Protocol (MCP) server providing AI assistants with comprehensive programmatic access to the Microsoft Power Platform ecosystem.**

## 🚀 Quick Start

### Installation

```bash
Install-Package DarBotLabs.PowerAgent.MCP
```

### Basic Usage

```csharp
using DarBotLabs.PowerAgent.MCP;

// Initialize the Power Agent MCP server
var mcpServer = new PowerAgentMcpServer();

// Start the server with your configuration
await mcpServer.StartAsync(new McpConfiguration
{
    TenantId = "your-tenant-id",
    ApplicationId = "your-app-id",
    ClientSecret = "your-client-secret"
});

// The server now provides 254+ tools for Power Platform automation
```

## 🎯 What You Get

- **🤖 Natural Language API**: Describe operations in plain English - no CLI memorization required
- **📈 Complete Platform Coverage**: Every Power Platform capability accessible through AI
- **🏢 Production-Grade Security**: Service Principal, Managed Identity, Workload Identity Federation
- **🔧 Zero Learning Curve**: AI handles syntax, parameters, and orchestration automatically
- **🚀 Extensible Framework**: Proven patterns for integrating additional enterprise systems

## 📋 Feature Overview

### 🔧 Power Platform SDK (162+ tools)
- **Environment Management** - Complete lifecycle operations
- **Solution Development** - Full DevOps automation
- **Application Lifecycle** - Canvas apps, model-driven apps
- **AI & Copilot Management** - Agent creation and deployment
- **Security & Governance** - DLP, compliance, auditing

### 📊 Dataverse SDK (25+ tools)
- **Entity Management** - Create/delete custom tables
- **Column Management** - Configure attributes and data types
- **Record Operations** - CRUD operations on all data
- **Query Operations** - FetchXML and OData execution
- **Bulk Operations** - Import/export large datasets

### 💾 SQL Server SDK (7+ tools)
- **Database Operations** - Schema management and queries
- **Data Manipulation** - CRUD operations with optimization
- **Connection Management** - Multi-database support
- **Performance Monitoring** - Query analysis and tuning

### 🎨 Adaptive Cards SDK (10+ tools)
- **Card Creation** - Rich UI components for Copilot Studio
- **Template Management** - Reusable card patterns
- **Data Integration** - Dynamic cards from Dataverse
- **Deployment Automation** - Direct integration with copilots

## 📚 Documentation

- **[Complete Setup Guide](https://github.com/dayour/Power-Agent-MCP/blob/main/docs/MCP_CONNECTOR_SETUP.md)** - Installation and configuration
- **[API Reference](https://github.com/dayour/Power-Agent-MCP/blob/main/power-mcp.md)** - All 254+ tools with parameters
- **[Usage Examples](https://github.com/dayour/Power-Agent-MCP/blob/main/docs/MCP_USAGE_EXAMPLES.md)** - Real-world scenarios and workflows
- **[Production Deployment](https://github.com/dayour/Power-Agent-MCP/blob/main/docs/PRODUCTION_DEPLOYMENT_CHECKLIST.md)** - Enterprise deployment guide

## 🔐 Authentication

### Service Principal (Recommended for Production)
```csharp
var config = new McpConfiguration
{
    TenantId = Environment.GetEnvironmentVariable("POWERPLATFORM_TENANT_ID"),
    ApplicationId = Environment.GetEnvironmentVariable("POWERPLATFORM_APPLICATION_ID"),
    ClientSecret = Environment.GetEnvironmentVariable("POWERPLATFORM_CLIENT_SECRET")
};
```

### Managed Identity (Azure environments)
```csharp
var config = new McpConfiguration
{
    UseManagedIdentity = true,
    TenantId = "your-tenant-id"
};
```

## 💡 Usage Examples

### Environment Management
```csharp
// Create a new development environment
await mcpServer.ExecuteToolAsync("pp_create_environment", new
{
    displayName = "AI Innovation Lab",
    region = "unitedstates",
    type = "Sandbox"
});

// List all environments
var environments = await mcpServer.ExecuteToolAsync("pp_list_environments");
```

### Solution Automation
```csharp
// Export and pack solution for deployment
await mcpServer.ExecuteToolAsync("pp_export_solution", new
{
    solutionName = "CustomerPortal",
    managed = false
});

await mcpServer.ExecuteToolAsync("pp_pack_solution", new
{
    folder = "./CustomerPortal",
    zipfile = "./CustomerPortal.zip"
});
```

### Dataverse Operations
```csharp
// Create custom entity
await mcpServer.ExecuteToolAsync("pp_dv_entity_create", new
{
    displayName = "Project",
    logicalName = "new_project",
    description = "Custom project management entity"
});

// Query data with OData
var projects = await mcpServer.ExecuteToolAsync("pp_dv_query_odata", new
{
    entityName = "new_project",
    filter = "statuscode eq 1"
});
```

## 🏢 Enterprise Features

- **Multi-tenant Security** - Secure isolation for enterprise environments
- **Audit & Compliance** - Complete operation logging and traceability
- **Performance Monitoring** - Built-in metrics and health checks
- **Error Recovery** - Graceful failure handling and retry mechanisms
- **Extensible Architecture** - Easy integration with additional Microsoft services

## 📊 System Requirements

- **.NET 6.0** or later
- **Windows 10/11** or **Windows Server 2019+**
- **Power Platform CLI** (automatically managed)
- **Valid Microsoft 365** or Power Platform license
- **Azure AD Application** with appropriate permissions

## 🤝 Support & Community

- **GitHub Repository**: [Power-Agent-MCP](https://github.com/dayour/Power-Agent-MCP)
- **Issues & Bug Reports**: [GitHub Issues](https://github.com/dayour/Power-Agent-MCP/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/dayour/Power-Agent-MCP/discussions)
- **Documentation**: [Complete Guide](https://github.com/dayour/Power-Agent-MCP#readme)

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](https://github.com/dayour/Power-Agent-MCP/blob/main/LICENSE) file for details.

## 🏷️ Version History

### v1.0.0 (Current)
- ✅ Initial production release
- ✅ 254+ specialized tools for complete Power Platform coverage
- ✅ Enterprise authentication support
- ✅ Production-ready error handling and monitoring
- ✅ Comprehensive documentation and examples

---

*Enterprise SDK built with ❤️ for the Microsoft Power Platform developer community*

**Copyright © 2024 DarBot Labs. All rights reserved.**
