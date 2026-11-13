import type { MetadataRoute } from "next";

import { getEntries, sections } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/posts/", "/weeknotes/", "/resume/"].map((path) => ({
    url: absoluteUrl(path),
  }));
  const entries = sections.flatMap(({ collection }) =>
    getEntries(collection).map((entry) => ({
      lastModified: entry.data.updated ?? entry.data.date,
      url: absoluteUrl(`/${collection}/${entry.id}/`),
    })),
  );
  return [...pages, ...entries];
}
