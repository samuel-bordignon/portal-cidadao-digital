import { CreateCategorySchema, UpdateCategorySchema } from '@/schemas/category.schema'
import { z } from 'zod'

export type Category = {
  id: string
  author_id: string
  nome: string
  slug: string
  created_at: string
}

export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>
export type UpdateCategoryInput = z.infer<typeof UpdateCategorySchema>
