import { authenticateFromRequest } from "@/lib/auth"
import { CreateCategorySchema } from "@/schemas/category.schema"
import { createCategory, getCategories } from "@/service/category.service"
import { errorResponse } from '@/lib/httpError'

export async function POST(request: Request) {
    try {
        const author = await authenticateFromRequest(request, ['admin', 'author'])

        const payload = CreateCategorySchema.pick({nome:true}).parse(await request.json())

        const category = await createCategory(payload, author)

        return Response.json(category, { status: 201 })
    } catch (err) {
        return errorResponse(err)
    }
}

export async function GET() {
    try {
        const categories = await getCategories()

        return Response.json(categories, { status: 200 })
    } catch (err) {
        return errorResponse(err)
    }
}
