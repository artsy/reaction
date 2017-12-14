export type Layout = "classic" | "feature" | "series" | "standard" | "video"
export type SectionLayout = "blockquote" | "column_width" | "fillwidth" | "full" | "mini" | "overflow_fillwidth"

export type ArticleData = {
  layout: Layout
  [x: string]: any
}
