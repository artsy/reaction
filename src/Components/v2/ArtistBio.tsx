import { ReadMore, Serif } from "@artsy/palette"
import { ArtistBio_bio } from "__generated__/ArtistBio_bio.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Media } from "Utils/Responsive"

export interface ArtistBioProps {
  bio: ArtistBio_bio
  onReadMoreClicked?: () => void
  maxChars?: number
}

export const MAX_CHARS = {
  xs: 100,
  default: 320,
}

export class ArtistBio extends React.Component<ArtistBioProps> {
  renderReadMore = size => {
    return (
      <ReadMore
        onReadMoreClicked={this.props.onReadMoreClicked}
        maxChars={size === "xs" ? MAX_CHARS.xs : MAX_CHARS.default}
        content={this.props.bio.biography_blurb.text}
      />
    )
  }
  render() {
    return (
      <Serif size="3">
        <Media at="xs">{this.renderReadMore("xs")}</Media>
        <Media greaterThan="xs">{this.renderReadMore("rest")}</Media>
      </Serif>
    )
  }
}

export const ArtistBioFragmentContainer = createFragmentContainer(ArtistBio, {
  bio: graphql`
    fragment ArtistBio_bio on Artist {
      biography_blurb(format: HTML, partner_bio: true) {
        text
        credit
      }
    }
  `,
})
