import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export function createCliRunner(cliPath) {
  return async function runCli(args) {
    try {
      const { stdout, stderr } = await execFileAsync("node", [cliPath, ...args]);
      return { stdout, stderr, exitCode: 0 };
    } catch (error) {
      return { stdout: error.stdout ?? "", stderr: error.stderr ?? "", exitCode: error.code ?? 1 };
    }
  };
}
