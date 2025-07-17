import * as vscode from 'vscode';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const execAsync = promisify(exec);

export interface Dependency {
    name: string;
    displayName: string;
    version: string;
    isInstalled: boolean;
    installer?: () => Promise<void>;
    validator: () => Promise<boolean>;
    downloadUrl?: string;
    installCommand?: string;
}

/**
 * Auto-detect and install missing dependencies for Power Agent MCP
 */
export class DependencyManager {
    
    private dependencies: Dependency[] = [
        {
            name: 'dotnet',
            displayName: '.NET SDK 6.0+',
            version: '6.0+',
            isInstalled: false,
            validator: this.validateDotNet.bind(this),
            installer: this.installDotNet.bind(this),
            downloadUrl: 'https://dotnet.microsoft.com/download'
        },
        {
            name: 'nodejs',
            displayName: 'Node.js 18.0+',
            version: '18.0+',
            isInstalled: false,
            validator: this.validateNodeJS.bind(this),
            installer: this.installNodeJS.bind(this),
            downloadUrl: 'https://nodejs.org/en/download/'
        },
        {
            name: 'pac-cli',
            displayName: 'Power Platform CLI',
            version: 'latest',
            isInstalled: false,
            validator: this.validatePacCli.bind(this),
            installer: this.installPacCli.bind(this),
            installCommand: 'dotnet tool install --global Microsoft.PowerPlatform.CLI.Tool'
        }
    ];
    
    /**
     * Check all dependencies and return their status
     */
    async checkDependencies(): Promise<Dependency[]> {
        const validationPromises = this.dependencies.map(async (dep) => {
            const isInstalled = await dep.validator();
            return {
                ...dep,
                isInstalled
            };
        });
        
        const checkedDependencies = await Promise.all(validationPromises);
        return checkedDependencies;
    }
    
    /**
     * Install missing dependencies with user confirmation
     */
    async installMissingDependencies(showProgress: boolean = true): Promise<void> {
        const dependencies = await this.checkDependencies();
        const missingDeps = dependencies.filter(dep => !dep.isInstalled);
        
        if (missingDeps.length === 0) {
            if (showProgress) {
                vscode.window.showInformationMessage('All dependencies are already installed!');
            }
            return;
        }
        
        const depNames = missingDeps.map(dep => dep.displayName).join(', ');
        const result = await vscode.window.showInformationMessage(
            `The following dependencies are missing: ${depNames}. Would you like to install them automatically?`,
            'Install All',
            'Install Individually',
            'Skip'
        );
        
        if (result === 'Install All') {
            await this.installDependenciesWithProgress(missingDeps);
        } else if (result === 'Install Individually') {
            await this.installDependenciesIndividually(missingDeps);
        }
    }
    
    /**
     * Install dependencies with progress notification
     */
    private async installDependenciesWithProgress(dependencies: Dependency[]): Promise<void> {
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: 'Installing Power Agent MCP Dependencies',
            cancellable: false
        }, async (progress) => {
            const totalSteps = dependencies.length;
            
            for (let i = 0; i < dependencies.length; i++) {
                const dep = dependencies[i];
                progress.report({
                    increment: (100 / totalSteps),
                    message: `Installing ${dep.displayName}...`
                });
                
                try {
                    if (dep.installer) {
                        await dep.installer();
                        vscode.window.showInformationMessage(`✅ ${dep.displayName} installed successfully`);
                    } else {
                        await this.showManualInstallInstructions(dep);
                    }
                } catch (error: any) {
                    vscode.window.showErrorMessage(`❌ Failed to install ${dep.displayName}: ${error.message}`);
                    await this.showManualInstallInstructions(dep);
                }
            }
        });
    }
    
    /**
     * Install dependencies one by one with user confirmation
     */
    private async installDependenciesIndividually(dependencies: Dependency[]): Promise<void> {
        for (const dep of dependencies) {
            const result = await vscode.window.showInformationMessage(
                `Install ${dep.displayName}?`,
                'Yes',
                'No',
                'Manual Instructions'
            );
            
            if (result === 'Yes') {
                try {
                    if (dep.installer) {
                        await vscode.window.withProgress({
                            location: vscode.ProgressLocation.Notification,
                            title: `Installing ${dep.displayName}`,
                            cancellable: false
                        }, async () => {
                            await dep.installer!();
                        });
                        vscode.window.showInformationMessage(`✅ ${dep.displayName} installed successfully`);
                    } else {
                        await this.showManualInstallInstructions(dep);
                    }
                } catch (error: any) {
                    vscode.window.showErrorMessage(`❌ Failed to install ${dep.displayName}: ${error.message}`);
                    await this.showManualInstallInstructions(dep);
                }
            } else if (result === 'Manual Instructions') {
                await this.showManualInstallInstructions(dep);
            }
        }
    }
    
    /**
     * Show manual installation instructions
     */
    private async showManualInstallInstructions(dep: Dependency): Promise<void> {
        let instructions = `Manual installation required for ${dep.displayName}:\n\n`;
        
        if (dep.installCommand) {
            instructions += `Command: ${dep.installCommand}\n\n`;
        }
        
        if (dep.downloadUrl) {
            instructions += `Download from: ${dep.downloadUrl}\n\n`;
        }
        
        const result = await vscode.window.showInformationMessage(
            instructions,
            'Open Download Page',
            'Copy Command',
            'OK'
        );
        
        if (result === 'Open Download Page' && dep.downloadUrl) {
            vscode.env.openExternal(vscode.Uri.parse(dep.downloadUrl));
        } else if (result === 'Copy Command' && dep.installCommand) {
            vscode.env.clipboard.writeText(dep.installCommand);
            vscode.window.showInformationMessage('Command copied to clipboard');
        }
    }
    
    /**
     * Validate .NET SDK installation
     */
    private async validateDotNet(): Promise<boolean> {
        try {
            const { stdout } = await execAsync('dotnet --version');
            const version = stdout.trim();
            
            // Check if version is 6.0 or higher
            const majorVersion = parseInt(version.split('.')[0]);
            return majorVersion >= 6;
        } catch (error) {
            return false;
        }
    }
    
    /**
     * Install .NET SDK (cross-platform)
     */
    private async installDotNet(): Promise<void> {
        const platform = os.platform();
        
        switch (platform) {
            case 'win32':
                await this.installDotNetWindows();
                break;
            case 'darwin':
                await this.installDotNetMacOS();
                break;
            case 'linux':
                await this.installDotNetLinux();
                break;
            default:
                throw new Error(`Automatic .NET installation not supported on ${platform}`);
        }
    }
    
    private async installDotNetWindows(): Promise<void> {
        // Use winget or chocolatey if available, otherwise show manual instructions
        try {
            await execAsync('winget install Microsoft.DotNet.SDK.8 --silent');
        } catch (wingetError) {
            try {
                await execAsync('choco install dotnet-sdk -y');
            } catch (chocoError) {
                throw new Error('Please install .NET SDK manually from https://dotnet.microsoft.com/download');
            }
        }
    }
    
    private async installDotNetMacOS(): Promise<void> {
        try {
            await execAsync('brew install --cask dotnet-sdk');
        } catch (error) {
            throw new Error('Please install .NET SDK manually using Homebrew: brew install --cask dotnet-sdk');
        }
    }
    
    private async installDotNetLinux(): Promise<void> {
        // Try common package managers
        const distro = await this.getLinuxDistro();
        
        switch (distro) {
            case 'ubuntu':
            case 'debian':
                await execAsync('sudo apt-get update && sudo apt-get install -y dotnet-sdk-6.0');
                break;
            case 'fedora':
            case 'centos':
            case 'rhel':
                await execAsync('sudo dnf install -y dotnet-sdk-6.0');
                break;
            default:
                throw new Error('Please install .NET SDK manually for your Linux distribution');
        }
    }
    
    /**
     * Validate Node.js installation
     */
    private async validateNodeJS(): Promise<boolean> {
        try {
            const { stdout } = await execAsync('node --version');
            const version = stdout.trim().replace('v', '');
            const majorVersion = parseInt(version.split('.')[0]);
            return majorVersion >= 18;
        } catch (error) {
            return false;
        }
    }
    
    /**
     * Install Node.js (cross-platform)
     */
    private async installNodeJS(): Promise<void> {
        const platform = os.platform();
        
        switch (platform) {
            case 'win32':
                await this.installNodeJSWindows();
                break;
            case 'darwin':
                await this.installNodeJSMacOS();
                break;
            case 'linux':
                await this.installNodeJSLinux();
                break;
            default:
                throw new Error(`Automatic Node.js installation not supported on ${platform}`);
        }
    }
    
    private async installNodeJSWindows(): Promise<void> {
        try {
            await execAsync('winget install OpenJS.NodeJS --silent');
        } catch (wingetError) {
            try {
                await execAsync('choco install nodejs -y');
            } catch (chocoError) {
                throw new Error('Please install Node.js manually from https://nodejs.org/');
            }
        }
    }
    
    private async installNodeJSMacOS(): Promise<void> {
        try {
            await execAsync('brew install node');
        } catch (error) {
            throw new Error('Please install Node.js manually using Homebrew: brew install node');
        }
    }
    
    private async installNodeJSLinux(): Promise<void> {
        // Use NodeSource repository for latest LTS
        try {
            const scriptPath = path.join(os.tmpdir(), 'nodesource_setup.sh');
            await execAsync(`curl -fsSL https://deb.nodesource.com/setup_lts.x -o ${scriptPath}`);
            
            // Optionally verify the script's integrity (e.g., checksum or signature)
            // Example: const expectedChecksum = 'abc123...'; // Replace with actual checksum
            // const actualChecksum = await execAsync(`sha256sum ${scriptPath}`);
            // if (!actualChecksum.includes(expectedChecksum)) {
            //     throw new Error('Checksum verification failed for NodeSource setup script.');
            // }
            
            await execAsync(`sudo -E bash ${scriptPath}`);
            await execAsync('sudo apt-get install -y nodejs');
            
            // Clean up temporary script file
            fs.unlinkSync(scriptPath);
        } catch (error) {
            throw new Error('Please install Node.js manually from https://nodejs.org/');
        }
    }
    
    /**
     * Validate PAC CLI installation
     */
    private async validatePacCli(): Promise<boolean> {
        try {
            await execAsync('pac --version');
            return true;
        } catch (error) {
            return false;
        }
    }
    
    /**
     * Install PAC CLI
     */
    private async installPacCli(): Promise<void> {
        try {
            await execAsync('dotnet tool install --global Microsoft.PowerPlatform.CLI.Tool');
        } catch (error) {
            throw new Error('Failed to install Power Platform CLI. Please ensure .NET SDK is installed first.');
        }
    }
    
    /**
     * Detect Linux distribution
     */
    private async getLinuxDistro(): Promise<string> {
        try {
            const { stdout } = await execAsync('cat /etc/os-release');
            const lines = stdout.split('\n');
            const idLine = lines.find(line => line.startsWith('ID='));
            
            if (idLine) {
                return idLine.split('=')[1].replace(/"/g, '').toLowerCase();
            }
        } catch (error) {
            // Fallback detection
        }
        
        return 'unknown';
    }
    
    /**
     * Get missing dependencies count
     */
    async getMissingDependenciesCount(): Promise<number> {
        const dependencies = await this.checkDependencies();
        return dependencies.filter(dep => !dep.isInstalled).length;
    }
    
    /**
     * Get dependencies summary for display
     */
    async getDependenciesSummary(): Promise<string> {
        const dependencies = await this.checkDependencies();
        const installed = dependencies.filter(dep => dep.isInstalled);
        const missing = dependencies.filter(dep => !dep.isInstalled);
        
        let summary = `Dependencies Status:\n`;
        summary += `✅ Installed: ${installed.length}/${dependencies.length}\n`;
        
        if (missing.length > 0) {
            summary += `❌ Missing: ${missing.map(dep => dep.displayName).join(', ')}`;
        }
        
        return summary;
    }
}