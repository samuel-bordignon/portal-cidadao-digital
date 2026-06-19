import { authenticateFromRequest } from "@/lib/auth"
import { CreateCategorySchema } from "@/schemas/category.schema"
import { createCategory, getCategories } from "@/service/category.service"
import { errorResponse } from '@/lib/httpError'
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { id } = await authenticateFromRequest(request, ['admin', 'author'])

        const payload = CreateCategorySchema.pick({ nome: true }).parse(await request.json())

        const category = await createCategory(payload, id)

        return Response.json(category, { status: 201 })
    } catch (err) {
        return errorResponse(err)
    }
}

export async function GET(_request: NextRequest) {
    try {
        const categories = await getCategories()

        return Response.json(categories, { status: 200 })
    } catch (err) {
        return errorResponse(err)
    }
}
