import { EmptyState } from "@/components/site/empty-state"
import { NewsCard } from "@/components/site/news-card"
import { SectionHeading } from "@/components/site/section-heading"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import {
  filterPostsByCategory,
  getCategories,
  getCategoryHref,
  getPublicPosts,
} from "@/lib/news-api"

export const dynamic = "force-dynamic"

export default async function Home() {
  const [posts, categories] = await Promise.all([
    getPublicPosts(),
    getCategories(),
  ])

  const [leadPost, ...remainingPosts] = posts
  const secondaryPosts = remainingPosts.slice(0, 4)
  const latestPosts = remainingPosts.slice(4, 10)
  const categorySections = categories
    .map((category) => ({
      category,
      posts: filterPostsByCategory(posts, category).slice(0, 3),
    }))
    .filter((section) => section.posts.length > 0)
    .slice(0, 4)

  return (
    <>
      <SiteHeader categories={categories} />
      <main className="flex-1 bg-white">
        <section className="border-b bg-white">
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.8fr)] lg:px-8 lg:py-12">
            {leadPost ? (
              <NewsCard post={leadPost} variant="lead" />
            ) : (
              <EmptyState
                title="Nenhuma noticia publicada"
                description="Assim que houver posts publicados na API, a capa do portal sera preenchida automaticamente."
              />
            )}

            <aside className="border-t pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-heading text-2xl font-bold text-portal-heading">
                  Em destaque
                </h2>
                <span className="rounded-full bg-portal-orange/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-portal-orange">
                  Agora
                </span>
              </div>
              <div>
                {secondaryPosts.length > 0 ? (
                  secondaryPosts.map((post) => (
                    <NewsCard key={post.id} post={post} variant="compact" />
                  ))
                ) : (
                  <p className="text-sm leading-6 text-portal-muted">
                    Ainda nao ha noticias suficientes para montar os destaques.
                  </p>
                )}
              </div>
            </aside>
          </div>
        </section>

        <section className="bg-portal-surface py-10">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Noticias recentes"
              eyebrow="Atualizacao"
            />
            {latestPosts.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {latestPosts.map((post) => (
                  <NewsCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="Sem novas publicacoes"
                description="A lista de noticias recentes aparece quando houver mais posts publicados."
              />
            )}
          </div>
        </section>

        {categorySections.map(({ category, posts: categoryPosts }, index) => (
          <section
            key={category.id}
            className={index % 2 === 0 ? "bg-white py-10" : "bg-portal-surface py-10"}
          >
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionHeading
                title={category.nome}
                eyebrow="Categoria"
                href={getCategoryHref(category)}
              />
              <div className="grid gap-6 md:grid-cols-3">
                {categoryPosts.map((post) => (
                  <NewsCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>
      <SiteFooter categories={categories} />
    </>
  )
}
