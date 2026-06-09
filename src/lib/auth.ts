import { createHash } from "crypto"
import * as authorRepository from "@/repositories/author.repository"
import { HttpError } from '@/lib/httpError'

type Role = 'admin' | 'author'

export async function authenticateFromRequest(request: Request, roles?: Role[]) {
  const authHeader = request.headers.get("authorization")

  if (!authHeader?.startsWith("Bearer ")) {
    throw new HttpError(401, "Não autenticado")
  }

  const apiKey = authHeader.replace("Bearer ", "")

  const hash = createHash("sha256").update(apiKey).digest("hex")

  const author = await authorRepository.findByApiKeyHash(hash)

  if (!author) {
    throw new HttpError(401, "Não autenticado")
  }

  if (roles && !roles.includes(author.role)) {
    throw new HttpError(403, "Sem permissão")
  }

  return author
}