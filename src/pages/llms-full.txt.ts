import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

import { absoluteUrl, SITE } from "@/lib/site";

interface Doc {
  body: string;
  date?: Date;
  excerpt?: string;
  title: string;
  updated?: Date;
  url: string;
}

const day = (date: Date) => date.toISOString().slice(0, 10);

// entries are H3 under the H2 sections, so headings inside a body move below them
function demoteHeadings(markdown: string): string {
  let inFence = false;
  return markdown
    .split("\n")
    .map((line) => {
      if (line.startsWith("```")) {
        inFence = !inFence;
      }
      const hashes = /^(?<hashes>#{1,6})\s/u.exec(line)?.groups?.hashes;
      if (inFence || !hashes) {
        return line;
      }
      return `${"#".repeat(Math.min(6, hashes.length + 3))}${line.slice(hashes.length)}`;
    })
    .join("\n");
}

const render = (doc: Doc) =>
  [
    `### ${doc.title}`,
    "",
    `URL: ${doc.url}`,
    ...(doc.date ? [`Published: ${day(doc.date)}`] : []),
    ...(doc.updated ? [`Updated: ${day(doc.updated)}`] : []),
    ...(doc.excerpt ? [`Summary: ${doc.excerpt}`] : []),
    "",
    demoteHeadings(doc.body.trim()),
    "",
  ].join("\n");

const newestFirst = <T extends { data: { date?: Date } }>(a: T, b: T) =>
  (b.data.date?.valueOf() ?? 0) - (a.data.date?.valueOf() ?? 0);

const section = (heading: string, docs: Doc[]) =>
  [`## ${heading}`, "", ...docs.map(render)].join("\n");

// llms-full.txt: everything on the site in one markdown file, for agents that
// prefer a single fetch to crawling llms.txt link by link
export const GET: APIRoute = async () => {
  const [posts, weeknotes, zettles] = await Promise.all([
    getCollection("posts"),
    getCollection("weeknotes"),
    getCollection("zettles"),
  ]);
  const text = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    `The full text of ${SITE.url}: every post, weeknote and zettle, newest first. A shorter map of the site is at ${absoluteUrl("llms.txt")}.`,
    "",
    section(
      "Posts",
      posts.toSorted(newestFirst).map((post) => ({
        body: post.body ?? "",
        date: post.data.date,
        excerpt: post.data.excerpt,
        title: post.data.title,
        updated: post.data.updated,
        url: absoluteUrl(`/posts/${post.id}/`),
      })),
    ),
    section(
      "Weeknotes",
      weeknotes.toSorted(newestFirst).map((note) => ({
        body: note.body ?? "",
        date: note.data.date,
        excerpt: note.data.excerpt,
        title: note.data.title,
        updated: note.data.updated,
        url: absoluteUrl(`/weeknotes/${note.id}/`),
      })),
    ),
    section(
      "Zettles",
      zettles.toSorted(newestFirst).map((zettle) => ({
        body: zettle.body ?? "",
        date: zettle.data.date,
        excerpt: zettle.data.excerpt,
        title: zettle.data.title,
        updated: zettle.data.updated,
        url: absoluteUrl(`/zettles/${zettle.id}/`),
      })),
    ),
  ].join("\n");

  return new Response(text, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
