import { cloneDeep, includes, map, omit } from "lodash"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import Colors from "../../Assets/Colors"
import Events from "../../Utils/Events"
import track from "../../Utils/track"
import { pMedia } from "../Helpers"
import { DisplayCanvas } from "./Display/Canvas"
import { DisplayPanel } from "./Display/DisplayPanel"
import { EmailPanel } from "./Email/EmailPanel"
import { Header } from "./Header/Header"
import { FeatureLayout } from "./Layouts/FeatureLayout"
import { Sidebar } from "./Layouts/Sidebar"
import { StandardLayout, StandardLayoutParent } from "./Layouts/StandardLayout"
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
  isMobile?: boolean
  isSuper?: boolean
  isTruncated?: boolean
  marginTop?: string | number
  emailSignupUrl?: string
  headerHeight?: string
  display?: {
    name: string
    panel: object
    canvas: any
  }
}

interface ArticleState {
  viewerIsOpen: boolean
  slideIndex: number
  fullscreenImages: any
  article: any
  isTruncated: boolean
}

@track({ page: "Article" }, { dispatch: data => Events.postEvent(data) })
export class Article extends React.Component<ArticleProps, ArticleState> {
  static childContextTypes = {
    onViewFullscreen: PropTypes.func,
  }

  static defaultProps = {
    isMobile: false,
    isSuper: false,
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
    const body = document.getElementsByTagName("BODY")[0]
    body.setAttribute("style", "overflow: hidden;")

    this.setState({
      viewerIsOpen: true,
      slideIndex: index,
    })
  }

  closeViewer = () => {
    const body = document.getElementsByTagName("BODY")[0]
    body.setAttribute("style", "overflow: scroll;")

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
    const { headerHeight, isMobile, isSuper, relatedArticlesForCanvas } = this.props
    const { article } = this.state

    return (
      <div>
        <Header
          article={article}
          height={headerHeight}
          isMobile={isMobile}
        />

        <FeatureLayout className="article-content">
          <Sections article={article} />
        </FeatureLayout>

        {relatedArticlesForCanvas &&
          !isSuper &&
          <RelatedArticlesCanvas
            articles={relatedArticlesForCanvas}
            vertical={article.vertical}
          />}
      </div>
    )
  }

  renderStandardArticle() {
    const { isMobile, relatedArticlesForCanvas, relatedArticlesForPanel } = this.props
    const { article } = this.state
    const campaign = omit(this.props.display, "panel", "canvas")
    const displayOverflows = this.props.display && this.props.display.canvas.layout === "slideshow"

    return (
      <div>
        <ReadMoreWrapper
          isTruncated={this.state.isTruncated}
          hideButton={this.removeTruncation}
        >
          <Header
            article={article}
            isMobile={isMobile}
          />

          <StandardLayoutParent>
            <StandardLayout>
              <Sections article={article} />
              <Sidebar>
                {this.props.emailSignupUrl &&
                  <SidebarItem>
                    <EmailPanel
                      signupUrl={this.props.emailSignupUrl}
                    />
                  </SidebarItem>
                }

                {relatedArticlesForPanel &&
                  <SidebarItem>
                    <RelatedArticlesPanel
                      label={"Related Stories"}
                      articles={relatedArticlesForPanel}
                    />
                  </SidebarItem>
                }

                {this.props.display &&
                  <DisplayPanel
                    unit={this.props.display.panel}
                    campaign={campaign}
                  />}

              </Sidebar>
            </StandardLayout>
          </StandardLayoutParent>

          {relatedArticlesForCanvas &&
            <div>
              <LineBreak />
              <RelatedArticlesCanvas
                articles={relatedArticlesForCanvas}
                isMobile={isMobile}
                vertical={article.vertical}
              />
            </div>}

        </ReadMoreWrapper>

        {this.state.isTruncated &&
          <ReadMore
            onClick={this.removeTruncation}
          />}

        {this.props.display && (
          <div>
            <LineBreak />
            {displayOverflows
              ? <FooterContainerOverflow>
                <DisplayCanvas unit={this.props.display.canvas} campaign={campaign} />
              </FooterContainerOverflow>

              : <FooterContainer>
                <DisplayCanvas unit={this.props.display.canvas} campaign={campaign} />
              </FooterContainer>
            }
          </div>
        )}
      </div>
    )
  }

  render() {
    const { article } = this.state

    return (
      <div>
        {article.layout === "feature" ? this.renderFeatureArticle() : this.renderStandardArticle()}
        <FullscreenViewer
          onClose={this.closeViewer}
          show={this.state.viewerIsOpen}
          slideIndex={this.state.slideIndex}
          images={this.state.fullscreenImages}
        />
      </div>
    )
  }
}

const LineBreak = styled.div`
  border-top: 1px solid ${Colors.grayRegular};
  width: 100%;
`

const SidebarItem = styled.div`
  margin-bottom: 40px;
`

const FooterContainer = styled.div`
  margin: 0 40px;
  ${pMedia.sm`
    margin: 0 20px;
  `}
`

const FooterContainerOverflow = styled.div`
  margin-left: 40px;
  ${pMedia.md`
    margin-left: 0
  `}
`
