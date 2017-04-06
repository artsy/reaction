import * as React from "react"
import * as Relay from "react-relay"
import styled from "styled-components"
import colors from "../../assets/colors"
import { Artwork, ArtworkProps } from "../artwork"
import ArtworkMetadata, { ArtworkMetadataProps } from "../artwork/metadata"
import createContainer from "../artwork/relay"
import Icon from "../icon"

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

const StyledArtwork = styled(Artwork)`
  text-align: center;
`

export const InquiryArtwork: React.SFC<ArtworkProps> = props => {
  const overlay = (
    <OverlayBackground>
      <Icon name="check" color="white" />
    </OverlayBackground>
  )

  return (
    <StyledArtwork {...props} extended={false} overlay={overlay} />
  )
}

export default createContainer<ArtworkProps, ArtworkMetadataProps>(InquiryArtwork, ArtworkMetadata)
