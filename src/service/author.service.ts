import * as authorRepository from "@/repositories/author.repository"
import { CreateAuthorInput } from "@/types/author.model"
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

