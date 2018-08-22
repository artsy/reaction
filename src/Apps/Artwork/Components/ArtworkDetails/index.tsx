import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { ArtworkDetailsConditionInfoFragmentContainer as Details } from "./ArtworkDetailsConditionInfo"

import { ArtworkDetails_artwork } from "__generated__/ArtworkDetails_artwork.graphql"

export interface ArtworkDetailsProps {
  artwork: ArtworkDetails_artwork
}

const ArtworkDetailsContainer = styled.div``

export class ArtworkDetails extends Component<ArtworkDetailsProps> {
  render() {
    const { artwork } = this.props
    return (
      <ArtworkDetailsContainer>
        <Details artwork={artwork} />
      </ArtworkDetailsContainer>
    )
  }
}

export const ArtworkDetailsFragmentContainer = createFragmentContainer(
  ArtworkDetails,
  graphql`
    fragment ArtworkDetails_artwork on Artwork {
      ...ArtworkDetailsConditionInfo_artwork
    }
  `
)
