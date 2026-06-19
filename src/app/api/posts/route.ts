import { authenticateFromRequest } from "@/lib/auth"
import { CreatePostSchema } from "@/schemas/post.schema"
import * as PostService from "@/service/post.service"
import { errorResponse } from '@/lib/httpError'
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const author = await authenticateFromRequest(request, ['admin', 'author'])

        const payload = CreatePostSchema.omit({ slug: true, status: true, author_id: true }).parse(await request.json())

        const post = await PostService.createPost(payload, author.id)

        return Response.json(post, { status: 201 })
    } catch (err) {
        return errorResponse(err)
    }
}

export async function GET(request: NextRequest) {
    try {
        await authenticateFromRequest(request, ['admin', 'author'])
        const posts = await PostService.getPosts()

        return Response.json(posts, { status: 200 })
    } catch (err) {
        return errorResponse(err)
    }
}