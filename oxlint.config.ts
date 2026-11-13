import { ignorePatterns } from "@anuragbanerjee/oxlint-config";
import next from "@anuragbanerjee/oxlint-config/next";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [next],
  ignorePatterns: [...ignorePatterns, "**/components/ui/**"],
  options: { typeAware: true },
  overrides: [
    {
      // Next calls these as async functions; they have nothing to await.
      files: ["next.config.ts"],
      rules: { "eslint/require-await": "off" },
    },
  ],
});
