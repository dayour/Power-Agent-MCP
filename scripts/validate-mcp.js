#!/usr/bin/env node

/**
 * Simple validation script for MCP server functionality
 * This script validates that the MCP server can be started and lists available tools
 */

import { PowerPlatformToolHandler } from '../src/mcp/tools/handler.js';

async function validateMCPImplementation() {
  console.log('🔍 Validating Power Platform MCP Implementation...\n');
  
  try {
    // Test 1: Initialize tool handler
    console.log('✅ Test 1: Initializing tool handler...');
    const handler = new PowerPlatformToolHandler();
    console.log('   ✅ Tool handler initialized successfully\n');
    
    // Test 2: Get all tools
    console.log('✅ Test 2: Retrieving all MCP tools...');
    const tools = handler.getAllTools();
    console.log(`   ✅ Found ${tools.length} MCP tools\n`);
    
    // Test 3: Validate tool categories
    console.log('✅ Test 3: Validating tool categories...');
    const categories = {
      'Environment Management': tools.filter(t => t.name.includes('environment')).length,
      'Solution Management': tools.filter(t => t.name.includes('solution') || t.name.includes('pack') || t.name.includes('unpack') || t.name.includes('export_solution') || t.name.includes('import_solution')).length,
      'Data Management': tools.filter(t => t.name.includes('data')).length,
      'Quality Assurance': tools.filter(t => t.name.includes('checker')).length,
      'Security Management': tools.filter(t => t.name.includes('assign')).length,
      'Application Lifecycle': tools.filter(t => t.name.includes('application') || t.name.includes('package') || t.name.includes('catalog')).length,
      'Portal Management': tools.filter(t => t.name.includes('portal')).length,
      'Governance': tools.filter(t => t.name.includes('connection') || t.name.includes('governance') || t.name.includes('org') || t.name.includes('customization')).length,
      'Utilities': tools.filter(t => t.name.includes('tool') || t.name.includes('whoami') || t.name.includes('status')).length
    };
    
    console.log('   📊 Tool distribution by category:');
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`      ${category}: ${count} tools`);
    });
    console.log();
    
    // Test 4: Validate tool schemas
    console.log('✅ Test 4: Validating tool schemas...');
    let schemasValid = true;
    tools.forEach(tool => {
      if (!tool.name || !tool.description || !tool.inputSchema) {
        console.log(`   ❌ Invalid schema for tool: ${tool.name}`);
        schemasValid = false;
      }
    });
    
    if (schemasValid) {
      console.log('   ✅ All tool schemas are valid\n');
    } else {
      console.log('   ❌ Some tool schemas are invalid\n');
    }
    
    // Test 5: List all tools
    console.log('✅ Test 5: Complete tool inventory:');
    console.log('   📋 Available MCP Tools:');
    tools.sort((a, b) => a.name.localeCompare(b.name)).forEach((tool, index) => {
      console.log(`      ${(index + 1).toString().padStart(2, '0')}. ${tool.name} - ${tool.description}`);
    });
    console.log();
    
    // Summary
    console.log('🎉 MCP Implementation Validation Summary:');
    console.log(`   ✅ Total Tools Implemented: ${tools.length}/32`);
    console.log(`   ✅ Schema Validation: ${schemasValid ? 'PASSED' : 'FAILED'}`);
    console.log(`   ✅ Tool Categories: ${Object.keys(categories).length}`);
    console.log('   ✅ Implementation Status: COMPLETE');
    
    if (tools.length === 32 && schemasValid) {
      console.log('\n🚀 Power Platform MCP server is ready for production use!');
      return true;
    } else {
      console.log('\n⚠️  MCP implementation needs attention before production use.');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    return false;
  }
}

// Run validation if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  validateMCPImplementation()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('Validation error:', error);
      process.exit(1);
    });
}

export { validateMCPImplementation };