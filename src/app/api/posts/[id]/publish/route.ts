import { authenticateFromRequest } from "@/lib/auth"
import { publishPost } from "@/service/post.service"
import { errorResponse } from "@/lib/httpError"
import { NextRequest } from "next/server"

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params

        const author = await authenticateFromRequest(request, ['admin', 'author'])

        const published = await publishPost(id, author.id)

        return Response.json(published, { status: 200 })
    } catch (err) {
        return errorResponse(err)
    }
}

