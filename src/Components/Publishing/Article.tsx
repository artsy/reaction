import { cloneDeep, includes, map } from "lodash"
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
  article: any
  isTruncated: boolean
}

interface ArticleContainerProps {
  marginTop?: number
}

@track({ page: "Article" }, { dispatch: data => Events.postEvent(data) })
class Article extends React.Component<ArticleProps, ArticleState> {
  constructor(props) {
    super(props)
    const { article } = this.indexAndExtractImages()
    this.state = {
      article,
      isTruncated: props.isTruncated || false,
    }
  }

  removeTruncation = () => {
    this.setState({ isTruncated: false })
  }

  indexAndExtractImages = () => {
    const article = cloneDeep(this.props.article)
    let sectionIndex = 0
    const newSections = map(article.sections, section => {
      if (includes(["image_collection", "image_set"], section.type)) {
        const newImages = map(section.images, image => {
          image.setTitle = section.title
          image.index = sectionIndex
          sectionIndex = sectionIndex + 1
          return image
        })
        section.images = newImages
      }
      return section
    })
    article.sections = newSections
    return { article }
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
    const { relatedArticlesForCanvas, relatedArticlesForPanel } = this.props
    const { article } = this.state
    const relatedArticlePanel = relatedArticlesForPanel
      ? <RelatedArticlesPanel label={"Related Stories"} articles={relatedArticlesForPanel} />
      : false
    const relatedArticleCanvas = relatedArticlesForCanvas
      ? <RelatedArticlesCanvas articles={relatedArticlesForCanvas} vertical={article.vertical} />
      : false
    const emailSignup = this.props.emailSignupUrl ? <EmailSignup signupUrl={this.props.emailSignupUrl} /> : false
    return (
      <div>
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
      </div>
    )
  }

  render() {
    const { marginTop } = this.props
    const { article } = this.state
    return (
      <ArticleContainer marginTop={marginTop}>
        {article.layout === "feature" ? this.renderFeatureArticle() : this.renderStandardArticle()}
      </ArticleContainer>
    )
  }
}

const ArticleDiv: StyledFunction<ArticleContainerProps & React.HTMLProps<HTMLDivElement>> = styled.div

const ArticleContainer = ArticleDiv`
  margin-top: ${props => (props.marginTop ? props.marginTop + "px" : "50px")};
`

export default Article
