import { authenticateFromRequest } from "@/lib/auth"
import { UpdateCategorySchema } from "@/schemas/category.schema"
import { getCategoryById, updateCategory, deleteCategory } from "@/service/category.service"
import { errorResponse } from "@/lib/httpError"

export async function GET(context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params

    const category = await getCategoryById(id)

    return Response.json(category, { status: 200 })
  } catch (err) {
    return errorResponse(err)
  }
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params

    const author = await authenticateFromRequest(request, ['admin', 'author'])

    const payload = UpdateCategorySchema.pick({ nome: true }).parse(await request.json())

    const updated = await updateCategory(id, payload, author)

    return Response.json(updated, { status: 200 })
  } catch (err) {
    return errorResponse(err)
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params

    await authenticateFromRequest(request, ['admin'])

    const category = await deleteCategory(id)

    return Response.json(category, { status: 204 })
  } catch (err) {
    return errorResponse(err)
  }
}
