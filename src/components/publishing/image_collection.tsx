import { find } from "lodash"
import * as React from "react"
import sizeMe from "react-sizeme"
import styled from "styled-components"
import fillwidthDimensions from "../../utils/fillwidth"
import { pMedia } from "../helpers"
import Artwork from "./artwork"
import Image from "./image"
import ImageCollectionItem from "./image_collection_item"

function renderImages(images, dimensions, gutter, width) {
  const renderedImages = images.map((image, i) => {
    const url = image.url ? image.url : image.image
    let imageSize
    if (width <= 600) {
      imageSize = {}
    } else {
      imageSize = find(dimensions, ["__id", url])
    }
    let renderedImage
    if (image.type === "image") {
      renderedImage = <Image image={image} />
    } else if (image.type === "artwork") {
      renderedImage = <Artwork artwork={image} />
    } else {
      return false
    }

    return (
      <ImageCollectionItem
        key={url}
        margin={i === dimensions.length - 1 ? 0 : gutter}
        width={imageSize.width}
        height={imageSize.height}
      >
        {renderedImage}
      </ImageCollectionItem>
    )
  })
  return renderedImages
}
interface ImageCollectionProps {
  images: object
  targetHeight?: number
  gutter?: number
  size: any
}

const ImageCollection: React.SFC<ImageCollectionProps> = props => {
  const { images, targetHeight, gutter } = props
  const { width } = props.size
  const dimensions = fillwidthDimensions(images, width, gutter, targetHeight)
  return (
    <ImageCollectionContainer>
      {renderImages(images, dimensions, gutter, width)}
    </ImageCollectionContainer>
  )
}

const ImageCollectionContainer = styled.div`
  width: 100%;
  display: flex;
  ${pMedia.sm`
    flex-direction: column;
  `}
`

const sizeMeConfig = {
  monitorWidth: true,
  refreshRate: 64,
}

export default sizeMe(sizeMeConfig)(ImageCollection)
