import type { Metadata } from "next";

import { EntryList } from "@/components/entry-list";
import { JsonLd } from "@/components/json-ld";
import { getEntries } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbNode, collectionNode, graph } from "@/lib/schema";

const description = "Weekly reflections and process notes by Anurag Banerjee.";

export const metadata: Metadata = pageMetadata({
  description,
  path: "/weeknotes/",
  title: "Weeknotes",
});

export default function WeeknotesPage() {
  const notes = getEntries("weeknotes");
  return (
    <>
      <JsonLd
        schema={graph(
          collectionNode({
            description,
            entries: notes.map((note) => `/weeknotes/${note.id}/`),
            name: "Weeknotes",
            path: "/weeknotes/",
          }),
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Weeknotes", path: "/weeknotes/" },
          ]),
        )}
      />
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">Weeknotes</h1>
      <EntryList
        entries={notes.map((note) => ({
          date: note.data.date,
          excerpt: note.data.excerpt,
          href: `/weeknotes/${note.id}/`,
          title: note.data.title,
        }))}
      />
    </>
  );
}
