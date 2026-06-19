import { errorResponse } from "@/lib/httpError"
import { getPostBySlug } from "@/service/post.service"

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await context.params

        const post = await getPostBySlug(slug)

        return Response.json(post, {status:200})
    } catch (err) {
        return errorResponse(err)
    }
}