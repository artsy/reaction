import { PositionInFile } from 'tslint/lib/test/lintError';
import { IEnableDisablePosition } from 'tslint/lib';
import * as React from "react"
import * as Relay from "react-relay"
import styled from "styled-components"
import ArtworkMetadata from "./metadata"
import colors from "../../assets/colors"
import Icon from "../icon"

const ImageContainer = styled.div`
  height: 350px; 
  width: 350px;
  overflow: hidden;
`

const ImageOuterContainer = styled.div`
  display: table;
  width: 100%;
  height: 100%;
`
const ImageInnerContainer = styled.div`
  display: table-cell;
  vertical-align: middle;
  width: 100%;
  height: 100%;
  text-align: center;
`

const Image = styled.img`
  max-width: 100%;
  max-height: 350px;
  margin: auto;
`

const SelectedArtworkOverlay = styled.div`
  background-color: ${colors.purpleRegular};
  height: 350px;
  width: 350px;
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  opacity: 0.8;
  text-align: center;
  line-height: 350px;
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
        <ImageContainer>
          <ImageOuterContainer onClick={this.onSelect.bind(this)} >
            <ImageInnerContainer>
              <Image src={this.props.artwork.image.url} />
            </ImageInnerContainer>
          </ImageOuterContainer>
        </ImageContainer>
        <ArtworkMetadata artwork={this.props.artwork} />
        {this.state.isSelected &&<SelectedArtworkOverlay onClick={this.onSelect.bind(this)}> 
          <Icon name="check" color="white"/>
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
