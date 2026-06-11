import { next, rewrite } from "@vercel/functions";

// Markdown for Agents (https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/):
// requests with `Accept: text/markdown` get the page's .md twin while HTML
// stays the default for browsers. Runs as Vercel Routing Middleware, which
// executes before the static filesystem — vercel.json rewrites cannot
// override an existing static file, so this has to happen here.
export default function middleware(request: Request) {
  const accept = request.headers.get("accept") ?? "";
  if (!accept.includes("text/markdown")) return next();

  const url = new URL(request.url);

  if (url.pathname === "/" || url.pathname === "/index.html") {
    url.pathname = "/index.md";
    return rewrite(url);
  }

  // content routes only — exactly one extension-less segment after the section
  const path = url.pathname.replace(/\/$/, "");
  if (/^\/(posts|weeknotes|zettles)\/[^/.]+$/.test(path)) {
    url.pathname = `${path}.md`;
    return rewrite(url);
  }

  return next();
}

export const config = {
  matcher: [
    "/",
    "/index.html",
    "/posts/:path*",
    "/weeknotes/:path*",
    "/zettles/:path*",
  ],
};
