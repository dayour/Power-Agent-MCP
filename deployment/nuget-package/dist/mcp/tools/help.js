// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export class HelpTools {
    getTools() {
        return [
            {
                name: 'pp_help',
                description: 'Show help for the Microsoft Power Platform CLI',
                inputSchema: {
                    type: 'object',
                    properties: {
                        command: {
                            type: 'string',
                            description: 'Specific command to get help for'
                        }
                    }
                }
            }
        ];
    }
    getHandlers() {
        return {
            pp_help: async (args) => {
                return { content: `Power Platform CLI help displayed${args.command ? ` for command: ${args.command}` : ''}` };
            }
        };
    }
}
