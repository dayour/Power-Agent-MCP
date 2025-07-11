#!/usr/bin/env node
// Comprehensive MCP Server Test - Simulates client connection and tool listing

console.log('🔍 Comprehensive MCP Server Test\n');

// Test 1: VSCode Mode (10 hierarchical tools)
console.log('📱 Testing VSCode Mode (Hierarchical Tools)...');
process.env.POWERPLATFORM_MCP_MODE = 'vscode';

import('./dist/mcp/server.js').then(() => {
    console.log('✅ VSCode mode server loaded successfully');
}).catch(error => {
    console.log('❌ VSCode mode server load failed:', error.message);
});

// Test 2: Full Mode (individual tools)
setTimeout(() => {
    console.log('\n🖥️ Testing Full Mode (Individual Tools)...');
    process.env.POWERPLATFORM_MCP_MODE = 'full';

    import('./dist/mcp/server.js?' + Date.now()).then(() => {
        console.log('✅ Full mode server loaded successfully');
    }).catch(error => {
        console.log('❌ Full mode server load failed:', error.message);
    });
}, 1000);

// Test 3: Tool availability check
setTimeout(async () => {
    console.log('\n🔧 Testing Tool Availability...');

    try {
        // Import the handler directly
        const { PowerPlatformToolHandler } = await import('./dist/mcp/tools/handler.js');
        const { VSCodeHierarchicalTools } = await import('./dist/mcp/tools/vscode-hierarchy.js');

        // Test full mode tools
        const fullHandler = new PowerPlatformToolHandler();
        const allTools = fullHandler.getAllTools();
        console.log(`✅ Full mode: ${allTools.length} individual tools available`);

        // Test VSCode hierarchical tools
        const vsCodeTools = new VSCodeHierarchicalTools(fullHandler);
        const parentTools = vsCodeTools.getParentTools();
        console.log(`✅ VSCode mode: ${parentTools.length} hierarchical tools available`);

        // Show tool breakdown
        console.log('\n📊 Tool Categories:');
        const toolsByCategory = {};
        allTools.forEach(tool => {
            const category = tool.name.split('_')[1] || 'other';
            toolsByCategory[category] = (toolsByCategory[category] || 0) + 1;
        });

        Object.entries(toolsByCategory).forEach(([category, count]) => {
            console.log(`   ${category}: ${count} tools`);
        });

        console.log('\n🎯 Expected 10 Hierarchical Tools:');
        const expectedTools = ['pp_environment', 'pp_solution', 'pp_application', 'pp_copilot', 'pp_data', 'pp_connector', 'pp_security', 'pp_utility', 'pp_pipeline', 'pp_quality'];

        expectedTools.forEach(toolName => {
            const tool = parentTools.find(t => t.name === toolName);
            console.log(`   ${tool ? '✅' : '❌'} ${toolName}`);
        });

        console.log('\n🏆 Test Results:');
        console.log(`   Individual Tools: ${allTools.length}`);
        console.log(`   Hierarchical Tools: ${parentTools.length}/10`);
        console.log(`   Status: ${parentTools.length === 10 ? '🟢 READY' : '🔴 ISSUE'}`);

    } catch (error) {
        console.log('❌ Tool availability test failed:', error.message);
    }
}, 2000);
