import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

import Metadata from "./Metadata"
import Save from "./Save"

const Image = styled.img`
  width: 100%;
`

const ImageLink = styled.a`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

const Placeholder = styled.div`
  position: relative;
  width 100%;
`

interface Props extends RelayProps, React.HTMLProps<FillwidthItem> {
  targetHeight?: number
  imageHeight?: number
  width?: number
  margin?: number
}

export class FillwidthItem extends React.Component<Props, null> {
  render() {
    const { artwork, className, targetHeight, imageHeight } = this.props
    return (
      <div className={className}>
        <Placeholder style={{ height: targetHeight }}>
          <ImageLink href={artwork.href}>
            <Image src={artwork.image.url} height={imageHeight} />
          </ImageLink>
          <Save
            className="artwork-save"
            artwork={artwork as any}
            style={{ position: "absolute", right: "5px", bottom: "5px" }}
          />
        </Placeholder>
        <Metadata artwork={artwork} extended />
      </div>
    )
  }
}

const StyledFillwidthItem = styled(FillwidthItem)`
  display: inline-block;
  width: ${props => props.width}px;
  vertical-align: top;
  margin-right: ${props => props.margin}px;
  .artwork-save {
    opacity: 0;
  }
  &:hover .artwork-save {
    opacity: 1;
  }
`

export default createFragmentContainer(
  StyledFillwidthItem,
  graphql`
    fragment FillwidthItem_artwork on Artwork {
      image {
        placeholder
        url(version: "large")
        aspect_ratio
      }
      href
      ...Metadata_artwork
      ...Save_artwork
    }
  `
)

interface RelayProps {
  artwork: {
    href: string | null
    image: {
      placeholder: number | null
      url: string | null
      aspect_ratio: number | null
    } | null
  }
}
