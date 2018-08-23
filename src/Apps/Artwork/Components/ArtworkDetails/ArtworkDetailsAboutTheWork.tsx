import { Serif } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box } from "Styleguide/Elements/Box"

import { ArtworkDetailsAboutTheWork_artwork } from "__generated__/ArtworkDetailsAboutTheWork_artwork.graphql"

export interface ArtworkDetailsAboutTheWorkProps {
  artwork: ArtworkDetailsAboutTheWork_artwork
}

export class ArtworkDetailsAboutTheWork extends React.Component<
  ArtworkDetailsAboutTheWorkProps
> {
  render() {
    const { artwork } = this.props
    if (!artwork.additional_information) {
      return null
    }
    return (
      <Box pb={3} pt={3}>
        <Serif size="5">{artwork.additional_information}</Serif>
      </Box>
    )
  }
}

export const ArtworkDetailsAboutTheWorkFragmentContainer = createFragmentContainer(
  ArtworkDetailsAboutTheWork,
  graphql`
    fragment ArtworkDetailsAboutTheWork_artwork on Artwork {
      additional_information
    }
  `
)
