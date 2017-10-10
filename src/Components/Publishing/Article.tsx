import { cloneDeep, includes, map } from "lodash"
import * as PropTypes from "prop-types"
import * as React from "react"
import styled, { StyledFunction } from "styled-components"
import Events from "../../Utils/Events"
import track from "../../Utils/track"
import EmailSignup from "./EmailSignup"
import Header from "./Header/Header"
import FeatureLayout from "./Layouts/FeatureLayout"
import Sidebar from "./Layouts/Sidebar"
import StandardLayout from "./Layouts/StandardLayout"
import ReadMore from "./ReadMore/ReadMoreButton"
import ReadMoreWrapper from "./ReadMore/ReadMoreWrapper"
import RelatedArticlesCanvas from "./RelatedArticles/RelatedArticlesCanvas"
import RelatedArticlesPanel from "./RelatedArticles/RelatedArticlesPanel"
import FullscreenViewer from "./Sections/FullscreenViewer/FullscreenViewer"
import Sections from "./Sections/Sections"
import { ArticleData } from "./Typings"

export interface ArticleProps {
  article: ArticleData
  relatedArticlesForPanel?: any
  relatedArticlesForCanvas?: any
  isTruncated?: boolean
  emailSignupUrl?: string
  headerHeight?: string
  marginTop?: number
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
class Article extends React.Component<ArticleProps, ArticleState> {
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

  render() {
    const { relatedArticlesForCanvas, relatedArticlesForPanel, headerHeight, marginTop } = this.props
    const article = this.state.article
    if (article.layout === "feature") {
      return (
        <ArticleContainer marginTop={marginTop}>
          <Header article={article} height={headerHeight} />
          <FeatureLayout className="article-content">
            <Sections article={article} />
          </FeatureLayout>
          <FullscreenViewer
            onClose={this.closeViewer}
            show={this.state.viewerIsOpen}
            slideIndex={this.state.slideIndex}
            images={this.state.fullscreenImages}
          />
        </ArticleContainer>
      )
    } else {
      const relatedArticlePanel = relatedArticlesForPanel ? (
        <RelatedArticlesPanel label={"Related Stories"} articles={relatedArticlesForPanel} />
      ) : (
        false
      )
      const relatedArticleCanvas = relatedArticlesForCanvas ? (
        <RelatedArticlesCanvas articles={relatedArticlesForCanvas} vertical={article.vertical} />
      ) : (
        false
      )
      const emailSignup = this.props.emailSignupUrl ? <EmailSignup signupUrl={this.props.emailSignupUrl} /> : false
      return (
        <ArticleContainer marginTop={marginTop}>
          <ReadMoreWrapper isTruncated={this.state.isTruncated} hideButton={this.removeTruncation}>
            <Header article={article} />
            <StandardLayout>
              <Sections article={article} />
              <Sidebar>
                {emailSignup}
                {relatedArticlePanel}
              </Sidebar>
            </StandardLayout>
            {relatedArticleCanvas}
          </ReadMoreWrapper>
          {this.state.isTruncated ? <ReadMore onClick={this.removeTruncation} /> : false}
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
}

const ArticleDiv: StyledFunction<ArticleContainerProps & React.HTMLProps<HTMLDivElement>> = styled.div

const ArticleContainer = ArticleDiv`
  margin-top: ${props => (props.marginTop ? props.marginTop + "px" : "50px")};
`

export default Article
