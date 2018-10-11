import { Box, Serif } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ReadMore } from "Styleguide/Components"

import { ArtworkDetailsAboutTheWorkFromArtsy_artwork } from "__generated__/ArtworkDetailsAboutTheWorkFromArtsy_artwork.graphql"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { TrackingProp } from "react-tracking"
import { Responsive } from "Utils/Responsive"

export const READ_MORE_MAX_CHARS = {
  xs: 100,
  default: 320,
}

export interface ArtworkDetailsAboutTheWorkFromArtsyProps {
  artwork: ArtworkDetailsAboutTheWorkFromArtsy_artwork
  tracking?: TrackingProp
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
              <ReadMore
                maxChars={maxChars}
                content={description}
                onReadMoreClicked={() => {
                  props.tracking.trackEvent({
                    flow: Schema.Flow.ArtworkAboutTheWork,
                    type: Schema.Type.Button,
                    label: Schema.Label.ReadMore,
                  })
                }}
              />
            </Serif>
          </Box>
        )
      }}
    </Responsive>
  )
}

export const ArtworkDetailsAboutTheWorkFromArtsyFragmentContainer = createFragmentContainer(
  track({
    context_module: Schema.ContextModule.AboutTheWork,
  })(ArtworkDetailsAboutTheWorkFromArtsy),
  graphql`
    fragment ArtworkDetailsAboutTheWorkFromArtsy_artwork on Artwork {
      description
    }
  `
)
