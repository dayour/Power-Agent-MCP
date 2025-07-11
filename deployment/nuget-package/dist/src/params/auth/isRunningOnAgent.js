// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export function isRunningOnAgent() {
    return !!process.env['AGENT_JOBNAME'];
}
