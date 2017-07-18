import React from "react"
import styled from "styled-components"
import ArtworkCaption from "./artwork_caption"

const ArtworkImageLink = styled.a`
  text-underline: none;
`
const BlockImage = styled.img`
  display: block;
`

interface ArtworkProps {
  artwork: any
  layout?: string
  linked?: boolean
}

const ArtworkImage: React.SFC<ArtworkProps> = props => {
  const { artwork, linked } = props
  const image = <BlockImage src={artwork.image} className="display-artwork__image" width="100%" />
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
