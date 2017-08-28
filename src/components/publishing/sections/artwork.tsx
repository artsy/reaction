import React from "react"
import styled from "styled-components"
import ArtworkCaption from "./artwork_caption"

const ArtworkImageLink = styled.a`
  text-decoration: none;
`
const BlockImage = styled.img`
  display: block;
`

interface ArtworkProps {
  artwork: any
  layout?: string
  linked?: boolean
  width?: string | number
  height?: string | number
  index?: any
}

const ArtworkImage: React.SFC<ArtworkProps> = props => {
  const { artwork, linked, height, width } = props
  const image = (
    <BlockImage
      src={artwork.image}
      className="display-artwork__image"
      width={width}
      height={height}
      alt={artwork.title}
    />
  )
  if (linked) {
    return (
      <ArtworkImageLink href={"/artwork/" + artwork.slug}>
        {image}
      </ArtworkImageLink>
    )
  } else {
    return image
  }
}

ArtworkImage.defaultProps = {
  width: "100%",
  height: "auto",
}

const Artwork: React.SFC<ArtworkProps> = props => {
  return (
    <div className="display-artwork">
      <ArtworkImage {...props} />
      <ArtworkCaption {...props} />
    </div>
  )
}

Artwork.defaultProps = {
  linked: true,
}

export default Artwork
