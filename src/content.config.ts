import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string().min(1, "Title is required"),
    excerpt: z.string().min(1, "Excerpt is required"),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
  }),
});

const weeknotes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/weeknotes" }),
  schema: z.object({
    title: z.string().min(1, "Title is required"),
    excerpt: z.string().optional(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    canonical: z.url().optional(),
  }),
});

export const collections = { posts, weeknotes };
