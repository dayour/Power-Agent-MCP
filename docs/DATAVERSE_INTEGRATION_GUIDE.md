# Dataverse MCP Integration Guide

## Overview

The Power Agent MCP now includes 25 comprehensive Dataverse-specific tools that extend the existing Power Platform functionality with direct Dataverse operations. These tools provide the missing functionality that would be expected from a dedicated Microsoft.PowerPlatform.Dataverse.MCP tool.

## What's New

### Added Dataverse Operations
- **Entity Management**: Full CRUD operations for custom entities/tables
- **Column Management**: Create, delete, and list table columns with all data types
- **Record Operations**: Complete data manipulation (CRUD) for any Dataverse table
- **Query Operations**: Execute FetchXML and OData queries with result export
- **Bulk Operations**: Import/export large datasets in CSV, JSON, or XML formats
- **Security Management**: Create security roles and assign permissions
- **Relationship Management**: Create and manage table relationships
- **Choice Management**: Create global and local choice sets (picklists)
- **Business Logic**: Create and manage business rules
- **Web API Access**: Direct Web API operations for custom scenarios

## Integration with Existing Tools

The new Dataverse tools complement the existing Power Platform tools:

### Relationship to Existing Tools
- **Connection Tools** (`pp_connection_*`): Basic connection management
- **Data Tools** (`pp_export_data`, `pp_import_data`): Solution-level data operations
- **Model Builder** (`pp_modelbuilder_build`): Code generation from Dataverse
- **NEW Dataverse Tools** (`pp_dv_*`): Direct Dataverse operations and management

### Tool Hierarchy
```
Power Platform MCP (254 tools)
├── Environment Management (41 tools)
├── Solution Development (16 tools)
├── Dataverse Operations (25 tools) ← NEW
├── AI & Copilot (10 tools)
├── Canvas Apps (7 tools)
├── SQL Database (7 tools)
└── ... (other categories)
```

## Usage Examples

### 1. Entity Setup Workflow
Create a complete custom entity with columns and security:

```json
{
  "tool": "pp_dv_entity_create",
  "args": {
    "entityName": "new_project",
    "displayName": "Project",
    "pluralName": "Projects",
    "ownershipType": "User"
  }
}
```

```json
{
  "tool": "pp_dv_column_create",
  "args": {
    "entityName": "new_project",
    "columnName": "project_status",
    "displayName": "Status",
    "dataType": "Choice",
    "isRequired": true
  }
}
```

### 2. Data Management Workflow
Import data and query results:

```json
{
  "tool": "pp_dv_bulk_import",
  "args": {
    "entityName": "new_project",
    "dataFile": "projects.csv",
    "batchSize": 100
  }
}
```

```json
{
  "tool": "pp_dv_query_odata",
  "args": {
    "entityName": "new_projects",
    "filter": "statecode eq 0",
    "select": "name,project_status,createdon",
    "outputFile": "active_projects.json"
  }
}
```

### 3. Security Configuration
Create roles and assign permissions:

```json
{
  "tool": "pp_dv_security_role_create",
  "args": {
    "roleName": "ProjectManager",
    "description": "Project management permissions"
  }
}
```

## Key Differences from Standard Power Platform Tools

| Standard Tools | New Dataverse Tools | Use Case |
|----------------|---------------------|----------|
| `pp_export_data` | `pp_dv_bulk_export` | Solution data vs. raw table data |
| `pp_connection_create` | `pp_dv_entity_create` | Connection setup vs. schema creation |
| `pp_modelbuilder_build` | `pp_dv_entity_metadata` | Code generation vs. metadata inspection |
| N/A | `pp_dv_query_fetchxml` | Direct query execution |
| N/A | `pp_dv_webapi_execute` | Custom API operations |

## Authentication and Permissions

The Dataverse tools inherit authentication from the Power Platform context but require specific permissions:

- **Entity Operations**: System Administrator or System Customizer role
- **Record Operations**: Appropriate entity permissions
- **Security Operations**: System Administrator role
- **Query Operations**: Read permissions on target entities

## Error Handling and Troubleshooting

Common scenarios and solutions:

### Authentication Issues
```
Error: "Insufficient privileges"
Solution: Verify security role assignments and entity permissions
```

### Entity Not Found
```
Error: "Entity 'entityname' not found"
Solution: Check entity name spelling and verify entity exists
```

### Data Type Validation
```
Error: "Invalid data type for column"
Solution: Review supported data types in documentation
```

## Migration from Microsoft.PowerPlatform.Dataverse.MCP

If you were planning to use the standalone Dataverse MCP tool, these integrated tools provide equivalent functionality:

### Tool Mapping (Expected)
- Entity operations → `pp_dv_entity_*` tools
- Record operations → `pp_dv_record_*` tools  
- Query operations → `pp_dv_query_*` tools
- Bulk operations → `pp_dv_bulk_*` tools

### Advantages of Integrated Approach
1. **Single MCP Server**: No need to manage multiple MCP servers
2. **Unified Authentication**: Shared Power Platform credentials
3. **Cross-Tool Integration**: Use with existing solution tools
4. **Consistent Interface**: Same patterns as other Power Platform tools

## Next Steps

1. **Immediate Use**: Start using the new `pp_dv_*` tools for Dataverse operations
2. **Integration**: Combine with existing solution development workflows
3. **Automation**: Build comprehensive Power Platform automation scripts
4. **Feedback**: Report any missing functionality or issues

## Documentation References

- [Complete Dataverse Operations Reference](DATAVERSE_MCP_REFERENCE.md)
- [Main Power Agent MCP Commands](../power-mcp.md)
- [MCP Integration Examples](../examples/)

---

**Total Tools Available: 254** (including 25 new Dataverse operations)

This implementation provides the comprehensive Dataverse functionality that was missing and would be expected from a dedicated Dataverse MCP tool, while maintaining integration with the existing Power Platform toolset.