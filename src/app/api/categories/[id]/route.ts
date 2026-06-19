import { authenticateFromRequest } from "@/lib/auth"
import { UpdateCategorySchema } from "@/schemas/category.schema"
import { getCategoryById, updateCategory, deleteCategory } from "@/service/category.service"
import { errorResponse } from "@/lib/httpError"
import { NextRequest } from "next/server"

export async function GET(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params

    const category = await getCategoryById(id)

    return Response.json(category, { status: 200 })
  } catch (err) {
    return errorResponse(err)
  }
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params

    const author = await authenticateFromRequest(request, ['admin', 'author'])

    const payload = UpdateCategorySchema.pick({ nome: true }).parse(await request.json())

    const updated = await updateCategory(id, payload, author.id, author.role)

    return Response.json(updated, { status: 200 })
  } catch (err) {
    return errorResponse(err)
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params

    await authenticateFromRequest(request, ['admin'])

    await deleteCategory(id)
    
    return new Response(null, { status: 204 })
  } catch (err) {
    return errorResponse(err)
  }
}
