# Power Platform Build Tools

[![PullRequest](https://github.com/microsoft/powerplatform-build-tools/actions/workflows/PullRequest.yml/badge.svg)](https://github.com/microsoft/powerplatform-build-tools/actions/workflows/PullRequest.yml)
[![Official Build](https://dev.azure.com/dynamicscrm/OneCRM/_apis/build/status%2FDPX-Tools%2Fpowerplatform-build-tools%20Official%20Build?branchName=main)](https://dev.azure.com/dynamicscrm/OneCRM/_build/latest?definitionId=15006&branchName=main)

Power Platform Build Tools automate common build and deployment tasks related to Power Platform.
This includes synchronization of solution metadata (a.k.a. solutions) between development environments and source control,
generating build artifacts, deploying to downstream environments, provisioning/de-provisioning of environments,
and the ability to perform static analysis checks against your solution using the PowerApps checker service.

Learn more about the Build Tools [here](https://aka.ms/buildtoolsdoc).

Each tasks wraps the existing [Power Platform CLI](https://aka.ms/PowerPlatformCLI).

## 🤖 Model Context Protocol (MCP) Support

This repository now includes a comprehensive **MCP server implementation** that exposes all 32 Power Platform Build Tools as MCP tools for AI assistants like Claude. This enables natural language interaction with Power Platform environments through AI assistants.

### MCP Features
- **32 MCP Tools**: Complete coverage of all Power Platform Build Tools tasks
- **Full DevOps Lifecycle**: Environment management, solution development, deployment, governance
- **Production Ready**: Enterprise-grade authentication and error handling
- **Easy Configuration**: Simple setup for Claude Desktop and other MCP clients

### Quick MCP Setup
1. **Install dependencies:**
   ```bash
   npm install
   npm run build
   ```

2. **Configure Claude Desktop** (add to `claude_desktop_config.json`):
   ```json
   {
     "mcpServers": {
       "power-platform": {
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

3. **Start using with AI:**
   ```
   "Create a new development environment called 'AI Dev Environment' and export the CustomerPortal solution"
   ```

### MCP Documentation
- **[MCP Connector Setup Guide](docs/MCP_CONNECTOR_SETUP.md)** - Complete configuration instructions
- **[MCP Commands Reference](docs/MCP_COMMANDS_REFERENCE.md)** - Detailed command documentation  
- **[MCP Commands List](docs/MCP_COMMANDS_LIST.md)** - Quick reference of all 32 commands

## High level architecture

![High level architecture](docs/assets/images/architecture.png)

## Feedback & Questions

For additional support: https://learn.microsoft.com/en-us/power-platform/admin/get-help-support

## Engage with the Community

Stay up-to-date with the latest in Microsoft 365 & Power Platform topics: https://aka.ms/community/home

Recurring call invite - https://aka.ms/community/ms-speakers-call-invite

## Contributing

This project will welcome contributions in the near future. At this stage, we're not ready for contributions,
but do welcome your suggestions. Many open source projects ask for enhancement suggestions in the form of issues. We prefer that you start an [idea discussion](https://github.com/microsoft/powerplatform-build-tools/discussions/new?category=ideas) instead of creating enhancement issues.

See details in [CONTRIBUTING](CONTRIBUTING.md)

### Code of Conduct

See details in [CODE_OF_CONDUCT](CODE_OF_CONDUCT.md)

### Security issues

Please report any security concerns or issues as described in this [SECURITY](SECURITY.md) document.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft
trademarks or logos is subject to and must follow [Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project
must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.

