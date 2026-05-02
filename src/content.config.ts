import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const legal = defineCollection({
  loader: glob({ base: './src/content/legal', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.enum(['en', 'es']),
    updated_at: z.coerce.date().optional(),
  }),
})

export const collections = { legal }
