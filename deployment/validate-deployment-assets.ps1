#!/usr/bin/env pwsh
# Power Agent MCP - Deployment Asset Validator
# Validates all deployment assets are present and properly configured

param(
    [switch]$Verbose = $false
)

$ErrorActionPreference = "Continue"
$deploymentRoot = "$PSScriptRoot"
$iconPackagePath = "$deploymentRoot\power_agent_mcp_icon_package"

Write-Host "🔍 Power Agent MCP - Deployment Asset Validation" -ForegroundColor Cyan
Write-Host "=" * 60

# Check if icon package exists
if (-not (Test-Path $iconPackagePath)) {
    Write-Host "❌ Icon package not found at: $iconPackagePath" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Icon package found" -ForegroundColor Green

# Validate VSCode Extension Assets
Write-Host "`n📦 Validating VSCode Extension Assets..." -ForegroundColor Yellow

$vscodeAssetPath = "$deploymentRoot\vscode-extension\assets"
$requiredVSCodeAssets = @(
    "icon.png",
    "banner.png",
    "logo-large.png"
)

$vscodeValid = $true
foreach ($asset in $requiredVSCodeAssets) {
    $assetPath = "$vscodeAssetPath\$asset"
    if (Test-Path $assetPath) {
        Write-Host "  ✅ $asset" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Missing: $asset" -ForegroundColor Red
        $vscodeValid = $false
    }
}

# Validate NuGet Package Assets
Write-Host "`n📦 Validating NuGet Package Assets..." -ForegroundColor Yellow

$nugetAssetPath = "$deploymentRoot\nuget-package\assets"
$requiredNuGetAssets = @(
    "icon.png",
    "icon.ico"
)

$nugetValid = $true
foreach ($asset in $requiredNuGetAssets) {
    $assetPath = "$nugetAssetPath\$asset"
    if (Test-Path $assetPath) {
        Write-Host "  ✅ $asset" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Missing: $asset" -ForegroundColor Red
        $nugetValid = $false
    }
}

# Validate Marketing Assets
Write-Host "`n📦 Validating Marketing Assets..." -ForegroundColor Yellow

$marketingAssetPath = "$deploymentRoot\marketing-assets"
$requiredMarketingAssets = @(
    "mcp_icon_128x128.png",
    "mcp_icon_256x256.png",
    "mcp_store_150x150.png",
    "mcp_teams_192x192.png",
    "mcp_vscode_128x128.png"
)

$marketingValid = $true
foreach ($asset in $requiredMarketingAssets) {
    $assetPath = "$marketingAssetPath\$asset"
    if (Test-Path $assetPath) {
        Write-Host "  ✅ $asset" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Missing: $asset" -ForegroundColor Red
        $marketingValid = $false
    }
}

# Validate Configuration Files
Write-Host "`n📋 Validating Configuration Files..." -ForegroundColor Yellow

$configFiles = @{
    "VSCode package.json" = "$deploymentRoot\vscode-extension\package.json"
    "NuGet .nuspec" = "$deploymentRoot\nuget-package\DarBotLabs.PowerAgent.MCP.nuspec"
    "Deploy script" = "$deploymentRoot\production-setup\deploy-production.sh"
    "CI/CD pipeline" = "$deploymentRoot\ci-cd-pipeline\github-actions.yml"
}

$configValid = $true
foreach ($configName in $configFiles.Keys) {
    $configPath = $configFiles[$configName]
    if (Test-Path $configPath) {
        Write-Host "  ✅ $configName" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Missing: $configName" -ForegroundColor Red
        $configValid = $false
    }
}

# Summary
Write-Host "`n📊 Validation Summary" -ForegroundColor Cyan
Write-Host "=" * 30

if ($vscodeValid -and $nugetValid -and $marketingValid -and $configValid) {
    Write-Host "🎉 All deployment assets are present and ready!" -ForegroundColor Green
    Write-Host "✅ VSCode Extension: Ready" -ForegroundColor Green
    Write-Host "✅ NuGet Package: Ready" -ForegroundColor Green
    Write-Host "✅ Marketing Assets: Ready" -ForegroundColor Green
    Write-Host "✅ Configuration Files: Ready" -ForegroundColor Green
    exit 0
} else {
    Write-Host "⚠️  Some deployment assets are missing:" -ForegroundColor Yellow
    if (-not $vscodeValid) { Write-Host "❌ VSCode Extension assets incomplete" -ForegroundColor Red }
    if (-not $nugetValid) { Write-Host "❌ NuGet Package assets incomplete" -ForegroundColor Red }
    if (-not $marketingValid) { Write-Host "❌ Marketing assets incomplete" -ForegroundColor Red }
    if (-not $configValid) { Write-Host "❌ Configuration files incomplete" -ForegroundColor Red }

    Write-Host "`n💡 Run the setup script to fix missing assets:" -ForegroundColor Yellow
    Write-Host "   .\setup-deployment-assets.ps1" -ForegroundColor White
    exit 1
}
