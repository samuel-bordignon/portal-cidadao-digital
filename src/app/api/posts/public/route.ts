import { errorResponse } from "@/lib/httpError"
import * as PostService from "@/service/post.service"
import { NextRequest } from "next/server"

export async function GET(_request: NextRequest) {
    try {
        const posts = await PostService.getPublishedPosts()

        return Response.json(posts, { status: 200 })
    } catch (err) {
        return errorResponse(err)
    }
}