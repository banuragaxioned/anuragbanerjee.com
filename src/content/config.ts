import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders"; // Not available with legacy API

const zettlesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/zettles" }),
  schema: z.object({
    title: z.string().min(1, "Title is required"),
    excerpt: z.string().optional(),
    date: z.date().optional(),
  }),
});

const postsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string().min(1, "Title is required"),
    excerpt: z.string().min(1, "Excerpt is required"),
    date: z.date(),
  }),
});

export const collections = {
  zettles: zettlesCollection,
  posts: postsCollection,
};
