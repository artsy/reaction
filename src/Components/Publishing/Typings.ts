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

// TODO: Make some of these non-optional ;)
export type ArticleData = {
  id: string
  layout?: ArticleLayout
  authors?: any
  postscript?: string
  date?: string
  published_at?: string
  sections?: Array<{
    type: string
    layout?: SectionLayout
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
