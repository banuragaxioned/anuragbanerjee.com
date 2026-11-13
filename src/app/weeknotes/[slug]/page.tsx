import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EntryArticle } from "@/components/entry-article";
import { JsonLd } from "@/components/json-ld";
import { Separator } from "@/components/ui/separator";
import { getEntries, getEntry } from "@/lib/content";
import { loadContent } from "@/lib/mdx";
import { pageMetadata } from "@/lib/metadata";
import { articleNode, breadcrumbNode, countWords, graph } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return getEntries("weeknotes").map((note) => ({ slug: note.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/weeknotes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const note = getEntry("weeknotes", slug);
  if (!note) {
    notFound();
  }
  return pageMetadata({
    description: note.data.excerpt,
    markdownPath: `/weeknotes/${slug}.md`,
    modified: note.data.updated,
    ogImage: `/weeknotes/${slug}.og.png`,
    path: `/weeknotes/${slug}/`,
    published: note.data.date,
    title: note.data.title,
    type: "article",
  });
}

export default async function WeeknotePage({
  params,
}: PageProps<"/weeknotes/[slug]">) {
  const { slug } = await params;
  const note = getEntry("weeknotes", slug);
  if (!note) {
    notFound();
  }
  const Content = await loadContent("weeknotes", slug);
  const path = `/weeknotes/${slug}/`;

  return (
    <>
      <JsonLd
        schema={graph(
          articleNode({
            description: note.data.excerpt,
            image: `/weeknotes/${slug}.og.png`,
            modified: note.data.updated,
            path,
            published: note.data.date,
            title: note.data.title,
            wordCount: countWords(note.body),
          }),
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Weeknotes", path: "/weeknotes/" },
            { name: note.data.title, path },
          ]),
        )}
      />
      <EntryArticle
        date={note.data.date}
        title={note.data.title}
        updated={note.data.updated}
      >
        <Content />
      </EntryArticle>
      {note.data.canonical && (
        <>
          <Separator className="mt-10" />
          <p className="mt-6 text-sm text-muted-foreground">
            Originally published on{" "}
            <a
              className="underline"
              href={note.data.canonical}
              rel="noreferrer"
              target="_blank"
            >
              Medium
            </a>
            .
          </p>
        </>
      )}
    </>
  );
}
