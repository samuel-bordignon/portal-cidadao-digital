import { z } from 'zod'

export const HeadingBlockSchema = z.object({
  type: z.literal('heading'),
  data: z.object({
    level: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    text: z.string().min(1, 'Texto obrigatório'),
  }),
})

export const ParagraphBlockSchema = z.object({
  type: z.literal('paragraph'),
  data: z.object({
    text: z.string().min(1, 'Texto obrigatório'),
  }),
})

export const ImageBlockSchema = z.object({
  type: z.literal('image'),
  data: z.object({
    url: z.string().url('URL inválida'),
    alt: z.string().min(1, 'Alt text obrigatório'),
    caption: z.string().optional(),
  }),
})

export const VideoBlockSchema = z.object({
  type: z.literal('video'),
  data: z.object({
    url: z.string().url('URL inválida'),
  }),
})

export const IframeBlockSchema = z.object({
  type: z.literal('iframe'),
  data: z.object({
    url: z.string().url('URL inválida'),
    title: z.string().min(1, 'Título obrigatório'),
  }),
})

export const QuoteBlockSchema = z.object({
  type: z.literal('quote'),
  data: z.object({
    text: z.string().min(1, 'Texto obrigatório'),
    author: z.string().min(1, 'Autor obrigatório'),
  }),
})

export const ListBlockSchema = z.object({
  type: z.literal('list'),
  data: z.object({
    style: z.enum(['ordered', 'unordered']),
    items: z.array(z.string().min(1)).min(1, 'Lista não pode ser vazia'),
  }),
})

export const DividerBlockSchema = z.object({
  type: z.literal('divider'),
  data: z.object({}).strict(),
})

export const PdfBlockSchema = z.object({
  type: z.literal('pdf'),
  data: z.object({
    url: z.string().url('URL inválida'),
    title: z.string().min(1, 'Título obrigatório'),
  }),
})

// ── União de todos os blocos ────────────────────────────────

export const ContentBlockSchema = z.discriminatedUnion('type', [
  HeadingBlockSchema,
  ParagraphBlockSchema,
  ImageBlockSchema,
  VideoBlockSchema,
  IframeBlockSchema,
  QuoteBlockSchema,
  ListBlockSchema,
  DividerBlockSchema,
  PdfBlockSchema,
])

export const ContentBlocksSchema = z.array(ContentBlockSchema)