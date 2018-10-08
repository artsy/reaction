import { Serif } from "@artsy/palette"
import { ArtistBio_bio } from "__generated__/ArtistBio_bio.graphql"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Responsive2 } from "Utils/Responsive"
import { ReadMore } from "./ReadMore"

interface Props {
  bio: ArtistBio_bio
  onReadMoreClicked?: () => void
  maxChars?: number
}

export const MAX_CHARS = {
  xs: 100,
  default: 320,
}

@track({ context_module: Schema.Context.ArtistBio })
export class ArtistBio extends React.Component<Props> {
  render() {
    return (
      <Responsive2>
        {breakpoints => {
          return (
            <>
              <breakpoints.xs>
                <Serif size="3">
                  <ReadMore
                    onReadMoreClicked={this.props.onReadMoreClicked}
                    maxChars={MAX_CHARS.xs}
                    content={this.props.bio.biography_blurb.text}
                  />
                </Serif>
              </breakpoints.xs>
              <breakpoints.else>
                <Serif size="3">
                  <ReadMore
                    onReadMoreClicked={this.props.onReadMoreClicked}
                    maxChars={MAX_CHARS.default}
                    content={this.props.bio.biography_blurb.text}
                  />
                </Serif>
              </breakpoints.else>
            </>
          )
        }}
      </Responsive2>
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
