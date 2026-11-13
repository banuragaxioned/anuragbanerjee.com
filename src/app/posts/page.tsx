import type { Metadata } from "next";

import { EntryList } from "@/components/entry-list";
import { JsonLd } from "@/components/json-ld";
import { getEntries } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbNode, collectionNode, graph } from "@/lib/schema";

const description =
  "Writing by Anurag Banerjee on technology, work and life, from web development to leading teams.";

export const metadata: Metadata = pageMetadata({
  description,
  path: "/posts/",
  title: "Posts",
});

export default function PostsPage() {
  const posts = getEntries("posts");
  return (
    <>
      <JsonLd
        schema={graph(
          collectionNode({
            description,
            entries: posts.map((post) => `/posts/${post.id}/`),
            name: "Posts",
            path: "/posts/",
          }),
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Posts", path: "/posts/" },
          ]),
        )}
      />
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">Posts</h1>
      <EntryList
        entries={posts.map((post) => ({
          date: post.data.date,
          excerpt: post.data.excerpt,
          href: `/posts/${post.id}/`,
          title: post.data.title,
        }))}
      />
    </>
  );
}
