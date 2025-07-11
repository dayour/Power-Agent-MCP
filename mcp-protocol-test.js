#!/usr/bin/env node

/**
 * Simple MCP Client Test
 * Tests the MCP server by simulating tool calls
 */

import { spawn } from 'child_process';

class MCPClientTest {
  constructor() {
    this.serverProcess = null;
  }

  async testMCPProtocol() {
    console.log('🧪 Testing MCP Protocol Integration...\n');

    try {
      // Start the MCP server
      this.serverProcess = spawn('node', ['dist/mcp/standalone-server.js'], {
        stdio: ['pipe', 'pipe', 'inherit']
      });

      // Test 1: List Tools
      await this.testListTools();

      // Test 2: Call whoami tool
      await this.testWhoamiTool();

      console.log('\n✅ MCP Protocol tests completed successfully!');

    } catch (error) {
      console.error('❌ MCP Protocol test failed:', error.message);
    } finally {
      if (this.serverProcess) {
        this.serverProcess.kill('SIGTERM');
      }
    }
  }

  async testListTools() {
    console.log('📋 Testing List Tools...');

    const listToolsRequest = {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/list',
      params: {}
    };

    return new Promise((resolve, reject) => {
      let responseData = '';

      this.serverProcess.stdout.on('data', (data) => {
        responseData += data.toString();

        try {
          const response = JSON.parse(responseData);
          if (response.id === 1 && response.result && response.result.tools) {
            console.log(`  ✅ Found ${response.result.tools.length} tools:`);
            response.result.tools.forEach(tool => {
              console.log(`     - ${tool.name}: ${tool.description}`);
            });
            resolve(response);
          }
        } catch (e) {
          // Still receiving data, continue
        }
      });

      this.serverProcess.stdin.write(JSON.stringify(listToolsRequest) + '\n');

      setTimeout(() => {
        reject(new Error('List tools test timed out'));
      }, 5000);
    });
  }

  async testWhoamiTool() {
    console.log('\n🔍 Testing whoami tool...');

    const whoamiRequest = {
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/call',
      params: {
        name: 'pp_whoami',
        arguments: {}
      }
    };

    return new Promise((resolve, reject) => {
      let responseData = '';

      this.serverProcess.stdout.on('data', (data) => {
        responseData += data.toString();

        try {
          const lines = responseData.trim().split('\n');
          for (const line of lines) {
            const response = JSON.parse(line);
            if (response.id === 2) {
              console.log('  ✅ whoami tool executed successfully');
              console.log(`     Response: ${JSON.stringify(response.result, null, 2)}`);
              resolve(response);
              return;
            }
          }
        } catch (e) {
          // Still receiving data, continue
        }
      });

      this.serverProcess.stdin.write(JSON.stringify(whoamiRequest) + '\n');

      setTimeout(() => {
        reject(new Error('whoami tool test timed out'));
      }, 5000);
    });
  }
}

// Run the test
const tester = new MCPClientTest();
tester.testMCPProtocol().catch(error => {
  console.error('Test failed:', error);
  process.exit(1);
});
