import { Serif } from "@artsy/palette"
import { ArtistBio_bio } from "__generated__/ArtistBio_bio.graphql"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Responsive } from "Utils/Responsive"
import { ReadMore } from "./ReadMore"

export interface ArtistBioProps {
  bio: ArtistBio_bio
  onReadMoreClicked?: () => void
  maxChars?: number
}

export const MAX_CHARS = {
  xs: 100,
  default: 320,
}

@track({ context_module: Schema.ContextModule.ArtistBio })
export class ArtistBio extends React.Component<ArtistBioProps> {
  render() {
    return (
      <Responsive>
        {({ xs }) => {
          const maxChars =
            this.props.maxChars || xs ? MAX_CHARS.xs : MAX_CHARS.default

          return (
            <Serif size="3">
              <ReadMore
                onReadMoreClicked={this.props.onReadMoreClicked}
                maxChars={maxChars}
                content={this.props.bio.biography_blurb.text}
              />
            </Serif>
          )
        }}
      </Responsive>
    )
  }
}

export const ArtistBioFragmentContainer = createFragmentContainer(
  ArtistBio,
  graphql`
    fragment ArtistBio_bio on Artist {
      biography_blurb(format: HTML, partner_bio: true) {
        text
        credit
      }
    }
  `
)
