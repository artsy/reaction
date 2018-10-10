import { Box } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebarClassificationFragmentContainer as Classification } from "./ArtworkSidebarClassification"
import { ArtworkSidebarSizeInfoFragmentContainer as SizeInfo } from "./ArtworkSidebarSizeInfo"
import { ArtworkSidebarTitleInfoFragmentContainer as TitleInfo } from "./ArtworkSidebarTitleInfo"

import { ArtworkSidebarMetadata_artwork } from "__generated__/ArtworkSidebarMetadata_artwork.graphql"

export interface ArtworkSidebarMetadataProps {
  artwork: ArtworkSidebarMetadata_artwork
}

export class ArtworkSidebarMetadata extends React.Component<
  ArtworkSidebarMetadataProps
> {
  render() {
    const { artwork } = this.props
    return (
      <Box>
        <TitleInfo artwork={artwork} />
        {artwork.edition_sets.length < 2 && <SizeInfo piece={artwork} />}
        <Classification artwork={artwork} />
      </Box>
    )
  }
}

export const ArtworkSidebarMetadataFragmentContainer = createFragmentContainer(
  ArtworkSidebarMetadata,
  graphql`
    fragment ArtworkSidebarMetadata_artwork on Artwork {
      edition_sets {
        __id
      }
      ...ArtworkSidebarTitleInfo_artwork
      ...ArtworkSidebarSizeInfo_piece
      ...ArtworkSidebarClassification_artwork
    }
  `
)
