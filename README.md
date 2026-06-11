# anuragbanerjee.com

Personal site of Anurag Banerjee — posts, weeknotes, and zettles.

Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com), fully static, deployed to [Cloudflare Pages](https://pages.cloudflare.com).

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
│   ├── pages/
│   └── styles/
└── astro.config.mjs
```

## Commands

Uses [Bun](https://bun.sh) as the package manager and script runner.

| Command           | Action                                     |
| :---------------- | :----------------------------------------- |
| `bun install`     | Install dependencies                       |
| `bun run dev`     | Start local dev server at `localhost:4321` |
| `bun run build`   | Build the production site to `./dist/`     |
| `bun run preview` | Preview the build locally                  |
| `bun run deploy`  | Build and deploy to Cloudflare Pages       |
| `bun run format`  | Format with Prettier                       |
