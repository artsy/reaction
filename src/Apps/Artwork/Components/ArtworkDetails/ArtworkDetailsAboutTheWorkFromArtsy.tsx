import { Box, Serif } from "@artsy/palette"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ReadMore } from "Styleguide/Components"

import { ArtworkDetailsAboutTheWorkFromArtsy_artwork } from "__generated__/ArtworkDetailsAboutTheWorkFromArtsy_artwork.graphql"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { Responsive } from "Utils/Responsive"

export const READ_MORE_MAX_CHARS = {
  xs: 100,
  default: 320,
}

export interface ArtworkDetailsAboutTheWorkFromArtsyProps {
  artwork: ArtworkDetailsAboutTheWorkFromArtsy_artwork
}

@track({
  context_module: Schema.ContextModule.AboutTheWork,
})
export class ArtworkDetailsAboutTheWorkFromArtsy extends Component<
  ArtworkDetailsAboutTheWorkFromArtsyProps
> {
  @track({
    flow: Schema.Flow.ArtworkAboutTheWork,
    type: Schema.Type.Button,
    label: Schema.Label.ReadMore,
  })
  trackReadMoreClicked() {
    // noop
  }

  render() {
    const { description } = this.props.artwork
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
                  onReadMoreClicked={this.trackReadMoreClicked}
                />
              </Serif>
            </Box>
          )
        }}
      </Responsive>
    )
  }
}

export const ArtworkDetailsAboutTheWorkFromArtsyFragmentContainer = createFragmentContainer(
  ArtworkDetailsAboutTheWorkFromArtsy,
  graphql`
    fragment ArtworkDetailsAboutTheWorkFromArtsy_artwork on Artwork {
      description
    }
  `
)
