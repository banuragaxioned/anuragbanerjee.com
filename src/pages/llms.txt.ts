import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

// llms.txt per https://llmstxt.org — a markdown map of the site for AI agents
export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error("`site` must be set in astro.config.mjs");
  }
  const base = site.href.replace(/\/$/u, "");

  const allPosts = await getCollection("posts");
  const posts = allPosts.toSorted(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  const allWeeknotes = await getCollection("weeknotes");
  const weeknotes = allWeeknotes.toSorted(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  const zettles = await getCollection("zettles");

  const lines = [
    "# Anurag Banerjee",
    "",
    "> Personal site of Anurag Banerjee — Chief Operating Officer at Axioned, a digital agency in Mumbai, India. Posts on work and life, weekly notes, and short zettel-style notes. Contact via X, GitHub, LinkedIn, or Instagram (no email).",
    "",
    "Every content page has a Markdown version: append `.md` to the page URL (e.g. `/posts/<slug>.md`).",
    "",
    "## Pages",
    "",
    `- [Home](${base}/index.md): who I am and what I spend my days on`,
    `- [Resume](${base}/resume/): experience, education, certifications`,
    "",
    "## Posts",
    "",
    ...posts.map(
      (post) =>
        `- [${post.data.title}](${base}/posts/${post.id}.md): ${post.data.excerpt}`,
    ),
    "",
    "## Weeknotes",
    "",
    ...weeknotes.map(
      (note) =>
        `- [${note.data.title}](${base}/weeknotes/${note.id}.md)${note.data.excerpt ? `: ${note.data.excerpt}` : ""}`,
    ),
    "",
    "## Zettles",
    "",
    ...zettles.map(
      (zettle) =>
        `- [${zettle.data.title}](${base}/zettles/${zettle.id}.md)${zettle.data.excerpt ? `: ${zettle.data.excerpt}` : ""}`,
    ),
    "",
    "## Feeds",
    "",
    `- [RSS](${base}/rss.xml)`,
    `- [Sitemap](${base}/sitemap-index.xml)`,
    "",
    "## Optional",
    "",
    `- [Full content](${base}/llms-full.txt): every post, weeknote and zettle in one markdown file`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
