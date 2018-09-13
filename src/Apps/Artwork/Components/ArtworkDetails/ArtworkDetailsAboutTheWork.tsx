import { Box, Sans, Serif } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ReadMore } from "Styleguide/Components"

import { ArtworkDetailsAboutTheWork_artwork } from "__generated__/ArtworkDetailsAboutTheWork_artwork.graphql"

export interface ArtworkDetailsAboutTheWorkProps {
  artwork: ArtworkDetailsAboutTheWork_artwork
}

export const ArtworkDetailsAboutTheWork: React.SFC<
  ArtworkDetailsAboutTheWorkProps
> = props => {
  const { additional_information, description, partner } = props.artwork
  if (!additional_information && !description) {
    return null
  }
  return (
    <Box pt={2}>
      {additional_information && (
        <Box>
          <Sans size="3" weight="medium" pb={1}>
            From {partner.name}
          </Sans>
          <Serif size="4" pb={2}>
            <ReadMore maxChars={300} content={additional_information} />
          </Serif>
        </Box>
      )}
      {description && (
        <Box pb={2}>
          <Sans size="3" weight="medium" pb={1}>
            From Artsy
          </Sans>
          <Serif size="4">
            <ReadMore maxChars={300} content={description} />
          </Serif>
        </Box>
      )}
    </Box>
  )
}

export const ArtworkDetailsAboutTheWorkFragmentContainer = createFragmentContainer(
  ArtworkDetailsAboutTheWork,
  graphql`
    fragment ArtworkDetailsAboutTheWork_artwork on Artwork {
      additional_information
      description
      partner {
        name
      }
    }
  `
)
