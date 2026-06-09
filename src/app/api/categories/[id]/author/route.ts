import { authenticateFromRequest } from "@/lib/auth"
import { errorResponse } from "@/lib/httpError"
import { getCategoriesByAuthor } from "@/service/category.service"

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params

        await authenticateFromRequest(request, ['admin', 'author'])

        const categories = await getCategoriesByAuthor(id)

        return Response.json(categories, { status: 201 })
    } catch (err) {
        return errorResponse(err)
    }
}