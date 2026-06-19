import { authenticateFromRequest } from "@/lib/auth"
import { errorResponse } from "@/lib/httpError"
import { UpdatedAuthorSchema } from "@/schemas/author.schema"
import { getAuthorById, updateAuthor, deleteAuthor } from "@/service/author.service"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params

    await authenticateFromRequest(request, ['admin'])

    const author = await getAuthorById(id)

    return Response.json(author, { status: 201 })
  } catch (err) {
    return errorResponse(err)
  }
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params

    await authenticateFromRequest(request, ['admin'])

    const payload = UpdatedAuthorSchema.parse(await request.json())

    const author = await updateAuthor(id, payload)

    return Response.json(author, { status: 200 })
  } catch (err) {
    return errorResponse(err)
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params

    await authenticateFromRequest(request, ['admin'])

    await deleteAuthor(id)

    return new Response(null, { status: 204 })
  } catch (err) {
    return errorResponse(err)
  }
}

