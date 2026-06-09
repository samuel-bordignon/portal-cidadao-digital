import { HttpError } from "@/lib/httpError"
import * as authorRepository from "@/repositories/author.repository"
import { CreateAuthorInput, UpdateAuthorInput } from "@/types/author.model"
import { createHash, randomBytes } from "crypto"

export const createAuthor = async (data: Omit<CreateAuthorInput, "api_key_hash">) => {
    const rawKey = randomBytes(16).toString('hex')
    const hash = createHash("sha256").update(rawKey).digest("hex")

    const author = await authorRepository.create({
        ...data,
        api_key_hash: hash
    } as any)

    return { ...author, api_key: rawKey }
}

export const updateAuthor = async (id: string, data: UpdateAuthorInput) => {
    const author = await authorRepository.findById(id)
    if (!author) {
        throw new HttpError(404, "Autor não encontrado")
    }
    return await authorRepository.update(id, data)
}

export const deleteAuthor = async (id: string) => {
    const author = await authorRepository.findById(id)
    if (!author) {
        throw new HttpError(404, "Autor não encontrado")
    }
    return await authorRepository.remove(id)
}

export const getAuthorById = async (id: string) => {
    const author = await authorRepository.findById(id)
    if (!author) {
        throw new HttpError(404, "Autor não encontrado")
    }
    return author
}

export const getAuthors = async () => {
    return await authorRepository.findAll()
}