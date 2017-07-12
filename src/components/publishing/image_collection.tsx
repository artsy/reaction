import { find } from "lodash"
import * as React from "react"
import styled from "styled-components"
import fillwidthDimensions from "../../utils/fillwidth"
import Artwork from "./artwork"
import Image from "./image"
import ImageCollectionItem from "./image_collection_item"

function renderImages(images, dimensions, gutter) {
  const renderedImages = images.map((image, i) => {
    const url = image.url ? image.url : image.image
    const imageSize = find(dimensions, ["__id", url])

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
        key={image.url}
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

function ImageCollection(props) {
  const { images, width, targetHeight, gutter } = props
  const dimensions = fillwidthDimensions(images, width, gutter, targetHeight)
  return (
    <ImageCollectionContainer>
      {renderImages(images, dimensions, gutter)}
    </ImageCollectionContainer>
  )
}

const ImageCollectionContainer = styled.div`
  width: 100%;
  display: flex;
`

export default ImageCollection
