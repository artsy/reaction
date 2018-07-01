import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Responsive } from "Utils/Responsive"
import { ReadMore } from "./ReadMore"

import { ArtistBio_bio } from "__generated__/ArtistBio_bio.graphql"

interface Props {
  bio: ArtistBio_bio
}

export class ArtistBio extends React.Component<Props> {
  render() {
    const blurb = (
      <div
        dangerouslySetInnerHTML={{
          __html: this.props.bio.biography_blurb.text,
        }}
      />
    )

    return (
      <Responsive>
        {({ xs }) => {
          if (xs) {
            return <ReadMore>{blurb}</ReadMore>
          } else {
            return <ReadMore maxLineCount={7}>{blurb}</ReadMore>
          }
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
