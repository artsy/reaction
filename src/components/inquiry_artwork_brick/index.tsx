import { PositionInFile } from 'tslint/lib/test/lintError';
import { IEnableDisablePosition } from 'tslint/lib';
import * as React from "react"
import * as Relay from "react-relay"
import styled from "styled-components"
import ArtworkMetadata from "./metadata"
import colors from "../../assets/colors"
import Icon from "../icon"

const Image = styled.img`
  width: 100%;
  align-self: center;
`
const ImageOuterContainer = styled.div`
  display: flex;
  height: 300px;
  z-index: 9;
  position: relative;
`

const SelectedArtworkOverlay = styled.div`
  background-color: ${colors.purpleRegular};
  height: 300px;
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0.8;
`

export class ArtworkState {
  isSelected: boolean
}

export class Artwork extends React.Component<RelayProps, ArtworkState> {
  constructor(props) {
    super(props)
    this.state = {
      isSelected: false,
    }
  }
  onSelect() {
    this.setState({
      isSelected: !this.state.isSelected,
    })
  }

  render() {
    return (
      <div style={ { position: "relative" } } >
        <ImageOuterContainer onClick={this.onSelect.bind(this)} >
          <Image src={this.props.artwork.image.url} />
        </ImageOuterContainer>
        <ArtworkMetadata artwork={this.props.artwork} />
        {this.state.isSelected &&<SelectedArtworkOverlay onClick={this.onSelect.bind(this)}> 
          <Icon name="check" color="black"/>
        </SelectedArtworkOverlay>}
      </div>
    )
  }
}

export default Relay.createContainer(Artwork, {
  fragments: {
    artwork: () => Relay.QL`
      fragment on Artwork {
        image {
          url(version: "large")
          aspect_ratio
        }
       ${ArtworkMetadata.getFragment("artwork")}
      }
    `,
  },
})

interface RelayProps {
  artwork: {
    image: {
      url: string | null,
      aspect_ratio: number | null,
    } | null,
  },
}
