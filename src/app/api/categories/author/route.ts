import { authenticateFromRequest } from "@/lib/auth"
import { errorResponse } from "@/lib/httpError"
import { getCategoriesByAuthor } from "@/service/category.service"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    try {
        const { id } = await authenticateFromRequest(request, ['admin', 'author'])

        const categories = await getCategoriesByAuthor(id)

        return Response.json(categories, { status: 200 })
    } catch (err) {
        return errorResponse(err)
    }
}