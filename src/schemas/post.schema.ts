import { z } from 'zod'
import { ContentBlocksSchema } from './blocks.schema'

export const PostStatusSchema = z.enum(['draft', 'published'])

export const CreatePostSchema = z.object({
  author_id: z.uuid(),
  category_id: z.uuid(),
  titulo: z.string().min(1, 'Título obrigatório'),
  resumo: z.string().min(1, 'Resumo obrigatório'),
  imagem_capa: z.string().url().min(1, 'Imagem de capa obrigatória'),
  status: PostStatusSchema.default('draft'),
  slug: z.string().min(1, 'Slug obrigatório'),
  content_blocks: ContentBlocksSchema,
})

export const UpdatePostSchema = z.object({
  category_id: z.uuid('ID da categoria obriagtório').optional(),
  titulo: z.string().min(1).optional(),
  resumo: z.string().min(1).optional(),
  imagem_capa: z.string().url().nullable().optional(),
  status: PostStatusSchema.optional(),
  slug: z.string().optional(),
  content_blocks: ContentBlocksSchema.optional(),
})
