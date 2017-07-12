import { find } from "lodash"
import * as React from "react"
import styled from "styled-components"
import getDimensions from "../fillwidth"
import Artwork from "./artwork"
import Image from "./image"

function renderImages(images, dimensions, gutter) {
  const renderedImages = images.map((image, i) => {
    const url = image.url ? image.url : image.image
    const imageSize = find(dimensions, ["__id", url])
    if (image.type === "image") {
      return (
        <FillwidthItem
          style={{
            marginRight: i === dimensions.length - 1 ? 0 : gutter,
            width: imageSize.width,
            height: imageSize.height,
          }}
          key={image.url}
        >
          <Image image={image} />
        </FillwidthItem>
      )
    } else if (image.type === "artwork") {
      return (
        <FillwidthItem
          style={{
            marginRight: i === dimensions.length - 1 ? 0 : gutter,
            width: imageSize.width,
            height: imageSize.height,
          }}
          key={image.url}
        >
          <Artwork artwork={image} />
        </FillwidthItem>
      )
    }
  })
  return renderedImages
}

function ImageCollection(props) {
  const { images } = props
  const gutter = 10
  const width = 900
  const targetHeight = 400
  const dimensions = getDimensions(images, width, gutter, targetHeight)
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
const FillwidthItem = styled.div`

`
export default ImageCollection
