import { authenticateFromRequest } from "@/lib/auth"
import { publishPost } from "@/service/post.service"
import { errorResponse } from "@/lib/httpError"

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params

        const author = await authenticateFromRequest(request, ['admin', 'author'])

        const published = await publishPost(id, author)

        return Response.json(published, { status: 201 })
    } catch (err) {
        return errorResponse(err)
    }
}

