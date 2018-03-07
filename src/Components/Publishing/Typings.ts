export type ArticleLayout =
  | "classic"
  | "feature"
  | "series"
  | "standard"
  | "video"
  | "news"

export type SectionLayout =
  | "blockquote"
  | "column_width"
  | "fillwidth"
  | "full"
  | "mini"
  | "overflow_fillwidth"

export type BylineLayout = "fullscreen" | "condensed" | "standard" | "split"

export type DateFormat = "monthYear" | "condensed" | "verbose" | "default"

export type ArticleData = {
  id: string
  layout: ArticleLayout
  sections?: Array<{
    type: string
    layout?: string
    images?: any[]
    body?: string
    url?: string
    caption?: string
    cover_image_url?: string
    title?: string
    mobile_height?: number
    height?: number
  }>
  news_source?: {
    title?: string
    url?: string
  }
  [x: string]: any
}
