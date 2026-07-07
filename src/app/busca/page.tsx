import { Search } from "lucide-react"

import { EmptyState } from "@/components/site/empty-state"
import { NewsCard } from "@/components/site/news-card"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { getCategories, getPublicPosts, searchPosts } from "@/lib/news-api"

type SearchPageProps = {
  searchParams: Promise<{
    q?: string | string[]
  }>
}

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Busca",
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = Array.isArray(params.q) ? params.q[0] ?? "" : params.q ?? ""
  const [categories, posts] = await Promise.all([getCategories(), getPublicPosts()])
  const results = query ? searchPosts(posts, query) : []

  return (
    <>
      <SiteHeader categories={categories} />
      <main className="flex-1 bg-white">
        <section className="border-b bg-portal-surface">
          <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-portal-teal-dark">
              Busca
            </p>
            <h1 className="mt-3 font-heading text-4xl font-bold text-portal-heading sm:text-6xl">
              Encontre noticias
            </h1>
            <form action="/busca" className="mt-8 max-w-2xl">
              <label className="relative block">
                <span className="sr-only">Buscar noticias</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-portal-muted" />
                <input
                  name="q"
                  type="search"
                  defaultValue={query}
                  placeholder="Digite uma palavra-chave"
                  className="h-13 w-full rounded-full border bg-white pl-12 pr-4 text-base text-portal-heading outline-none transition placeholder:text-portal-placeholder focus:border-portal-teal focus:ring-3 focus:ring-portal-teal/15"
                />
              </label>
            </form>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {query ? (
            <p className="mb-6 text-sm font-semibold text-portal-muted">
              {results.length} resultado{results.length === 1 ? "" : "s"} para
              {" "}
              <span className="text-portal-heading">&quot;{query}&quot;</span>
            </p>
          ) : null}

          {query && results.length > 0 ? (
            <div className="grid gap-6">
              {results.map((post) => (
                <NewsCard key={post.id} post={post} variant="row" />
              ))}
            </div>
          ) : (
            <EmptyState
              title={query ? "Nenhum resultado encontrado" : "Digite sua busca"}
              description={
                query
                  ? "Tente buscar por outro termo ou acompanhe as noticias recentes do portal."
                  : "A busca consulta titulo, resumo, categoria e conteudo das noticias publicadas."
              }
            />
          )}
        </section>
      </main>
      <SiteFooter categories={categories} />
    </>
  )
}
