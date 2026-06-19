import { errorResponse } from "@/lib/httpError"
import { authenticateFromRequest } from "@/lib/auth"
import { UpdatePostSchema } from "@/schemas/post.schema"
import { deletePost, getPostById, updatePost } from "@/service/post.service"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params

    await authenticateFromRequest(request, ['admin', 'author'])

    const post = await getPostById(id)

    return Response.json(post, { status: 200 })
  } catch (err) {
    return errorResponse(err)
  }
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params

    const author = await authenticateFromRequest(request, ['admin', 'author'])

    const payload = UpdatePostSchema.omit({ slug: true, status: true }).parse(await request.json())

    const updated = await updatePost(id, payload, author)

    return Response.json(updated, { status: 200 })
  } catch (err) {
    return errorResponse(err)
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params

    const author = await authenticateFromRequest(request, ['admin', "author"])

    await deletePost(id, author)

    return new Response(null, { status: 204 })
  } catch (err) {
    return errorResponse(err)
  }
}