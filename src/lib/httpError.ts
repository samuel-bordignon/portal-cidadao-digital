import { PostgrestError } from "@supabase/supabase-js"
import { ZodError } from "zod"
export class HttpError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message)
  }
}

function isPostgrestError(error: unknown): error is PostgrestError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "code" in error &&
    "details" in error
  )
}

export function errorResponse(error: unknown) {
  if (error instanceof HttpError) {
    return Response.json(
      { error: error.message },
      { status: error.status }
    )
  }

  if (error instanceof  ZodError ) {
    return Response.json(
      {
        error: "Dados inválidos",
        issues: error.flatten()
      },
      { status: 400 }
    )
  }

  if (isPostgrestError(error)) {
  return Response.json(
    {
      error: error.message,
      issues: error.details
    },
    { status: 400 }
  )
}

  console.error(error)

  return Response.json(
    { error: "Erro interno do servidor" },
    { status: 500 }
  )
}