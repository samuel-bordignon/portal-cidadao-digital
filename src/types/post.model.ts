import { CreatePostSchema, UpdatePostSchema } from "@/schemas/post.schema"
import { ContentBlock } from "./blocks.model"
import { z } from 'zod'
import { Author } from './author.model'
import { Category } from './category.model'

export type Post = {
    id: string
    slug: string
    titulo: string
    resumo: string
    imagem_capa: string | null
    content_blocks: ContentBlock[]
    author_id: string
    status: 'draft' | 'published' | 'archived'
    author?: Author
    category?: Category
    created_at: string
    updated_at: string
}

export type CreatePostInput = z.infer<typeof CreatePostSchema>
export type UpdatePostInput = z.infer<typeof UpdatePostSchema>