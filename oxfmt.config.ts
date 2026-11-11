import { defineConfig } from "oxfmt";

export default defineConfig({
  arrowParens: "always",
  // Formats .astro files through oxfmt's bundled Prettier; needs
  // @astrojs/compiler-rs. Keep compressHTML on "html": the default "jsx" treats
  // whitespace like JSX and inserts spaces inside links and before punctuation.
  astro: { compressHTML: "html" },
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: "lf",
  ignorePatterns: [
    ".claude",
    ".astro",
    "dist",
    "public",
    "bun.lock",
    // Prose, not code: migrated posts and weeknotes.
    "src/content",
  ],
  jsxSingleQuote: false,
  printWidth: 80,
  proseWrap: "preserve",
  semi: true,
  singleQuote: false,
  sortImports: {
    newlinesBetween: true,
  },
  sortPackageJson: true,
  sortScripts: true,
  sortTailwindcss: {
    functions: ["cn", "cva", "clsx"],
    stylesheet: "./src/styles/global.css",
  },
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,
});
