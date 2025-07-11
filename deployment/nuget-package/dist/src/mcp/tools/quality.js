// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
        const { main: checkerMain } = await import('../../tasks/checker/checker-v2/index.js');
        process.env.INPUT_SOLUTIONINPUTFILE = args.solutionInputFile;
        if (args.solutionCheckerResult)
            process.env.INPUT_SOLUTIONCHECKERRESULT = args.solutionCheckerResult;
        if (args.ruleSet)
            process.env.INPUT_RULESET = args.ruleSet;
        if (args.level)
            process.env.INPUT_LEVEL = args.level;
        if (args.geography)
            process.env.INPUT_GEOGRAPHY = args.geography;
        if (args.excludedFiles)
            process.env.INPUT_EXCLUDEDFILES = args.excludedFiles;
        try {
            await checkerMain();
            return {
                success: true,
                message: 'Solution checker analysis completed',
                solutionInputFile: args.solutionInputFile,
                ruleSet: args.ruleSet || 'Solution Checker'
            };
        }
        catch (error) {
            throw new Error(`Failed to run solution checker: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}
