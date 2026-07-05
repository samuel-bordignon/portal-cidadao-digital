import { ChevronDown, Search } from "lucide-react"
import Link from "next/link"

import { getCategoryHref } from "@/lib/news-api"
import type { PublicCategory } from "@/lib/news-api"

type SiteHeaderProps = {
  categories: PublicCategory[]
}

export function SiteHeader({ categories }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto flex w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-18 items-center justify-between gap-4 py-3">
          <Link
            href="/"
            className="flex min-w-0 flex-col leading-none focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
          >
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-portal-teal-dark">
              Portal
            </span>
            <span className="font-heading text-2xl font-bold text-portal-heading sm:text-3xl">
              Cidadao Digital
            </span>
          </Link>

          <form action="/busca" className="hidden w-full max-w-xs items-center md:flex">
            <label className="relative w-full">
              <span className="sr-only">Buscar noticias</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-portal-muted" />
              <input
                name="q"
                type="search"
                placeholder="Buscar noticias"
                className="h-10 w-full rounded-full border bg-white pl-9 pr-4 text-sm text-portal-heading outline-none transition placeholder:text-portal-placeholder focus:border-portal-teal focus:ring-3 focus:ring-portal-teal/15"
              />
            </label>
          </form>
        </div>

        <div className="relative flex items-center gap-3 border-t py-2 text-sm font-semibold text-portal-body">
          <Link
            href="/"
            className="shrink-0 rounded-full px-3 py-1.5 transition hover:bg-portal-surface hover:text-portal-teal-dark"
          >
            Inicio
          </Link>
          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-1 rounded-full px-3 py-1.5 transition hover:bg-portal-surface hover:text-portal-teal-dark focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30 [&::-webkit-details-marker]:hidden">
              Categorias
              <ChevronDown className="size-4 transition group-open:rotate-180" />
            </summary>
            <div className="absolute left-0 top-full z-50 mt-2 max-h-[60vh] w-[min(88vw,320px)] overflow-y-auto rounded-md border bg-white p-2 shadow-lg">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={getCategoryHref(category)}
                  className="block rounded-sm px-3 py-2 text-sm font-semibold text-portal-body transition hover:bg-portal-surface hover:text-portal-teal-dark"
                >
                  {category.nome}
                </Link>
              ))}
            </div>
          </details>
        </div>

        <form action="/busca" className="pb-3 md:hidden">
          <label className="relative block">
            <span className="sr-only">Buscar noticias</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-portal-muted" />
            <input
              name="q"
              type="search"
              placeholder="Buscar noticias"
              className="h-10 w-full rounded-full border bg-white pl-9 pr-4 text-sm text-portal-heading outline-none transition placeholder:text-portal-placeholder focus:border-portal-teal focus:ring-3 focus:ring-portal-teal/15"
            />
          </label>
        </form>
      </div>
    </header>
  )
}
