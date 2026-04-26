import fs from "fs-extra";
import { join } from "path";
import webpack from "webpack";

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

export default async function compile() {
  // detect if running on an AzDevOps build agent
  const packageJson = require("../package.json");
  if (process.env.BUILD_BUILDID) {
    // https://docs.microsoft.com/en-us/azure/devops/pipelines/scripts/logging-commands?view=azure-devops&tabs=bash
    console.log(`##vso[build.updatebuildnumber]${packageJson.version}`);
  } else {
    console.log(`local build: ${packageJson.version}`);
  }
  const configs = require("../webpack.config.cjs");
  for (const config of configs) {
    await runWebpack(config);
  }
};

function runWebpack(config) {
  return new Promise((resolve, reject) => {
    const compiler = webpack(config);
    compiler.run((err, result) => {
      compiler.close((closeErr) => {
        if (closeErr) {
          console.error(`Webpack close error:\n${closeErr}`);
        }
      });

      if (err) {
        console.error(`Webpack error:\n${err}`);
        reject(err);
        return;
      }

      if (result?.hasErrors()) {
        const details = result.toString({ all: false, errors: true, warnings: true });
        console.error(`Webpack compilation failed:\n${details}`);
        reject(new Error("Webpack compilation failed"));
        return;
      }

      logBuildOutput(result);
      resolve();
    });
  });
}

function logBuildOutput(result) {
  const statsList = result.stats ?? [result];
  statsList.forEach((stats) => {
    Object.keys(stats.compilation.assets).forEach(function (key) {
      console.log(`Webpack: output ${key}`);
    });
    const size = fs.statSync(join(stats.compilation.outputOptions.path, stats.compilation.outputOptions.filename)).size;
    console.log(`Webpack: finished, size = ${size}`);
  });
}
