// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { spawn } from 'child_process';

export interface PacResult {
  success: boolean;
  exitCode: number;
  stdout: string;
  stderr: string;
}

export interface RunPacOptions {
  cwd?: string;
  env?: NodeJS.ProcessEnv;
  timeoutMs?: number;
}

/**
 * Execute the Power Platform CLI (`pac`) with the given arguments.
 * The MCP-native runtime depends only on a locally installed `pac` executable.
 */
export function runPac(args: string[], options: RunPacOptions = {}): Promise<PacResult> {
  return new Promise((resolve, reject) => {
    const child = spawn('pac', args, {
      cwd: options.cwd,
      env: { ...process.env, ...(options.env || {}) },
      shell: process.platform === 'win32',
    });

    let stdout = '';
    let stderr = '';
    let timer: NodeJS.Timeout | undefined;

    if (options.timeoutMs && options.timeoutMs > 0) {
      timer = setTimeout(() => {
        child.kill();
        reject(new Error(`pac ${args.join(' ')} timed out after ${options.timeoutMs}ms`));
      }, options.timeoutMs);
    }

    child.stdout.on('data', (chunk: Buffer) => { stdout += chunk.toString(); });
    child.stderr.on('data', (chunk: Buffer) => { stderr += chunk.toString(); });
    child.on('error', (err) => {
      if (timer) clearTimeout(timer);
      reject(err);
    });
    child.on('close', (code) => {
      if (timer) clearTimeout(timer);
      const exitCode = typeof code === 'number' ? code : -1;
      resolve({ success: exitCode === 0, exitCode, stdout, stderr });
    });
  });
}

/**
 * Build a flat argument list from an object of flag -> value pairs.
 * - undefined/null values are skipped.
 * - boolean true emits the flag with no value, false skips.
 * - arrays repeat the flag for each value.
 */
export function buildPacArgs(
  command: string[],
  flags: Record<string, string | number | boolean | string[] | undefined | null>
): string[] {
  const args = [...command];
  for (const [flag, value] of Object.entries(flags)) {
    if (value === undefined || value === null) continue;
    if (typeof value === 'boolean') {
      if (value) args.push(`--${flag}`);
      continue;
    }
    if (Array.isArray(value)) {
      for (const v of value) {
        args.push(`--${flag}`, String(v));
      }
      continue;
    }
    args.push(`--${flag}`, String(value));
  }
  return args;
}

/**
 * Execute a PAC command and return a structured tool result.
 * Throws on non-zero exit so MCP surfaces the failure to the caller.
 */
export async function runPacCommand(
  command: string[],
  flags: Record<string, string | number | boolean | string[] | undefined | null> = {},
  options: RunPacOptions = {}
): Promise<PacResult> {
  const args = buildPacArgs(command, flags);
  const result = await runPac(args, options);
  if (!result.success) {
    const detail = (result.stderr || result.stdout || '').trim();
    throw new Error(`pac ${args.join(' ')} failed (exit ${result.exitCode}): ${detail}`);
  }
  return result;
}
