import * as React from "react"
import * as Relay from "react-relay"
import styled from "styled-components"
import colors from "../../assets/colors"
import Icon from "../icon"
import ArtworkMetadata from "./metadata"

const defaultHeight = "250px"
const defaultWidth = "250px"

const InquiryArtworkBrick = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`

const ImageContainer = styled.div`
  height: ${defaultHeight}; 
  width: ${defaultWidth};
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
  max-height: ${defaultHeight};
  margin: auto;
`

const SelectedArtworkOverlay = styled.div`
  background-color: rgba(110, 0, 255, 0.75);
  height: ${defaultHeight};
  width: ${defaultWidth};
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  opacity: 0.8;
  text-align: center;
  line-height: ${defaultHeight};
  pointer-events: none;
`

interface ArtworkState {
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
    let selectedOverlay
    if (this.state.isSelected) {
      selectedOverlay = (
        <SelectedArtworkOverlay> 
          <Icon name="check" color="white" />
        </SelectedArtworkOverlay>
      )
    }
    return (
      <InquiryArtworkBrick>
        <div style={{position: "relative"}}>
          <ImageContainer>
            <ImageOuterContainer onClick={this.onSelect.bind(this)} >
              <ImageInnerContainer>
                <Image src={this.props.artwork.image.url} />
              </ImageInnerContainer>
            </ImageOuterContainer>
          </ImageContainer>
          <ArtworkMetadata artwork={this.props.artwork} />

          {selectedOverlay}
      </div>
      </InquiryArtworkBrick>
    )
  }
}

export default Relay.createContainer(Artwork, {
  fragments: {
    artwork: () => Relay.QL`
      fragment on Artwork {
        image {
          url(version: "large")
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
    } | null,
  },
}
