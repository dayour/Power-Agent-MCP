// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { runPacCommand } from '../runtime/pac.js';
export class QualityTools {
    getTools() {
        return [
            {
                name: 'pp_solution_checker',
                description: 'Run automated solution analysis with PowerApps checker integration',
                inputSchema: {
                    type: 'object',
                    properties: {
                        solutionInputFile: {
                            type: 'string',
                            description: 'Path to the solution file to analyze'
                        },
                        solutionCheckerResult: {
                            type: 'string',
                            description: 'Output path for checker results'
                        },
                        ruleSet: {
                            type: 'string',
                            enum: ['AppSource Certification', 'Solution Checker'],
                            description: 'Rule set to use for analysis'
                        },
                        level: {
                            type: 'string',
                            enum: ['High', 'Medium', 'Low'],
                            description: 'Minimum issue level to report'
                        },
                        geography: {
                            type: 'string',
                            description: 'Geography for the checker service'
                        },
                        excludedFiles: {
                            type: 'string',
                            description: 'Files to exclude from analysis'
                        }
                    },
                    required: ['solutionInputFile']
                }
            }
        ];
    }
    getHandlers() {
        return {
            pp_solution_checker: this.runSolutionChecker.bind(this)
        };
    }
    async runSolutionChecker(args) {
        const result = await runPacCommand(['solution', 'check'], {
            path: args.solutionInputFile,
            outputDirectory: args.solutionCheckerResult,
            ruleSet: args.ruleSet,
            level: args.level,
            geo: args.geography,
            excludedFiles: args.excludedFiles,
        });
        return {
            success: true,
            message: 'Solution checker analysis completed',
            solutionInputFile: args.solutionInputFile,
            ruleSet: args.ruleSet || 'Solution Checker',
            output: result.stdout,
        };
    }
}
//# sourceMappingURL=quality.js.map