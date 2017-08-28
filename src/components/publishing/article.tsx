import * as _ from "lodash"
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
  isViewerOpen: boolean
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
    const { fullscreenImages, article } = this.indexImages()
    this.state = {
      isViewerOpen: false,
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
      isViewerOpen: true,
      slideIndex: index,
    })
  }

  closeViewer = () => {
    this.setState({ isViewerOpen: false })
  }

  indexImages = () => {
    const article = this.props.article
    const fullscreenImages = []
    let sectionIndex = -1
    const newSections = _.map(_.clone(article.sections), section => {
      if (_.includes(["image_collection", "image_set"], section.type)) {
        const newImages = _.map(section.images, image => {
          sectionIndex = sectionIndex + 1
          image.setTitle = section.title
          image.index = sectionIndex
          fullscreenImages.push(image)
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
    const { article } = this.props
    if (article.layout === "feature") {
      return (
        <div>
          <Header article={this.state.article} />
          <FeatureLayout>
            <Sections article={this.state.article} />
          </FeatureLayout>
          <FullscreenViewer
            onClose={this.closeViewer}
            show={this.state.isViewerOpen}
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
            show={this.state.isViewerOpen}
            slideIndex={this.state.slideIndex}
            images={this.state.fullscreenImages}
          />
        </div>
      )
    }
  }
}

export default Article
