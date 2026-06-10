import { authenticateFromRequest } from "@/lib/auth"
import { CreateCategorySchema } from "@/schemas/category.schema"
import { createCategory, getCategories } from "@/service/category.service"
import { errorResponse } from '@/lib/httpError'

export async function POST(request: Request) {
    try {
        const { id } = await authenticateFromRequest(request, ['admin', 'author'])

        const payload = CreateCategorySchema.pick({ nome: true }).parse(await request.json())

        const category = await createCategory(payload, id)

        return Response.json(category, { status: 201 })
    } catch (err) {
        return errorResponse(err)
    }
}

export async function GET(request: Request) {
    try {
        await authenticateFromRequest(request, ['admin', 'author'])

        const categories = await getCategories()

        return Response.json(categories, { status: 200 })
    } catch (err) {
        return errorResponse(err)
    }
}
