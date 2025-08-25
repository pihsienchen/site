import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [{
  ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"]
}, ...compat.extends("next/core-web-vitals"), {
  rules: {
    // Customize rules
    "@next/next/no-img-element": "error",
    "react/no-unescaped-entities": "error",
    "react/jsx-key": "error",
    // Add other useful rules
    "no-unused-vars": "warn",
    "prefer-const": "warn",
  },
}];

export default eslintConfig;