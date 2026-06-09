import { authenticateFromRequest } from "@/lib/auth"
import { createdAuthorSchema } from "@/schemas/author.schema"
import { createAuthor, getAuthors } from "@/service/author.service"
import { errorResponse } from '@/lib/httpError'

export async function POST(request: Request) {
    try {
        await authenticateFromRequest(request, ['admin'])

        const payload = createdAuthorSchema.omit({ api_key_hash: true }).parse(await request.json())

        const author = await createAuthor(payload)

        return Response.json(author, {
            status: 201
        })
    } catch (err) {
        return errorResponse(err)
    }
}

export async function GET(request: Request) {
    try {
        await authenticateFromRequest(request, ['admin'])

        const authors = await getAuthors()

        return Response.json(authors)
    } catch (err) {
        return errorResponse(err)
    }
}
