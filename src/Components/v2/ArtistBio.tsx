import { Serif } from "@artsy/palette"
import { ArtistBio_bio } from "__generated__/ArtistBio_bio.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

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
  render() {
    const { bio } = this.props
    return (
      <Serif size="3">
        <span
          dangerouslySetInnerHTML={{
            __html: bio.biography_blurb.text,
          }}
        />
      </Serif>
    )
  }
}

export const ArtistBioFragmentContainer = createFragmentContainer(ArtistBio, {
  bio: graphql`
    fragment ArtistBio_bio on Artist {
      biography_blurb(format: HTML, partner_bio: true) {
        text
      }
    }
  `,
})
