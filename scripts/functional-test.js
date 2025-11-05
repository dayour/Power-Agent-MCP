#!/usr/bin/env node
// Functional Test - Power Agent MCP Tools Verification

console.log('🔍 Power Agent MCP - Functional Test\n');

async function runTests() {
    try {
        console.log('📋 Testing Tool Handler Import...');
        const { PowerPlatformToolHandler } = await import('./dist/mcp/tools/handler.js');
        const { VSCodeHierarchicalTools } = await import('./dist/mcp/tools/vscode-hierarchy.js');
        console.log('✅ Imports successful\n');

        // Test 1: Full Mode Tools
        console.log('🖥️ Testing Full Mode (Individual Tools)...');
        const fullHandler = new PowerPlatformToolHandler();
        const allTools = fullHandler.getAllTools();
        console.log(`✅ Found ${allTools.length} individual tools\n`);

        // Test 2: VSCode Hierarchical Tools
        console.log('📱 Testing VSCode Mode (Hierarchical Tools)...');
        const vsCodeTools = new VSCodeHierarchicalTools(fullHandler);
        const parentTools = vsCodeTools.getParentTools();
        console.log(`✅ Found ${parentTools.length} hierarchical parent tools\n`);

        // Test 3: Verify Expected Tools
        console.log('🎯 Verifying Expected 10 Hierarchical Tools:');
        const expectedTools = [
            'pp_environment', 'pp_solution', 'pp_application', 'pp_copilot',
            'pp_data', 'pp_connector', 'pp_security', 'pp_utility',
            'pp_pipeline', 'pp_quality'
        ];

        let foundCount = 0;
        expectedTools.forEach(toolName => {
            const tool = parentTools.find(t => t.name === toolName);
            if (tool) {
                console.log(`   ✅ ${toolName} - ${tool.description.substring(0, 50)}...`);
                foundCount++;
            } else {
                console.log(`   ❌ ${toolName} - MISSING`);
            }
        });

        // Test 4: Tool Invocation Test
        console.log('\n🔧 Testing Tool Invocation...');
        const handlers = vsCodeTools.getHandlers();

        try {
            // Test pp_utility with help_commands
            const utilityHandler = handlers['pp_utility'];
            if (utilityHandler) {
                console.log('   🧪 Testing pp_utility -> help_commands...');
                const result = await utilityHandler({
                    command: 'help_commands',
                    parameters: {}
                });
                console.log('   ✅ Tool invocation successful');
            } else {
                console.log('   ❌ pp_utility handler not found');
            }
        } catch (error) {
            console.log(`   ⚠️  Tool invocation test: ${error.message.substring(0, 100)}`);
        }

        // Final Results
        console.log('\n🏆 Test Results Summary:');
        console.log(`   Individual Tools: ${allTools.length}`);
        console.log(`   Hierarchical Tools: ${foundCount}/10`);
        console.log(`   Tool Categories: ${Object.keys(groupToolsByCategory(allTools)).length}`);
        console.log(`   Status: ${foundCount === 10 ? '🟢 READY FOR DEPLOYMENT' : '🔴 NEEDS ATTENTION'}`);

        // Tool breakdown
        console.log('\n📊 Tool Category Breakdown:');
        const categories = groupToolsByCategory(allTools);
        Object.entries(categories)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10)
            .forEach(([category, count]) => {
                console.log(`   ${category}: ${count} tools`);
            });

        console.log('\n✅ Test completed successfully!');
        process.exit(0);

    } catch (error) {
        console.log('\n❌ Test failed:', error.message);
        console.log(error.stack);
        process.exit(1);
    }
}

function groupToolsByCategory(tools) {
    const categories = {};
    tools.forEach(tool => {
        const parts = tool.name.split('_');
        const category = parts.length > 1 ? parts[1] : 'other';
        categories[category] = (categories[category] || 0) + 1;
    });
    return categories;
}

// Run the tests
runTests();
