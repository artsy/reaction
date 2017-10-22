import { find } from "lodash"
import * as React from "react"
import sizeMe from "react-sizeme"
import styled from "styled-components"
import fillwidthDimensions from "../../../Utils/fillwidth"
import { pMedia } from "../../Helpers"
import { sizeMeRefreshRate } from "../Constants"
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

const sizeMeOptions = {
  refreshRate: sizeMeRefreshRate,
  noPlaceholder: true,
}

const ImageCollectionComponent: React.SFC<ImageCollectionProps> = props => {
  const {
    gutter,
    images,
    sectionLayout,
    size,
    targetHeight,
  } = props

  const dimensions = fillwidthDimensions(images, size.width, gutter, targetHeight)
  const renderedImages = renderImages(images, dimensions, gutter, sectionLayout, size.width)

  return (
    <ImageCollectionContainer>
      {renderedImages}
    </ImageCollectionContainer>
  )
}

ImageCollectionComponent.defaultProps = {
  size: {
    width: 680,
  },
}

function renderImages(images, dimensions, gutter, sectionLayout, width) {
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

const ImageCollectionContainer = styled.div`
  display: flex;
  width: 100%;

  // TODO: Follow up on https://github.com/artsy/publishing/issues/80#issuecomment-338055364
  justify-content: center;

  ${pMedia.xs`
    flex-direction: column;
  `};
`

export const ImageCollection = sizeMe(sizeMeOptions)(ImageCollectionComponent)
