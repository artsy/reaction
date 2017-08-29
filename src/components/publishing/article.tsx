import { cloneDeep, includes, map } from "lodash"
import * as PropTypes from "prop-types"
import * as React from "react"
import Header from "./header/header"
import FeatureLayout from "./layouts/feature_layout"
import StandardLayout from "./layouts/standard_layout"
import FullscreenViewer from "./sections/fullscreen_viewer/fullscreen_viewer"
import Sections from "./sections/sections"

interface ArticleProps {
  article: any
}
interface ArticleState {
  viewerIsOpen: boolean
  slideIndex: number
  fullscreenImages: any
  article: any
}

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
    if (this.state.article.layout === "feature") {
      return (
        <div>
          <Header article={this.state.article} />
          <FeatureLayout>
            <Sections article={this.state.article} />
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
      return (
        <div>
          <Header article={this.state.article} />
          <StandardLayout>
            <Sections article={this.state.article} />
          </StandardLayout>
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
}

export default Article
