import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { EmptyState } from "@/components/site/empty-state"
import { NewsCard } from "@/components/site/news-card"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import {
  filterPostsByCategory,
  getCategories,
  getCategoryBySlug,
  getPublicPosts,
} from "@/lib/news-api"

type CategoryPageProps = {
  params: Promise<{
    slug: string
  }>
}

export const dynamic = "force-dynamic"

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  return {
    title: category?.nome ?? "Categoria",
    description: category
      ? `Noticias publicadas em ${category.nome}`
      : "Noticias por categoria",
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const [category, categories, posts] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories(),
    getPublicPosts(),
  ])

  if (!category) {
    notFound()
  }

  const categoryPosts = filterPostsByCategory(posts, category)
  const [leadPost, ...otherPosts] = categoryPosts

  return (
    <>
      <SiteHeader categories={categories} />
      <main className="flex-1 bg-white">
        <section className="border-b bg-portal-surface">
          <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-portal-teal-dark">
              Categoria
            </p>
            <h1 className="mt-3 font-heading text-4xl font-bold text-portal-heading sm:text-6xl">
              {category.nome}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-portal-body">
              Acompanhe as noticias mais recentes desta editoria.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {leadPost ? (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
              <NewsCard post={leadPost} variant="lead" />
              <div className="border-t pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                {otherPosts.slice(0, 4).map((post) => (
                  <NewsCard key={post.id} post={post} variant="compact" />
                ))}
              </div>
            </div>
          ) : (
            <EmptyState
              title="Sem noticias nesta categoria"
              description="Quando houver posts publicados nesta editoria, eles aparecerao aqui."
            />
          )}

          {otherPosts.length > 4 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {otherPosts.slice(4).map((post) => (
                <NewsCard key={post.id} post={post} />
              ))}
            </div>
          ) : null}
        </section>
      </main>
      <SiteFooter categories={categories} />
    </>
  )
}
