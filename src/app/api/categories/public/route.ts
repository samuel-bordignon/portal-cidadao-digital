import { errorResponse } from "@/lib/httpError"
import { getCategoriesWithPublishedPosts } from "@/service/category.service"

export async function GET() {
    try {
        const categories = await getCategoriesWithPublishedPosts()

        return Response.json(categories, { status: 200 })
    } catch (err) {
        return errorResponse
        (err)
    }
}