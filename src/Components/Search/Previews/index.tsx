import React, { SFC } from "react"
import { Media } from "Utils/Responsive"
import { ArtistSearchPreviewQueryRenderer as ArtistSearchPreview } from "./Grids/ArtistSearch"
import { MerchandisableArtworksPreviewQueryRenderer as MerchandisableArtworksPreview } from "./Grids/MerchandisableArtworks"

export interface SearchPreviewProps {
  entityID: string
  entityType: string
}

const map = {
  Artist: ArtistSearchPreview,
  default: MerchandisableArtworksPreview
}

export const SearchPreview: SFC<SearchPreviewProps> = ({
  entityID,
  entityType,
}) => {
  const Preview = map[entityType] || map.default

  return (
    <Media greaterThan="xs">
      <Preview entityID={entityID} />
    </Media>
  )
}
