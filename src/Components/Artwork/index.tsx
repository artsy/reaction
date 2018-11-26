import { Artwork_artwork } from "__generated__/Artwork_artwork.graphql"
import React from "react"
// @ts-ignore
import { ComponentRef, createFragmentContainer, graphql } from "react-relay"
import styled, { css } from "styled-components"
import theme from "../../Assets/Theme"
import RelayMetadata, { Metadata } from "./Metadata"

const Container = styled.div`
  width: 100%;
`

const ImageContainer = styled.div`
  width: 100%;
  position: relative;
  cursor: pointer;

  &::before {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  & .overlay-container {
    transition: opacity 0.25s;

    &.hovered {
      opacity: 0;
      visibility: hidden;
    }

    &.selected {
      opacity: 1;
      visibility: visible;
    }
  }

  &:hover {
    & .overlay-container.hovered {
      ${css`
        @media (min-width: ${theme.flexboxgrid.breakpoints.sm + 1}px) {
          opacity: 1;
          visibility: visible;
        }
      `};
    }
  }
`

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
`

export interface OverlayProps {
  selected: boolean
  useRelay?: boolean
}

export interface ArtworkProps {
  extended?: boolean
  Overlay?: React.SFC<OverlayProps>
  useRelay?: boolean
  artwork: Artwork_artwork
  onSelect?: (selected: boolean) => void
  showOverlayOnHover?: boolean
}

export interface ArtworkState {
  isSelected: boolean
}

export class Artwork extends React.Component<ArtworkProps, ArtworkState> {
  static defaultProps = {
    extended: true,
    overlay: null,
    useRelay: true,
    showOverlayOnHover: false,
  }

  state = {
    isSelected: false,
  }

  onSelected = e => {
    if (!this.props.Overlay) {
      return
    }

    this.setState({
      isSelected: !this.state.isSelected,
    })

    if (this.props.onSelect) {
      this.props.onSelect(!this.state.isSelected)
    }
  }

  render() {
    const { artwork, Overlay, useRelay, showOverlayOnHover } = this.props
    let overlayClasses = "overlay-container"

    overlayClasses += showOverlayOnHover ? " hovered" : ""
    overlayClasses += this.state.isSelected ? " selected" : ""

    const MetadataBlock = useRelay ? RelayMetadata : Metadata

    return (
      <Container onClick={this.onSelected}>
        <ImageContainer>
          <Image src={artwork.image.url} />
          <div className={overlayClasses}>
            {Overlay && (
              <Overlay selected={this.state.isSelected} useRelay={useRelay} />
            )}
          </div>
        </ImageContainer>
        <MetadataBlock
          extended={this.props.extended}
          artwork={artwork}
          useRelay={useRelay}
        />
      </Container>
    )
  }
}

export default createFragmentContainer(
  Artwork,
  graphql`
    fragment Artwork_artwork on Artwork {
      id
      image {
        url(version: "large")
        aspect_ratio
      }
      ...Metadata_artwork
    }
  `
)
