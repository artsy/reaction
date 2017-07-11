import React from "react"
import styled from "styled-components"
import Artwork from "./artwork"
import Image from "./image"

function renderImages(images) {
  const renderedImages = images.map(image => {
    if (image.type === "image") {
      return <Image image={image} />
    } else if (image.type === "artwork") {
      return <Artwork artwork={image} />
    }
  })
  return renderedImages
}

function ImageCollection(props) {
  const { images } = props
  return (
    <ImageCollectionContainer>
      {renderImages(images)}
    </ImageCollectionContainer>
  )
}

const ImageCollectionContainer = styled.div`
  width: 100%;
`

export default ImageCollection
