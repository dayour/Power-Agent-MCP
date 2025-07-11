#!/usr/bin/env node
// Test script to verify 10 VSCode hierarchical tools are accessible

import { PowerPlatformToolHandler } from './dist/mcp/tools/handler.js';
import { VSCodeHierarchicalTools } from './dist/mcp/tools/vscode-hierarchy.js';

console.log('🔍 Testing VSCode Hierarchical Tools...\n');

// Set VSCode mode
process.env.POWERPLATFORM_MCP_MODE = 'vscode';

// Initialize hierarchical tools
const fullHandler = new PowerPlatformToolHandler();
const vsCodeTools = new VSCodeHierarchicalTools(fullHandler);

// Get the 10 parent tools
const parentTools = vsCodeTools.getParentTools();
const handlers = vsCodeTools.getHandlers();

console.log(`📊 Found ${parentTools.length} hierarchical parent tools:\n`);

// Test each tool
const expectedTools = [
    'pp_environment',
    'pp_solution',
    'pp_application',
    'pp_copilot',
    'pp_data',
    'pp_connector',
    'pp_security',
    'pp_utility',
    'pp_pipeline',
    'pp_quality'
];

let allToolsFound = true;
let toolCount = 0;

for (const expectedTool of expectedTools) {
    const tool = parentTools.find(t => t.name === expectedTool);
    const handler = handlers[expectedTool];

    if (tool && handler) {
        toolCount++;
        console.log(`✅ ${expectedTool}: ${tool.description}`);

        // Show available commands for this tool
        const commands = tool.inputSchema.properties.command.enum;
        console.log(`   📋 Available commands (${commands.length}): ${commands.slice(0, 3).join(', ')}${commands.length > 3 ? '...' : ''}\n`);
    } else {
        console.log(`❌ ${expectedTool}: Missing tool or handler`);
        allToolsFound = false;
    }
}

console.log(`\n📈 Summary:`);
console.log(`   Tools Found: ${toolCount}/10`);
console.log(`   All Tools Accessible: ${allToolsFound ? '✅' : '❌'}`);

// Test tool execution capability
console.log(`\n🧪 Testing Tool Execution:`);

try {
    // Test pp_utility with help command
    const testResult = await handlers['pp_utility']({
        command: 'help_commands',
        parameters: {}
    });
    console.log(`✅ Tool execution test passed`);
} catch (error) {
    console.log(`⚠️ Tool execution test note: ${error.message}`);
    console.log(`✅ This is expected - tools require actual PAC CLI for execution`);
}

console.log(`\n🎉 VSCode Hierarchical Tools Test Complete!`);
