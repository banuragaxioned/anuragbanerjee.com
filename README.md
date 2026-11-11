# anuragbanerjee.com

Personal site of Anurag Banerjee — posts, weeknotes, and zettles.

Built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com), and [shadcn/ui](https://ui.shadcn.com), fully static, deployed to [Vercel](https://vercel.com).

## Project structure

```text
/
├── public/                 # static assets (favicon)
├── src/
│   ├── components/         # shared Astro components
│   ├── content/            # markdown content
│   │   ├── posts/          # long-form posts (migrated from Medium)
│   │   ├── weeknotes/      # weekly notes
│   │   ├── zettles/        # short notes (synced from Obsidian)
│   │   └── drafts/         # unpublished drafts (not built)
│   ├── content.config.ts   # content collection schemas
│   ├── layouts/
│   ├── lib/                # site constants, JSON-LD builders, share cards, brand mark
│   ├── pages/
│   └── styles/
└── astro.config.mjs
```

## Commands

Uses [Bun](https://bun.sh) as the package manager and script runner.

| Command             | Action                                           |
| :------------------ | :----------------------------------------------- |
| `bun install`       | Install dependencies and the Git hooks           |
| `bun run dev`       | Start local dev server at `localhost:4321`       |
| `bun run build`     | Build the production site to `./dist/`           |
| `bun run preview`   | Preview the build locally                        |
| `bun run format`    | Format with [oxfmt](https://oxc.rs)              |
| `bun run lint`      | Lint with [oxlint](https://oxc.rs) (type-aware)  |
| `bun run lint:fix`  | Lint and apply safe autofixes                    |
| `bun run check`     | Format, then lint                                |
| `bun run typecheck` | Type-check `.ts` and `.astro` with `astro check` |
| `bun run verify`    | Format check, lint, typecheck and build          |
| `bun run assets`    | Regenerate the favicon, icons and share card     |
| `bun run taze`      | Report available dependency updates              |
| `bun run taze:fix`  | Update package.json and install                  |

A [Lefthook](https://lefthook.dev) pre-commit hook lints and formats staged files.

## Content and links

- Posts, weeknotes and zettles take an optional `updated` date in their frontmatter. When set it appears on the page, in `article:modified_time` and in the structured data's `dateModified`; `date` stays the published date.
- Feeds: `/rss.xml` (posts), `/weeknotes/rss.xml` and `/zettles/rss.xml`. A zettle without a `date` uses the timestamp in its id.
- Short links (`/github`, `/x`, `/linkedin`, `/instagram`, `/rss`, `/blog`) are redirects in `vercel.json`. Keep the social ones in step with `socialLinks` in `src/lib/site.ts`.
