import { Box, Serif } from "@artsy/palette"
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
        {artwork.is_biddable &&
          artwork.sale_artwork &&
          artwork.sale_artwork.lot_label && (
            <Serif size="2" weight="semibold" color="black100">
              Lot {artwork.sale_artwork.lot_label}
            </Serif>
          )}
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
      is_biddable
      edition_sets {
        __id
      }
      sale_artwork {
        lot_label
      }
      ...ArtworkSidebarTitleInfo_artwork
      ...ArtworkSidebarSizeInfo_piece
      ...ArtworkSidebarClassification_artwork
    }
  `
)
