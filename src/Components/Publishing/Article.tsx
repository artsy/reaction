import React from "react"
import track from "react-tracking"
import Events from "../../Utils/Events"

import { MinimalCtaBanner } from "../MinimalCtaBanner"
import ArticleWithFullScreen from "./Layouts/ArticleWithFullScreen"
import { ClassicLayout } from "./Layouts/ClassicLayout"
import { NewsLayout } from "./Layouts/NewsLayout"
import { SeriesLayout } from "./Layouts/SeriesLayout"
import { VideoLayout } from "./Layouts/VideoLayout"
import { FullScreenProvider } from "./Sections/FullscreenViewer/FullScreenProvider"
import { ArticleData, DisplayData } from "./Typings"

export interface ArticleProps {
  article: ArticleData
  relatedArticles?: any
  relatedArticlesForPanel?: any
  relatedArticlesForCanvas?: any
  renderTime?: number
  seriesArticle?: ArticleData
  isHovered?: boolean
  isLoggedIn?: boolean
  isMobile?: boolean
  isSuper?: boolean
  isTruncated?: boolean
  emailSignupUrl?: string
  headerHeight?: string
  marginTop?: string | null
  display?: DisplayData
  showTooltips?: boolean
  slideIndex?: number
  tracking?: any
  closeViewer?: () => void
  viewerIsOpen?: boolean
  onOpenAuthModal?: (type: "register" | "login", config: Object) => void
  onExpand?: () => void
}

export interface State {
  showCtaBanner: boolean
}

export enum CtaCopy {
  news = "Sign up for the best in art world news",
  default = "Sign up to get our best stories everyday",
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
export class Article extends React.Component<ArticleProps, State> {
  state = {
    showCtaBanner: false,
  }
  lastScrollPosition: number = 0

  handleScroll() {
    const newScrollPosition = window.scrollY
    let showCtaBanner = this.state.showCtaBanner

    if (newScrollPosition <= this.lastScrollPosition) {
      // scrolling up the page
      if (this.state.showCtaBanner) {
        showCtaBanner = false
      }
    } else {
      // scrolling down the page
      if (!this.state.showCtaBanner) {
        showCtaBanner = true
      }
    }

    if (this.state.showCtaBanner !== showCtaBanner) {
      this.setState({ showCtaBanner })
    }
    this.lastScrollPosition = newScrollPosition
  }

  componentDidMount() {
    if (window) {
      window.addEventListener("scroll", e => {
        this.handleScroll()
      })
    }
  }

  getArticleLayout = () => {
    const { article } = this.props

    switch (article.layout) {
      case "classic": {
        return <ClassicLayout {...this.props} />
      }
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

  shouldRenderSignUpCta = () => {
    const { article, isLoggedIn, isMobile } = this.props

    return isMobile && article.layout !== "series" && !isLoggedIn
  }

  render() {
    const copy =
      this.props.article.layout === "news" ? CtaCopy.news : CtaCopy.default

    return (
      <FullScreenProvider>
        {this.getArticleLayout()}
        {this.shouldRenderSignUpCta() && (
          <MinimalCtaBanner
            href="/sign_up"
            height="50px"
            copy={copy}
            position="bottom"
            textColor="white"
            backgroundColor="black"
            show={this.state.showCtaBanner}
          />
        )}
      </FullScreenProvider>
    )
  }
}
