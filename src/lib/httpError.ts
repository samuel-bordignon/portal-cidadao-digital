export class HttpError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message)
  }
}

export function errorResponse(error: unknown) {
  if (error instanceof HttpError) {
    return Response.json(
      { error: error.message },
      { status: error.status }
    )
  }

  console.error(error)

  return Response.json(
    { error: "Erro interno do servidor" },
    { status: 500 }
  )
}