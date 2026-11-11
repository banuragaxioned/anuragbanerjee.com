import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

import { feedBase } from "@/lib/feed";

export async function GET(context: APIContext) {
  const { site } = context;
  if (!site) {
    throw new Error("`site` must be set in astro.config.mjs");
  }

  const allPosts = await getCollection("posts");
  const posts = allPosts.toSorted(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  return await rss({
    ...feedBase(site, "rss.xml"),
    title: "Anurag Banerjee",
    description:
      "Writing by Anurag Banerjee on technology, work and life, from web development to leading teams.",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: post.data.date,
      link: `/posts/${post.id}/`,
    })),
  });
}
