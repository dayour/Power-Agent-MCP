// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export class TelemetryTools {
    getTools() {
        return [
            {
                name: 'pp_telemetry_help',
                description: 'Show help for telemetry commands',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_telemetry_disable',
                description: 'Choose to not send usage information to help Microsoft improve this product',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_telemetry_enable',
                description: 'Choose to send usage information to help Microsoft improve this product',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'pp_telemetry_status',
                description: 'Show the current status of telemetry',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            }
        ];
    }
    getHandlers() {
        return {
            pp_telemetry_help: async () => {
                return { content: 'Telemetry commands help displayed' };
            },
            pp_telemetry_disable: async () => {
                return { content: 'Telemetry disabled. Usage information will not be sent to Microsoft.' };
            },
            pp_telemetry_enable: async () => {
                return { content: 'Telemetry enabled. Usage information will be sent to Microsoft to help improve the product.' };
            },
            pp_telemetry_status: async () => {
                return { content: 'Current telemetry status displayed' };
            }
        };
    }
}
