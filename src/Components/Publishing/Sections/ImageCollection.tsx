import { find } from "lodash"
import React from "react"
import sizeMe from "react-sizeme"
import styled from "styled-components"
import fillwidthDimensions from "../../../Utils/fillwidth"
import { pMedia } from "../../Helpers"
import { SIZE_ME_REFRESH_RATE } from "../Constants"
import { SectionLayout } from "../Typings"
import { Artwork } from "./Artwork"
import { Image } from "./Image"
import { ImageCollectionItem } from "./ImageCollectionItem"

interface ImageCollectionProps {
  images: any
  targetHeight?: number
  gutter?: number
  sectionLayout?: SectionLayout
  size?: {
    width: number
  }
}

class ImageCollectionComponent extends React.Component<ImageCollectionProps, null> {
  static defaultProps = {
    size: {
      width: 680
    }
  }

  renderImages(dimensions) {
    const {
      gutter,
      images,
      sectionLayout,
      size: {
        width
      }
    } = this.props

    const renderedImages = images.map((image, i) => {
      const url = image.url || image.image

      let imageSize
      if (width <= 600 || dimensions.length === 1) {
        imageSize = {}
      } else {
        imageSize = find(dimensions, ["__id", url])
      }

      let renderedImage
      if (image.type === "image") {
        renderedImage = (
          <Image
            image={image}
            sectionLayout={sectionLayout}
            width={imageSize.width}
            height={imageSize.height}
          />
        )
      } else if (image.type === "artwork") {
        renderedImage = (
          <Artwork
            artwork={image}
            sectionLayout={sectionLayout}
            width={imageSize.width}
            height={imageSize.height}
          />
        )
      } else {
        return false
      }

      const margin = i === dimensions.length - 1 ? 0 : gutter

      return (
        <ImageCollectionItem
          key={i}
          margin={margin}
          width={imageSize.width}
        >
          {renderedImage}
        </ImageCollectionItem>
      )
    })
    return renderedImages
  }

  render() {
    const { gutter, images, size, targetHeight } = this.props
    const dimensions = fillwidthDimensions(images, size.width, gutter, targetHeight)
    const renderedImages = this.renderImages(dimensions)

    return (
      <ImageCollectionContainer>
        {renderedImages}
      </ImageCollectionContainer>
    )
  }
}

const ImageCollectionContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  ${pMedia.xs`
    flex-direction: column;
  `};
`

const sizeMeOptions = {
  refreshRate: SIZE_ME_REFRESH_RATE,
  noPlaceholder: true,
}

export const ImageCollection = sizeMe(sizeMeOptions)(ImageCollectionComponent)
