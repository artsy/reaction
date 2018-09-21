import { Serif } from "@artsy/palette"
import { ArtistBio_bio } from "__generated__/ArtistBio_bio.graphql"
import { Schema, track } from "Artsy"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Responsive } from "Utils/Responsive"
import { ReadMore } from "./ReadMore"

interface Props {
  bio: ArtistBio_bio
  onReadMoreClicked?: () => void
}

export const MAX_CHARS = {
  xs: 300,
  rest: 900,
}

@track({ context_module: Schema.Context.ArtistBio })
export class ArtistBio extends React.Component<Props> {
  render() {
    return (
      <Responsive>
        {({ xs }) => {
          const maxChars = xs ? MAX_CHARS.xs : MAX_CHARS.rest

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
