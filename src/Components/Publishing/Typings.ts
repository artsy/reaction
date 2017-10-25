export type Layout = "classic" | "standard" | "feature"
export type SectionLayout = "blockquote" | "column_width" | "fillwidth" | "full" | "mini" | "overflow_fillwidth"

export type ArticleData = {
  layout: Layout
  [x: string]: any
}
