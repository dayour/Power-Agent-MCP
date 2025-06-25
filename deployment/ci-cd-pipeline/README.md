# CI/CD Pipeline Documentation

This directory contains Continuous Integration and Continuous Deployment configurations for Power Agent MCP.

## Pipeline Overview

Our CI/CD pipeline supports multiple deployment targets and ensures quality through automated testing and validation.

### Pipeline Stages

1. **Continuous Integration (CI)**
   - Code quality checks (linting, formatting)
   - Unit and integration testing
   - Security scanning
   - Build artifact creation

2. **Package Creation**
   - VSCode extension packaging (.vsix)
   - NuGet package creation (.nupkg)
   - Documentation generation
   - Asset validation

3. **Release Management**
   - Automated release creation
   - Version tagging and changelog
   - Release notes generation
   - Asset publication

4. **Deployment**
   - Production environment deployment
   - Health checks and validation
   - Rollback procedures
   - Monitoring setup

## Pipeline Configurations

### GitHub Actions (`github-actions.yml`)
- Primary CI/CD pipeline for GitHub repository
- Supports multiple environments (development, staging, production)
- Automated testing and security scanning
- Package creation and marketplace publication

### Azure DevOps (`azure-pipelines.yml`)
- Enterprise-grade pipeline for Azure environments
- Integration with Azure Key Vault for secrets
- Advanced deployment strategies
- Comprehensive monitoring and alerting

### Jenkins (`Jenkinsfile`)
- Self-hosted Jenkins pipeline configuration
- Customizable for on-premises deployments
- Integration with enterprise tools
- Advanced approval workflows

## Environment Configuration

### Development Environment
- Automatic builds on PR creation
- Comprehensive testing suite
- Code quality gates
- Security vulnerability scanning

### Staging Environment
- Release candidate validation
- Integration testing with external services
- Performance testing
- User acceptance testing preparation

### Production Environment
- Blue-green deployment strategy
- Health checks and monitoring
- Automated rollback on failure
- Performance monitoring and alerting

## Secrets and Configuration

### Required Secrets
```
VSCE_PAT                    # VSCode Marketplace publishing token
NUGET_API_KEY              # NuGet.org API key
POWERPLATFORM_TENANT_ID    # Azure tenant ID for testing
POWERPLATFORM_APP_ID       # Service principal application ID
POWERPLATFORM_CLIENT_SECRET # Service principal secret
PRODUCTION_SSH_KEY         # Production server access key
MONITORING_WEBHOOK         # Monitoring system webhook URL
```

### Environment Variables
```
NODE_VERSION=20            # Node.js version for builds
DOTNET_VERSION=8.0        # .NET version for NuGet packages
BUILD_ENVIRONMENT=production # Target deployment environment
ENABLE_TELEMETRY=true     # Enable build telemetry
```

## Deployment Strategies

### Rolling Deployment
- Gradual replacement of instances
- Zero-downtime deployment
- Automatic traffic shifting
- Health-based progression

### Blue-Green Deployment  
- Complete environment switching
- Instant rollback capability
- Full validation before switch
- Minimal service disruption

### Canary Deployment
- Gradual traffic shifting
- Risk mitigation through monitoring
- A/B testing capabilities
- Performance comparison

## Quality Gates

### Code Quality
- TypeScript compilation without errors
- ESLint rules compliance
- Unit test coverage >80%
- Integration test success

### Security
- Dependency vulnerability scanning
- SAST (Static Application Security Testing)
- Secret detection and prevention
- License compliance checking

### Performance
- Build time optimization
- Package size validation
- Runtime performance testing
- Memory usage analysis

## Monitoring and Alerting

### Build Monitoring
- Build success/failure rates
- Build duration tracking
- Resource usage monitoring
- Trend analysis and optimization

### Deployment Monitoring
- Deployment frequency tracking
- Success rate monitoring
- Rollback frequency analysis
- Lead time measurement

### Application Monitoring
- MCP server health checks
- Tool execution monitoring
- Error rate tracking
- Performance metrics

## Troubleshooting

### Common Pipeline Issues

1. **Build Failures**
   ```bash
   # Check build logs
   gh run view --log
   
   # Local reproduction
   npm ci && npm run build
   ```

2. **Test Failures**
   ```bash
   # Run specific test suite
   npm test -- --grep "specific test"
   
   # Debug test execution
   npm test -- --inspect-brk
   ```

3. **Deployment Issues**
   ```bash
   # Check deployment logs
   kubectl logs deployment/power-agent-mcp
   
   # Verify service health
   curl http://service-url/health
   ```

### Pipeline Debugging

1. **Enable Debug Logging**
   ```yaml
   env:
     ACTIONS_STEP_DEBUG: true
     ACTIONS_RUNNER_DEBUG: true
   ```

2. **SSH into Runner**
   ```yaml
   - name: Debug via SSH
     uses: mxschmitt/action-tmate@v3
     if: failure()
   ```

3. **Artifact Analysis**
   ```bash
   # Download and inspect artifacts
   gh run download <run-id>
   unzip artifacts.zip
   ```

## Performance Optimization

### Build Performance
- Dependency caching strategies
- Parallel job execution
- Incremental builds
- Resource allocation optimization

### Deployment Performance
- Container image optimization
- Deployment parallelization
- Health check tuning
- Resource scaling strategies

## Security Best Practices

### Secret Management
- Use managed identity where possible
- Rotate secrets regularly
- Limit secret scope and permissions
- Audit secret usage

### Access Control
- Principle of least privilege
- Branch protection rules
- Required reviewers for sensitive changes
- Audit trail maintenance

### Compliance
- SOC 2 compliance considerations
- GDPR data handling requirements
- Industry-specific regulations
- Security framework adherence

## Maintenance

### Regular Tasks
- Update pipeline dependencies monthly
- Review and rotate secrets quarterly
- Performance analysis and optimization
- Security scanning and updates

### Upgrade Procedures
- Test upgrades in development first
- Gradual rollout to production
- Rollback plan preparation
- Documentation updates

## Support

### Documentation
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Azure DevOps Pipelines](https://docs.microsoft.com/en-us/azure/devops/pipelines)
- [Jenkins Pipeline](https://www.jenkins.io/doc/book/pipeline/)

### Community
- [GitHub Discussions](https://github.com/dayour/Power-Agent-MCP/discussions)
- [Issues and Bug Reports](https://github.com/dayour/Power-Agent-MCP/issues)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/power-platform-mcp)