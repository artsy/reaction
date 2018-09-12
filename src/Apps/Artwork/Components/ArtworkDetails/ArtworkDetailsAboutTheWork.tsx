import { Box, Sans, Serif } from "@artsy/palette"
import React from "react"
import { ReadMore } from "Styleguide/Components"

interface ArtworkDetailsAboutTheWorkArtwork {
  readonly additional_information?: string
  readonly description?: string
  readonly partner?: {
    readonly name?: string
  }
}

interface ArtworkDetailsAboutTheWorkProps {
  artwork: ArtworkDetailsAboutTheWorkArtwork
}

export class ArtworkDetailsAboutTheWork extends React.Component<
  ArtworkDetailsAboutTheWorkProps
> {
  render() {
    const { additional_information, description, partner } = this.props.artwork
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
}
