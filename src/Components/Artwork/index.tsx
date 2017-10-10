import * as React from "react"
import styled, { css } from "styled-components"

import theme from "../../assets/theme"
import ArtworkMetadata, { ArtworkMetadataProps } from "./metadata"
import createContainer, { RelayProps } from "./relay"

const Container = styled.div`
  width: 100%;
`

const ImageContainer = styled.div`
  width: 100%;
  position: relative;
  cursor: pointer;

  &:before {
    content: '';
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
      `}
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
}

export interface ArtworkProps extends RelayProps {
  size?: number
  extended?: boolean
  Overlay?: React.SFC<OverlayProps>
  onSelect?: (selected: boolean) => void
  showOverlayOnHover?: boolean
}

export interface ArtworkState {
  isSelected: boolean
}

export class Artwork extends React.Component<ArtworkProps, ArtworkState> {
  static defaultProps = {
    size: 250,
    extended: true,
    overlay: null,
    showOverlayOnHover: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      isSelected: false,
    }
  }

  onSelected(e) {
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
    const { size, artwork, Overlay, showOverlayOnHover } = this.props
    let overlayClasses = "overlay-container"

    overlayClasses += showOverlayOnHover ? " hovered" : ""
    overlayClasses += this.state.isSelected ? " selected" : ""

    return (
      <Container onClick={this.onSelected.bind(this)} size={size}>
        <ImageContainer size={size}>
          <Image src={artwork.image.url} size={size} />
          <div className={overlayClasses}>
            {Overlay && <Overlay selected={this.state.isSelected} />}
          </div>
        </ImageContainer>
        <ArtworkMetadata artwork={artwork} />
      </Container>
    )
  }
}

export default createContainer<ArtworkProps, ArtworkMetadataProps>(Artwork, ArtworkMetadata)
