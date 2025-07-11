#!/usr/bin/env pwsh
# Power Agent MCP - Pre-Deployment Validation Script

param(
    [switch]$Verbose = $false
)

$ErrorActionPreference = "Stop"

Write-Host "🔍 Power Agent MCP - Pre-Deployment Validation" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

$validationResults = @{
    "passed" = 0
    "failed" = 0
    "warnings" = 0
}

function Test-Requirement {
    param(
        [string]$Name,
        [scriptblock]$Test,
        [string]$FailureMessage = "Failed",
        [switch]$Warning = $false
    )
    
    Write-Host "Testing: $Name" -ForegroundColor Yellow -NoNewline
    
    try {
        $result = & $Test
        if ($result) {
            Write-Host " ✅" -ForegroundColor Green
            $validationResults.passed++
            return $true
        } else {
            if ($Warning) {
                Write-Host " ⚠️  WARNING: $FailureMessage" -ForegroundColor Yellow
                $validationResults.warnings++
                return $false
            } else {
                Write-Host " ❌ FAILED: $FailureMessage" -ForegroundColor Red
                $validationResults.failed++
                return $false
            }
        }
    }
    catch {
        if ($Warning) {
            Write-Host " ⚠️  WARNING: $($_.Exception.Message)" -ForegroundColor Yellow
            $validationResults.warnings++
            return $false
        } else {
            Write-Host " ❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
            $validationResults.failed++
            return $false
        }
    }
}

Write-Host ""
Write-Host "📋 System Requirements" -ForegroundColor Cyan

Test-Requirement "Node.js installed" {
    $null -ne (Get-Command node -ErrorAction SilentlyContinue)
} "Node.js is required"

Test-Requirement "npm installed" {
    $null -ne (Get-Command npm -ErrorAction SilentlyContinue)
} "npm is required"

Test-Requirement "Node.js version 18+" {
    $version = node --version
    [version]$version.Substring(1) -ge [version]"18.0.0"
} "Node.js 18+ required, found: $(node --version)"

Write-Host ""
Write-Host "🔧 Project Build" -ForegroundColor Cyan

Test-Requirement "Dependencies installed" {
    Test-Path "node_modules"
} "Run 'npm install' first"

Test-Requirement "TypeScript compilation" {
    npm run build 2>&1 | Out-Null
    $LASTEXITCODE -eq 0
} "TypeScript compilation failed"

Test-Requirement "Build artifacts exist" {
    Test-Path "dist/mcp/server.js"
} "Build output not found"

Write-Host ""
Write-Host "📦 Package Configuration" -ForegroundColor Cyan

Test-Requirement "package.json valid" {
    $pkg = Get-Content "package.json" | ConvertFrom-Json
    $pkg.name -and $pkg.version -and $pkg.main
} "package.json missing required fields"

Test-Requirement "VSCode extension manifest" {
    Test-Path "deployment/vscode-extension/package.json"
} "VSCode extension package.json not found"

Test-Requirement "NuGet specification" {
    Test-Path "deployment/nuget-package/DarBotLabs.PowerAgent.MCP.nuspec"
} "NuGet nuspec file not found"

Write-Host ""
Write-Host "📚 Documentation" -ForegroundColor Cyan

Test-Requirement "README.md complete" {
    $readme = Get-Content "README.md" -Raw
    $readme.Contains("Power Agent MCP") -and $readme.Contains("Quick Start")
} "README.md incomplete"

Test-Requirement "API documentation" {
    Test-Path "power-mcp.md"
} "API documentation not found"

Test-Requirement "Setup guide exists" {
    Test-Path "docs/MCP_CONNECTOR_SETUP.md"
} "Setup documentation not found"

Write-Host ""
Write-Host "🔐 Publishing Prerequisites" -ForegroundColor Cyan

Test-Requirement "VSCE CLI available" {
    $null -ne (Get-Command vsce -ErrorAction SilentlyContinue)
} "Run 'npm install -g vsce'" -Warning

Test-Requirement "NuGet CLI available" {
    $null -ne (Get-Command nuget -ErrorAction SilentlyContinue)
} "Install NuGet CLI" -Warning

Test-Requirement "VSCE PAT configured" {
    $null -ne $env:VSCE_PAT
} "Set VSCE_PAT environment variable" -Warning

Test-Requirement "NuGet API key configured" {
    $null -ne $env:NUGET_API_KEY
} "Set NUGET_API_KEY environment variable" -Warning

Write-Host ""
Write-Host "🧪 Functional Testing" -ForegroundColor Cyan

Test-Requirement "MCP server starts" {
    $process = Start-Process node -ArgumentList "dist/mcp/server.js" -PassThru -WindowStyle Hidden
    Start-Sleep 2
    $running = -not $process.HasExited
    if ($running) {
        Stop-Process $process -Force
    }
    return $running
} "MCP server failed to start"

Test-Requirement "All tool files present" {
    $toolFiles = Get-ChildItem "src/mcp/tools/*.ts" | Measure-Object
    $toolFiles.Count -ge 25
} "Expected 25+ tool files, found: $($toolFiles.Count)"

Write-Host ""
Write-Host "📊 Validation Summary" -ForegroundColor Cyan
Write-Host "===================" -ForegroundColor Cyan

Write-Host "✅ Passed: $($validationResults.passed)" -ForegroundColor Green
Write-Host "❌ Failed: $($validationResults.failed)" -ForegroundColor Red
Write-Host "⚠️  Warnings: $($validationResults.warnings)" -ForegroundColor Yellow

$totalTests = $validationResults.passed + $validationResults.failed + $validationResults.warnings
$successRate = [math]::Round(($validationResults.passed / $totalTests) * 100, 1)

Write-Host ""
Write-Host "Success Rate: $successRate%" -ForegroundColor $(if ($successRate -ge 90) { "Green" } elseif ($successRate -ge 75) { "Yellow" } else { "Red" })

if ($validationResults.failed -eq 0) {
    Write-Host ""
    Write-Host "🎉 Ready for deployment!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Set up publisher accounts (see deployment/QUICK_PUBLISHER_SETUP.md)" -ForegroundColor White
    Write-Host "2. Configure environment variables (VSCE_PAT, NUGET_API_KEY)" -ForegroundColor White
    Write-Host "3. Run deployment script: ./deployment/deploy-complete.ps1" -ForegroundColor White
    
    return $true
} else {
    Write-Host ""
    Write-Host "❌ Deployment blocked - fix failed tests first" -ForegroundColor Red
    return $false
}
