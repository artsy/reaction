import { cloneDeep, includes, map } from "lodash"
import * as PropTypes from "prop-types"
import * as React from "react"
import styled from "styled-components"
import Events from "../../utils/events"
import track from "../../utils/track"
import Header from "./header/header"
import FeatureLayout from "./layouts/feature_layout"
import Sidebar from "./layouts/sidebar"
import StandardLayout from "./layouts/standard_layout"
import RelatedArticlesPanel from "./related_articles/related_articles_panel"
import FullscreenViewer from "./sections/fullscreen_viewer/fullscreen_viewer"
import Sections from "./sections/sections"
import Share from "./share"
import { ArticleData } from "./typings"

export interface ArticleProps {
  article: ArticleData
  relatedArticles?: any
}
interface ArticleState {
  viewerIsOpen: boolean
  slideIndex: number
  fullscreenImages: any
  article: any
}

@track({}, { dispatch: data => Events.postEvent(data) })
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
    const { relatedArticles } = this.props
    const article = this.state.article
    if (article.layout === "feature") {
      return (
        <div>
          <Header article={article} />
          <FeatureLayout>
            <Sections article={article} />
          </FeatureLayout>
          <FullscreenViewer
            onClose={this.closeViewer}
            show={this.state.viewerIsOpen}
            slideIndex={this.state.slideIndex}
            images={this.state.fullscreenImages}
          />
        </div>
      )
    } else {
      const relatedArticlePanel = relatedArticles
        ? <RelatedArticlesPanel label={"Related Stories"} articles={relatedArticles} />
        : false
      return (
        <StandardArticleContainer>
          <Header article={article} />
          <StandardLayout>
            <Sections article={article} />
            <Sidebar>
              <Share
                url={`http://www.artsy.net/article/${article.slug}`}
                title={article.social_title || article.thumbnail_title}
              />
              {relatedArticlePanel}
            </Sidebar>
          </StandardLayout>
          <FullscreenViewer
            onClose={this.closeViewer}
            show={this.state.viewerIsOpen}
            slideIndex={this.state.slideIndex}
            images={this.state.fullscreenImages}
          />
        </StandardArticleContainer>
      )
    }
  }
}

const StandardArticleContainer = styled.div`
  margin: 100px 0;
`

export default Article
