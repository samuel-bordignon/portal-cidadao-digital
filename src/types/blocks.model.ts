import { z } from 'zod'
import {
  HeadingBlockSchema,
  ParagraphBlockSchema,
  ImageBlockSchema,
  VideoBlockSchema,
  IframeBlockSchema,
  QuoteBlockSchema,
  ListBlockSchema,
  DividerBlockSchema,
  PdfBlockSchema,
  ContentBlockSchema,
} from '@/schemas/blocks.schema'

export type HeadingBlock = z.infer<typeof HeadingBlockSchema>

export type ParagraphBlock = z.infer<typeof ParagraphBlockSchema>

export type ImageBlock = z.infer<typeof ImageBlockSchema>

export type VideoBlock = z.infer<typeof VideoBlockSchema>

export type IframeBlock = z.infer<typeof IframeBlockSchema>

export type QuoteBlock = z.infer<typeof QuoteBlockSchema>

export type ListBlock = z.infer<typeof ListBlockSchema>

export type DividerBlock = z.infer<typeof DividerBlockSchema>

export type PdfBlock = z.infer<typeof PdfBlockSchema>

export type ContentBlock = z.infer<typeof ContentBlockSchema>


