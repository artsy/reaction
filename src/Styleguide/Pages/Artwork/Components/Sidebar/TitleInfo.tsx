import { Serif } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box } from "Styleguide/Elements/Box"

import { TitleInfo_artwork } from "__generated__/TitleInfo_artwork.graphql"

export interface TitleInfoProps {
  artwork: TitleInfo_artwork
}

const TitleInfoContainer = Box

export class TitleInfo extends React.Component<TitleInfoProps> {
  render() {
    const { artwork } = this.props
    return (
      <TitleInfoContainer color="black60" textAlign="left">
        <Serif size="2">
          <Serif size="2" display="inline-block" italic>
            {artwork.title}
          </Serif>
          {artwork.date &&
            artwork.date.replace(/\s+/g, "").length > 0 &&
            ", " + artwork.date}
        </Serif>
        {artwork.medium && <Serif size="2">{artwork.medium}</Serif>}
      </TitleInfoContainer>
    )
  }
}

export const TitleInfoFragmentContainer = createFragmentContainer(
  TitleInfo,
  graphql`
    fragment TitleInfo_artwork on Artwork {
      title
      date
      medium
    }
  `
)
