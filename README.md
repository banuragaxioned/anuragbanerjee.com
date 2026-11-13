# anuragbanerjee.com

Personal site of Anurag Banerjee — posts and weeknotes.

Built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com) and [shadcn/ui](https://ui.shadcn.com), prerendered at build time and deployed to [Vercel](https://vercel.com). Tooling, theme and primitives come from [kit](https://github.com/imanuragbanerjee/kit) (`@anuragbanerjee/*` on npm, `shadcn init` with the kit preset).

## Project structure

```text
/
├── public/                 # static assets (favicons, manifest, share card)
├── src/
│   ├── app/                # routes: pages, feeds, llms files, sitemap, robots
│   ├── assets/             # post and weeknote images, one folder per entry
│   ├── components/         # site components; ui/ is shadcn, never hand-edited
│   ├── content/            # markdown content
│   │   ├── posts/          # long-form posts (migrated from Medium)
│   │   ├── weeknotes/      # weekly notes
│   │   └── drafts/         # unpublished drafts (not built)
│   ├── lib/                # content loader, metadata, JSON-LD builders, share cards
│   └── mdx-components.tsx  # renders markdown images with next/image
└── next.config.ts          # MDX, redirects, headers, Markdown-for-agents rewrites
```

## Commands

Uses [Bun](https://bun.sh) as the package manager and script runner.

| Command             | Action                                          |
| :------------------ | :---------------------------------------------- |
| `bun install`       | Install dependencies and the Git hooks          |
| `bun run dev`       | Start local dev server at `localhost:3000`      |
| `bun run build`     | Build the production site to `.next/`           |
| `bun run start`     | Serve the production build locally              |
| `bun run format`    | Format with [oxfmt](https://oxc.rs)             |
| `bun run lint`      | Lint with [oxlint](https://oxc.rs) (type-aware) |
| `bun run lint:fix`  | Lint and apply safe autofixes                   |
| `bun run check`     | Format, then lint                               |
| `bun run typecheck` | Generate route types, then `tsc --noEmit`       |
| `bun run verify`    | Format check, lint, typecheck and build         |
| `bun run assets`    | Regenerate the favicon, icons and share card    |
| `bun run taze`      | Report available dependency updates             |
| `bun run taze:fix`  | Update package.json and install                 |

A [Lefthook](https://lefthook.dev) pre-commit hook lints and formats staged files.

## Content and links

- Posts and weeknotes take an optional `updated` date in their frontmatter. When set it appears on the page, in `article:modified_time` and in the structured data's `dateModified`; `date` stays the published date.
- Feeds: `/rss.xml` (posts) and `/weeknotes/rss.xml`.
- Every post and weeknote has a Markdown twin at `<page>.md` and a share card at `<page>.og.png`; both are rewrites in `next.config.ts` to routes under `/raw/`. `Accept: text/markdown` on a page gets the twin too.
- Images for posts and weeknotes live in `src/assets/<collection>/<slug>/` and are referenced with a relative path and alt text, e.g. `![A short description](../../assets/posts/my-post/photo.jpg)`. `rehype-mdx-import-media` turns them into imports, so `next/image` optimises them and adds width and height.
- Old `/zettles/` URLs redirect to the homepage (zettles were removed).
- Short links (`/github`, `/x`, `/linkedin`, `/instagram`, `/rss`, `/blog`) are redirects in `next.config.ts`. Keep the social ones in step with `socialLinks` in `src/lib/site.ts`.
