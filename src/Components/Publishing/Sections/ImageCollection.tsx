import { find } from "lodash"
import * as React from "react"
import sizeMe from "react-sizeme"
import styled from "styled-components"
import fillwidthDimensions from "../../../Utils/Fillwidth"
import { pMedia } from "../../Helpers"
import { sizeMeRefreshRate } from "../Constants"
import { SectionLayout } from "../Typings"
import Artwork from "./Artwork"
import Image from "./Image"
import ImageCollectionItem from "./ImageCollectionItem"

interface ImageCollectionProps {
  images: any
  targetHeight?: number
  gutter?: number
  sectionLayout?: SectionLayout
  size?: {
    width: number
  }
}

const ImageCollection: React.SFC<ImageCollectionProps> = props => {
  const { images, targetHeight, gutter, sectionLayout, size } = props
  const dimensions = fillwidthDimensions(images, size.width, gutter, targetHeight)
  return (
    <ImageCollectionContainer>
      {renderImages(images, dimensions, gutter, sectionLayout, size.width)}
    </ImageCollectionContainer>
  )
}

ImageCollection.defaultProps = {
  size: {
    width: 680,
  },
}

function renderImages(images, dimensions, gutter, sectionLayout, width) {
  const renderedImages = images.map((image, i) => {
    const url = image.url ? image.url : image.image
    let imageSize
    if (width <= 600 || dimensions.length === 1) {
      imageSize = {}
    } else {
      imageSize = find(dimensions, ["__id", url])
    }
    let renderedImage
    if (image.type === "image") {
      renderedImage = (
        <Image image={image} sectionLayout={sectionLayout} width={imageSize.width} height={imageSize.height} />
      )
    } else if (image.type === "artwork") {
      renderedImage = (
        <Artwork artwork={image} sectionLayout={sectionLayout} width={imageSize.width} height={imageSize.height} />
      )
    } else {
      return false
    }
    return (
      <ImageCollectionItem key={i} margin={i === dimensions.length - 1 ? 0 : gutter} width={imageSize.width}>
        {renderedImage}
      </ImageCollectionItem>
    )
  })
  return renderedImages
}

const ImageCollectionContainer = styled.div`
  display: flex;
  width: 100%;
  ${pMedia.xs`
    flex-direction: column;
  `}
`

const sizeMeOptions = {
  refreshRate: sizeMeRefreshRate,
  noPlaceholder: true,
}

export default sizeMe(sizeMeOptions)(ImageCollection)
