import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

// A route handler, not app/robots.ts: the metadata file cannot carry comments or Content-Signal.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "CCBot",
];

export function GET() {
  const text = `# anuragbanerjee.com — humans and agents welcome
# Agent map: ${absoluteUrl("llms.txt")}

User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=yes
Allow: /

# AI crawlers, explicitly
${aiCrawlers.map((agent) => `User-agent: ${agent}\nAllow: /`).join("\n\n")}

Sitemap: ${absoluteUrl("sitemap.xml")}
`;
  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
