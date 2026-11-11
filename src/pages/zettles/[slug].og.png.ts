import type { APIRoute, InferGetStaticPropsType } from "astro";
import { getCollection } from "astro:content";

import { entryCardResponse } from "@/lib/og-card";

export async function getStaticPaths() {
  const zettles = await getCollection("zettles");
  return zettles.map((zettle) => ({
    params: { slug: zettle.id },
    props: { zettle },
  }));
}

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute<Props> = async ({ props }) =>
  await entryCardResponse({
    date: props.zettle.data.date,
    section: "Zettles",
    title: props.zettle.data.title,
  });
