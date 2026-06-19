import { createdAuthorSchema, UpdatedAuthorSchema } from '@/schemas/author.schema'
import { z } from 'zod'

export type Author = {
  id: string
  nome: string
  email: string
  role: "admin" | "author"
}

export type CreateAuthorInput = z.infer<typeof createdAuthorSchema>
export type UpdateAuthorInput = z.infer<typeof UpdatedAuthorSchema>
export type AuthenticateAuthor = Pick<Author, "id" | "role">