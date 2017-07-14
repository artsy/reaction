import React from "react"
import TextLink from "../text_link"
import ArtworkCaption from "./artwork_caption"

interface ArtworkImageProps {
  artwork: any
  linked?: boolean
  layout?: string
}

const ArtworkImage: React.SFC<ArtworkImageProps> = props => {
  const { artwork, linked, layout } = props
  const image = <img src={artwork.image} className="display-artwork__image" width={"100%"} />
  if (linked) {
    const color = layout === "classic" ? "#666" : "#999"
    return <TextLink href={"/artwork/" + artwork.slug} color={color}>{image}</TextLink>
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
