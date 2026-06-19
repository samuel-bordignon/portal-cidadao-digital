import { authenticateFromRequest } from "@/lib/auth"
import { errorResponse } from "@/lib/httpError"
import { getPostByAuthor } from "@/service/post.service"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    try {
        const { id } = await authenticateFromRequest(request, ['admin', 'author'])

        const posts = await getPostByAuthor(id)

        return Response.json(posts, { status: 201 })
    } catch (err) {
        return errorResponse(err)
    }
}