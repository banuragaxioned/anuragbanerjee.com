import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export async function getStaticPaths() {
  const zettles = await getCollection("zettles");
  return zettles.map((zettle) => ({
    params: { slug: zettle.id },
    props: { zettle },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const { zettle } = props;
  const md = [
    `# ${zettle.data.title}`,
    "",
    ...(zettle.data.excerpt ? [`> ${zettle.data.excerpt}`, ""] : []),
    ...(zettle.data.date
      ? [`Published: ${zettle.data.date.toISOString().slice(0, 10)}`]
      : []),
    `Author: Anurag Banerjee (https://anuragbanerjee.com/)`,
    "",
    zettle.body ?? "",
  ].join("\n");

  return new Response(md, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
