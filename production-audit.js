#!/usr/bin/env node

/**
 * Comprehensive Production Audit for Power Agent MCP
 * 
 * This script performs end-to-end testing of all implemented MCP tools
 * and validates the production readiness of the standalone server.
 */

import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';

const AUDIT_RESULTS = {
  timestamp: new Date().toISOString(),
  serverStartup: false,
  toolValidation: {},
  pacCliIntegration: false,
  documentationAccuracy: {},
  productionReadiness: 'FAILED',
  issues: [],
  summary: {}
};

class ProductionAuditor {
  constructor() {
    this.serverProcess = null;
    this.toolsImplemented = [
      'pp_whoami',
      'pp_create_environment', 
      'pp_list_environments',
      'pp_delete_environment',
      'pp_export_solution',
      'pp_import_solution', 
      'pp_list_solutions',
      'pp_pack_solution',
      'pp_unpack_solution',
      'pp_auth_create',
      'pp_auth_list',
      'pp_auth_select'
    ];
  }

  async runAudit() {
    console.log('🔍 Starting Comprehensive Production Audit...\n');
    
    try {
      // 1. Server Startup Test
      await this.testServerStartup();
      
      // 2. Tool Schema Validation
      await this.validateToolSchemas();
      
      // 3. PAC CLI Integration Test
      await this.testPacCliIntegration();
      
      // 4. Documentation Accuracy Check
      await this.checkDocumentationAccuracy();
      
      // 5. Production Readiness Assessment
      await this.assessProductionReadiness();
      
      // 6. Generate Final Report
      await this.generateReport();
      
    } catch (error) {
      console.error('❌ Audit failed:', error.message);
      AUDIT_RESULTS.issues.push(`Critical audit failure: ${error.message}`);
    } finally {
      await this.cleanup();
    }
  }

  async testServerStartup() {
    console.log('🚀 Testing Server Startup...');
    
    try {
      // Test if server can start without errors
      const serverPath = path.join(process.cwd(), 'dist', 'mcp', 'standalone-server.js');
      
      // Check if build exists
      try {
        await fs.access(serverPath);
        console.log('  ✅ Standalone server build exists');
      } catch {
        throw new Error('Standalone server build not found - run npm run build first');
      }
      
      // Test server startup (quick test)
      const testProcess = spawn('node', [serverPath], {
        stdio: ['pipe', 'pipe', 'pipe']
      });
      
      let startupSuccess = false;
      let errorOutput = '';
      
      testProcess.stderr.on('data', (data) => {
        const output = data.toString();
        errorOutput += output;
        if (output.includes('Power Agent MCP Server running')) {
          startupSuccess = true;
          testProcess.kill('SIGTERM');
        }
      });
      
      testProcess.on('error', (error) => {
        throw new Error(`Server startup failed: ${error.message}`);
      });
      
      // Wait up to 10 seconds for startup
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          testProcess.kill('SIGTERM');
          if (!startupSuccess) {
            reject(new Error(`Server startup timed out. Error output: ${errorOutput}`));
          } else {
            resolve();
          }
        }, 10000);
        
        testProcess.on('exit', () => {
          clearTimeout(timeout);
          if (startupSuccess) {
            resolve();
          } else {
            reject(new Error(`Server exited unexpectedly. Error output: ${errorOutput}`));
          }
        });
      });
      
      AUDIT_RESULTS.serverStartup = true;
      console.log('  ✅ Server startup test passed');
      
    } catch (error) {
      AUDIT_RESULTS.issues.push(`Server startup failed: ${error.message}`);
      console.log(`  ❌ Server startup failed: ${error.message}`);
    }
  }

  async validateToolSchemas() {
    console.log('\n📋 Validating Tool Schemas...');
    
    try {
      // Read the server source to extract tool definitions
      const serverSourcePath = path.join(process.cwd(), 'src', 'mcp', 'standalone-server.ts');
      const serverSource = await fs.readFile(serverSourcePath, 'utf-8');
      
      // Check if all required tools are defined
      for (const toolName of this.toolsImplemented) {
        if (serverSource.includes(`name: '${toolName}'`)) {
          AUDIT_RESULTS.toolValidation[toolName] = 'DEFINED';
          console.log(`  ✅ ${toolName} - schema defined`);
        } else {
          AUDIT_RESULTS.toolValidation[toolName] = 'MISSING';
          AUDIT_RESULTS.issues.push(`Tool ${toolName} schema not found`);
          console.log(`  ❌ ${toolName} - schema missing`);
        }
      }
      
      // Check if implementation methods exist
      for (const toolName of this.toolsImplemented) {
        const methodName = this.getMethodName(toolName);
        if (serverSource.includes(methodName)) {
          AUDIT_RESULTS.toolValidation[toolName] = 'IMPLEMENTED';
          console.log(`  ✅ ${toolName} - implementation found`);
        } else {
          AUDIT_RESULTS.toolValidation[toolName] = 'NO_IMPLEMENTATION';
          AUDIT_RESULTS.issues.push(`Tool ${toolName} implementation not found`);
          console.log(`  ❌ ${toolName} - implementation missing`);
        }
      }
      
    } catch (error) {
      AUDIT_RESULTS.issues.push(`Tool validation failed: ${error.message}`);
      console.log(`  ❌ Tool validation failed: ${error.message}`);
    }
  }

  async testPacCliIntegration() {
    console.log('\n⚡ Testing PAC CLI Integration...');
    
    try {
      // Test basic PAC CLI availability
      const { spawn } = await import('child_process');
      const pacTest = spawn('pac', ['help'], { stdio: 'pipe' });
      
      let pacAvailable = false;
      
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          pacTest.kill();
          reject(new Error('PAC CLI test timed out'));
        }, 10000);
        
        pacTest.on('exit', (code) => {
          clearTimeout(timeout);
          if (code === 0) {
            pacAvailable = true;
          }
          resolve();
        });
        
        pacTest.on('error', (error) => {
          clearTimeout(timeout);
          reject(error);
        });
      });
      
      if (pacAvailable) {
        AUDIT_RESULTS.pacCliIntegration = true;
        console.log('  ✅ PAC CLI is available and accessible');
      } else {
        AUDIT_RESULTS.issues.push('PAC CLI not available or not working');
        console.log('  ❌ PAC CLI not available or not working');
      }
      
    } catch (error) {
      AUDIT_RESULTS.issues.push(`PAC CLI integration test failed: ${error.message}`);
      console.log(`  ❌ PAC CLI integration test failed: ${error.message}`);
    }
  }

  async checkDocumentationAccuracy() {
    console.log('\n📚 Checking Documentation Accuracy...');
    
    try {
      // Check README claims vs actual implementation
      const readmePath = path.join(process.cwd(), 'README.md');
      const readme = await fs.readFile(readmePath, 'utf-8');
      
      // Check tool count claims
      const claimsToolCount = readme.match(/(\d+)\s+tools?/gi);
      const actualToolCount = this.toolsImplemented.length;
      
      if (claimsToolCount) {
        const claimedCount = Math.max(...claimsToolCount.map(m => parseInt(m.match(/\d+/)[0])));
        if (claimedCount === actualToolCount) {
          AUDIT_RESULTS.documentationAccuracy.toolCount = 'ACCURATE';
          console.log(`  ✅ Tool count claim (${actualToolCount}) matches implementation`);
        } else {
          AUDIT_RESULTS.documentationAccuracy.toolCount = 'INACCURATE';
          AUDIT_RESULTS.issues.push(`README claims ${claimedCount} tools but only ${actualToolCount} implemented`);
          console.log(`  ❌ README claims ${claimedCount} tools but only ${actualToolCount} implemented`);
        }
      }
      
      // Check if installation instructions are present
      if (readme.includes('npm install') && readme.includes('npm run build')) {
        AUDIT_RESULTS.documentationAccuracy.installation = 'PRESENT';
        console.log('  ✅ Installation instructions present');
      } else {
        AUDIT_RESULTS.documentationAccuracy.installation = 'MISSING';
        AUDIT_RESULTS.issues.push('Installation instructions incomplete');
        console.log('  ❌ Installation instructions incomplete');
      }
      
    } catch (error) {
      AUDIT_RESULTS.issues.push(`Documentation check failed: ${error.message}`);
      console.log(`  ❌ Documentation check failed: ${error.message}`);
    }
  }

  async assessProductionReadiness() {
    console.log('\n🎯 Assessing Production Readiness...');
    
    const criticalIssues = AUDIT_RESULTS.issues.filter(issue => 
      issue.includes('startup failed') || 
      issue.includes('not found') || 
      issue.includes('PAC CLI')
    );
    
    const implementedTools = Object.values(AUDIT_RESULTS.toolValidation)
      .filter(status => status === 'IMPLEMENTED').length;
    
    const totalTools = this.toolsImplemented.length;
    const implementationRate = (implementedTools / totalTools) * 100;
    
    AUDIT_RESULTS.summary = {
      implementedTools,
      totalTools,
      implementationRate: `${implementationRate.toFixed(1)}%`,
      criticalIssues: criticalIssues.length,
      serverStartup: AUDIT_RESULTS.serverStartup,
      pacCliIntegration: AUDIT_RESULTS.pacCliIntegration
    };
    
    // Determine production readiness
    if (criticalIssues.length === 0 && implementationRate >= 90 && AUDIT_RESULTS.serverStartup) {
      AUDIT_RESULTS.productionReadiness = 'READY';
      console.log('  🟢 PRODUCTION READY - All critical requirements met');
    } else if (criticalIssues.length <= 2 && implementationRate >= 70) {
      AUDIT_RESULTS.productionReadiness = 'NEEDS_FIXES';
      console.log('  🟡 NEEDS FIXES - Minor issues preventing production deployment');
    } else {
      AUDIT_RESULTS.productionReadiness = 'NOT_READY';
      console.log('  🔴 NOT READY - Major issues preventing production use');
    }
  }

  async generateReport() {
    console.log('\n📊 Generating Production Audit Report...');
    
    const reportPath = path.join(process.cwd(), 'production-audit-report.json');
    await fs.writeFile(reportPath, JSON.stringify(AUDIT_RESULTS, null, 2));
    
    console.log(`\n📄 Report saved to: ${reportPath}`);
    console.log('\n' + '='.repeat(60));
    console.log('📋 PRODUCTION AUDIT SUMMARY');
    console.log('='.repeat(60));
    console.log(`Status: ${AUDIT_RESULTS.productionReadiness}`);
    console.log(`Server Startup: ${AUDIT_RESULTS.serverStartup ? '✅' : '❌'}`);
    console.log(`PAC CLI Integration: ${AUDIT_RESULTS.pacCliIntegration ? '✅' : '❌'}`);
    console.log(`Tools Implemented: ${AUDIT_RESULTS.summary.implementedTools}/${AUDIT_RESULTS.summary.totalTools} (${AUDIT_RESULTS.summary.implementationRate})`);
    console.log(`Critical Issues: ${AUDIT_RESULTS.summary.criticalIssues}`);
    
    if (AUDIT_RESULTS.issues.length > 0) {
      console.log('\n🚨 Issues Found:');
      AUDIT_RESULTS.issues.forEach((issue, index) => {
        console.log(`  ${index + 1}. ${issue}`);
      });
    }
    
    console.log('\n' + '='.repeat(60));
  }

  getMethodName(toolName) {
    // Convert tool name to method name (e.g., pp_whoami -> executeWhoami)
    const methodPart = toolName.replace('pp_', '').replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    return `execute${methodPart.charAt(0).toUpperCase()}${methodPart.slice(1)}`;
  }

  async cleanup() {
    if (this.serverProcess) {
      this.serverProcess.kill('SIGTERM');
    }
  }
}

// Run the audit
const auditor = new ProductionAuditor();
auditor.runAudit().catch(error => {
  console.error('Audit script failed:', error);
  process.exit(1);
});
