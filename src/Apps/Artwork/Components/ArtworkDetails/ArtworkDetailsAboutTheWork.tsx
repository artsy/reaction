import { Box, Sans, Serif } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ReadMore } from "Styleguide/Components"

import { ArtworkDetailsAboutTheWork_artwork } from "__generated__/ArtworkDetailsAboutTheWork_artwork.graphql"

export interface ArtworkDetailsAboutTheWorkProps {
  artwork: ArtworkDetailsAboutTheWork_artwork
}

export class ArtworkDetailsAboutTheWork extends React.Component<
  ArtworkDetailsAboutTheWorkProps
> {
  render() {
    const { artwork } = this.props
    if (!artwork.additional_information && !artwork.description) {
      return null
    }
    return (
      <Box pt={2}>
        {artwork.additional_information && (
          <Box>
            <Sans size="3" weight="medium" pb={1}>
              From {artwork.partner.name}
            </Sans>
            <Serif size="4" pb={2}>
              <ReadMore
                maxChars={300}
                content={artwork.additional_information}
              />
            </Serif>
          </Box>
        )}
        {artwork.description && (
          <Box pb={2}>
            <Sans size="3" weight="medium" pb={1}>
              From Artsy
            </Sans>
            <Serif size="4">
              <ReadMore maxChars={300} content={artwork.description} />
            </Serif>
          </Box>
        )}
      </Box>
    )
  }
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
