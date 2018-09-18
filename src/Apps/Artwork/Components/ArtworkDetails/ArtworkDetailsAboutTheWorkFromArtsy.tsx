import { Box, Serif } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ReadMore } from "Styleguide/Components"

import { ArtworkDetailsAboutTheWorkFromArtsy_artwork } from "__generated__/ArtworkDetailsAboutTheWorkFromArtsy_artwork.graphql"

export interface ArtworkDetailsAboutTheWorkFromArtsyProps {
  artwork: ArtworkDetailsAboutTheWorkFromArtsy_artwork
}

export const ArtworkDetailsAboutTheWorkFromArtsy: React.SFC<
  ArtworkDetailsAboutTheWorkFromArtsyProps
> = props => {
  const { description } = props.artwork
  if (!description) {
    return null
  }
  return (
    <Box pb={2}>
      <Serif size="3">
        <ReadMore maxChars={300} content={description} />
      </Serif>
    </Box>
  )
}

export const ArtworkDetailsAboutTheWorkFromArtsyFragmentContainer = createFragmentContainer(
  ArtworkDetailsAboutTheWorkFromArtsy,
  graphql`
    fragment ArtworkDetailsAboutTheWorkFromArtsy_artwork on Artwork {
      description
    }
  `
)
