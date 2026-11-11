import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

import { feedBase } from "@/lib/feed";
import { SITE } from "@/lib/site";

export async function GET(context: APIContext) {
  const { site } = context;
  if (!site) {
    throw new Error("`site` must be set in astro.config.mjs");
  }

  const allNotes = await getCollection("weeknotes");
  const notes = allNotes.toSorted(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  return await rss({
    ...feedBase(site, "weeknotes/rss.xml"),
    description: "Weekly reflections and process notes by Anurag Banerjee.",
    items: notes.map((note) => ({
      description: note.data.excerpt,
      link: `/weeknotes/${note.id}/`,
      pubDate: note.data.date,
      title: note.data.title,
    })),
    title: `Weeknotes · ${SITE.name}`,
  });
}
