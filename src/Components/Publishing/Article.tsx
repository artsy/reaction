import React from "react"
import track from "react-tracking"
import Events from "../../Utils/Events"
import ArticleWithFullScreen from "./Layouts/ArticleWithFullScreen"
import { NewsLayout } from "./Layouts/NewsLayout"
import { SeriesLayout } from "./Layouts/SeriesLayout"
import { VideoLayout } from "./Layouts/VideoLayout"
import { FullScreenProvider } from "./Sections/FullscreenViewer/FullScreenProvider"
import { ArticleData } from "./Typings"

export interface ArticleProps {
  article: ArticleData
  relatedArticles?: any
  relatedArticlesForPanel?: any
  relatedArticlesForCanvas?: any
  renderTime?: string
  seriesArticle?: ArticleData
  isHovered?: boolean
  isMobile?: boolean
  isSuper?: boolean
  isTruncated?: boolean
  emailSignupUrl?: string
  headerHeight?: string
  marginTop?: string | null
  display?: {
    name: string
    panel: object
    canvas: any
  }
  showTooltips?: boolean
  slideIndex?: number
  tracking?: any
  closeViewer?: () => void
  viewerIsOpen?: boolean
  onOpenAuthModal?: (type: "register" | "login", config: Object) => void
  onExpand?: () => void
}

@track(
  (props: ArticleProps) => {
    return {
      page: "Article",
      entity_type: "article",
      entity_id: props.article.id,
    }
  },
  {
    dispatch: data => Events.postEvent(data),
  }
)
export class Article extends React.Component<ArticleProps> {
  getArticleLayout = () => {
    const { article } = this.props

    switch (article.layout) {
      case "series": {
        return <SeriesLayout {...this.props} />
      }
      case "video": {
        return <VideoLayout {...this.props} />
      }
      case "news": {
        return <NewsLayout {...this.props} />
      }
      default: {
        return <ArticleWithFullScreen {...this.props} />
      }
    }
  }

  render() {
    return <FullScreenProvider>{this.getArticleLayout()}</FullScreenProvider>
  }
}
