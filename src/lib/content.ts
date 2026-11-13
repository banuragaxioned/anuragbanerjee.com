import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const base = z.object({
  date: z.coerce.date(),
  title: z.string().min(1, "Title is required"),
  updated: z.coerce.date().optional(),
});

const schemas = {
  posts: base.extend({ excerpt: z.string().min(1, "Excerpt is required") }),
  weeknotes: base.extend({
    canonical: z.url().optional(),
    excerpt: z.string().optional(),
  }),
};

export type Collection = keyof typeof schemas;

/** One content file: the validated frontmatter plus the markdown body. */
export type Entry<C extends Collection = Collection> = C extends Collection
  ? {
      /** Raw markdown without the frontmatter. */
      body: string;
      data: z.infer<(typeof schemas)[C]>;
      /** The file name without its extension, used as the URL slug. */
      id: string;
    }
  : never;

const cache = new Map<Collection, Entry[]>();

function readEntries(collection: Collection): Entry[] {
  const dir = path.join(process.cwd(), "src/content", collection);
  return readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const { content, data } = matter(
        readFileSync(path.join(dir, file), "utf-8"),
      );
      return {
        body: content.trim(),
        data: schemas[collection].parse(data),
        id: file.replace(/\.md$/u, ""),
      };
    })
    .toSorted((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Every entry of a collection, newest first. Frontmatter is validated against the collection's schema. */
export function getEntries<C extends Collection>(collection: C): Entry<C>[];
export function getEntries(collection: Collection): Entry[] {
  const cached = cache.get(collection);
  if (cached) {
    return cached;
  }
  const entries = readEntries(collection);
  cache.set(collection, entries);
  return entries;
}

export function getEntry<C extends Collection>(
  collection: C,
  id: string,
): Entry<C> | undefined;
export function getEntry(collection: Collection, id: string) {
  return getEntries(collection).find((entry) => entry.id === id);
}

export const sections = [
  { collection: "posts", label: "Posts" },
  { collection: "weeknotes", label: "Weeknotes" },
] as const satisfies readonly { collection: Collection; label: string }[];

/** Route params for every entry of every section, for generateStaticParams. */
export function getSectionParams() {
  return sections.flatMap(({ collection }) =>
    getEntries(collection).map((entry) => ({
      section: collection,
      slug: entry.id,
    })),
  );
}

export const day = (date: Date) => date.toISOString().slice(0, 10);
