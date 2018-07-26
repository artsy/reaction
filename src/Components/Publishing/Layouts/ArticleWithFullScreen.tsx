import { cloneDeep, extend, includes, map } from "lodash"
import React from "react"
import track from "react-tracking"
import { ArticleProps } from "../Article"
import { FullscreenViewer } from "../Sections/FullscreenViewer/FullscreenViewer"
import { withFullScreen } from "../Sections/FullscreenViewer/withFullScreen"
import { TooltipsData } from "../ToolTip/TooltipsDataLoader"
import { ArticleData } from "../Typings"
import { FeatureLayout } from "./FeatureLayout"
import { StandardLayout } from "./StandardLayout"

interface ArticleState {
  fullscreenImages: any
  article: ArticleData
}

@withFullScreen
export class ArticleWithFullScreen extends React.Component<
  ArticleProps,
  ArticleState
> {
  static defaultProps = {
    isMobile: false,
    isSuper: false,
    article: {},
    isTruncated: false,
    showTooltips: false,
  }

  constructor(props) {
    super(props)
    const { fullscreenImages, article } = this.indexAndExtractImages()
    this.state = {
      fullscreenImages,
      article,
    }
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
    const { article, fullscreenImages } = this.state
    const {
      closeViewer,
      slideIndex,
      viewerIsOpen,
      onOpenAuthModal,
    } = this.props

    const articleProps = extend(cloneDeep(this.props), { article, slideIndex })

    return (
      <TooltipsData
        article={article}
        shouldFetchData={this.props.showTooltips}
        onOpenAuthModal={onOpenAuthModal}
      >
        {article.layout === "feature" ? (
          <FeatureLayout {...articleProps} />
        ) : (
          <StandardLayout {...articleProps} />
        )}
        <FullscreenViewer
          onClose={closeViewer}
          show={viewerIsOpen}
          slideIndex={slideIndex}
          images={fullscreenImages}
        />
      </TooltipsData>
    )
  }
}

export default track()(ArticleWithFullScreen)
