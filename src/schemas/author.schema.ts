import { z } from 'zod'

const AuthorRole = z.enum(['admin', 'author'])

export const createdAuthorSchema = z.object({
    nome: z.string().min(1, "Nome obrigatório"),
    email: z.email().min(1, "Email obrigatório"),
    api_key_hash: z.string(),
    role: AuthorRole,
})

export const UpdatedAuthorSchema = z.object({
    nome: z.string().optional(),
    email: z.email().optional(),
    role: AuthorRole,
})