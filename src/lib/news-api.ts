import { headers } from "next/headers"

import { generateSlug } from "@/lib/utils"
import type { ContentBlock } from "@/types/blocks.model"
import type { Category } from "@/types/category.model"
import type { Post } from "@/types/post.model"

export type PublicCategory = Pick<Category, "id" | "nome" | "slug"> &
  Partial<Pick<Category, "author_id" | "created_at">>

export type PublicPost = Omit<Post, "category" | "author"> & {
  category?: Pick<Category, "nome"> | Category | null
  author?: Post["author"] | null
}

async function getApiBaseUrl() {
  const requestHeaders = await headers()
  const forwardedHost = requestHeaders.get("x-forwarded-host")
  const host = forwardedHost ?? requestHeaders.get("host")

  if (host) {
    const protocol =
      requestHeaders.get("x-forwarded-proto") ??
      (host.startsWith("localhost") || host.startsWith("127.0.0.1")
        ? "http"
        : "https")

    return `${protocol}://${host}/api`
  }

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/api`
  }

  return "http://localhost:3000/api"
}

async function fetchApi<T>(path: string): Promise<T | null> {
  try {
    const baseUrl = await getApiBaseUrl()
    const response = await fetch(`${baseUrl}${path}`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      return null
    }

    return (await response.json()) as T
  } catch {
    return null
  }
}

export async function getPublicPosts() {
  const posts = await fetchApi<PublicPost[]>("/posts/public")

  return sortPostsByDate(posts ?? [])
}

export async function getPublicPost(slug: string) {
  return await fetchApi<PublicPost>(`/posts/public/${encodeURIComponent(slug)}`)
}

export async function getCategories() {
  const categories = await fetchApi<PublicCategory[]>("/categories")

  return (categories ?? []).sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"))
}

export async function getCategoryBySlug(slug: string) {
  return await fetchApi<PublicCategory>(
    `/categories/public/${encodeURIComponent(slug)}`
  )
}

export function sortPostsByDate(posts: PublicPost[]) {
  return [...posts].sort((a, b) => {
    const first = new Date(a.created_at).getTime()
    const second = new Date(b.created_at).getTime()

    return second - first
  })
}

export function getCategoryName(post: PublicPost) {
  return post.category?.nome ?? "Geral"
}

export function getCategorySlug(post: PublicPost) {
  if (post.category && "slug" in post.category && post.category.slug) {
    return post.category.slug
  }

  return generateSlug(getCategoryName(post))
}

export function getPostHref(post: PublicPost) {
  return `/noticias/${post.slug}`
}

export function getCategoryHref(category: Pick<PublicCategory, "slug">) {
  return `/categorias/${category.slug}`
}

export function filterPostsByCategory(
  posts: PublicPost[],
  category: Pick<PublicCategory, "nome" | "slug">
) {
  const categoryName = normalizeSearchText(category.nome)
  const categorySlug = normalizeSearchText(category.slug)

  return posts.filter((post) => {
    const postCategoryName = normalizeSearchText(getCategoryName(post))
    const postCategorySlug = normalizeSearchText(getCategorySlug(post))

    return postCategoryName === categoryName || postCategorySlug === categorySlug
  })
}

export function searchPosts(posts: PublicPost[], query: string) {
  const normalizedQuery = normalizeSearchText(query)

  if (!normalizedQuery) {
    return []
  }

  return posts.filter((post) => {
    const searchable = normalizeSearchText(
      [
        post.titulo,
        post.resumo,
        getCategoryName(post),
        extractBlocksText(post.content_blocks),
      ].join(" ")
    )

    return searchable.includes(normalizedQuery)
  })
}

export function extractBlocksText(blocks: ContentBlock[] = []) {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "heading":
        case "paragraph":
          return block.data.text
        case "quote":
          return `${block.data.text} ${block.data.author}`
        case "list":
          return block.data.items.join(" ")
        case "image":
          return `${block.data.alt} ${block.data.caption ?? ""}`
        case "iframe":
        case "pdf":
          return block.data.title
        default:
          return ""
      }
    })
    .join(" ")
}

export function formatDate(date: string, options?: Intl.DateTimeFormatOptions) {
  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return ""
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    ...options,
  }).format(parsedDate)
}

export function formatShortDate(date: string) {
  return formatDate(date, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

function normalizeSearchText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
}
