import type { APIRoute, InferGetStaticPropsType } from "astro";
import { getCollection } from "astro:content";

import { entryCardResponse } from "@/lib/og-card";

export async function getStaticPaths() {
  const weeknotes = await getCollection("weeknotes");
  return weeknotes.map((note) => ({
    params: { slug: note.id },
    props: { note },
  }));
}

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute<Props> = async ({ props }) =>
  await entryCardResponse({
    date: props.note.data.date,
    section: "Weeknotes",
    title: props.note.data.title,
  });
