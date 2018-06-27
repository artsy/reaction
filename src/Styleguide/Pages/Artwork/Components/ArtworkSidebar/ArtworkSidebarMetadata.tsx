import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box } from "Styleguide/Elements/Box"
import { ArtworkSidebarClassificationFragmentContainer as Classification } from "./ArtworkSidebarClassification"
import { ArtworkSidebarSizeInfoFragmentContainer as SizeInfo } from "./ArtworkSidebarSizeInfo"
import { ArtworkSidebarTitleInfoFragmentContainer as TitleInfo } from "./ArtworkSidebarTitleInfo"

import { ArtworkSidebarMetadata_artwork } from "__generated__/ArtworkSidebarMetadata_artwork.graphql"

export interface ArtworkSidebarMetadataProps {
  artwork: ArtworkSidebarMetadata_artwork
}

const ArtworkSidebarMetadataContainer = Box

export class ArtworkSidebarMetadata extends React.Component<
  ArtworkSidebarMetadataProps
> {
  render() {
    const { artwork } = this.props
    return (
      <ArtworkSidebarMetadataContainer pb={3}>
        <TitleInfo artwork={artwork as any} />
        {artwork.edition_sets.length < 2 && <SizeInfo piece={artwork as any} />}
        <Classification artwork={artwork as any} />
      </ArtworkSidebarMetadataContainer>
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
