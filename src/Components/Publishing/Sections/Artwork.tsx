import React from "react"
import styled from "styled-components"
import { resize } from "../../../Utils/resizer"
import { GLOBAL_IMAGE_QUALITY } from '../Constants'
import { Layout, SectionLayout } from "../Typings"
import { ArtworkCaption } from "./ArtworkCaption"
import { ImageWrapper } from "./ImageWrapper"

interface ArtworkProps {
  artwork: any
  layout?: Layout
  sectionLayout?: SectionLayout
  linked?: boolean
  width?: string | number
  height?: string | number
}

export class Artwork extends React.PureComponent<ArtworkProps, null> {
  static defaultProps = {
    linked: true,
    width: "100%",
    height: "auto"
  }

  render() {
    const { artwork, linked, height, width, layout } = this.props
    const src = resize(artwork.image, { width: 1200, quality: GLOBAL_IMAGE_QUALITY })

    const Image = () =>
      <ImageWrapper
        layout={layout}
        src={src}
        width={width}
        height={height}
        alt={artwork.title}
        index={artwork.index}
      />

    return (
      <div className="display-artwork">
        {linked
          ? <ArtworkImageLink href={`/artwork/${artwork.slug}`}>
              <Image />
            </ArtworkImageLink>
          : <Image />
        }

        <ArtworkCaption
          {...this.props}
        />
      </div>
    )
  }
}

const ArtworkImageLink = styled.a`
  text-decoration: none;
`
