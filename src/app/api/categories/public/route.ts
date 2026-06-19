import { errorResponse } from "@/lib/httpError"
import { getCategoriesWithPublishedPosts } from "@/service/category.service"
import { NextRequest } from "next/server"

export async function GET(request:NextRequest) {
    try {
        const categories = await getCategoriesWithPublishedPosts()

        return Response.json(categories, { status: 200 })
    } catch (err) {
        return errorResponse(err)
    }
}