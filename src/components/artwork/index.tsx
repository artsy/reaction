import * as React from "react"
import styled from "styled-components"

import ArtworkMetadata, { ArtworkMetadataProps } from "./metadata"
import createContainer, { RelayProps } from "./relay"

const Container = styled.div`
  width: ${props => `${props.size}px`};
`

const ImageContainer = styled.div`
  height: ${props => `${props.size}px`};
  width: ${props => `${props.size}px`};
  display: flex;
  justify-content: center;
  position: relative;
  cursor: pointer;

  & .overlay-container {
    transition: opacity 0.25s;

    &.hovered {
      opacity: 0;
    }

    &.selected {
      opacity: 1;
    }
  }

  &:hover {
    & .overlay-container.hovered {
      opacity: 1;
    }
  }
`

const Image = styled.img`
  max-width: 100%;
  max-height: ${props => `${props.size}px`};
  margin: auto;
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
            <Overlay selected={this.state.isSelected} />
          </div>
        </ImageContainer>
        <ArtworkMetadata artwork={artwork} />
      </Container>
    )
  }
}

export default createContainer<ArtworkProps, ArtworkMetadataProps>(Artwork, ArtworkMetadata)
