import { cloneDeep, extend, includes, map } from "lodash"
import React from "react"
import styled, { StyledFunction } from "styled-components"
import Events from "../../../Utils/Events"
import track from "../../../Utils/track"
import { FullscreenViewer } from "../Sections/FullscreenViewer/FullscreenViewer"
import { withFullScreen } from "../Sections/FullscreenViewer/withFullScreen"
import { ArticleData } from "../Typings"
import { FeatureLayout } from "./FeatureLayout"
import { StandardLayout } from "./StandardLayout"

export interface ArticleProps {
  article: ArticleData
  seriesArticle?: ArticleData
  closeViewer?: () => void
  display?: {
    name: string
    panel: object
    canvas: any
  }
  emailSignupUrl?: string
  headerHeight?: string
  isMobile?: boolean
  isSuper?: boolean
  isTruncated?: boolean
  marginTop?: string
  relatedArticlesForCanvas?: any
  relatedArticlesForPanel?: any
  slideIndex?: number
  viewerIsOpen?: boolean
}

interface ArticleState {
  fullscreenImages: any
  article: ArticleData
}

interface ArticleContainerProps {
  marginTop?: string
}

@track(
  props => {
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
@withFullScreen
export class ArticleLayout extends React.Component<ArticleProps, ArticleState> {
  static defaultProps = {
    isMobile: false,
    isSuper: false,
    article: {},
    isTruncated: false,
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
    const { closeViewer, marginTop, slideIndex, viewerIsOpen } = this.props

    const articleProps = extend(cloneDeep(this.props), { article, slideIndex })

    return (
      <ArticleContainer marginTop={marginTop}>
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
      </ArticleContainer>
    )
  }
}

const ArticleDiv: StyledFunction<
  ArticleContainerProps & React.HTMLProps<HTMLDivElement>
> =
  styled.div

const ArticleContainer = ArticleDiv`
  margin-top: ${props => props.marginTop || "50px"};
`
