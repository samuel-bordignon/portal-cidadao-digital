import Link from "next/link"

import { getCategoryHref } from "@/lib/news-api"
import type { PublicCategory } from "@/lib/news-api"

type SiteFooterProps = {
  categories: PublicCategory[]
}

export function SiteFooter({ categories }: SiteFooterProps) {
  return (
    <footer className="border-t bg-portal-surface">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_1fr] lg:px-8">
        <div>
          <p className="font-heading text-2xl font-bold text-portal-heading">
            Cidadao Digital
          </p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-portal-body">
            Noticias, orientacoes e servicos para acompanhar temas de cidadania,
            tecnologia e seguranca digital com clareza.
          </p>
        </div>

        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <Link href="/busca" className="font-semibold text-portal-body hover:text-portal-teal-dark">
            Busca
          </Link>
          {categories.slice(0, 6).map((category) => (
            <Link
              key={category.id}
              href={getCategoryHref(category)}
              className="font-semibold text-portal-body hover:text-portal-teal-dark"
            >
              {category.nome}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
