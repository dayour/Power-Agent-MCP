#!/usr/bin/env pwsh
# Power Agent MCP - Deployment Asset Setup
# Automatically sets up all deployment assets from the icon package

param(
    [switch]$Force = $false,
    [switch]$Verbose = $false
)

$ErrorActionPreference = "Stop"
$deploymentRoot = "$PSScriptRoot"
$iconPackagePath = "$deploymentRoot\power_agent_mcp_icon_package"

Write-Host "🚀 Power Agent MCP - Deployment Asset Setup" -ForegroundColor Cyan
Write-Host "=" * 60

# Verify icon package exists
if (-not (Test-Path $iconPackagePath)) {
    Write-Host "❌ Icon package not found at: $iconPackagePath" -ForegroundColor Red
    Write-Host "Please ensure the power_agent_mcp_icon_package folder exists in the deployment directory." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Icon package found" -ForegroundColor Green

# Setup VSCode Extension Assets
Write-Host "`n📦 Setting up VSCode Extension Assets..." -ForegroundColor Yellow

$vscodeAssetPath = "$deploymentRoot\vscode-extension\assets"
if (-not (Test-Path $vscodeAssetPath)) {
    New-Item -ItemType Directory -Path $vscodeAssetPath -Force | Out-Null
    Write-Host "  📁 Created assets directory" -ForegroundColor Green
}

# Copy VSCode-specific icons
$vscodeAssets = @{
    "$iconPackagePath\mcp_vscode_128x128.png" = "$vscodeAssetPath\icon.png"
    "$iconPackagePath\mcp_vscode_256x256.png" = "$vscodeAssetPath\banner.png"
    "$iconPackagePath\mcp_icon_1024x1024.png" = "$vscodeAssetPath\logo-large.png"
}

foreach ($source in $vscodeAssets.Keys) {
    $destination = $vscodeAssets[$source]
    if ((Test-Path $source) -and ($Force -or -not (Test-Path $destination))) {
        Copy-Item $source $destination -Force
        Write-Host "  ✅ Copied $(Split-Path $destination -Leaf)" -ForegroundColor Green
    } elseif (Test-Path $destination) {
        Write-Host "  ⏭️  $(Split-Path $destination -Leaf) already exists (use -Force to overwrite)" -ForegroundColor Yellow
    }
}

# Setup NuGet Package Assets
Write-Host "`n📦 Setting up NuGet Package Assets..." -ForegroundColor Yellow

$nugetAssetPath = "$deploymentRoot\nuget-package\assets"
if (-not (Test-Path $nugetAssetPath)) {
    New-Item -ItemType Directory -Path $nugetAssetPath -Force | Out-Null
    Write-Host "  📁 Created assets directory" -ForegroundColor Green
}

# Copy NuGet-specific icons
$nugetAssets = @{
    "$iconPackagePath\mcp_icon_128x128.png" = "$nugetAssetPath\icon.png"
    "$iconPackagePath\mcp_icon.ico" = "$nugetAssetPath\icon.ico"
}

foreach ($source in $nugetAssets.Keys) {
    $destination = $nugetAssets[$source]
    if ((Test-Path $source) -and ($Force -or -not (Test-Path $destination))) {
        Copy-Item $source $destination -Force
        Write-Host "  ✅ Copied $(Split-Path $destination -Leaf)" -ForegroundColor Green
    } elseif (Test-Path $destination) {
        Write-Host "  ⏭️  $(Split-Path $destination -Leaf) already exists (use -Force to overwrite)" -ForegroundColor Yellow
    }
}

# Setup Marketing Assets
Write-Host "`n📦 Setting up Marketing Assets..." -ForegroundColor Yellow

$marketingAssetPath = "$deploymentRoot\marketing-assets"
if (-not (Test-Path $marketingAssetPath)) {
    New-Item -ItemType Directory -Path $marketingAssetPath -Force | Out-Null
    Write-Host "  📁 Created marketing assets directory" -ForegroundColor Green
}

# Copy all marketing assets
if ($Force -or -not (Test-Path "$marketingAssetPath\mcp_icon_128x128.png")) {
    Copy-Item "$iconPackagePath\*" $marketingAssetPath -Recurse -Force
    Write-Host "  ✅ Copied all marketing assets" -ForegroundColor Green
} else {
    Write-Host "  ⏭️  Marketing assets already exist (use -Force to overwrite)" -ForegroundColor Yellow
}

# Create screenshots placeholder
Write-Host "`n📸 Setting up Screenshot Placeholders..." -ForegroundColor Yellow

$screenshotPath = "$vscodeAssetPath\screenshots"
if (-not (Test-Path $screenshotPath)) {
    New-Item -ItemType Directory -Path $screenshotPath -Force | Out-Null

    $screenshotReadme = @"
# Screenshots for VSCode Marketplace

Place your extension screenshots here for the VSCode marketplace listing.

## Required Screenshots:
1. **Main Interface** - Show the extension in action
2. **Command Palette** - Demonstrate available commands
3. **Power Platform Integration** - Show connection to Power Platform
4. **Results Output** - Display typical output/results

## Guidelines:
- Use 1280x720 or 1920x1080 resolution
- Keep files under 1MB each
- Use PNG format for best quality
- Show real usage scenarios

## File Naming:
- screenshot-1-main-interface.png
- screenshot-2-commands.png
- screenshot-3-integration.png
- screenshot-4-results.png
"@

    Set-Content -Path "$screenshotPath\README.md" -Value $screenshotReadme
    Write-Host "  📁 Created screenshots directory with guide" -ForegroundColor Green
}

# Validate setup
Write-Host "`n🔍 Validating Setup..." -ForegroundColor Yellow
& "$deploymentRoot\validate-deployment-assets.ps1"

Write-Host "`n🎉 Deployment Asset Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Add actual screenshots to: $screenshotPath" -ForegroundColor White
Write-Host "2. Update marketplace descriptions as needed" -ForegroundColor White
Write-Host "3. Run deployment validation: .\validate-deployment-assets.ps1" -ForegroundColor White
Write-Host "4. Proceed with marketplace submissions" -ForegroundColor White
