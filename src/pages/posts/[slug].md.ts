import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export async function getStaticPaths() {
  const posts = await getCollection("posts");
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

export const GET: APIRoute = ({ props }) => {
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
