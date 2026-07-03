type EmptyStateProps = {
  title: string
  description: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-md border bg-portal-surface px-6 py-10 text-center">
      <h2 className="font-heading text-2xl font-bold text-portal-heading">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-portal-body">
        {description}
      </p>
    </div>
  )
}
