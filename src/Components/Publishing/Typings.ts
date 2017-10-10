export type Layout = "classic" | "standard" | "feature"
export type SectionLayout = "column_width" | "fillwidth" | "overflow_fillwidth"

export type ArticleData = {
  layout: Layout
  [x: string]: any
}
