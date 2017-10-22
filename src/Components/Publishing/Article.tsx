import { cloneDeep, includes, map, omit } from "lodash"
import * as PropTypes from "prop-types"
import * as React from "react"
import styled, { StyledFunction } from "styled-components"
import Events from "../../Utils/Events"
import track from "../../Utils/track"
import { DisplayCanvas } from "./Display/Canvas"
import { DisplayPanel } from "./Display/DisplayPanel"
import { EmailSignup } from "./EmailSignup"
import { Header } from "./Header/Header"
import { FeatureLayout } from "./Layouts/FeatureLayout"
import { Sidebar } from "./Layouts/Sidebar"
import { StandardLayout } from "./Layouts/StandardLayout"
import { ReadMore } from "./ReadMore/ReadMoreButton"
import { ReadMoreWrapper } from "./ReadMore/ReadMoreWrapper"
import { RelatedArticlesCanvas } from "./RelatedArticles/RelatedArticlesCanvas"
import { RelatedArticlesPanel } from "./RelatedArticles/RelatedArticlesPanel"
import { FullscreenViewer } from "./Sections/FullscreenViewer/FullscreenViewer"
import { Sections } from "./Sections/Sections"
import { ArticleData } from "./Typings"

export interface ArticleProps {
  article: ArticleData
  relatedArticlesForPanel?: any
  relatedArticlesForCanvas?: any
  isTruncated?: boolean
  emailSignupUrl?: string
  headerHeight?: string
  marginTop?: number
  display?: {
    name: string
    panel: object
    canvas: object
  }
}

interface ArticleState {
  viewerIsOpen: boolean
  slideIndex: number
  fullscreenImages: any
  article: any
  isTruncated: boolean
}

interface ArticleContainerProps {
  marginTop?: number
}

@track({ page: "Article" }, { dispatch: data => Events.postEvent(data) })
export class Article extends React.Component<ArticleProps, ArticleState> {
  static childContextTypes = {
    onViewFullscreen: PropTypes.func,
  }

  constructor(props) {
    super(props)
    const { fullscreenImages, article } = this.indexAndExtractImages()
    this.state = {
      viewerIsOpen: false,
      slideIndex: 0,
      fullscreenImages,
      article,
      isTruncated: props.isTruncated || false,
    }
  }

  getChildContext() {
    return { onViewFullscreen: this.openViewer }
  }

  openViewer = index => {
    this.setState({
      viewerIsOpen: true,
      slideIndex: index,
    })
  }

  closeViewer = () => {
    this.setState({ viewerIsOpen: false })
  }

  removeTruncation = () => {
    this.setState({ isTruncated: false })
  }

  indexAndExtractImages = () => {
    const article = cloneDeep(this.props.article)
    const fullscreenImages = []
    let sectionIndex = 0
    const newSections = map(article.sections, section => {
      if (includes(["image_collection", "image_set"], section.type)) {
        const newImages = map(section.images, image => {
          image.setTitle = section.title
          image.index = sectionIndex
          fullscreenImages.push(image)
          sectionIndex = sectionIndex + 1
          return image
        })
        section.images = newImages
      }
      return section
    })
    article.sections = newSections
    return { fullscreenImages, article }
  }

  renderFeatureArticle() {
    const { headerHeight } = this.props
    const { article } = this.state
    return (
      <div>
        <Header article={article} height={headerHeight} />
        <FeatureLayout className="article-content">
          <Sections article={article} />
        </FeatureLayout>
      </div>
    )
  }

  renderStandardArticle() {
    const {
      relatedArticlesForCanvas,
      relatedArticlesForPanel,
      emailSignupUrl,
      display,
    } = this.props

    const {
      article,
      isTruncated
    } = this.state

    const campaign = omit(display, "panel", "canvas")

    return (
      <div>
        <ReadMoreWrapper isTruncated={isTruncated} hideButton={this.removeTruncation}>
          <Header
            article={article}
          />

          <StandardLayout>
            <Sections
              article={article}
            />

            <Sidebar>
              {emailSignupUrl &&
                <EmailSignup
                  signupUrl={emailSignupUrl}
                />
              }

              {relatedArticlesForPanel &&
                <RelatedArticlesPanel
                  label={"Related Stories"}
                  articles={relatedArticlesForPanel}
                />
              }

              {display &&
                <DisplayPanel
                  unit={display.panel}
                  campaign={campaign}
                />
              }
            </Sidebar>
          </StandardLayout>

          {relatedArticlesForCanvas &&
            <RelatedArticlesCanvas
              articles={relatedArticlesForCanvas}
              vertical={article.vertical}
            />
          }

        </ReadMoreWrapper>

        {isTruncated &&
          <ReadMore
            onClick={this.removeTruncation}
          />
        }

        { display &&
          <div>
            <DisplayCanvasBreak />
            <DisplayCanvas unit={display.canvas} campaign={campaign} />
          </div>
        }
      </div>
    )
  }

  render() {
    const { marginTop } = this.props
    const { article } = this.state

    return (
      <ArticleContainer marginTop={marginTop}>
        {article.layout === "feature" ? this.renderFeatureArticle() : this.renderStandardArticle()}
        <FullscreenViewer
          onClose={this.closeViewer}
          show={this.state.viewerIsOpen}
          slideIndex={this.state.slideIndex}
          images={this.state.fullscreenImages}
        />
      </ArticleContainer>
    )
  }
}

const ArticleDiv: StyledFunction<ArticleContainerProps & React.HTMLProps<HTMLDivElement>> = styled.div

const ArticleContainer = ArticleDiv`
  margin-top: ${props => (props.marginTop ? props.marginTop + "px" : "50px")};
`

const DisplayCanvasBreak = styled.hr`
  border: 0;
  margin: 0;
  border-top: 1px solid #eee;
`
