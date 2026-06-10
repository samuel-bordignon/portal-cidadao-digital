import { authenticateFromRequest } from "@/lib/auth"
import { errorResponse } from "@/lib/httpError"
import { getPostByAuthor } from "@/service/post.service"

export async function GET(request: Request) {
    try {
        const author = await authenticateFromRequest(request, ['admin', 'author'])

        const posts = await getPostByAuthor(author.id)

        return Response.json(posts, { status: 201 })
    } catch (err) {
        return errorResponse(err)
    }
}