import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    // General configuration for all JavaScript files
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.node,   // Enable Node.js globals like require, module, exports
      },
    },
  },
  pluginJs.configs.recommended,  // Use ESLint recommended JavaScript rules

  {
    // Jest-specific configuration for test files
    files: ["**/*.test.js", "**/*.test.jsx"],  // Specify test file patterns
    languageOptions: {
      globals: {
        ...globals.node,   // Ensure Node.js globals are available for test files
        jest: true,         // Enable Jest globals like describe, it, expect, afterAll
      },
    },
  },
];
