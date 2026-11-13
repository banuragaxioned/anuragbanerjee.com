import { notFound } from "next/navigation";

import { getEntry, getSectionParams, sections } from "@/lib/content";
import { entryCardResponse } from "@/lib/og-card";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getSectionParams();
}

// the share card of a page, served at `<page>.og.png`
export async function GET(
  _request: Request,
  { params }: RouteContext<"/raw/og/[section]/[slug]">,
) {
  const { section, slug } = await params;
  const match = sections.find((entry) => entry.collection === section);
  const entry = match && getEntry(match.collection, slug);
  if (!match || !entry) {
    notFound();
  }
  return await entryCardResponse({
    date: entry.data.date,
    section: match.label,
    title: entry.data.title,
  });
}
