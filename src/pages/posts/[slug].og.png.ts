import type { APIRoute, InferGetStaticPropsType } from "astro";
import { getCollection } from "astro:content";

import { entryCardResponse } from "@/lib/og-card";

export async function getStaticPaths() {
  const posts = await getCollection("posts");
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute<Props> = async ({ props }) =>
  await entryCardResponse({
    date: props.post.data.date,
    section: "Posts",
    title: props.post.data.title,
  });
