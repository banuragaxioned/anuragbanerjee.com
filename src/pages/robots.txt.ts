import type { APIRoute } from "astro";

const getRobotsTxt = (
  site: URL,
) => `# anuragbanerjee.com — humans and agents welcome
# Agent map: ${new URL("llms.txt", site).href}

User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=yes
Allow: /

# AI crawlers, explicitly
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

Sitemap: ${new URL("sitemap-index.xml", site).href}
`;

export const GET: APIRoute = ({ site }) => {
  return new Response(getRobotsTxt(site!), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
