/* eslint-disable @next/next/no-img-element */
import { ExternalLink, FileText } from "lucide-react"

import type { ContentBlock } from "@/types/blocks.model"

type ContentBlockRendererProps = {
  blocks: ContentBlock[]
}

export function ContentBlockRenderer({ blocks }: ContentBlockRendererProps) {
  if (!blocks.length) {
    return null
  }

  return (
    <div className="article-content">
      {blocks.map((block, index) => (
        <ContentBlockItem key={`${block.type}-${index}`} block={block} />
      ))}
    </div>
  )
}

function ContentBlockItem({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading": {
      const HeadingTag = `h${block.data.level + 1}` as "h2" | "h3" | "h4"

      return (
        <HeadingTag className="mt-10 font-heading text-2xl font-bold leading-tight text-portal-heading first:mt-0 sm:text-3xl">
          {block.data.text}
        </HeadingTag>
      )
    }

    case "paragraph":
      return (
        <p className="mt-6 text-lg leading-8 text-portal-body">
          {block.data.text}
        </p>
      )

    case "image":
      return (
        <figure className="mt-8">
          <img
            src={block.data.url}
            alt={block.data.alt}
            className="max-h-[720px] w-full rounded-md object-cover"
          />
          {block.data.caption ? (
            <figcaption className="mt-3 text-sm leading-6 text-portal-muted">
              {block.data.caption}
            </figcaption>
          ) : null}
        </figure>
      )

    case "video": {
      const embedUrl = getVideoEmbedUrl(block.data.url)

      return (
        <div className="mt-8 overflow-hidden rounded-md border bg-black">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title="Video da noticia"
              className="aspect-video w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <video src={block.data.url} controls className="aspect-video w-full">
              <track kind="captions" />
            </video>
          )}
        </div>
      )
    }

    case "iframe":
      return (
        <div className="mt-8 overflow-hidden rounded-md border bg-white">
          <iframe
            src={block.data.url}
            title={block.data.title}
            className="aspect-video w-full"
            loading="lazy"
          />
        </div>
      )

    case "quote":
      return (
        <blockquote className="mt-8 border-l-4 border-portal-teal bg-portal-surface px-6 py-5">
          <p className="font-heading text-2xl font-semibold leading-snug text-portal-heading">
            {block.data.text}
          </p>
          <cite className="mt-4 block text-sm font-semibold not-italic text-portal-muted">
            {block.data.author}
          </cite>
        </blockquote>
      )

    case "list": {
      const ListTag = block.data.style === "ordered" ? "ol" : "ul"

      return (
        <ListTag className="mt-6 space-y-3 pl-6 text-lg leading-8 text-portal-body marker:font-bold marker:text-portal-teal-dark">
          {block.data.items.map((item, index) => (
            <li key={`${item}-${index}`}>{item}</li>
          ))}
        </ListTag>
      )
    }

    case "divider":
      return <hr className="my-10 border-portal-border" />

    case "pdf":
      return (
        <a
          href={block.data.url}
          target="_blank"
          rel="noreferrer"
          className="mt-8 flex items-center justify-between gap-4 rounded-md border bg-white p-4 text-portal-heading transition hover:border-portal-teal hover:bg-portal-surface"
        >
          <span className="flex min-w-0 items-center gap-3">
            <FileText className="size-5 shrink-0 text-portal-teal-dark" />
            <span className="font-semibold">{block.data.title}</span>
          </span>
          <ExternalLink className="size-4 shrink-0 text-portal-muted" />
        </a>
      )
  }
}

function getVideoEmbedUrl(url: string) {
  try {
    const parsedUrl = new URL(url)

    if (parsedUrl.hostname.includes("youtube.com")) {
      const videoId = parsedUrl.searchParams.get("v")
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null
    }

    if (parsedUrl.hostname.includes("youtu.be")) {
      const videoId = parsedUrl.pathname.replace("/", "")
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null
    }

    if (parsedUrl.hostname.includes("vimeo.com")) {
      const videoId = parsedUrl.pathname.split("/").filter(Boolean).at(-1)
      return videoId ? `https://player.vimeo.com/video/${videoId}` : null
    }
  } catch {
    return null
  }

  return null
}
