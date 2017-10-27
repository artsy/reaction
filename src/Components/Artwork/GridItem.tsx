import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay/compat"
import styled from "styled-components"

import colors from "../../Assets/Colors"
import Metadata from "./Metadata"
import Save from "./Save"

const Image = styled.img`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

const Placeholder = styled.div`
  background-color: ${colors.grayMedium};
  position: relative;
  width 100%;
`

interface Props extends RelayProps, React.HTMLProps<ArtworkGridItem> {
  style?: any
}

export class ArtworkGridItem extends React.Component<Props, null> {
  render() {
    const { style, className, artwork } = this.props
    return (
      <div className={className} style={style}>
        <Placeholder style={{ paddingBottom: artwork.image.placeholder }}>
          <a href={artwork.href}>
            <Image src={artwork.image.url} />
          </a>
          <Save
            className="artwork-save"
            artwork={artwork as any}
            style={{ position: "absolute", right: "10px", bottom: "10px" }}
          />
        </Placeholder>
        <Metadata artwork={artwork} />
      </div>
    )
  }
}

const StyledArtworkGridItem = styled(ArtworkGridItem)`
  .artwork-save {
    opacity: 0;
  }
  &:hover .artwork-save {
    opacity: 1;
  }
`

export default createFragmentContainer(
  StyledArtworkGridItem,
  graphql`
    fragment GridItem_artwork on Artwork {
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
