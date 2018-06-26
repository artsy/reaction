import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box } from "Styleguide/Elements/Box"
import { ClassificationFragmentContainer as Classification } from "./Classification"
import { SizeInfoFragmentContainer as SizeInfo } from "./SizeInfo"
import { TitleInfoFragmentContainer as TitleInfo } from "./TitleInfo"

import { ArtworkMetadata_artwork } from "__generated__/ArtworkMetadata_artwork.graphql"

export interface ArtworkMetadataProps {
  artwork: ArtworkMetadata_artwork
}

const ArtworkMetadataContainer = Box

export class ArtworkMetadata extends React.Component<ArtworkMetadataProps> {
  render() {
    const { artwork } = this.props
    return (
      <ArtworkMetadataContainer pb={3}>
        <TitleInfo artwork={artwork as any} />
        {artwork.edition_sets.length < 2 && (
          <SizeInfo artwork={artwork as any} />
        )}
        <Classification artwork={artwork as any} />
      </ArtworkMetadataContainer>
    )
  }
}

export const ArtworkMetadataFragmentContainer = createFragmentContainer(
  ArtworkMetadata,
  graphql`
    fragment ArtworkMetadata_artwork on Artwork {
      edition_sets {
        __id
      }
      ...TitleInfo_artwork
      ...SizeInfo_artwork
      ...Classification_artwork
    }
  `
)
