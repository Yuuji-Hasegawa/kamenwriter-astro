import { glob } from "astro/loaders"
import { z } from "astro/zod"
import { defineCollection } from "astro:content"

const news = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/news" }),
  schema: z.object({
    title: z.string().optional(),
    date: z.string().optional(),
    update: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    description: z.string().optional(),
  }),
})

const stories = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/stories" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().optional(),
      date: z.string().optional(),
      update: z.string().optional(),
      keywords: z.array(z.string()).optional(),
      description: z.string().optional(),
      summary: z.string().optional(),
      category: z
        .object({
          label: z.string(),
          slug: z.string(),
        })
        .optional(),
      tags: z
        .array(
          z.object({
            label: z.string(),
            slug: z.string(),
          }),
        )
        .optional(),
      image: image().optional(),
      ogp: z.string().optional(),
      ogpSq: z.string().optional(),
      minutesRead: z.string().optional(),
    }),
})

export const collections = { news, stories }
