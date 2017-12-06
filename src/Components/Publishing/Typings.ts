export type Layout = "classic" | "standard" | "feature"
export type SectionLayout = "blockquote" | "column_width" | "fillwidth" | "full" | "mini" | "overflow_fillwidth"

export type ArticleData = {
  layout: Layout
  sections: Array<{
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
  [x: string]: any
}
