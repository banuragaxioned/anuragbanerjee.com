import { day, getEntries, sections } from "@/lib/content";
import { absoluteUrl, SITE } from "@/lib/site";

export const dynamic = "force-static";

// entries are H3 under the H2 sections, so headings inside a body move below them
function demoteHeadings(markdown: string): string {
  let inFence = false;
  return markdown
    .split("\n")
    .map((line) => {
      if (line.startsWith("```")) {
        inFence = !inFence;
      }
      const hashes = /^(?<hashes>#{1,6})\s/u.exec(line)?.groups?.hashes;
      if (inFence || !hashes) {
        return line;
      }
      return `${"#".repeat(Math.min(6, hashes.length + 3))}${line.slice(hashes.length)}`;
    })
    .join("\n");
}

// llms-full.txt: everything on the site in one markdown file, for agents that
// prefer a single fetch to crawling llms.txt link by link
export function GET() {
  const text = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    `The full text of ${SITE.url}: every post and weeknote, newest first. A shorter map of the site is at ${absoluteUrl("llms.txt")}.`,
    "",
    ...sections.flatMap(({ collection, label }) => [
      `## ${label}`,
      "",
      ...getEntries(collection).flatMap((entry) => [
        `### ${entry.data.title}`,
        "",
        `URL: ${absoluteUrl(`/${collection}/${entry.id}/`)}`,
        `Published: ${day(entry.data.date)}`,
        ...(entry.data.updated ? [`Updated: ${day(entry.data.updated)}`] : []),
        ...(entry.data.excerpt ? [`Summary: ${entry.data.excerpt}`] : []),
        "",
        demoteHeadings(entry.body.trim()),
        "",
      ]),
    ]),
  ].join("\n");

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
