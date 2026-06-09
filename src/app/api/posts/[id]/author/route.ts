import { authenticateFromRequest } from "@/lib/auth"
import { errorResponse } from "@/lib/httpError"
import { getCategoriesByAuthor } from "@/service/category.service"

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params

        await authenticateFromRequest(request, ['admin', 'author'])

        const posts = await getCategoriesByAuthor(id)

        return Response.json(posts, { status: 201 })
    } catch (err) {
        return errorResponse(err)
    }
}