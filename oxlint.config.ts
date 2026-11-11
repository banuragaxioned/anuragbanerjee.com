import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import react from "ultracite/oxlint/react";

export default defineConfig({
  extends: [core, react],
  ignorePatterns: [
    ...(core.ignorePatterns ?? []),
    ".claude",
    ".astro",
    "dist",
    // Vendored from shadcn; local fixes would be replayed on the next `shadcn add`.
    "src/components/ui/**",
  ],
  options: { typeAware: true },
  rules: {
    // Astro endpoints are idiomatic as `export const GET: APIRoute = ...`, and
    // the shadcn `cn` helper is a declaration; one style cannot cover both.
    "eslint/func-style": "off",
    // Alphabetising keys would scramble JSON-LD, content schemas and config
    // objects whose order is deliberate (e.g. `@context` before `@type`).
    "eslint/sort-keys": "off",
    // Optional frontmatter fields (`excerpt`) are checked for truthiness.
    "typescript/strict-boolean-expressions": [
      "error",
      {
        allowNullableBoolean: true,
        allowNullableNumber: true,
        allowNullableString: true,
      },
    ],
  },
});
