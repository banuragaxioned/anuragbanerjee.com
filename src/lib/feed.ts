import type { Collection } from "./content";
import { Feed } from "feed";

import { getEntries } from "./content";
import { absoluteUrl, SITE } from "./site";

export function feedResponse(
  collection: Collection,
  options: { description: string; path: string; title: string },
) {
  const feed = new Feed({
    copyright: `© ${new Date().getFullYear()} ${SITE.name}`,
    description: options.description,
    feedLinks: { rss: absoluteUrl(options.path) },
    id: absoluteUrl("/"),
    language: SITE.language,
    link: absoluteUrl("/"),
    title: options.title,
  });
  for (const entry of getEntries(collection)) {
    const link = absoluteUrl(`/${collection}/${entry.id}/`);
    feed.addItem({
      date: entry.data.date,
      description: entry.data.excerpt,
      id: link,
      link,
      title: entry.data.title,
    });
  }
  return new Response(feed.rss2(), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
