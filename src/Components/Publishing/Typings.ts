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

export type DateFormat =
  | "condensed"
  | "monthYear"
  | "monthDay"
  | "news"
  | "verbose"
  | "default"

// TODO: Make some of these non-optional ;)
export type ArticleData = {
  id: string
  layout?: ArticleLayout
  authors?: any
  postscript?: string
  date?: string
  published_at?: string
  sections?: SectionData[]
  series?: {
    description?: string
    sub_title?: string
  }
  news_source?: {
    title?: string
    url?: string
  }
  [x: string]: any
}

export type SectionType =
  | "image_collection"
  | "image_set"
  | "embed"
  | "social_embed"
  | "text"
  | "video"
  | "default"

export type SectionData = {
  type: SectionType
  layout?: SectionLayout
  images?: any[]
  body?: string
  url?: string
  caption?: string
  cover_image_url?: string
  title?: string
  mobile_height?: number
  height?: number
}

export type DisplayData = {
  name: string
  canvas: DisplayUnitData
  panel: DisplayUnitData
  renderTime?: number
}

export type DisplayUnitAssetData = {
  caption?: string
  url?: string
}

export type DisplayUnitData = {
  assets?: DisplayUnitAssetData[]
  body?: string
  cover_image_url?: string
  disclaimer?: string
  headline?: string
  layout?: string
  link?: {
    text: string
    url: string
  }
  logo?: string
  name?: string
  pixel_tracking_code?: string
}

export interface RelatedArticleData {
  thumbnail_title: string
  thumbnail_image: string
  slug: string
  id: string
}
