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
`

const Image = styled.img`
  max-width: 100%;
  max-height: ${props => `${props.size}px`};
  margin: auto;
`

export interface ArtworkProps extends RelayProps {
  size?: number
  extended?: boolean
  overlay?: JSX.Element
  onSelect?: (selected: boolean) => void
}

export interface ArtworkState {
  isSelected: boolean
}

export class Artwork extends React.Component<ArtworkProps, ArtworkState> {
  static defaultProps = {
    size: 250,
    extended: true,
    overlay: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      isSelected: false,
    }
  }

  onSelected(e) {
    if (!this.props.overlay) {
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
    const { size, artwork, overlay } = this.props

    return (
      <Container onClick={this.onSelected.bind(this)} size={size}>
        <ImageContainer size={size}>
          <Image src={artwork.image.url} size={size} />
          {this.state.isSelected && overlay}
        </ImageContainer>
        <ArtworkMetadata artwork={artwork} />
      </Container>
    )
  }
}

export default createContainer<ArtworkProps, ArtworkMetadataProps>(Artwork, ArtworkMetadata)
