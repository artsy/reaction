import React from "react"
import styled, { StyledFunction } from "styled-components"
import colors from "../../Assets/Colors"
import { Artwork, ArtworkProps, OverlayProps } from "../Artwork"
import ArtworkMetadata, { ArtworkMetadataProps } from "../Artwork/Metadata"
import createContainer from "../Artwork/Relay"
import Icon from "../Icon"

interface CircleProps extends React.HTMLProps<HTMLDivElement> {
  selected?: boolean
}

const OverlayBackground = styled.div`
  background-color: ${colors.purpleRegular};
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  opacity: 0.8;
  text-align: center;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Div: StyledFunction<CircleProps> = styled.div
const Circle = Div`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  border: 5px solid ${props => (props.selected ? "white" : "transparent")};
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: border-color 0.3s;
`

const Overlay: React.SFC<OverlayProps> = props =>
  <OverlayBackground>
    <Circle selected={props.selected}>
      <Icon name="check" color="white" />
    </Circle>
  </OverlayBackground>

export const InquiryArtwork: React.SFC<ArtworkProps> = props => {
  return <Artwork {...props} extended={false} Overlay={Overlay} showOverlayOnHover />
}

export default createContainer<ArtworkProps, ArtworkMetadataProps>(InquiryArtwork, ArtworkMetadata)
