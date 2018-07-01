import { Serif } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box } from "Styleguide/Elements/Box"

import { ArtworkSidebarTitleInfo_artwork } from "__generated__/ArtworkSidebarTitleInfo_artwork.graphql"

export interface ArtworkSidebarTitleInfoProps {
  artwork: ArtworkSidebarTitleInfo_artwork
}

export class ArtworkSidebarTitleInfo extends React.Component<
  ArtworkSidebarTitleInfoProps
> {
  render() {
    const { artwork } = this.props
    return (
      <Box color="black60">
        <Serif size="2">
          <Serif size="2" display="inline-block" italic>
            {artwork.title}
          </Serif>
          {artwork.date &&
            artwork.date.replace(/\s+/g, "").length > 0 &&
            ", " + artwork.date}
        </Serif>
        {artwork.medium && <Serif size="2">{artwork.medium}</Serif>}
      </Box>
    )
  }
}

export const ArtworkSidebarTitleInfoFragmentContainer = createFragmentContainer(
  ArtworkSidebarTitleInfo,
  graphql`
    fragment ArtworkSidebarTitleInfo_artwork on Artwork {
      title
      date
      medium
    }
  `
)
