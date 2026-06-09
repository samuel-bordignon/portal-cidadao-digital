import { errorResponse } from "@/lib/httpError"
import * as PostService from "@/service/post.service"

export async function GET() {
    try {
        const posts = await PostService.getPublishedPosts()

        return Response.json(posts, { status: 201 })
    } catch (err) {
        return errorResponse(err)
    }
}