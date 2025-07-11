#!/usr/bin/env pwsh
# Power Agent MCP - Complete Deployment Script
# Deploys to both VSCode Marketplace and NuGet

param(
    [string]$Version = "1.0.0",
    [switch]$DryRun = $false,
    [switch]$SkipBuild = $false,
    [switch]$OnlyVSCode = $false,
    [switch]$OnlyNuGet = $false
)

$ErrorActionPreference = "Stop"

Write-Host "🚀 Power Agent MCP Deployment Script" -ForegroundColor Green
Write-Host "Version: $Version" -ForegroundColor Cyan
Write-Host "Dry Run: $DryRun" -ForegroundColor Cyan

# Validate environment
Write-Host "📋 Validating environment..." -ForegroundColor Yellow

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    throw "Node.js is required but not found in PATH"
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    throw "npm is required but not found in PATH"
}

if (-not $OnlyNuGet) {
    if (-not (Get-Command vsce -ErrorAction SilentlyContinue)) {
        Write-Host "Installing VSCE..." -ForegroundColor Yellow
        npm install -g vsce
    }

    if (-not $env:VSCE_PAT) {
        throw "VSCE_PAT environment variable is required for VSCode publishing"
    }
}

if (-not $OnlyVSCode) {
    if (-not (Get-Command nuget -ErrorAction SilentlyContinue)) {
        throw "NuGet CLI is required but not found in PATH"
    }

    if (-not $env:NUGET_API_KEY) {
        throw "NUGET_API_KEY environment variable is required for NuGet publishing"
    }
}

# Build project
if (-not $SkipBuild) {
    Write-Host "🔨 Building project..." -ForegroundColor Yellow
    npm install
    npm run build
    npm test
    Write-Host "✅ Build completed successfully" -ForegroundColor Green
}

# Deploy VSCode Extension
if (-not $OnlyNuGet) {
    Write-Host "📦 Deploying VSCode Extension..." -ForegroundColor Yellow

    Push-Location "vscode-extension"
    try {
        # Update version in package.json
        $packageJson = Get-Content "package.json" | ConvertFrom-Json
        $packageJson.version = $Version
        $packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json"

        # Package extension
        if ($DryRun) {
            Write-Host "🧪 [DRY RUN] Would package extension with: vsce package" -ForegroundColor Cyan
        } else {
            vsce package
            $vsixFile = Get-ChildItem "*.vsix" | Select-Object -First 1
            Write-Host "📦 Created: $($vsixFile.Name)" -ForegroundColor Green

            # Publish to marketplace
            Write-Host "🚀 Publishing to VSCode Marketplace..." -ForegroundColor Yellow
            vsce publish --pat $env:VSCE_PAT
            Write-Host "✅ VSCode Extension published successfully!" -ForegroundColor Green
        }
    }
    finally {
        Pop-Location
    }
}

# Deploy NuGet Package
if (-not $OnlyVSCode) {
    Write-Host "📦 Deploying NuGet Package..." -ForegroundColor Yellow

    Push-Location "nuget-package"
    try {
        # Update version in nuspec
        [xml]$nuspecXml = Get-Content "DarBotLabs.PowerAgent.MCP.nuspec"
        $nuspecXml.package.metadata.version = $Version
        $nuspecXml.Save("DarBotLabs.PowerAgent.MCP.nuspec")

        # Build package
        if ($DryRun) {
            Write-Host "🧪 [DRY RUN] Would build package with: nuget pack" -ForegroundColor Cyan
        } else {
            nuget pack DarBotLabs.PowerAgent.MCP.nuspec
            $nupkgFile = Get-ChildItem "*.nupkg" | Select-Object -First 1
            Write-Host "📦 Created: $($nupkgFile.Name)" -ForegroundColor Green

            # Publish to NuGet
            Write-Host "🚀 Publishing to NuGet.org..." -ForegroundColor Yellow
            nuget push $nupkgFile.Name -ApiKey $env:NUGET_API_KEY -Source https://api.nuget.org/v3/index.json
            Write-Host "✅ NuGet Package published successfully!" -ForegroundColor Green
        }
    }
    finally {
        Pop-Location
    }
}

# Create GitHub Release
if (-not $DryRun) {
    Write-Host "🏷️ Creating GitHub Release..." -ForegroundColor Yellow

    $releaseNotes = @"
# Power Agent MCP v$Version

## 🚀 What's New

- Complete Enterprise AI SDK for Microsoft Power Platform
- 254 specialized tools covering Power Platform, Dataverse, SQL Server, and Adaptive Cards
- Production-ready deployment with VSCode Marketplace and NuGet packages
- Comprehensive documentation and examples

## 📦 Packages

- **VSCode Extension**: Search for "Power Agent MCP" by DarBot Labs
- **NuGet Package**: ``DarBotLabs.PowerAgent.MCP`` v$Version

## 🔗 Resources

- [Complete Setup Guide](docs/MCP_CONNECTOR_SETUP.md)
- [API Reference](power-mcp.md)
- [Usage Examples](docs/MCP_USAGE_EXAMPLES.md)
- [Production Deployment](docs/PRODUCTION_DEPLOYMENT_CHECKLIST.md)
"@

    $releaseNotes | Set-Content "RELEASE_NOTES.md"

    Write-Host "✅ Release notes created: RELEASE_NOTES.md" -ForegroundColor Green
    Write-Host "👉 Create GitHub release manually with these notes" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 Deployment completed successfully!" -ForegroundColor Green
Write-Host ""

if (-not $OnlyNuGet) {
    Write-Host "📱 VSCode Extension:" -ForegroundColor Cyan
    Write-Host "   Search 'Power Agent MCP' in VSCode Extensions" -ForegroundColor White
}

if (-not $OnlyVSCode) {
    Write-Host "📦 NuGet Package:" -ForegroundColor Cyan
    Write-Host "   Install-Package DarBotLabs.PowerAgent.MCP" -ForegroundColor White
}

Write-Host ""
Write-Host "🌟 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Update project README with published package links" -ForegroundColor White
Write-Host "   2. Create GitHub release with generated notes" -ForegroundColor White
Write-Host "   3. Announce on relevant developer communities" -ForegroundColor White
Write-Host "   4. Monitor download metrics and user feedback" -ForegroundColor White
