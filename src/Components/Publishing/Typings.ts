export type ArticleLayout =
  | "classic"
  | "feature"
  | "series"
  | "standard"
  | "video"
  | "news"

export enum ArticleAdType {
  Feature = "feature",
  Article = "article",
  NewsLanding = "newslanding",
  SponsorLanding = "sponsorlanding",
  SponsorFeature = "sponsorfeature",
}

export enum AdUnit {
  Desktop_TopLeaderboard = "Desktop_TopLeaderboard",
  Desktop_RightRail1 = "Desktop_RightRail1",
  Desktop_InContentLB1 = "Desktop_InContentLB1",
  Desktop_InContentLB2 = "Desktop_InContentLB2",
  Desktop_InContentLBRepeat = "Desktop_InContentLBRepeat",
  Desktop_TopLogo = "Desktop_TopLogo",
  Desktop_PIPWLogo = "Desktop_PIPWLogo",
  Mobile_TopLeaderboard = "Mobile_TopLeaderboard",
  Mobile_InContentMR1 = "Mobile_InContentMR1",
  Mobile_InContentMR2 = "Mobile_InContentMR2",
  Mobile_IncontentMRRepeat = "Mobile_IncontentMRRepeat",
  Mobile_InContentLB1 = "Mobile_InContentLB1",
  Mobile_InContentLB2 = "Mobile_InContentLB2",
  Mobile_InContentLBRepeat = "Mobile_InContentLBRepeat",
  Mobile_TopLogo = "Mobile_TopLogo",
  Mobile_PIPWLogo = "Mobile_PIPWLogo",
}

export enum AdDimension {
  Desktop_TopLeaderboard = "970x250",
  Desktop_RightRail1 = "300x250",
  Desktop_InContentLB1 = "970x250",
  Desktop_InContentLB2 = "970x250",
  Desktop_InContentLBRepeat = "970x250",
  Desktop_TopLogo = "1x1",
  Desktop_PIPWLogo = "1x1",
  Mobile_TopLeaderboard = "300x50",
  Mobile_InContentMR1 = "300x250",
  Mobile_InContentMR2 = "300x250",
  Mobile_IncontentMRRepeat = "300x250",
  Mobile_InContentLB1 = "300x50",
  Mobile_InContentLB2 = "300x50",
  Mobile_InContentLBRepeat = "300x50",
  Mobile_TopLogo = "1x1",
  Mobile_PIPWLogo = "1x1",
}

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
  tracking_tags?: string[]
  sponsor?: {
    pixel_tracking_code?: string
    partner_logo_link?: string
    partner_light_logo?: string
    partner_dark_logo?: string
    partner_condensed_logo?: string
  }
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

export interface MediaData {
  url?: string
  cover_image_url?: string
  duration?: number
  release_date?: string
  published?: boolean
  description?: string
  credits?: string
}

export interface HostedAdData {
  adUnit?: AdUnit
  adDimension?: AdDimension
  displayNewAds: boolean
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
