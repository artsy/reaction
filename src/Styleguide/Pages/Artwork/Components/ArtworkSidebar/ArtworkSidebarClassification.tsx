import { Serif } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box } from "Styleguide/Elements/Box"

import { ArtworkSidebarClassification_artwork } from "__generated__/ArtworkSidebarClassification_artwork.graphql"

export interface ArtworkSidebarClassificationProps {
  artwork: ArtworkSidebarClassification_artwork
}

const ArtworkSidebarClassificationContainer = Box

export class ArtworkSidebarClassification extends React.Component<
  ArtworkSidebarClassificationProps
> {
  render() {
    const { artwork } = this.props
    if (!artwork.attribution_class) {
      return null
    }
    return (
      <ArtworkSidebarClassificationContainer
        pt={2}
        color="black60"
        textAlign="left"
      >
        <Serif size="2">
          <a href="#">{artwork.attribution_class.short_description}</a>.
        </Serif>
      </ArtworkSidebarClassificationContainer>
    )
  }
}

export const ArtworkSidebarClassificationFragmentContainer = createFragmentContainer(
  ArtworkSidebarClassification,
  graphql`
    fragment ArtworkSidebarClassification_artwork on Artwork {
      attribution_class {
        short_description
      }
    }
  `
)
