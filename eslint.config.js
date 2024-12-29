import js from "@eslint/js";

/** @type {import("eslint").Linter.Config}  */
const config = {
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  }
};

export default [js.configs.recommended, config];
