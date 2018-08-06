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
  standard = "Sign up to get our best stories everyday",
  feature = "Sign up to get our best stories everyday",
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
    showCtaBanner: true,
  }

  componentDidMount() {
    if (window) {
      let lastScrollPosition = 0
      window.addEventListener("scroll", e => {
        const newScrollPosition = window.scrollY
        let showCtaBanner = this.state.showCtaBanner

        if (newScrollPosition < lastScrollPosition) {
          // scrolling up the page
          if (this.state.showCtaBanner) {
            showCtaBanner = false
          }
        } else {
          // scrolling down the page
          if (this.state.showCtaBanner === false) {
            showCtaBanner = true
          }
        }

        if (this.state.showCtaBanner !== showCtaBanner) {
          this.setState({ showCtaBanner })
        }
        lastScrollPosition = newScrollPosition
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
    return (
      <FullScreenProvider>
        {this.getArticleLayout()}
        {this.shouldRenderSignUpCta() && (
          <MinimalCtaBanner
            href="/sign_up"
            height="50px"
            copy={CtaCopy[this.props.article.layout] || CtaCopy.default}
            position="bottom"
            textColor="white"
            backgroundColor="black"
            showCtaBanner={this.state.showCtaBanner}
          />
        )}
      </FullScreenProvider>
    )
  }
}
