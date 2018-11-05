import { Box, Serif } from "@artsy/palette"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ReadMore } from "Styleguide/Components"

import { ArtworkDetailsAboutTheWorkFromArtsy_artwork } from "__generated__/ArtworkDetailsAboutTheWorkFromArtsy_artwork.graphql"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { Media } from "Utils/Responsive"

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

  renderReadMore(breakpoint?: string) {
    const { description } = this.props.artwork
    const xs = breakpoint === "xs"
    const maxChars = xs ? READ_MORE_MAX_CHARS.xs : READ_MORE_MAX_CHARS.default

    return (
      <ReadMore
        maxChars={maxChars}
        content={description}
        onReadMoreClicked={this.trackReadMoreClicked}
      />
    )
  }

  render() {
    if (!this.props.artwork.description) {
      return null
    }
    return (
      <Box pb={2}>
        <Serif size="3">
          <Media at="xs">{this.renderReadMore("xs")}</Media>
          <Media greaterThan="xs">{this.renderReadMore()}</Media>
        </Serif>
      </Box>
    )
  }
}

export const ArtworkDetailsAboutTheWorkFromArtsyFragmentContainer = createFragmentContainer(
  ArtworkDetailsAboutTheWorkFromArtsy,
  graphql`
    fragment ArtworkDetailsAboutTheWorkFromArtsy_artwork on Artwork {
      description(format: HTML)
    }
  `
)
