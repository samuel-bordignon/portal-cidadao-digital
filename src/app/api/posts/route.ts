import { authenticateFromRequest } from "@/lib/auth"
import { CreatePostSchema } from "@/schemas/post.schema"
import * as PostService from "@/service/post.service"
import { errorResponse } from '@/lib/httpError'

export async function POST(request: Request) {
    try {
        await authenticateFromRequest(request, ['admin', 'author'])

        const payload = CreatePostSchema.omit({ slug: true, status: true }).parse(await request.json())

        const post = await PostService.createPost(payload)

        return Response.json(post, { status: 201 })
    } catch (err) {
        errorResponse(err)
    }
}

export async function GET(request: Request) {
    try {
        await authenticateFromRequest(request, ['admin', 'author'])
        const posts = await PostService.getPosts()

        return Response.json(posts, { status: 200 })
    } catch (err) {
        return errorResponse(err)
    }
}