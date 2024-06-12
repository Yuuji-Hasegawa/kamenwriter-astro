import { defineCollection, z } from 'astro:content'

const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    date: z.string().optional(),
    update: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    description: z.string().optional(),
  }),
})

const stories = defineCollection({
  type: 'content',
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
      imageSq: z.string().optional(),
      minutesRead: z.string().optional(),
    }),
})

export const collections = { news, stories }
