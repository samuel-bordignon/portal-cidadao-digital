import Link from "next/link"

import { getCategories } from "@/lib/news-api"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"

export default async function NotFound() {
  const categories = await getCategories()

  return (
    <>
      <SiteHeader categories={categories} />
      <main className="flex flex-1 items-center bg-white">
        <div className="mx-auto w-full max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-portal-teal-dark">
            404
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold text-portal-heading sm:text-5xl">
            Conteudo nao encontrado
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-portal-body">
            A pagina pode ter sido removida ou ainda nao esta publicada.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full bg-portal-teal px-5 py-3 text-sm font-bold text-white transition hover:bg-portal-teal-dark"
          >
            Voltar para o inicio
          </Link>
        </div>
      </main>
      <SiteFooter categories={categories} />
    </>
  )
}
