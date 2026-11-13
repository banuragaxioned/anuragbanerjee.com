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

// Nothing here changes between deploys and Vercel purges its CDN on every deploy, so the CDN keeps
// every page until the next one. These headers only set how long a browser may reuse a copy.
// HTML keeps the default (revalidate every time) so an edit shows up on the next visit.
const cacheControl = (value: string) => [{ key: "Cache-Control", value }];

// Unhashed files cannot be immutable: reuse for a day, serve stale for a week while revalidating.
const publicFiles = [
  "favicon.ico",
  "favicon.svg",
  "apple-touch-icon.png",
  "icon-192.png",
  "icon-512.png",
  "icon-maskable-512.png",
  "manifest.webmanifest",
  "og.png",
];
const publicFileCache = "public, max-age=86400, stale-while-revalidate=604800";

// Generated text and share cards: an hour is enough, feed readers and crawlers poll often.
const generatedCache = "public, max-age=3600, stale-while-revalidate=86400";

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
      {
        headers: cacheControl(publicFileCache),
        source: `/:file(${publicFiles.map((file) => file.replace(".", "\\.")).join("|")})`,
      },
      ...[
        "/index.md",
        "/llms.txt",
        "/llms-full.txt",
        "/robots.txt",
        "/rss.xml",
        "/sitemap.xml",
        "/weeknotes/rss.xml",
        "/:section(posts|weeknotes)/:slug.md",
        "/:section(posts|weeknotes)/:slug.og.png",
      ].map((source) => ({ headers: cacheControl(generatedCache), source })),
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
  // The only /_next/image traffic is the post images. Their widths are capped to the 42rem column
  // (at 1x and 2x) and one format, so each image is transformed twice, once, and cached for good.
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
