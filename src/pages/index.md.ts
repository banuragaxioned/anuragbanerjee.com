import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

// Markdown version of the homepage, for AI agents
export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error("`site` must be set in astro.config.mjs");
  }
  const base = site.href.replace(/\/$/u, "");

  const allPosts = await getCollection("posts");
  const posts = allPosts
    .toSorted((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .slice(0, 3);

  const md = [
    "# Anurag Banerjee",
    "",
    "Chief Operating Officer at Axioned (https://axioned.com), a digital agency in Mumbai, India.",
    "",
    "> Driven by tinkering, experiments, and good tech.",
    "",
    "I run operations at Axioned — overseeing the engineering, project management, design, and QA teams that ship client work every week. The rest of the time I'm tinkering — rebuilding this site, trying new tools, and poking at whatever's new in tech.",
    "",
    "## What I spend my days on",
    "",
    "- **Tech** — technical direction across client builds: architecture choices, build-vs-buy calls, code quality, and keeping the stack current.",
    "- **Teams** — leading the engineering, project management, design, and QA teams, plus resource planning.",
    "- **Clients** — client relationships and client-services strategy, with the CEO.",
    "- **People** — hiring, retention, coaching, and internal communication.",
    "",
    "## Latest writing",
    "",
    ...posts.map(
      (post) =>
        `- [${post.data.title}](${base}/posts/${post.id}.md): ${post.data.excerpt}`,
    ),
    "",
    "## Links",
    "",
    `- Site map for agents: ${base}/llms.txt`,
    `- Resume: ${base}/resume/`,
    `- RSS: ${base}/rss.xml`,
    "- X: https://x.com/ianuragbanerjee",
    "- GitHub: https://github.com/imanuragbanerjee",
    "- LinkedIn: https://linkedin.com/in/imanuragbanerjee",
    "- Instagram: https://www.instagram.com/imanuragbanerjee",
    "",
    "Contact via socials above — no email.",
    "",
  ];

  return new Response(md.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
