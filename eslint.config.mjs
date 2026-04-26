import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

const nodeGlobals = {
  Buffer: "readonly",
  clearImmediate: "readonly",
  clearInterval: "readonly",
  clearTimeout: "readonly",
  console: "readonly",
  global: "readonly",
  process: "readonly",
  setImmediate: "readonly",
  setInterval: "readonly",
  setTimeout: "readonly",
  URL: "readonly",
  URLSearchParams: "readonly",
  __dirname: "readonly",
  __filename: "readonly",
  exports: "readonly",
  module: "readonly",
  require: "readonly",
};

export default [
  {
    ignores: [
      "bin/**",
      "dist/**",
      "node_modules/**",
      "out/**",
      "deployment/vscode-extension/out/**",
      "deployment/vscode-extension/node_modules/**",
    ],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: nodeGlobals,
    },
  },
  {
    files: ["src/**/*.ts", "test/**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
      },
      globals: nodeGlobals,
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "no-undef": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
];