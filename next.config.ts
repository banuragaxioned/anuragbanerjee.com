import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const llmsLink = (rel: string, href: string, type = "text/markdown") =>
  `<https://anuragbanerjee.com/${href}>; rel="${rel}"; type="${type}"`;

// Markdown for Agents (https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/):
// requests with `Accept: text/markdown` get the page's markdown twin, HTML stays the default.
const wantsMarkdown = [
  { key: "accept", type: "header" as const, value: ".*text/markdown.*" },
];

const redirect = (source: string, destination: string, permanent = false) => ({
  destination,
  permanent,
  source,
});

// Unhashed files and generated text; HTML keeps the default so edits show up on the next visit.
const cachedFiles = [
  "/favicon.ico",
  "/favicon.svg",
  "/apple-touch-icon.png",
  "/icon-192.png",
  "/icon-512.png",
  "/icon-maskable-512.png",
  "/manifest.webmanifest",
  "/og.png",
  "/index.md",
  "/llms.txt",
  "/llms-full.txt",
  "/robots.txt",
  "/rss.xml",
  "/sitemap.xml",
  "/weeknotes/rss.xml",
  "/:section(posts|weeknotes)/:slug.md",
  "/:section(posts|weeknotes)/:slug.og.png",
];

const config: NextConfig = {
  async headers() {
    return [
      {
        headers: [
          {
            key: "Link",
            value: [
              llmsLink("describedby", "llms.txt"),
              llmsLink("llms-txt", "llms.txt"),
            ].join(", "),
          },
        ],
        source: "/:path*",
      },
      {
        headers: [
          {
            key: "Link",
            value: [
              llmsLink("describedby", "llms.txt"),
              llmsLink("llms-txt", "llms.txt"),
              llmsLink("alternate", "index.md"),
            ].join(", "),
          },
        ],
        source: "/",
      },
      {
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
        source: "/raw/:path*",
      },
      ...cachedFiles.map((source) => ({
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
        source,
      })),
    ];
  },
  async redirects() {
    return [
      redirect("/github", "https://github.com/imanuragbanerjee"),
      redirect("/x", "https://x.com/ianuragbanerjee"),
      redirect("/twitter", "https://x.com/ianuragbanerjee"),
      redirect("/linkedin", "https://linkedin.com/in/imanuragbanerjee"),
      redirect("/instagram", "https://www.instagram.com/imanuragbanerjee"),
      redirect("/rss", "/rss.xml", true),
      redirect("/feed", "/rss.xml", true),
      redirect("/feed.xml", "/rss.xml", true),
      redirect("/blog", "/posts/", true),
      redirect("/zettles", "/", true),
      redirect("/zettles/:slug", "/", true),
      redirect("/sitemap-index.xml", "/sitemap.xml", true),
      redirect("/sitemap-0.xml", "/sitemap.xml", true),
    ];
  },
  async rewrites() {
    return {
      afterFiles: [],
      beforeFiles: [
        {
          destination: "/index.md",
          has: wantsMarkdown,
          source: "/",
        },
        {
          destination: "/raw/md/:section/:slug",
          has: wantsMarkdown,
          source: "/:section(posts|weeknotes)/:slug([^/.]+)",
        },
        {
          destination: "/raw/md/:section/:slug",
          source: "/:section(posts|weeknotes)/:slug.md",
        },
        {
          destination: "/raw/og/:section/:slug",
          source: "/:section(posts|weeknotes)/:slug.og.png",
        },
      ],
      fallback: [],
    };
  },
  // The 42rem post column at 1x and 2x
  images: {
    deviceSizes: [672, 1344],
    formats: ["image/webp"],
    imageSizes: [],
  },
  trailingSlash: true,
};

const withMDX = createMDX({
  extension: /\.mdx?$/u,
  options: {
    rehypePlugins: ["rehype-mdx-import-media"],
    remarkPlugins: ["remark-frontmatter"],
  },
});

export default withMDX(config);
