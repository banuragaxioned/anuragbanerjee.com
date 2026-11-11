import type { APIRoute, InferGetStaticPropsType } from "astro";
import { getCollection } from "astro:content";

export async function getStaticPaths() {
  const zettles = await getCollection("zettles");
  return zettles.map((zettle) => ({
    params: { slug: zettle.id },
    props: { zettle },
  }));
}

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute<Props> = ({ props }) => {
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
