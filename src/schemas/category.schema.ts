import { z } from 'zod'

export const CreateCategorySchema = z.object({
    author_id: z.uuid("ID de autor inválido"),
    nome: z.string().min(1, "Nome obrigatório"),
    slug: z.string().min(1, "Slug obrigatório"),
})

export const UpdateCategorySchema = z.object({
    nome: z.string().min(1, "Nome obrigatório"),
    slug: z.string().min(1, "Slug obrigatório"),
})
