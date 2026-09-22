import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import nodePlugin from "eslint-plugin-n";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";


export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { globals: globals.browser } 
  },
  tseslint.configs.recommended,
  nodePlugin.configs["flat/recommended-module"],
  
  // ALWAYS stays at the very end to disable formatting rules in ESLint
  eslintConfigPrettier,
]);
