import React from "react"
import styled from "styled-components"
import ArtworkCaption from "./artwork_caption"

const ArtworkImageLink = styled.a`
  text-underline: none;
`

interface ArtworkImageProps {
  artwork: any
  linked?: boolean
  layout?: string
}

const ArtworkImage: React.SFC<ArtworkImageProps> = props => {
  const { artwork, linked } = props
  const image = <img src={artwork.image} className="display-artwork__image" width={"100%"} />
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
interface ArtworkProps {
  artwork?: any
  layout?: string
}

const Artwork: React.SFC<ArtworkProps> = props => {
  const { artwork, layout } = props
  return (
    <div className="display-artwork">
      <ArtworkImage linked artwork={artwork} />
      <ArtworkCaption artwork={artwork} layout={layout} />
    </div>
  )
}

export default Artwork
