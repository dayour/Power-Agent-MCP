// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * Bridge for tool handlers that previously delegated to inherited Azure DevOps
 * task modules under `src/tasks/**`. The unified standalone Power Agent MCP
 * runtime does not load that legacy bundle. Tools that have not yet been
 * reimplemented as direct PAC CLI calls should call `legacyTaskUnavailable`
 * so the MCP client receives a clear, actionable error instead of a crash.
 */
export function legacyTaskUnavailable(toolName, pacHint) {
    throw new Error(`Tool '${toolName}' is not yet wired to the standalone PAC CLI runtime. ` +
        `Run the equivalent command directly: ${pacHint}`);
}
//# sourceMappingURL=legacy.js.map