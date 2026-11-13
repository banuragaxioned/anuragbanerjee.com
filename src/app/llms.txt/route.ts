import { getEntries } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

// llms.txt per https://llmstxt.org — a markdown map of the site for AI agents
export function GET() {
  const base = absoluteUrl("/").replace(/\/$/u, "");
  const lines = [
    "# Anurag Banerjee",
    "",
    "> Personal site of Anurag Banerjee — Chief Operating Officer at Axioned, a digital agency in Mumbai, India. Posts on work and life, and weekly notes. Contact via X, GitHub, LinkedIn, or Instagram (no email).",
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
    ...getEntries("posts").map(
      (post) =>
        `- [${post.data.title}](${base}/posts/${post.id}.md): ${post.data.excerpt}`,
    ),
    "",
    "## Weeknotes",
    "",
    ...getEntries("weeknotes").map(
      (note) =>
        `- [${note.data.title}](${base}/weeknotes/${note.id}.md)${note.data.excerpt ? `: ${note.data.excerpt}` : ""}`,
    ),
    "",
    "## Feeds",
    "",
    `- [RSS: posts](${base}/rss.xml)`,
    `- [RSS: weeknotes](${base}/weeknotes/rss.xml)`,
    `- [Sitemap](${base}/sitemap.xml)`,
    "",
    "## Optional",
    "",
    `- [Full content](${base}/llms-full.txt): every post and weeknote in one markdown file`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
