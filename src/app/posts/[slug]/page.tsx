import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EntryArticle } from "@/components/entry-article";
import { JsonLd } from "@/components/json-ld";
import { getEntries, getEntry } from "@/lib/content";
import { loadContent } from "@/lib/mdx";
import { pageMetadata } from "@/lib/metadata";
import { articleNode, breadcrumbNode, countWords, graph } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return getEntries("posts").map((post) => ({ slug: post.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getEntry("posts", slug);
  if (!post) {
    notFound();
  }
  return pageMetadata({
    description: post.data.excerpt,
    markdownPath: `/posts/${slug}.md`,
    modified: post.data.updated,
    ogImage: `/posts/${slug}.og.png`,
    path: `/posts/${slug}/`,
    published: post.data.date,
    title: post.data.title,
    type: "article",
  });
}

export default async function PostPage({ params }: PageProps<"/posts/[slug]">) {
  const { slug } = await params;
  const post = getEntry("posts", slug);
  if (!post) {
    notFound();
  }
  const Content = await loadContent("posts", slug);
  const path = `/posts/${slug}/`;

  return (
    <>
      <JsonLd
        schema={graph(
          articleNode({
            description: post.data.excerpt,
            image: `/posts/${slug}.og.png`,
            modified: post.data.updated,
            path,
            published: post.data.date,
            title: post.data.title,
            wordCount: countWords(post.body),
          }),
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Posts", path: "/posts/" },
            { name: post.data.title, path },
          ]),
        )}
      />
      <EntryArticle
        date={post.data.date}
        title={post.data.title}
        updated={post.data.updated}
      >
        <Content />
      </EntryArticle>
    </>
  );
}
