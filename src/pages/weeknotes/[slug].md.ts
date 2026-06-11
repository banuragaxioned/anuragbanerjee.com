import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export async function getStaticPaths() {
  const weeknotes = await getCollection("weeknotes");
  return weeknotes.map((note) => ({
    params: { slug: note.id },
    props: { note },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const { note } = props;
  const md = [
    `# ${note.data.title}`,
    "",
    ...(note.data.excerpt ? [`> ${note.data.excerpt}`, ""] : []),
    `Published: ${note.data.date.toISOString().slice(0, 10)}`,
    `Author: Anurag Banerjee (https://anuragbanerjee.com/)`,
    "",
    note.body ?? "",
  ].join("\n");

  return new Response(md, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
