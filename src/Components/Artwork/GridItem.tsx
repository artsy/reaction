import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

import colors from "../../Assets/Colors"
import RelayMetadata, { Metadata } from "./Metadata"
import RelaySaveButton, { SaveButton } from "./Save"

const Image = styled.img`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

const Placeholder = styled.div`
  background-color: ${colors.grayMedium};
  position: relative;
  width: 100%;
`

interface Props extends RelayProps, React.HTMLProps<ArtworkGridItemContainer> {
  useRelay?: boolean
  style?: any
  currentUser?: any
  mediator?: {
    trigger: (action: string, config: object) => void
  }
}

class ArtworkGridItemContainer extends React.Component<Props, null> {
  static defaultProps = {
    useRelay: true,
  }

  render() {
    const { style, className, artwork, useRelay, currentUser } = this.props
    const SaveButtonBlock = useRelay ? RelaySaveButton : SaveButton
    const MetadataBlock = useRelay ? RelayMetadata : Metadata

    let currentUserSpread = {}
    if (currentUser) {
      currentUserSpread = { currentUser }
    }
    return (
      <div className={className} style={style}>
        <Placeholder style={{ paddingBottom: artwork.image.placeholder }}>
          <a href={artwork.href}>
            <Image src={artwork.image.url} />
          </a>
          <SaveButtonBlock
            className="artwork-save"
            artwork={artwork as any}
            style={{ position: "absolute", right: "10px", bottom: "10px" }}
            useRelay={useRelay}
            {...currentUserSpread}
            mediator={this.props.mediator}
          />
        </Placeholder>
        <MetadataBlock artwork={artwork} useRelay={useRelay} />
      </div>
    )
  }
}

export const ArtworkGridItem = styled(ArtworkGridItemContainer)`
  .artwork-save {
    opacity: 0;
  }
  &:hover .artwork-save {
    opacity: 1;
  }
`

export default createFragmentContainer(
  ArtworkGridItem,
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
