/* eslint-disable @next/next/no-img-element */
import { ArrowRight, CalendarDays } from "lucide-react"
import Link from "next/link"

import {
  formatShortDate,
  getCategoryName,
  getPostHref,
} from "@/lib/news-api"
import type { PublicPost } from "@/lib/news-api"
import { cn } from "@/lib/utils"

type NewsCardProps = {
  post: PublicPost
  variant?: "lead" | "standard" | "row" | "compact"
  className?: string
}

export function NewsCard({ post, variant = "standard", className }: NewsCardProps) {
  if (variant === "lead") {
    return (
      <article className={cn("group", className)}>
        <Link href={getPostHref(post)} className="grid gap-5">
          <CoverImage
            post={post}
            className="aspect-[16/10] overflow-hidden rounded-md bg-portal-surface"
          />
          <div>
            <CategoryLabel post={post} />
            <h1 className="mt-3 max-w-3xl font-heading text-3xl font-bold leading-[1.05] text-portal-heading transition group-hover:text-portal-teal-dark sm:text-5xl">
              {post.titulo}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-portal-body sm:text-lg">
              {post.resumo}
            </p>
            <MetaLine post={post} className="mt-5" />
          </div>
        </Link>
      </article>
    )
  }

  if (variant === "row") {
    return (
      <article className={cn("group border-b pb-5 last:border-b-0", className)}>
        <Link href={getPostHref(post)} className="grid grid-cols-[112px_1fr] gap-4 sm:grid-cols-[160px_1fr]">
          <CoverImage
            post={post}
            className="aspect-[4/3] overflow-hidden rounded-md bg-portal-surface"
          />
          <div className="min-w-0">
            <CategoryLabel post={post} />
            <h2 className="mt-2 font-heading text-lg font-bold leading-tight text-portal-heading transition group-hover:text-portal-teal-dark sm:text-xl">
              {post.titulo}
            </h2>
            <p className="mt-2 hidden text-sm leading-6 text-portal-body sm:block">
              {post.resumo}
            </p>
            <MetaLine post={post} className="mt-3" />
          </div>
        </Link>
      </article>
    )
  }

  if (variant === "compact") {
    return (
      <article className={cn("group border-b py-4 first:pt-0 last:border-b-0", className)}>
        <Link href={getPostHref(post)}>
          <CategoryLabel post={post} />
          <h3 className="mt-2 font-heading text-lg font-bold leading-tight text-portal-heading transition group-hover:text-portal-teal-dark">
            {post.titulo}
          </h3>
          <MetaLine post={post} className="mt-3" />
        </Link>
      </article>
    )
  }

  return (
    <article className={cn("group", className)}>
      <Link href={getPostHref(post)} className="grid gap-4">
        <CoverImage
          post={post}
          className="aspect-[16/10] overflow-hidden rounded-md bg-portal-surface"
        />
        <div>
          <CategoryLabel post={post} />
          <h2 className="mt-2 font-heading text-xl font-bold leading-tight text-portal-heading transition group-hover:text-portal-teal-dark">
            {post.titulo}
          </h2>
          <p className="mt-2 text-sm leading-6 text-portal-body">{post.resumo}</p>
          <MetaLine post={post} className="mt-4" />
        </div>
      </Link>
    </article>
  )
}

function CategoryLabel({ post }: { post: PublicPost }) {
  return (
    <span className="inline-flex text-xs font-bold uppercase tracking-[0.18em] text-portal-teal-dark">
      {getCategoryName(post)}
    </span>
  )
}

function MetaLine({ post, className }: { post: PublicPost; className?: string }) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-xs font-medium text-portal-muted",
        className
      )}
    >
      <CalendarDays className="size-3.5" />
      {formatShortDate(post.created_at)}
    </span>
  )
}

function CoverImage({ post, className }: { post: PublicPost; className?: string }) {
  if (!post.imagem_capa) {
    return (
      <div
        className={cn(
          "flex min-h-28 flex-col justify-between border bg-[linear-gradient(135deg,#f7f9fc_0%,#e8f7f4_55%,#fff4ec_100%)] p-4",
          className
        )}
      >
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-portal-teal-dark">
          {getCategoryName(post)}
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-portal-heading">
          Ler noticia
          <ArrowRight className="size-4" />
        </span>
      </div>
    )
  }

  return (
    <div className={cn("relative", className)}>
      <img
        src={post.imagem_capa}
        alt=""
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <span
        className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-portal-teal-dark shadow-sm backdrop-blur"
      >
        {getCategoryName(post)}
      </span>
    </div>
  )
}
