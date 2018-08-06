import { Serif } from "@artsy/palette"
import { ArtistBio_bio } from "__generated__/ArtistBio_bio.graphql"
import { track } from "Analytics"
import * as Schema from "Analytics/Schema"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Responsive } from "Utils/Responsive"
import { ReadMore } from "./ReadMore"

interface Props {
  bio: ArtistBio_bio
  onReadMoreClicked?: () => void
}

@track({ context_module: Schema.Context.ArtistBio })
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
            return (
              <ReadMore onReadMoreClicked={this.props.onReadMoreClicked}>
                <Serif size="3">{blurb}</Serif>
              </ReadMore>
            )
          } else {
            return (
              <ReadMore
                onReadMoreClicked={this.props.onReadMoreClicked}
                maxLineCount={7}
              >
                <Serif size="3">{blurb}</Serif>
              </ReadMore>
            )
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
