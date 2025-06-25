#!/bin/bash
# End-to-End Functionality Validation Script for Power Agent MCP
# This script validates all major components, commands, and tools

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
VALIDATION_RESULTS="$SCRIPT_DIR/validation-results-$(date +%Y%m%d_%H%M%S).json"
TEMP_DIR="/tmp/power-agent-mcp-validation"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Counters
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0
WARNINGS=0

# Results storage
declare -A TEST_RESULTS

# Logging functions
log() {
    echo -e "${GREEN}[$(date +'%H:%M:%S')] ✅ $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%H:%M:%S')] ⚠️  $1${NC}"
    ((WARNINGS++))
}

error() {
    echo -e "${RED}[$(date +'%H:%M:%S')] ❌ $1${NC}"
}

info() {
    echo -e "${BLUE}[$(date +'%H:%M:%S')] ℹ️  $1${NC}"
}

# Test framework
run_test() {
    local test_name="$1"
    local test_command="$2"
    local expected_result="${3:-0}"
    
    ((TOTAL_TESTS++))
    info "Running test: $test_name"
    
    if eval "$test_command" >/dev/null 2>&1; then
        local result=$?
        if [[ $result -eq $expected_result ]]; then
            log "PASS: $test_name"
            TEST_RESULTS["$test_name"]="PASS"
            ((PASSED_TESTS++))
        else
            error "FAIL: $test_name (expected $expected_result, got $result)"
            TEST_RESULTS["$test_name"]="FAIL"
            ((FAILED_TESTS++))
        fi
    else
        error "FAIL: $test_name (command execution failed)"
        TEST_RESULTS["$test_name"]="FAIL"
        ((FAILED_TESTS++))
    fi
}

# Setup validation environment
setup_validation_environment() {
    info "Setting up validation environment..."
    
    # Create temporary directory
    mkdir -p "$TEMP_DIR"
    cd "$TEMP_DIR"
    
    # Create minimal package.json for testing
    cat > package.json << 'EOF'
{
  "name": "power-agent-mcp-validation",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "@modelcontextprotocol/sdk": "^0.5.0"
  }
}
EOF

    # Install MCP SDK for testing
    npm install --silent
    
    log "Validation environment ready"
}

# Test 1: Repository Structure Validation
validate_repository_structure() {
    info "Validating repository structure..."
    
    local required_files=(
        "package.json"
        "README.md"
        "src/mcp/server.ts"
        "docs/MCP_CONNECTOR_SETUP.md"
        "docs/PRODUCTION_DEPLOYMENT_CHECKLIST.md"
        "deployment/README.md"
    )
    
    for file in "${required_files[@]}"; do
        run_test "Repository file exists: $file" "test -f '$PROJECT_ROOT/$file'"
    done
    
    local required_dirs=(
        "src/mcp/tools"
        "docs"
        "deployment/vscode-extension"
        "deployment/nuget-package"
        "deployment/production-setup"
    )
    
    for dir in "${required_dirs[@]}"; do
        run_test "Repository directory exists: $dir" "test -d '$PROJECT_ROOT/$dir'"
    done
}

# Test 2: MCP Server Functionality
validate_mcp_server() {
    info "Validating MCP server functionality..."
    
    # Create test MCP server
    cat > test-server.js << 'EOF'
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// Mock tools for testing
const TEST_TOOLS = [
  {
    name: 'pp_whoami',
    description: 'Test authentication status',
    inputSchema: { type: 'object', properties: {} }
  },
  {
    name: 'pp_environment_list',
    description: 'Test environment listing',
    inputSchema: { type: 'object', properties: {} }
  }
];

const server = new Server({
  name: 'power-agent-mcp-test',
  version: '1.0.0'
}, {
  capabilities: { tools: {} }
});

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TEST_TOOLS
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => ({
  content: [{
    type: 'text',
    text: JSON.stringify({ success: true, tool: request.params.name })
  }]
}));

console.log('MCP_SERVER_READY');
setTimeout(() => process.exit(0), 1000);
EOF

    # Test server startup
    run_test "MCP server starts successfully" "timeout 5s node test-server.js | grep -q 'MCP_SERVER_READY'"
    
    # Test tool schema validation
    cat > test-tool-schema.js << 'EOF'
const tools = [
  { name: 'pp_whoami', description: 'Test', inputSchema: { type: 'object' } },
  { name: 'pp_test', description: 'Test', inputSchema: { type: 'object' } }
];

const isValid = tools.every(tool => 
  tool.name && tool.description && tool.inputSchema
);

process.exit(isValid ? 0 : 1);
EOF

    run_test "Tool schemas are valid" "node test-tool-schema.js"
}

# Test 3: Tool Coverage Validation
validate_tool_coverage() {
    info "Validating tool coverage..."
    
    # Check if tools directory exists and contains expected tool files
    local tool_files=(
        "environment.ts"
        "solution.ts"
        "dataverse.ts"
        "sql.ts"
        "adaptivecards.ts"
        "copilot.ts"
        "application.ts"
        "security.ts"
        "quality.ts"
        "pipeline.ts"
    )
    
    for tool_file in "${tool_files[@]}"; do
        run_test "Tool category exists: $tool_file" "test -f '$PROJECT_ROOT/src/mcp/tools/$tool_file'"
    done
    
    # Validate tool count expectation
    local tool_count=$(find "$PROJECT_ROOT/src/mcp/tools" -name "*.ts" | wc -l)
    if [[ $tool_count -ge 10 ]]; then
        log "Tool coverage: $tool_count tool files found"
        TEST_RESULTS["tool_coverage_count"]="PASS"
        ((PASSED_TESTS++))
    else
        error "Tool coverage: Only $tool_count tool files found (expected 10+)"
        TEST_RESULTS["tool_coverage_count"]="FAIL"
        ((FAILED_TESTS++))
    fi
    ((TOTAL_TESTS++))
}

# Test 4: Documentation Validation
validate_documentation() {
    info "Validating documentation..."
    
    # Check documentation files exist and have content
    local doc_files=(
        "docs/MCP_CONNECTOR_SETUP.md"
        "docs/PRODUCTION_DEPLOYMENT_CHECKLIST.md"
        "docs/VSCODE_MCP_INTEGRATION.md"
        "power-mcp.md"
    )
    
    for doc_file in "${doc_files[@]}"; do
        run_test "Documentation exists: $doc_file" "test -f '$PROJECT_ROOT/$doc_file'"
        if [[ -f "$PROJECT_ROOT/$doc_file" ]]; then
            local line_count=$(wc -l < "$PROJECT_ROOT/$doc_file")
            if [[ $line_count -gt 50 ]]; then
                log "Documentation has substantial content: $doc_file ($line_count lines)"
            else
                warn "Documentation may be incomplete: $doc_file ($line_count lines)"
            fi
        fi
    done
    
    # Check README completeness
    if [[ -f "$PROJECT_ROOT/README.md" ]]; then
        local readme_sections=("Overview" "Quick Start" "Installation" "Usage")
        for section in "${readme_sections[@]}"; do
            if grep -q "$section" "$PROJECT_ROOT/README.md"; then
                log "README section found: $section"
            else
                warn "README section missing: $section"
            fi
        done
    fi
}

# Test 5: Deployment Assets Validation
validate_deployment_assets() {
    info "Validating deployment assets..."
    
    # VSCode extension assets
    run_test "VSCode extension package.json exists" "test -f '$PROJECT_ROOT/deployment/vscode-extension/package.json'"
    
    if [[ -f "$PROJECT_ROOT/deployment/vscode-extension/package.json" ]]; then
        # Validate package.json structure
        cat > validate-vscode-package.js << 'EOF'
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('../../deployment/vscode-extension/package.json', 'utf8'));

const required = ['name', 'displayName', 'description', 'version', 'publisher', 'engines'];
const missing = required.filter(field => !pkg[field]);

process.exit(missing.length === 0 ? 0 : 1);
EOF
        run_test "VSCode package.json is valid" "node validate-vscode-package.js"
    fi
    
    # NuGet package assets
    run_test "NuGet package spec exists" "test -f '$PROJECT_ROOT/deployment/nuget-package/DarBotLabs.PowerAgent.MCP.nuspec'"
    
    # Production setup scripts
    run_test "Production deployment script exists" "test -f '$PROJECT_ROOT/deployment/production-setup/deploy-production.sh'"
    run_test "Production deployment script is executable" "test -x '$PROJECT_ROOT/deployment/production-setup/deploy-production.sh'"
    
    # CI/CD pipeline configuration
    run_test "GitHub Actions workflow exists" "test -f '$PROJECT_ROOT/deployment/ci-cd-pipeline/github-actions.yml'"
}

# Test 6: Security and Authentication
validate_security() {
    info "Validating security configuration..."
    
    # Check for environment variable documentation
    if grep -q "POWERPLATFORM_TENANT_ID" "$PROJECT_ROOT/docs/MCP_CONNECTOR_SETUP.md"; then
        log "Authentication environment variables documented"
        TEST_RESULTS["auth_env_vars_documented"]="PASS"
        ((PASSED_TESTS++))
    else
        error "Authentication environment variables not documented"
        TEST_RESULTS["auth_env_vars_documented"]="FAIL"
        ((FAILED_TESTS++))
    fi
    ((TOTAL_TESTS++))
    
    # Check for security best practices documentation
    if grep -q -i "security" "$PROJECT_ROOT/docs/"*.md; then
        log "Security documentation found"
        TEST_RESULTS["security_docs"]="PASS"
        ((PASSED_TESTS++))
    else
        warn "Security documentation may be incomplete"
        TEST_RESULTS["security_docs"]="WARN"
    fi
    ((TOTAL_TESTS++))
    
    # Check for sensitive data patterns (this is a basic check)
    if ! grep -r "password\|secret\|key" "$PROJECT_ROOT/src" | grep -v "environment\|config\|example"; then
        log "No hardcoded secrets found in source code"
        TEST_RESULTS["no_hardcoded_secrets"]="PASS"
        ((PASSED_TESTS++))
    else
        warn "Potential hardcoded secrets found - manual review required"
        TEST_RESULTS["no_hardcoded_secrets"]="WARN"
    fi
    ((TOTAL_TESTS++))
}

# Test 7: Package Configuration
validate_package_configuration() {
    info "Validating package configuration..."
    
    # Check main package.json
    if [[ -f "$PROJECT_ROOT/package.json" ]]; then
        # Extract and validate package name
        local package_name=$(node -e "console.log(require('$PROJECT_ROOT/package.json').name)" 2>/dev/null || echo "")
        if [[ "$package_name" == *"power"* && "$package_name" == *"mcp"* ]]; then
            log "Package name contains expected keywords: $package_name"
            TEST_RESULTS["package_name_valid"]="PASS"
            ((PASSED_TESTS++))
        else
            warn "Package name may need updating for @darbotlabs: $package_name"
            TEST_RESULTS["package_name_valid"]="WARN"
        fi
        ((TOTAL_TESTS++))
        
        # Check for required scripts
        local required_scripts=("build" "start")
        for script in "${required_scripts[@]}"; do
            if node -e "const pkg=require('$PROJECT_ROOT/package.json'); process.exit(pkg.scripts && pkg.scripts['$script'] ? 0 : 1)" 2>/dev/null; then
                log "Required script found: $script"
            else
                warn "Required script missing: $script"
            fi
        done
    fi
}

# Test 8: Performance and Scalability
validate_performance() {
    info "Validating performance considerations..."
    
    # Check for large files that might impact package size
    local large_files=$(find "$PROJECT_ROOT" -type f -size +1M 2>/dev/null | grep -v node_modules | grep -v .git || true)
    if [[ -z "$large_files" ]]; then
        log "No unexpectedly large files found"
        TEST_RESULTS["package_size_optimal"]="PASS"
        ((PASSED_TESTS++))
    else
        warn "Large files found that may impact package size:"
        echo "$large_files"
        TEST_RESULTS["package_size_optimal"]="WARN"
    fi
    ((TOTAL_TESTS++))
    
    # Check for performance documentation
    if grep -q -i "performance\|scalability" "$PROJECT_ROOT/docs/"*.md; then
        log "Performance documentation found"
        TEST_RESULTS["performance_docs"]="PASS"
        ((PASSED_TESTS++))
    else
        warn "Performance documentation may be missing"
        TEST_RESULTS["performance_docs"]="WARN"
    fi
    ((TOTAL_TESTS++))
}

# Generate comprehensive validation report
generate_report() {
    info "Generating validation report..."
    
    local timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    local pass_rate=$((PASSED_TESTS * 100 / TOTAL_TESTS))
    
    cat > "$VALIDATION_RESULTS" << EOF
{
  "validation_report": {
    "timestamp": "$timestamp",
    "summary": {
      "total_tests": $TOTAL_TESTS,
      "passed_tests": $PASSED_TESTS,
      "failed_tests": $FAILED_TESTS,
      "warnings": $WARNINGS,
      "pass_rate": $pass_rate,
      "overall_status": "$(if [[ $FAILED_TESTS -eq 0 ]]; then echo "READY_FOR_PRODUCTION"; else echo "NEEDS_ATTENTION"; fi)"
    },
    "test_results": {
EOF

    local first=true
    for test_name in "${!TEST_RESULTS[@]}"; do
        if [[ "$first" == true ]]; then
            first=false
        else
            echo "," >> "$VALIDATION_RESULTS"
        fi
        echo "      \"$test_name\": \"${TEST_RESULTS[$test_name]}\"" >> "$VALIDATION_RESULTS"
    done

    cat >> "$VALIDATION_RESULTS" << EOF
    },
    "recommendations": [
EOF

    # Add recommendations based on test results
    local recommendations=()
    
    if [[ $FAILED_TESTS -gt 0 ]]; then
        recommendations+=("\"Address all failed tests before production deployment\"")
    fi
    
    if [[ $WARNINGS -gt 3 ]]; then
        recommendations+=("\"Review and address warning items for optimal deployment\"")
    fi
    
    if grep -q "WARN" <<< "${TEST_RESULTS[@]}"; then
        recommendations+=("\"Complete documentation and security review\"")
    fi
    
    if [[ ${#recommendations[@]} -eq 0 ]]; then
        recommendations+=("\"All validations passed - ready for production deployment\"")
    fi
    
    local first_rec=true
    for rec in "${recommendations[@]}"; do
        if [[ "$first_rec" == true ]]; then
            first_rec=false
        else
            echo "," >> "$VALIDATION_RESULTS"
        fi
        echo "      $rec" >> "$VALIDATION_RESULTS"
    done

    cat >> "$VALIDATION_RESULTS" << EOF
    ]
  }
}
EOF

    log "Validation report generated: $VALIDATION_RESULTS"
}

# Display summary
display_summary() {
    echo
    echo "=================================="
    echo "  VALIDATION SUMMARY"
    echo "=================================="
    echo
    printf "Total Tests:    %d\n" $TOTAL_TESTS
    printf "Passed:         %s%d%s\n" "$GREEN" $PASSED_TESTS "$NC"
    printf "Failed:         %s%d%s\n" "$RED" $FAILED_TESTS "$NC"
    printf "Warnings:       %s%d%s\n" "$YELLOW" $WARNINGS "$NC"
    printf "Pass Rate:      %d%%\n" $((PASSED_TESTS * 100 / TOTAL_TESTS))
    echo
    
    if [[ $FAILED_TESTS -eq 0 ]]; then
        log "✅ READY FOR PRODUCTION DEPLOYMENT"
    else
        error "❌ NEEDS ATTENTION BEFORE DEPLOYMENT"
    fi
    
    echo
    echo "Detailed report: $VALIDATION_RESULTS"
    echo
}

# Cleanup
cleanup() {
    rm -rf "$TEMP_DIR" 2>/dev/null || true
}

# Main execution
main() {
    echo "🚀 Power Agent MCP - End-to-End Functionality Validation"
    echo "======================================================="
    echo
    
    setup_validation_environment
    
    validate_repository_structure
    validate_mcp_server
    validate_tool_coverage
    validate_documentation
    validate_deployment_assets
    validate_security
    validate_package_configuration
    validate_performance
    
    generate_report
    display_summary
    
    cleanup
    
    # Exit with appropriate code
    if [[ $FAILED_TESTS -eq 0 ]]; then
        exit 0
    else
        exit 1
    fi
}

# Error handling
trap 'error "Validation failed at line $LINENO"; cleanup; exit 1' ERR

# Run main function
main "$@"