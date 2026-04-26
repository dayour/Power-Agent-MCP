import gulp from "gulp";
import eslint from "gulp-eslint-new";
import { spawn } from "node:child_process";

function runMocha(args) {
  return new Promise((resolve, reject) => {
    const child = spawn("npx", ["mocha", ...args], {
      shell: true,
      stdio: "inherit",
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Mocha exited with code ${code}`));
      }
    });
  });
}

export default async function unitTest() {
  await runMocha([
    "--require",
    "ts-node/register",
    "--ui",
    "bdd",
    "--color",
    "test/unit-test/*.test.ts",
  ]);
  return gulp
    .src("test/unit-test/*.test.ts", { read: false })
    .pipe(eslint.format());
};
