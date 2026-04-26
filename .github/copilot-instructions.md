 Copilot Instructions for Power-Agent-MCP

 Project Overview
Production-ready MCP server for Microsoft Power Platform operations. Fork of powerplatform-build-tools with 12 core MCP tools.

 Architecture
- `src/` - MCP server implementation (JavaScript/TypeScript)
- `test/` - Test suite
- `.azure-pipelines/` - CI/CD

 Code Style
- JavaScript/TypeScript, ESLint enforced, webpack bundled
- Zod schemas for parameter validation
- 12 tools: auth (3), env mgmt (3), solutions (4), diagnostics (2)
- PAC CLI integration, Service Principal auth

 No Emojis Policy
- Do not use emojis anywhere in the codebase. This includes source code, comments, documentation, commit messages, log messages, error messages, test descriptions, and configuration files.
- Use plain text descriptions instead of emoji characters (e.g., write "WARNING:" instead of "", "SUCCESS:" instead of "", "ERROR:" instead of "").
- If referencing status or severity, use words like NOTE, WARNING, ERROR, SUCCESS, INFO, TIP, or IMPORTANT.
