// Run after `next build`. The site has no CMS, so every route must be prerendered and served from
// the CDN. This fails if a route renders on demand (for example after a `cookies()`, `headers()` or
// `searchParams` read) or if a middleware exists.
import { readFileSync } from "node:fs";
import { z } from "zod";

const records = z.record(z.string(), z.unknown());

function readManifest<T extends z.ZodType>(file: string, schema: T) {
  return schema.parse(JSON.parse(readFileSync(`.next/${file}`, "utf-8")));
}

const prerender = readManifest(
  "prerender-manifest.json",
  z.object({ dynamicRoutes: records, routes: records }),
);
const prerendered = new Set([
  ...Object.keys(prerender.routes),
  ...Object.keys(prerender.dynamicRoutes),
]);
const appRoutes = Object.values(
  readManifest(
    "app-path-routes-manifest.json",
    z.record(z.string(), z.string()),
  ),
);
const { middleware } = readManifest(
  "server/middleware-manifest.json",
  z.object({ middleware: records }),
);

const problems = [
  ...appRoutes
    .filter((route) => !prerendered.has(route))
    .map((route) => `${route} is rendered on demand`),
  ...Object.keys(middleware).map((name) => `${name} runs as middleware`),
];

if (problems.length > 0) {
  console.error(
    `Not fully static:\n${problems.map((problem) => `  - ${problem}`).join("\n")}`,
  );
  process.exit(1);
}
console.log(`All ${appRoutes.length} routes are prerendered, no middleware.`);
