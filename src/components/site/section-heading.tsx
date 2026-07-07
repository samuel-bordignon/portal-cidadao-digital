import { ArrowRight } from "lucide-react"
import Link from "next/link"

type SectionHeadingProps = {
  title: string
  eyebrow?: string
  href?: string
}

export function SectionHeading({ title, eyebrow, href }: SectionHeadingProps) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 border-b pb-3">
      <div>
        {eyebrow ? (
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-portal-teal-dark">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-1 font-heading text-2xl font-bold text-portal-heading sm:text-3xl">
          {title}
        </h2>
      </div>

      {href ? (
        <Link
          href={href}
          className="hidden shrink-0 items-center gap-2 text-sm font-bold text-portal-teal-dark transition hover:text-portal-heading sm:inline-flex"
        >
          Ver mais
          <ArrowRight className="size-4" />
        </Link>
      ) : null}
    </div>
  )
}
