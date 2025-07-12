# Power Agent MCP Commands Reference

> Complete reference for Power Agent MCP providing access to 12 core Microsoft Power Platform CLI commands through natural language AI interfaces.

## 🚀 Quick Start

Power Agent MCP provides AI assistants with natural language access to essential Microsoft Power Platform operations. The current implementation focuses on 12 core tools that cover the most critical Power Platform automation scenarios.

**Current Implementation:**
- **Standalone Mode**: 12 core tools providing essential Power Platform automation
- **Extensible Architecture**: Ready for additional tool categories in future releases

**Examples:**
- "Check my current Power Platform connection status"
- "Create a new development environment called 'AI Team Dev' in East US region"
- "Export the CustomerPortal solution as managed and pack for deployment"
- "List all my Power Platform environments and their current status"

## Core Tools Overview (12 Tools)

The current implementation provides 12 production-ready tools organized into 4 functional categories:

## Authentication & Security (3 tools)

- **pp_whoami**: Check current Power Platform authentication status and environment connection
- **pp_auth_create**: Create and store authentication profiles for different environments
- **pp_auth_list**: List all authentication profiles stored on this computer
- **pp_auth_select**: Select which authentication profile should be active

## Environment Operations (3 tools)

- **pp_create_environment**: Create a new Power Platform environment with customizable settings
- **pp_list_environments**: List all Power Platform environments accessible to current user
- **pp_delete_environment**: Delete a Power Platform environment (with confirmation)

## Solution Development (4 tools)

- **pp_export_solution**: Export managed and unmanaged solutions with advanced settings
- **pp_import_solution**: Import solutions with dependency handling and upgrade support
- **pp_pack_solution**: Package solutions from source control with proper metadata
- **pp_unpack_solution**: Unpack solutions for source control integration

## Status & Diagnostics (2 tools)

- **pp_list_solutions**: List all solutions in the current environment with details
- **pp_whoami**: Validate authentication and connection status (also listed in Auth section)

---

## 🎯 Common Workflows

### Complete Solution Development Workflow
```
1. pp_whoami - Verify authentication and current environment
2. pp_export_solution - Extract solution from development environment
3. pp_pack_solution - Package for source control
4. pp_unpack_solution - Extract for development work
5. pp_import_solution - Deploy to test environment
```

### Environment Setup
```
1. pp_create_environment - Create new environment
2. pp_list_environments - Verify environment creation
3. pp_auth_create - Set up authentication profile
4. pp_auth_select - Activate authentication profile
```

### Authentication Management
```
1. pp_auth_list - Check existing profiles
2. pp_auth_create - Create new profile if needed
3. pp_auth_select - Switch to appropriate profile
4. pp_whoami - Verify connection
```

## 📊 Summary

| Category | Tools | Key Use Cases |
|----------|-------|---------------|
| **Authentication & Security** | 3 | Service Principal and user authentication profiles |
| **Environment Operations** | 3 | Create, list, delete Power Platform environments |
| **Solution Development** | 4 | Complete solution lifecycle from dev to deployment |
| **Status & Diagnostics** | 2 | Connection validation and environment health checks |
| **Total Current Implementation** | **12** | **Essential Power Platform automation** |

## 🎯 Common Workflows

### Complete Solution Development Workflow
```
1. pp_whoami - Verify authentication and current environment
2. pp_export_solution - Extract solution from development environment
3. pp_pack_solution - Package for source control
4. pp_unpack_solution - Extract for development work
5. pp_import_solution - Deploy to test environment
```

### Environment Setup
```
1. pp_create_environment - Create new environment
2. pp_list_environments - Verify environment creation
3. pp_auth_create - Set up authentication profile
4. pp_auth_select - Activate authentication profile
```

### Authentication Management
```
1. pp_auth_list - Check existing profiles
2. pp_auth_create - Create new profile if needed
3. pp_auth_select - Switch to appropriate profile
4. pp_whoami - Verify connection
```

---

## 🚧 Future Roadmap

The current implementation provides 12 core tools for essential Power Platform operations. The architecture is designed to support additional tool categories:

- **Extended Environment Management** - Backup, restore, copy operations
- **Canvas App Development** - App creation and deployment tools
- **AI & Copilot Management** - Agent creation and deployment
- **Dataverse Operations** - Entity, record, and metadata management
- **SQL Server Integration** - Database operations and queries
- **Adaptive Cards** - Copilot Studio UI components
- **Security & Governance** - DLP, compliance, and auditing tools

---

*For detailed parameter information and usage examples, see the [installation guide](README.md#installation) and [usage examples](README.md#-usage-examples).*
