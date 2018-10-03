import { Box, Serif } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ReadMore } from "Styleguide/Components"

import { ArtworkDetailsAboutTheWorkFromArtsy_artwork } from "__generated__/ArtworkDetailsAboutTheWorkFromArtsy_artwork.graphql"
import { Responsive } from "Utils/Responsive"

export const READ_MORE_MAX_CHARS = {
  xs: 100,
  default: 320,
}

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
    <Responsive>
      {({ xs }) => {
        const maxChars = xs
          ? READ_MORE_MAX_CHARS.xs
          : READ_MORE_MAX_CHARS.default

        return (
          <Box pb={2}>
            <Serif size="3">
              <ReadMore maxChars={maxChars} content={description} />
            </Serif>
          </Box>
        )
      }}
    </Responsive>
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
