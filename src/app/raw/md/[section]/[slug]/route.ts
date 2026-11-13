import { notFound } from "next/navigation";

import { day, getEntry, getSectionParams, sections } from "@/lib/content";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getSectionParams();
}

// the Markdown twin of a page, served at `<page>.md` and for `Accept: text/markdown`
export async function GET(
  _request: Request,
  { params }: RouteContext<"/raw/md/[section]/[slug]">,
) {
  const { section, slug } = await params;
  const collection = sections.find(
    (entry) => entry.collection === section,
  )?.collection;
  const entry = collection && getEntry(collection, slug);
  if (!entry) {
    notFound();
  }
  const markdown = [
    `# ${entry.data.title}`,
    "",
    ...(entry.data.excerpt ? [`> ${entry.data.excerpt}`, ""] : []),
    `Published: ${day(entry.data.date)}`,
    `Author: ${SITE.name} (${SITE.url}/)`,
    "",
    entry.body,
  ].join("\n");

  return new Response(markdown, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
