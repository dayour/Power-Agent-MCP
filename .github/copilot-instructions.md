# Copilot Instructions for Power-Agent-MCP

## Project Overview
Production-ready MCP server for Microsoft Power Platform operations. Fork of powerplatform-build-tools with 12 core MCP tools.

## Architecture
- `src/` - MCP server implementation (JavaScript/TypeScript)
- `test/` - Test suite
- `.azure-pipelines/` - CI/CD

## Code Style
- JavaScript/TypeScript, ESLint enforced, webpack bundled
- Zod schemas for parameter validation
- 12 tools: auth (3), env mgmt (3), solutions (4), diagnostics (2)
- PAC CLI integration, Service Principal auth
