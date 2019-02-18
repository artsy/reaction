import React, { SFC } from "react"
import { ArtistSearchPreviewQueryRenderer as ArtistSearchPreview } from "./Grids/ArtistSearch"
import { MerchandisableArtworksPreviewQueryRenderer as MerchandisableArtworksPreview } from "./Grids/MerchandisableArtworks"

export interface SearchPreviewProps {
  entityID: string
  entityType: string
}

export const SearchPreview: SFC<SearchPreviewProps> = ({
  entityID,
  entityType,
}) => {
  switch (entityType) {
    case "Artist": {
      return <ArtistSearchPreview entityID={entityID} />
    }
    default: {
      return <MerchandisableArtworksPreview />
    }
  }
}
