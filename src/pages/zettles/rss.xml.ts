import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

import { dateFromZettleId } from "@/lib/dates";
import { feedBase } from "@/lib/feed";
import { SITE } from "@/lib/site";

export async function GET(context: APIContext) {
  const { site } = context;
  if (!site) {
    throw new Error("`site` must be set in astro.config.mjs");
  }

  const allZettles = await getCollection("zettles");
  const zettles = allZettles
    .map((zettle) => ({
      date: zettle.data.date ?? dateFromZettleId(zettle.id),
      zettle,
    }))
    .toSorted((a, b) => (b.date?.valueOf() ?? 0) - (a.date?.valueOf() ?? 0));

  return await rss({
    ...feedBase(site, "zettles/rss.xml"),
    description: "Short notes by Anurag Banerjee.",
    items: zettles.map(({ date, zettle }) => ({
      description: zettle.data.excerpt,
      link: `/zettles/${zettle.id}/`,
      pubDate: date,
      title: zettle.data.title,
    })),
    title: `Zettles · ${SITE.name}`,
  });
}
