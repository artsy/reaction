import React from "react"
import styled from "styled-components"
import { resize } from "../../../Utils/resizer"
import { Layout, SectionLayout } from "../Typings"
import ArtworkCaption from "./ArtworkCaption"
import ImageWrapper from "./ImageWrapper"

interface ArtworkProps {
  artwork: any
  layout?: Layout
  sectionLayout?: SectionLayout
  linked?: boolean
  width?: string | number
  height?: string | number
  images?: [object]
  slideIndex?: number
}

const ArtworkImage: React.SFC<ArtworkProps> = props => {
  const { artwork, linked, height, width, layout } = props
  const src = resize(artwork.image, { width: 1200 })
  const image = (
    <ImageWrapper
      images={props.images}
      slideIndex={props.slideIndex}
      layout={layout}
      src={src}
      className="display-artwork__image"
      width={width}
      height={height}
      alt={artwork.title}
      index={artwork.index}
    />
  )
  if (linked) {
    return <ArtworkImageLink href={"/artwork/" + artwork.slug}>{image}</ArtworkImageLink>
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

const ArtworkImageLink = styled.a`
  text-decoration: none;
`

export default Artwork
