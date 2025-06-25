# NuGet Package Publishing Guide

This guide covers the complete process for publishing Power Agent MCP to NuGet.org under the @darbotlabs namespace.

## Prerequisites

### 1. NuGet Account Setup
- [ ] Create NuGet.org account for DarBot Labs organization
- [ ] Verify account with email confirmation
- [ ] Generate API key for automated publishing
- [ ] Configure organization permissions

### 2. Development Environment
- [ ] .NET SDK 6.0+ installed
- [ ] NuGet CLI tools available
- [ ] PowerShell 5.1+ or PowerShell Core
- [ ] Git repository access

## Package Structure

### Package Components
```
DarBotLabs.PowerAgent.MCP/
├── tools/
│   ├── net6.0/          # .NET 6.0 binaries
│   ├── net8.0/          # .NET 8.0 binaries
│   ├── mcp/             # Node.js MCP server
│   ├── Install.ps1      # Installation script
│   └── Uninstall.ps1    # Cleanup script
├── content/
│   ├── config/          # Configuration templates
│   ├── docs/            # Documentation
│   └── assets/          # Images and resources
└── DarBotLabs.PowerAgent.MCP.nuspec
```

## Publishing Process

### Step 1: Account Setup

1. **Create NuGet Account**
   - Visit [NuGet.org](https://www.nuget.org/)
   - Register with darbotlabs organization email
   - Verify email address

2. **Generate API Key**
   ```powershell
   # Login to NuGet.org and navigate to API Keys
   # Create new API key with push permissions
   # Scope: Push new packages and package versions
   # Pattern: DarBotLabs.*
   ```

3. **Configure Local Environment**
   ```powershell
   # Set API key globally
   nuget setApiKey <your-api-key>
   
   # Or set for specific source
   nuget setApiKey <your-api-key> -Source https://api.nuget.org/v3/index.json
   ```

### Step 2: Package Preparation

1. **Build Project**
   ```powershell
   cd deployment/nuget-package
   
   # Restore dependencies
   dotnet restore
   
   # Build for multiple targets
   dotnet build -c Release -f net6.0
   dotnet build -c Release -f net8.0
   ```

2. **Prepare MCP Server**
   ```powershell
   # Build Node.js MCP server
   cd ../../
   npm install
   npm run build
   
   # Copy built server to package
   cp -r dist/mcp deployment/nuget-package/tools/
   ```

3. **Create Package**
   ```powershell
   cd deployment/nuget-package
   
   # Pack using nuspec
   nuget pack DarBotLabs.PowerAgent.MCP.nuspec
   
   # Or pack using project file (if available)
   dotnet pack -c Release
   ```

### Step 3: Package Validation

1. **Local Testing**
   ```powershell
   # Install package locally for testing
   nuget install DarBotLabs.PowerAgent.MCP -Source ./
   
   # Test installation scripts
   PowerShell -ExecutionPolicy Bypass -File tools/Install.ps1
   ```

2. **Package Analysis**
   ```powershell
   # Analyze package contents
   nuget verify DarBotLabs.PowerAgent.MCP.1.0.0.nupkg
   
   # Check dependencies
   nuget list DarBotLabs.PowerAgent.MCP -AllVersions
   ```

### Step 4: Publication

1. **Initial Upload**
   ```powershell
   # Push to NuGet.org
   nuget push DarBotLabs.PowerAgent.MCP.1.0.0.nupkg -Source https://api.nuget.org/v3/index.json
   
   # Verify publication
   nuget list DarBotLabs.PowerAgent.MCP -Source https://api.nuget.org/v3/index.json
   ```

2. **Package Listing Configuration**
   - Update package description on NuGet.org
   - Add project URL and documentation links
   - Configure license and copyright information
   - Add relevant tags for discoverability

### Step 5: Post-Publication

1. **Verification**
   - [ ] Package appears in NuGet search results
   - [ ] Installation works via Package Manager
   - [ ] All dependencies resolve correctly
   - [ ] Documentation links are accessible

2. **Monitoring Setup**
   - [ ] Download analytics enabled
   - [ ] Security scanning configured
   - [ ] Deprecation policies established
   - [ ] Support channels documented

## Installation Scripts

### Install.ps1
```powershell
param($installPath, $toolsPath, $package, $project)

Write-Host "Installing Power Agent MCP..." -ForegroundColor Green

# Create configuration directory
$configPath = Join-Path $ENV:USERPROFILE ".power-agent-mcp"
if (!(Test-Path $configPath)) {
    New-Item -ItemType Directory -Path $configPath -Force
}

# Copy configuration templates
$templatePath = Join-Path $toolsPath "config"
if (Test-Path $templatePath) {
    Copy-Item "$templatePath\*" $configPath -Recurse -Force
}

# Register MCP server globally
$serverPath = Join-Path $toolsPath "mcp\server.js"
$registryPath = Join-Path $configPath "registry.json"

if (Test-Path $serverPath) {
    $registry = @{
        "power-agent-mcp" = @{
            "path" = $serverPath
            "version" = $package.Version
            "installed" = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
        }
    }
    $registry | ConvertTo-Json | Out-File $registryPath
    Write-Host "MCP server registered at: $serverPath" -ForegroundColor Yellow
}

Write-Host "Power Agent MCP installation complete!" -ForegroundColor Green
```

### Uninstall.ps1
```powershell
param($installPath, $toolsPath, $package, $project)

Write-Host "Uninstalling Power Agent MCP..." -ForegroundColor Yellow

# Remove configuration directory (optional)
$configPath = Join-Path $ENV:USERPROFILE ".power-agent-mcp"
if (Test-Path $configPath) {
    $response = Read-Host "Remove configuration files? (y/N)"
    if ($response -eq "y" -or $response -eq "Y") {
        Remove-Item $configPath -Recurse -Force
        Write-Host "Configuration files removed." -ForegroundColor Green
    }
}

Write-Host "Power Agent MCP uninstalled." -ForegroundColor Green
```

## Release Management

### Versioning Strategy
- **Major (X.0.0)**: Breaking changes, new architecture
- **Minor (X.Y.0)**: New features, tool additions
- **Patch (X.Y.Z)**: Bug fixes, security updates

### Release Process
```powershell
# Update version in nuspec file
# Update CHANGELOG.md
# Commit and tag release

# Build and publish
dotnet pack -c Release
nuget push *.nupkg

# Create GitHub release
git tag v1.0.0
git push origin v1.0.0
```

## Package Optimization

### Performance Considerations
- Minimize package size by excluding unnecessary files
- Use package references instead of assemblies where possible
- Optimize PowerShell scripts for fast execution
- Include only essential documentation in package

### Security Best Practices
- Sign packages with authenticode certificate
- Include security contact information
- Regular security scanning and updates
- Vulnerability disclosure process

## Troubleshooting

### Common Issues

1. **Package Upload Failures**
   ```powershell
   # Verify API key
   nuget push -ApiKey <key> -Source https://api.nuget.org/v3/index.json
   
   # Check package validation
   nuget verify *.nupkg
   ```

2. **Dependency Resolution**
   ```powershell
   # Clear local cache
   nuget locals all -clear
   
   # Restore packages
   dotnet restore --force
   ```

3. **Installation Script Errors**
   ```powershell
   # Test scripts manually
   PowerShell -ExecutionPolicy Bypass -File Install.ps1
   
   # Check execution policy
   Get-ExecutionPolicy
   ```

## Success Metrics

### Key Performance Indicators
- **Downloads**: Target 500+ in first month
- **Usage**: Active installations growing weekly
- **Stability**: <1% installation failure rate
- **Support**: Issues resolved within 48 hours

### Growth Targets
- Month 1: 500 downloads
- Month 3: 2,000 downloads
- Month 6: 5,000+ downloads
- Month 12: 10,000+ downloads