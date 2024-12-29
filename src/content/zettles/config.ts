import { z, defineCollection } from "astro:content";

const zettlesCollection = defineCollection({
  // Schema for your frontmatter
  schema: z.object({
    title: z.string().min(1, "Title is required"),
    excerpt: z.string().optional(),
    date: z.string().optional(), // or z.date().optional()
  }),
});

export const collections = {
  // Export the collection under the name "zettles"
  zettles: zettlesCollection,
};
