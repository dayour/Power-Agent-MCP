"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRunningOnAgent = isRunningOnAgent;
function isRunningOnAgent() {
    return !!process.env['AGENT_JOBNAME'];
}
