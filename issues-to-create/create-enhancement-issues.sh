#!/bin/bash

# Script to create GitHub issues for enhancement opportunities
# Usage: ./create-enhancement-issues.sh [owner] [repo]
# Example: ./create-enhancement-issues.sh dayour Power-Agent-MCP

OWNER=${1:-"dayour"}
REPO=${2:-"Power-Agent-MCP"}

# Check if gh CLI is available
if ! command -v gh &> /dev/null; then
    echo "GitHub CLI (gh) is not installed. Please install it first."
    echo "Visit: https://cli.github.com/"
    exit 1
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
    echo "Please authenticate with GitHub CLI first:"
    echo "gh auth login"
    exit 1
fi

echo "Creating enhancement issues for $OWNER/$REPO..."

# Issue 1: Enhanced Error Messages
echo "Creating ENHANCE-001: Enhanced Error Messages..."
gh issue create \
    --repo "$OWNER/$REPO" \
    --title "[ENHANCE-001] Enhanced Error Messages with Troubleshooting Guidance" \
    --body-file "ENHANCE-001-error-messages-issue.md" \
    --label "enhancement,user-experience,high-priority"

# Issue 2: Smart Parameter Validation
echo "Creating ENHANCE-002: Smart Parameter Validation..."
gh issue create \
    --repo "$OWNER/$REPO" \
    --title "[ENHANCE-002] Smart Parameter Validation with Real-time Feedback" \
    --body-file "ENHANCE-002-parameter-validation-issue.md" \
    --label "enhancement,user-experience,validation,high-priority"

# Issue 3: Parallel Operations
echo "Creating ENHANCE-003: Parallel Operations..."
gh issue create \
    --repo "$OWNER/$REPO" \
    --title "[ENHANCE-003] Parallel Operations Support for Improved Performance" \
    --body-file "ENHANCE-003-parallel-operations-issue.md" \
    --label "enhancement,performance,medium-priority"

# Issue 4: Caching Mechanisms
echo "Creating ENHANCE-004: Caching Mechanisms..."
gh issue create \
    --repo "$OWNER/$REPO" \
    --title "[ENHANCE-004] Caching Mechanisms for Faster Operations" \
    --body-file "ENHANCE-004-caching-mechanisms-issue.md" \
    --label "enhancement,performance,caching,medium-priority"

# Issue 5: Template Management
echo "Creating ENHANCE-005: Template Management..."
gh issue create \
    --repo "$OWNER/$REPO" \
    --title "[ENHANCE-005] Template Management for Common Scenarios" \
    --body-file "ENHANCE-005-template-management-issue.md" \
    --label "enhancement,user-experience,templates,low-medium-priority"

echo "All enhancement issues have been created successfully!"
echo "You can view them at: https://github.com/$OWNER/$REPO/issues"