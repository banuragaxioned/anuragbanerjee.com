import base, { ignorePatterns } from "@anuragbanerjee/oxfmt-config";
import { defineConfig } from "oxfmt";

export default defineConfig({
  ...base,
  ignorePatterns: [
    ...ignorePatterns,
    "public",
    "**/components/ui",
    // Prose, not code: migrated posts and weeknotes.
    "src/content",
  ],
  sortTailwindcss: {
    functions: ["cn", "cva", "clsx"],
    stylesheet: "./src/app/globals.css",
  },
});
