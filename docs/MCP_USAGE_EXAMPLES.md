# Power Agent MCP Usage Examples

This document provides practical examples of how to use Power Agent MCP tools with AI assistants like Claude.

## Getting Started

Once you have configured the MCP connector (see [MCP_CONNECTOR_SETUP.md](MCP_CONNECTOR_SETUP.md)), you can start using natural language to interact with Power Platform environments.

## Basic Operations

### Environment Management

#### Create a Development Environment
```
"I need to create a new development environment called 'AI Dev Team' in the US region with USD currency and English language settings."
```

#### Backup Production Environment
```
"Please create a backup of our production environment with the label 'Monthly-Backup-2024-12' and add notes about this being our December backup."
```

#### Copy Environment for Testing
```
"Copy our production environment to create a new sandbox environment for UAT testing. Skip the audit data to speed up the process."
```

### Solution Management

#### Export Solution for Source Control
```
"Export the 'CustomerPortal' solution as an unmanaged solution to './solutions/CustomerPortal_v1.2.zip' with all customization settings included."
```

#### Import Solution with Upgrade
```
"Import the solution from './builds/CustomerPortal_v1.3.zip' and stage it for upgrade. Publish all workflows after the import completes."
```

#### Pack Solution from Source Control
```
"Pack the solution from the './src/solutions/CustomerPortal' folder into './dist/CustomerPortal.zip' and process any Canvas apps during packaging."
```

### Quality Assurance

#### Run Solution Checker
```
"Run the PowerApps solution checker on './solutions/CustomerPortal.zip' using the AppSource Certification ruleset and save results to './reports/checker-results.json'."
```

## Advanced Workflows

### Complete CI/CD Pipeline

#### Development to Production Pipeline
```
"I need to implement a complete CI/CD pipeline:

1. First, create a backup of production with label 'Pre-Release-v1.3'
2. Then create a new integration test environment called 'Release-Test-v1.3' 
3. Import the solution from './builds/CustomerPortal_v1.3.zip' to the test environment
4. Run solution checker analysis with high-level issues only
5. If checker passes, set the solution version to '1.3.0.0'
6. Export the solution as managed for production deployment
7. Save the managed solution to './release/CustomerPortal_v1.3_managed.zip'"
```

#### Multi-Environment Promotion
```
"Help me promote our solution through environments:

1. Copy our development environment to create 'UAT-Environment-Dec2024'
2. Import the latest solution from './builds/latest/solution.zip' 
3. Run automated testing by exporting configuration data to verify integrity
4. If successful, apply solution upgrade to prepare for production
5. Assign the 'Power Platform Administrator' role to our UAT team lead
6. Publish all customizations to activate the changes"
```

### Data Management Workflows

#### Configuration Data Migration
```
"I need to migrate configuration data between environments:

1. Export all configuration data from production using schema './config/data-schema.xml'
2. Save the exported data to './backups/prod-config-2024-12.zip'
3. Import this configuration data to our UAT environment
4. Verify the import by checking connection variables are properly set"
```

### Governance and Security

#### Environment Security Setup
```
"Configure security and governance for our new environment:

1. Set connection variables from './config/dev-connection-vars.json'
2. Apply governance configuration from './policies/dev-governance.json'  
3. Assign 'System Administrator' role to 'admin@ourcompany.com'
4. Assign 'Environment Maker' role to the Azure AD group 'DevTeam-PowerPlatform'
5. Update organization settings from './config/org-settings.json'
6. Publish all customizations to activate the security changes"
```

### Portal Development

#### Portal Deployment Workflow
```
"Deploy our updated portal:

1. Download the current portal (website ID: 'customer-portal-001') to './portal-backup/' for backup
2. Upload our new portal files from './portal-src/' using the 'Production' deployment profile
3. Verify the deployment by checking if customizations need to be published"
```

### Application Lifecycle

#### Deploy Application Package
```
"Deploy our business application package:

1. First install the required Dynamics 365 Sales application from the catalog
2. Deploy our custom package from './packages/BusinessApp_v2.1.zip' 
3. Use the deployment settings from './config/prod-deployment-settings.json'
4. Monitor the deployment status and confirm successful installation"
```

#### Catalog Submission
```
"Submit our solution to the internal catalog:

1. Submit the catalog package using submission file './catalog/submission-manifest.json'
2. Include the solution zip './solutions/BusinessApp_managed.zip'
3. Poll the submission status until completion
4. Provide status updates throughout the process"
```

## Monitoring and Diagnostics

### Authentication and Connection Testing
```
"Validate our Power Platform connection and show current authentication status using the whoami command."
```

### Tool Installation and Setup
```
"Install and configure the Power Platform CLI tools, and add them to the system PATH for easier access."
```

### Catalog Status Monitoring
```
"Check the status of our catalog submission with ID 'sub-12345-2024' and provide detailed status information."
```

## Error Handling Examples

### Retry Operations
```
"The solution import failed due to a network timeout. Please retry the import of './solutions/CustomerPortal.zip' using async mode with a longer timeout of 30 minutes."
```

### Rollback Scenarios
```
"Our production deployment failed. Please:

1. Restore the production environment from the backup 'Pre-Release-v1.3'
2. Verify the restore completed successfully with whoami
3. Export the current solution version to confirm we're back to the previous state"
```

## Best Practices Examples

### Version Management
```
"Before deploying to production:

1. Set the solution version to '2.1.0.0' using semantic versioning
2. Export both managed and unmanaged versions
3. Save managed version to './releases/v2.1.0/' for production
4. Save unmanaged version to './development/v2.1.0/' for future development"
```

### Environment Hygiene
```
"Clean up our development environment:

1. Delete any test solutions that are no longer needed
2. Reset the environment to clean state if required
3. Reinstall our base applications from the catalog
4. Apply fresh governance configuration
5. Set up clean connection variables for development"
```

### Backup and Recovery
```
"Implement our monthly backup routine:

1. Create backup of production environment with label 'Monthly-{current-date}'
2. Export all solutions as managed packages to './monthly-backups/{date}/'
3. Export configuration data with full schema to './data-backups/{date}/'
4. Verify all exports completed successfully"
```

## Integration with Development Workflows

### Git Integration Workflow
```
"Prepare solution for source control:

1. Unpack the solution from './builds/feature-branch.zip' to './src/solutions/CustomerPortal'
2. Run solution checker to ensure code quality
3. If checker passes, the files are ready for git commit
4. Pack the solution back for deployment testing"
```

### Automated Testing Integration
```
"Run our automated quality pipeline:

1. Pack the solution from source control './src/solutions/CustomerPortal'
2. Run solution checker with 'Solution Checker' ruleset
3. Import to test environment for functional testing
4. Export configuration data to verify data integrity
5. If all tests pass, promote to staging environment"
```

## Tips for Effective Usage

### Use Descriptive Names
Always use clear, descriptive names for environments, solutions, and files.

### Specify Full Paths
Always provide complete file paths to avoid ambiguity.

### Combine Related Operations
Group related operations together for efficiency.

### Check Status Frequently
Use whoami and status commands to verify operations completed successfully.

### Plan for Rollback
Always create backups before major changes.

These examples demonstrate the power and flexibility of using natural language to manage complex Power Platform operations through the MCP interface.