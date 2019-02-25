import React, { SFC } from "react"
import { Media } from "Utils/Responsive"
import { ArtistSearchPreviewQueryRenderer as ArtistSearchPreview } from "./Grids/ArtistSearch"
import { MerchandisableArtworksPreviewQueryRenderer as MerchandisableArtworksPreview } from "./Grids/MerchandisableArtworks"

export interface SearchPreviewProps {
  entityID: string
  entityType: string
}

const previewComponents = {
  Artist: ArtistSearchPreview,
  default: MerchandisableArtworksPreview,
}

export const SearchPreview: SFC<SearchPreviewProps> = ({
  entityID,
  entityType,
}) => {
  const Preview = previewComponents[entityType] || previewComponents.default

  return (
    <Media greaterThan="xs">
      <Preview entityID={entityID} />
    </Media>
  )
}
