import { authenticateFromRequest } from "@/lib/auth"
import { errorResponse } from "@/lib/httpError"
import { getCategoriesByAuthor } from "@/service/category.service"

export async function GET(request: Request) {
    try {
        const { id } = await authenticateFromRequest(request, ['admin', 'author'])

        const categories = await getCategoriesByAuthor(id)

        return Response.json(categories, { status: 200 })
    } catch (err) {
        return errorResponse(err)
    }
}