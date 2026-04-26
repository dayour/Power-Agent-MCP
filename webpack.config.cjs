const { resolve } = require("path");
const find = require("find");

const tasks = find.fileSync(/tasks[/\\].*[/\\]index.ts$/, "src");

const externalizePrivatePowerPlatformWrapper = ({ request }, callback) => {
  if (
    request?.startsWith("@microsoft/powerplatform-cli-wrapper") ||
    request?.startsWith("azure-pipelines-task-lib")
  ) {
    callback(null, `commonjs ${request}`);
    return;
  }
  callback();
};

const taskConfigs = tasks.map((task) => ({
  entry: `./${task}`,
  target: "node",
  externalsPresets: { node: true },
  externals: [externalizePrivatePowerPlatformWrapper],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            compilerOptions: {
              module: "CommonJS",
              rootDir: "."
            }
          }
        },
        exclude: [/out/],
      },
    ],
  },
  mode: "development",
  // mode: "production",
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: task.replace(/\.ts$/, ".js").replace(/src[/\\]/, ""),
    path: resolve(__dirname, "dist"),
  },
}));

// MCP files are built separately via `npm run build` (tsc).
// They are not included in the webpack pipeline to reduce memory usage.

module.exports = taskConfigs;
