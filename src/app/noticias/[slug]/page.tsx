/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { ContentBlockRenderer } from "@/components/site/content-block-renderer"
import { NewsCard } from "@/components/site/news-card"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import {
  filterPostsByCategory,
  formatDate,
  getCategories,
  getCategoryHref,
  getCategoryName,
  getCategorySlug,
  getPublicPost,
  getPublicPosts,
} from "@/lib/news-api"

type ArticlePageProps = {
  params: Promise<{
    slug: string
  }>
}

export const dynamic = "force-dynamic"

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPublicPost(slug)

  if (!post) {
    return {
      title: "Noticia nao encontrada",
    }
  }

  return {
    title: post.titulo,
    description: post.resumo,
    openGraph: {
      title: post.titulo,
      description: post.resumo,
      images: post.imagem_capa ? [post.imagem_capa] : undefined,
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const [post, categories, allPosts] = await Promise.all([
    getPublicPost(slug),
    getCategories(),
    getPublicPosts(),
  ])

  if (!post) {
    notFound()
  }

  const category = {
    id: getCategorySlug(post),
    nome: getCategoryName(post),
    slug: getCategorySlug(post),
  }
  const relatedPosts = filterPostsByCategory(allPosts, category)
    .filter((relatedPost) => relatedPost.id !== post.id)
    .slice(0, 3)

  return (
    <>
      <SiteHeader categories={categories} />
      <main className="flex-1 bg-white">
        <article>
          <header className="border-b bg-white">
            <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.55fr)] lg:px-8 lg:py-12">
              <div>
                <Link
                  href={getCategoryHref(category)}
                  className="text-xs font-bold uppercase tracking-[0.22em] text-portal-teal-dark hover:text-portal-heading"
                >
                  {getCategoryName(post)}
                </Link>
                <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-[1.05] text-portal-heading sm:text-6xl">
                  {post.titulo}
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-portal-body sm:text-xl">
                  {post.resumo}
                </p>
                <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-portal-muted">
                  {post.author?.nome ? <span>Por {post.author.nome}</span> : null}
                  <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
                </div>
              </div>

              {post.imagem_capa ? (
                <figure>
                  <img
                    src={post.imagem_capa}
                    alt=""
                    className="aspect-[4/3] w-full rounded-md object-cover"
                  />
                </figure>
              ) : (
                <div className="flex aspect-[4/3] items-end rounded-md border bg-[linear-gradient(135deg,#f7f9fc_0%,#e8f7f4_55%,#fff4ec_100%)] p-6">
                  <span className="font-heading text-2xl font-bold text-portal-heading">
                    {getCategoryName(post)}
                  </span>
                </div>
              )}
            </div>
          </header>

          <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,760px)_minmax(280px,1fr)] lg:px-8">
            <div>
              <ContentBlockRenderer blocks={post.content_blocks} />
            </div>

            <aside className="border-t pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <h2 className="font-heading text-2xl font-bold text-portal-heading">
                Mais em {getCategoryName(post)}
              </h2>
              <div className="mt-5">
                {relatedPosts.length > 0 ? (
                  relatedPosts.map((relatedPost) => (
                    <NewsCard
                      key={relatedPost.id}
                      post={relatedPost}
                      variant="compact"
                    />
                  ))
                ) : (
                  <p className="text-sm leading-6 text-portal-muted">
                    Nao ha outras noticias publicadas nesta categoria.
                  </p>
                )}
              </div>
            </aside>
          </div>
        </article>
      </main>
      <SiteFooter categories={categories} />
    </>
  )
}
