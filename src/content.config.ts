import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string().min(1, "Title is required"),
    excerpt: z.string().min(1, "Excerpt is required"),
    date: z.coerce.date(),
  }),
});

const weeknotes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/weeknotes" }),
  schema: z.object({
    title: z.string().min(1, "Title is required"),
    excerpt: z.string().optional(),
    date: z.coerce.date(),
    canonical: z.url().optional(),
  }),
});

const zettles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/zettles" }),
  schema: z.object({
    title: z.string().min(1, "Title is required"),
    excerpt: z.string().optional(),
    date: z.coerce.date().optional(),
  }),
});

export const collections = { posts, weeknotes, zettles };
