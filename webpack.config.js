const { resolve } = require("path");
const find = require("find");

const tasks = find.fileSync(/tasks[/\\].*[/\\]index.ts$/, "src");
const mcpFiles = find.fileSync(/mcp[/\\].*\.ts$/, "src");

const taskConfigs = tasks.map((task) => ({
  entry: `./${task}`,
  target: "node",
  externalsPresets: { node: true },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
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

const mcpConfigs = mcpFiles.map((mcpFile) => ({
  entry: `./${mcpFile}`,
  target: "node",
  externalsPresets: { node: true },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: [/out/],
      },
    ],
  },
  mode: "development",
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: mcpFile.replace(/\.ts$/, ".js").replace(/src[/\\]/, ""),
    path: resolve(__dirname, "dist"),
  },
}));

module.exports = [...taskConfigs, ...mcpConfigs];
