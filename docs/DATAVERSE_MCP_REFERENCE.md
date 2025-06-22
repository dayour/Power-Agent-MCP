# Power Agent MCP - Dataverse Operations Reference

> Complete reference for comprehensive Dataverse operations and management through Power Agent MCP. These tools provide direct access to Microsoft Dataverse functionality for entity management, data operations, security, and advanced query capabilities.

## 🚀 Overview

The Dataverse tools (`pp_dv_*`) provide comprehensive functionality for working with Microsoft Dataverse, including:
- **Entity Management**: Create, delete, and manage custom tables
- **Column Management**: Add and configure table columns/attributes
- **Record Operations**: CRUD operations on data records
- **Query Operations**: Execute FetchXML and OData queries
- **Bulk Operations**: Import and export large datasets
- **Security Management**: Roles, permissions, and access control
- **Relationship Management**: Configure table relationships
- **Choice Management**: Create and manage picklists/choice sets
- **Business Logic**: Business rules and custom logic
- **Web API Access**: Direct Web API operations

---

## 📊 Dataverse Entity Management (4 tools)

### Core Entity Operations

#### `pp_dv_entity_create`
Create a new custom entity/table in Dataverse.

**Parameters:**
- `entityName` (required): Name of the entity to create
- `displayName` (required): Display name for the entity
- `pluralName`: Plural display name for the entity
- `description`: Description of the entity
- `ownershipType`: Entity ownership type (`User`, `Organization`, `None`)
- `environment`: Target environment URL

**Example:**
```json
{
  "entityName": "custom_project",
  "displayName": "Project",
  "pluralName": "Projects",
  "description": "Project management entity",
  "ownershipType": "User"
}
```

#### `pp_dv_entity_delete`
Delete a custom entity/table from Dataverse.

**Parameters:**
- `entityName` (required): Name of the entity to delete
- `environment`: Target environment URL

#### `pp_dv_entity_list`
List entities/tables in Dataverse environment.

**Parameters:**
- `entityType`: Type of entities to list (`all`, `custom`, `system`)
- `environment`: Source environment URL

#### `pp_dv_entity_metadata`
Get detailed metadata for a Dataverse entity/table.

**Parameters:**
- `entityName` (required): Name of the entity to get metadata for
- `includeAttributes`: Include attribute metadata
- `includeRelationships`: Include relationship metadata
- `environment`: Source environment URL

---

## 🔧 Column/Attribute Management (3 tools)

### Column Operations

#### `pp_dv_column_create`
Create a new column/attribute in a Dataverse table.

**Parameters:**
- `entityName` (required): Name of the entity to add column to
- `columnName` (required): Name of the column to create
- `displayName` (required): Display name for the column
- `dataType` (required): Data type (`Text`, `Number`, `DateTime`, `Boolean`, `Choice`, `Lookup`, `Currency`, `Image`, `File`)
- `isRequired`: Whether the column is required
- `maxLength`: Maximum length for text columns
- `description`: Description of the column
- `environment`: Target environment URL

**Example:**
```json
{
  "entityName": "custom_project",
  "columnName": "project_status",
  "displayName": "Project Status",
  "dataType": "Choice",
  "isRequired": true,
  "description": "Current status of the project"
}
```

#### `pp_dv_column_delete`
Delete a column/attribute from a Dataverse table.

#### `pp_dv_column_list`
List columns/attributes for a Dataverse table.

---

## 📄 Record/Data Management (4 tools)

### Record Operations

#### `pp_dv_record_create`
Create a new record in a Dataverse table.

**Parameters:**
- `entityName` (required): Name of the entity to create record in
- `data` (required): Record data as key-value pairs
- `environment`: Target environment URL

**Example:**
```json
{
  "entityName": "custom_project",
  "data": {
    "name": "New Project",
    "project_status": 1,
    "description": "Project description"
  }
}
```

#### `pp_dv_record_update`
Update an existing record in a Dataverse table.

#### `pp_dv_record_delete`
Delete a record from a Dataverse table.

#### `pp_dv_record_get`
Retrieve a specific record from a Dataverse table.

---

## 🔍 Query Operations (2 tools)

### Advanced Querying

#### `pp_dv_query_fetchxml`
Execute a FetchXML query against Dataverse.

**Parameters:**
- `fetchXml` (required): FetchXML query to execute
- `outputFile`: Output file path for query results
- `environment`: Source environment URL

**Example:**
```json
{
  "fetchXml": "<fetch><entity name='account'><attribute name='name'/><filter><condition attribute='statecode' operator='eq' value='0'/></filter></entity></fetch>",
  "outputFile": "active_accounts.json"
}
```

#### `pp_dv_query_odata`
Execute an OData query against Dataverse Web API.

**Parameters:**
- `entityName` (required): Name of the entity to query
- `filter`: OData filter expression
- `select`: OData select clause
- `orderBy`: OData orderby clause
- `top`: Number of records to return
- `outputFile`: Output file path for query results
- `environment`: Source environment URL

**Example:**
```json
{
  "entityName": "accounts",
  "filter": "statecode eq 0",
  "select": "name,accountnumber,createdon",
  "orderBy": "createdon desc",
  "top": 100
}
```

---

## 📦 Bulk Operations (2 tools)

### Data Import/Export

#### `pp_dv_bulk_import`
Import records in bulk to Dataverse using CSV or JSON.

**Parameters:**
- `entityName` (required): Name of the entity to import records to
- `dataFile` (required): Path to data file (CSV or JSON)
- `mappingFile`: Path to column mapping file
- `batchSize`: Number of records per batch
- `environment`: Target environment URL

#### `pp_dv_bulk_export`
Export records in bulk from Dataverse to CSV or JSON.

**Parameters:**
- `entityName` (required): Name of the entity to export records from
- `outputFile` (required): Output file path
- `filter`: Filter criteria for export
- `columns`: Specific columns to export
- `format`: Export format (`csv`, `json`, `xml`)
- `environment`: Source environment URL

---

## 🔗 Relationship Management (2 tools)

### Entity Relationships

#### `pp_dv_relationship_create`
Create a relationship between Dataverse tables.

**Parameters:**
- `primaryEntity` (required): Primary entity name
- `relatedEntity` (required): Related entity name
- `relationshipType` (required): Type of relationship (`OneToMany`, `ManyToMany`, `ManyToOne`)
- `relationshipName`: Name for the relationship
- `lookupColumnName`: Name for the lookup column (for OneToMany)
- `environment`: Target environment URL

#### `pp_dv_relationship_list`
List relationships for a Dataverse table.

---

## 🎛️ Choice/Picklist Management (2 tools)

### Choice Sets

#### `pp_dv_choice_create`
Create a new choice (picklist) in Dataverse.

**Parameters:**
- `choiceName` (required): Name of the choice to create
- `displayName` (required): Display name for the choice
- `options` (required): Choice options with values and labels
- `isGlobal`: Whether the choice is global
- `environment`: Target environment URL

**Example:**
```json
{
  "choiceName": "project_status",
  "displayName": "Project Status",
  "options": [
    {"value": 1, "label": "Planning"},
    {"value": 2, "label": "In Progress"},
    {"value": 3, "label": "Completed"}
  ],
  "isGlobal": true
}
```

#### `pp_dv_choice_list`
List choices (picklists) in Dataverse environment.

---

## 🔐 Security Management (2 tools)

### Security Roles and Permissions

#### `pp_dv_security_role_create`
Create a new security role in Dataverse.

**Parameters:**
- `roleName` (required): Name of the security role
- `copyFromRole`: Existing role to copy permissions from
- `description`: Description of the security role
- `environment`: Target environment URL

#### `pp_dv_security_role_assign`
Assign a security role to a user or team.

**Parameters:**
- `roleName` (required): Name of the security role
- `principalType` (required): Type of principal (`User`, `Team`)
- `principalId` (required): ID of the user or team
- `environment`: Target environment URL

---

## 📋 Business Process Management (1 tool)

### Business Logic

#### `pp_dv_business_rule_create`
Create a business rule for a Dataverse table.

**Parameters:**
- `entityName` (required): Name of the entity to create business rule for
- `ruleName` (required): Name of the business rule
- `ruleDefinition` (required): Business rule definition (conditions and actions)
- `scope`: Scope of the business rule (`Entity`, `AllForms`, `SpecificForm`)
- `environment`: Target environment URL

---

## 🌐 Web API Operations (1 tool)

### Direct API Access

#### `pp_dv_webapi_execute`
Execute a custom Web API request against Dataverse.

**Parameters:**
- `method` (required): HTTP method (`GET`, `POST`, `PATCH`, `DELETE`, `PUT`)
- `endpoint` (required): Web API endpoint (relative to base URL)
- `headers`: Additional headers for the request
- `body`: Request body for POST/PATCH requests
- `outputFile`: Output file path for response
- `environment`: Target environment URL

**Example:**
```json
{
  "method": "GET",
  "endpoint": "accounts?$select=name,accountnumber&$top=10",
  "headers": {
    "Content-Type": "application/json"
  }
}
```

---

## ❓ Help and Documentation (1 tool)

### Help System

#### `pp_dv_help`
Show help for Dataverse commands and operations.

**Parameters:**
- `topic`: Specific help topic (`entities`, `columns`, `records`, `queries`, `security`, `relationships`, `bulk`, `webapi`)

---

## 🎯 Common Workflows

### 1. Entity Setup Workflow
```bash
# Create a new entity
pp_dv_entity_create --entityName "custom_project" --displayName "Project"

# Add columns to the entity
pp_dv_column_create --entityName "custom_project" --columnName "status" --dataType "Choice"

# Create a choice for the status column
pp_dv_choice_create --choiceName "project_status" --options '[{"value":1,"label":"Active"}]'
```

### 2. Data Management Workflow
```bash
# Import bulk data
pp_dv_bulk_import --entityName "custom_project" --dataFile "projects.csv"

# Query data with OData
pp_dv_query_odata --entityName "custom_projects" --filter "statecode eq 0"

# Export filtered data
pp_dv_bulk_export --entityName "custom_projects" --filter "status eq 1" --format "json"
```

### 3. Security Configuration
```bash
# Create a security role
pp_dv_security_role_create --roleName "ProjectManager" --description "Project management role"

# Assign role to user
pp_dv_security_role_assign --roleName "ProjectManager" --principalType "User" --principalId "user-guid"
```

---

## 🔧 Integration Examples

### With Power Automate
- Use `pp_dv_record_create` to create records from automated workflows
- Use `pp_dv_query_odata` to retrieve data for flow processing

### With Power Apps
- Use `pp_dv_entity_create` to set up backend tables for apps
- Use `pp_dv_column_create` to add fields needed by app forms

### With Power BI
- Use `pp_dv_bulk_export` to extract data for reporting
- Use `pp_dv_query_fetchxml` for complex data aggregations

---

## 📚 Authentication and Environment

All Dataverse tools inherit authentication from the current Power Platform context. Ensure you have:
- Valid Power Platform credentials configured
- Appropriate permissions in the target Dataverse environment
- System Administrator or System Customizer role for schema operations

## 🛠️ Error Handling

Common error scenarios:
- **Authentication failures**: Ensure valid credentials and permissions
- **Entity not found**: Verify entity names and environment
- **Insufficient privileges**: Check security roles and permissions
- **Validation errors**: Review required parameters and data formats

---

**Total: 25 Dataverse Tools** providing comprehensive coverage of Microsoft Dataverse operations through natural language AI interfaces.