import { ArticleProps } from "Components/Publishing/Article"
import { FullscreenViewer } from "Components/Publishing/Sections/FullscreenViewer/FullscreenViewer"
import { withFullScreen } from "Components/Publishing/Sections/FullscreenViewer/withFullScreen"
import { ArticleData } from "Components/Publishing/Typings"
import { includes, map } from "lodash"
import React from "react"
import track from "react-tracking"

interface ArticleState {
  fullscreenImages: any
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
    const fullscreenImages = getSlideshowImagesFromArticle(props.article)
    this.state = {
      fullscreenImages,
    }
  }

  render() {
    const { fullscreenImages } = this.state
    const { closeViewer, slideIndex, viewerIsOpen } = this.props

    return (
      <div>
        {this.props.children}
        <FullscreenViewer
          onClose={closeViewer}
          show={viewerIsOpen}
          slideIndex={slideIndex}
          images={fullscreenImages}
        />
      </div>
    )
  }
}

export default track()(ArticleWithFullScreen)

export const getSlideshowImagesFromArticle = (article: ArticleData) => {
  const fullscreenImages = []
  let sectionIndex = 0

  map(article.sections, section => {
    if (includes(["image_collection", "image_set"], section.type)) {
      map(section.images, image => {
        image.setTitle = section.title
        image.index = sectionIndex
        fullscreenImages.push(image)
        sectionIndex = sectionIndex + 1
      })
    }
  })
  return fullscreenImages
}
