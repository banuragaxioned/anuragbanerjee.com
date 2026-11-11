import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

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
    customData: `<language>en</language><atom:link href="${new URL("rss.xml", site).href}" rel="self" type="application/rss+xml" />`,
    title: "Anurag Banerjee",
    description: "Essays and articles by Anurag Banerjee.",
    site,
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: post.data.date,
      link: `/posts/${post.id}/`,
    })),
  });
}
