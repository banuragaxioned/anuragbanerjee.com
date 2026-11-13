// Fails the build if any route is rendered on demand or if a middleware exists.
// The site has no CMS, so every route must be prerendered and served from the CDN; a stray
// `cookies()`, `headers()` or `searchParams` read would quietly turn a page into a function.
// Run after `next build`.
import { readFileSync } from "node:fs";
import { z } from "zod";

const read = <T extends z.ZodType>(file: string, schema: T): z.infer<T> =>
  schema.parse(JSON.parse(readFileSync(`.next/${file}`, "utf-8")));

const prerender = read(
  "prerender-manifest.json",
  z.object({
    dynamicRoutes: z.record(z.string(), z.unknown()),
    routes: z.record(z.string(), z.unknown()),
  }),
);
const prerendered = new Set([
  ...Object.keys(prerender.routes),
  ...Object.keys(prerender.dynamicRoutes),
]);
const appRoutes = Object.values(
  read("app-path-routes-manifest.json", z.record(z.string(), z.string())),
);
const middleware = Object.keys(
  read(
    "server/middleware-manifest.json",
    z.object({ middleware: z.record(z.string(), z.unknown()) }),
  ).middleware,
);

const problems = [
  ...appRoutes
    .filter((route) => !prerendered.has(route))
    .map((route) => `${route} is rendered on demand`),
  ...middleware.map((name) => `${name} runs as middleware`),
];

if (problems.length > 0) {
  console.error(
    `Not fully static:\n${problems.map((problem) => `  - ${problem}`).join("\n")}`,
  );
  process.exit(1);
}
console.log(`All ${appRoutes.length} routes are prerendered, no middleware.`);
