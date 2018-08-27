import React from "react"
import track from "react-tracking"
import Events from "../../Utils/Events"

import { debounce } from "lodash"
import { MinimalCtaBanner } from "../MinimalCtaBanner"
import { getArticleFullHref } from "./Constants"
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
  infiniteScrollEntrySlug?: string
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
  onOpenAuthModal?: (type: "register" | "login", config: object) => void
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
      window.addEventListener("scroll", debounce(() => this.handleScroll(), 10))
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
    const { article, isLoggedIn, isTruncated, isMobile } = this.props

    return (
      isMobile && article.layout !== "series" && !isLoggedIn && !isTruncated
    )
  }

  render() {
    const { layout, slug } = this.props.article
    const copy = layout === "news" ? CtaCopy.news : CtaCopy.default
    const backgroundColor = layout === "video" ? "white" : "black"
    const textColor = layout === "video" ? "black" : "white"

    return (
      <FullScreenProvider>
        {this.getArticleLayout()}
        {this.shouldRenderSignUpCta() && (
          <MinimalCtaBanner
            href={`/sign_up?redirect-to=${getArticleFullHref(slug)}`}
            height="55px"
            copy={copy}
            position="bottom"
            textColor={textColor}
            backgroundColor={backgroundColor}
            show={this.state.showCtaBanner}
          />
        )}
      </FullScreenProvider>
    )
  }
}
