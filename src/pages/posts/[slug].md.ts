import type { APIRoute, InferGetStaticPropsType } from "astro";
import { getCollection } from "astro:content";

export async function getStaticPaths() {
  const posts = await getCollection("posts");
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute<Props> = ({ props }) => {
  const { post } = props;
  const md = [
    `# ${post.data.title}`,
    "",
    `> ${post.data.excerpt}`,
    "",
    `Published: ${post.data.date.toISOString().slice(0, 10)}`,
    `Author: Anurag Banerjee (https://anuragbanerjee.com/)`,
    "",
    post.body ?? "",
  ].join("\n");

  return new Response(md, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
