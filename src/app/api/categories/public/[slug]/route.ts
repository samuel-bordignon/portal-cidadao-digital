import { errorResponse } from "@/lib/httpError"
import { getCategoryBySlug } from "@/service/category.service"
import { NextRequest } from "next/server"

export async function GET(_request: NextRequest, context: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await context.params

        const categories = await getCategoryBySlug(slug)

        return Response.json(categories, { status: 200 })
    } catch (err) {
        return errorResponse(err)
    }
}