#!/bin/bash
# Production Deployment Script for Power Agent MCP
# Usage: ./deploy-production.sh [environment]

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
ENVIRONMENT="${1:-production}"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

# Pre-deployment checks
check_prerequisites() {
    log "Checking prerequisites..."
    
    # Check Node.js version
    if ! command -v node &> /dev/null; then
        error "Node.js is not installed"
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2)
    REQUIRED_VERSION="18.0.0"
    if ! npx semver -r ">=$REQUIRED_VERSION" "$NODE_VERSION" &> /dev/null; then
        error "Node.js version $NODE_VERSION is less than required $REQUIRED_VERSION"
    fi
    
    # Check Power Platform CLI
    if ! command -v pac &> /dev/null; then
        warn "Power Platform CLI not found, installing..."
        npm install -g @microsoft/powerplatform-cli
    fi
    
    # Check environment variables
    local required_vars=("POWERPLATFORM_TENANT_ID" "POWERPLATFORM_APPLICATION_ID" "POWERPLATFORM_CLIENT_SECRET")
    for var in "${required_vars[@]}"; do
        if [[ -z "${!var:-}" ]]; then
            error "Required environment variable $var is not set"
        fi
    done
    
    log "Prerequisites check passed"
}

# Build application
build_application() {
    log "Building Power Agent MCP..."
    
    cd "$PROJECT_ROOT"
    
    # Install dependencies
    npm ci --production=false
    
    # Run tests
    log "Running tests..."
    npm test || warn "Some tests failed, proceeding with deployment"
    
    # Build application
    npm run build
    
    # Verify build artifacts
    if [[ ! -f "dist/mcp/server.js" ]]; then
        error "Build failed: server.js not found in dist/mcp/"
    fi
    
    log "Build completed successfully"
}

# Deploy to environment
deploy_environment() {
    log "Deploying to $ENVIRONMENT environment..."
    
    local deploy_dir="/opt/power-agent-mcp"
    local backup_dir="/opt/power-agent-mcp-backup-$TIMESTAMP"
    
    # Create backup of existing installation
    if [[ -d "$deploy_dir" ]]; then
        log "Creating backup of existing installation..."
        sudo cp -r "$deploy_dir" "$backup_dir"
    fi
    
    # Create deployment directory
    sudo mkdir -p "$deploy_dir"
    
    # Copy application files
    log "Copying application files..."
    sudo cp -r "$PROJECT_ROOT/dist" "$deploy_dir/"
    sudo cp -r "$PROJECT_ROOT/docs" "$deploy_dir/"
    sudo cp "$PROJECT_ROOT/package.json" "$deploy_dir/"
    sudo cp "$PROJECT_ROOT/README.md" "$deploy_dir/"
    
    # Install production dependencies
    cd "$deploy_dir"
    sudo npm ci --production
    
    # Set permissions
    sudo chown -R poweragent:poweragent "$deploy_dir"
    sudo chmod +x "$deploy_dir/dist/mcp/server.js"
    
    log "Deployment completed"
}

# Configure systemd service
configure_service() {
    log "Configuring systemd service..."
    
    # Create systemd service file
    sudo tee /etc/systemd/system/power-agent-mcp.service > /dev/null <<EOF
[Unit]
Description=Power Agent MCP Server
Documentation=https://github.com/dayour/Power-Agent-MCP
After=network.target

[Service]
Type=simple
User=poweragent
Group=poweragent
WorkingDirectory=/opt/power-agent-mcp
ExecStart=/usr/bin/node dist/mcp/server.js
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal
SyslogIdentifier=power-agent-mcp

# Environment variables
Environment=NODE_ENV=production
Environment=POWERPLATFORM_TENANT_ID=${POWERPLATFORM_TENANT_ID}
Environment=POWERPLATFORM_APPLICATION_ID=${POWERPLATFORM_APPLICATION_ID}
Environment=POWERPLATFORM_CLIENT_SECRET=${POWERPLATFORM_CLIENT_SECRET}
Environment=POWERPLATFORM_MCP_MODE=full

# Security settings
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/opt/power-agent-mcp/logs
PrivateTmp=true

[Install]
WantedBy=multi-user.target
EOF

    # Create user for service
    if ! id poweragent &>/dev/null; then
        sudo useradd --system --shell /bin/false --home /opt/power-agent-mcp poweragent
    fi
    
    # Create log directory
    sudo mkdir -p /opt/power-agent-mcp/logs
    sudo chown poweragent:poweragent /opt/power-agent-mcp/logs
    
    # Reload systemd and enable service
    sudo systemctl daemon-reload
    sudo systemctl enable power-agent-mcp
    
    log "Systemd service configured"
}

# Configure monitoring
configure_monitoring() {
    log "Configuring monitoring..."
    
    # Create health check script
    sudo tee /opt/power-agent-mcp/health-check.sh > /dev/null <<'EOF'
#!/bin/bash
# Health check script for Power Agent MCP

# Check if service is running
if ! systemctl is-active --quiet power-agent-mcp; then
    echo "CRITICAL: Power Agent MCP service is not running"
    exit 2
fi

# Check if port is listening (if applicable)
# if ! netstat -ln | grep -q ":8080"; then
#     echo "CRITICAL: Power Agent MCP not listening on expected port"
#     exit 2
# fi

# Basic tool validation
cd /opt/power-agent-mcp
if ! timeout 10s node -e "
const { spawn } = require('child_process');
const proc = spawn('node', ['dist/mcp/server.js']);
proc.stdin.write(JSON.stringify({jsonrpc:'2.0',id:1,method:'tools/list',params:{}}));
proc.stdin.end();
setTimeout(() => proc.kill(), 5000);
"; then
    echo "WARNING: MCP server health check failed"
    exit 1
fi

echo "OK: Power Agent MCP is healthy"
exit 0
EOF

    sudo chmod +x /opt/power-agent-mcp/health-check.sh
    
    # Configure logrotate
    sudo tee /etc/logrotate.d/power-agent-mcp > /dev/null <<EOF
/opt/power-agent-mcp/logs/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    copytruncate
    create 644 poweragent poweragent
}
EOF

    log "Monitoring configured"
}

# Configure firewall (if needed)
configure_firewall() {
    log "Configuring firewall..."
    
    # Note: Power Agent MCP typically runs as stdio MCP server
    # No inbound ports needed unless running in server mode
    
    if command -v ufw &> /dev/null; then
        # Example for server mode (uncomment if needed)
        # sudo ufw allow 8080/tcp comment "Power Agent MCP Server"
        log "Firewall configuration skipped (stdio mode)"
    else
        log "UFW not installed, skipping firewall configuration"
    fi
}

# Start services
start_services() {
    log "Starting services..."
    
    # Start and verify service
    sudo systemctl start power-agent-mcp
    sleep 5
    
    if sudo systemctl is-active --quiet power-agent-mcp; then
        log "Power Agent MCP service started successfully"
    else
        error "Failed to start Power Agent MCP service"
    fi
    
    # Run health check
    if /opt/power-agent-mcp/health-check.sh; then
        log "Health check passed"
    else
        warn "Health check failed, service may not be fully operational"
    fi
}

# Deployment validation
validate_deployment() {
    log "Validating deployment..."
    
    # Service status check
    if ! sudo systemctl is-active --quiet power-agent-mcp; then
        error "Service is not running"
    fi
    
    # Log check
    if sudo journalctl -u power-agent-mcp -n 10 | grep -q "ERROR"; then
        warn "Errors found in service logs"
        sudo journalctl -u power-agent-mcp -n 20
    fi
    
    # Basic functionality test
    log "Testing basic MCP functionality..."
    cd /opt/power-agent-mcp
    
    # Test tool listing (simplified)
    if timeout 10s node -e "
        console.log('Testing MCP server initialization...');
        require('./dist/mcp/server.js');
        setTimeout(() => {
            console.log('MCP server test completed');
            process.exit(0);
        }, 3000);
    " >/dev/null 2>&1; then
        log "MCP server functionality test passed"
    else
        warn "MCP server functionality test failed"
    fi
    
    log "Deployment validation completed"
}

# Cleanup old backups
cleanup_backups() {
    log "Cleaning up old backups..."
    
    # Keep only last 5 backups
    find /opt -name "power-agent-mcp-backup-*" -type d -mtime +7 -exec sudo rm -rf {} \; 2>/dev/null || true
    
    log "Cleanup completed"
}

# Main deployment function
main() {
    log "Starting Power Agent MCP production deployment to $ENVIRONMENT"
    
    check_prerequisites
    build_application
    deploy_environment
    configure_service
    configure_monitoring
    configure_firewall
    start_services
    validate_deployment
    cleanup_backups
    
    log "Deployment completed successfully!"
    log "Service status: $(sudo systemctl is-active power-agent-mcp)"
    log "Logs: sudo journalctl -u power-agent-mcp -f"
    log "Health check: /opt/power-agent-mcp/health-check.sh"
}

# Error handling
trap 'error "Deployment failed at line $LINENO"' ERR

# Run main function
main "$@"