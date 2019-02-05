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
export interface ArticleData {
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
  | "image" // TODO: to be deprecated
  | "image_set"
  | "embed"
  | "social_embed"
  | "slideshow" // TODO: to be deprecated
  | "text"
  | "video"
  | "default"

export interface SectionData {
  type: SectionType
  layout?: SectionLayout
  images?: ImagesData
  body?: string
  url?: string
  caption?: string
  cover_image_url?: string
  title?: string
  mobile_height?: number
  height?: number
}

export type ImagesData = ImageData[]

export interface ImageData {
  artist?: GravityEntity
  artists?: GravityEntity[]
  caption?: string
  credit?: string
  date?: string
  height?: number
  id?: string
  index?: number
  image?: string
  setTitle?: string
  title?: string
  type?: string
  url?: string
  partner?: GravityEntity
  slug?: string
  width?: number
}

export interface GravityEntity {
  name?: string
  slug?: string
}

export interface DisplayData {
  name: string
  canvas: DisplayUnitData
  panel: DisplayUnitData
  renderTime?: number
}

export interface DisplayUnitAssetData {
  caption?: string
  url?: string
}

export interface DisplayUnitData {
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

export interface RelatedArticlePanelData {
  id: string
  layout: ArticleLayout
  slug: string
  thumbnail_title: string
  thumbnail_image: string
}

export interface RelatedArticleCanvasData {
  authors?: any[]
  contributing_authors?: any[]
  id: string
  layout: ArticleLayout
  published_at: string
  slug: string
  thumbnail_title: string
  thumbnail_image: string
}
