import React, { SFC } from "react"
import { ArtistSearchPreviewQueryRenderer as ArtistSearchPreview } from "./Grids/Artist"

export interface SearchPreviewProps {
  entityID: string
  entityType: string
}

export const SearchPreview: SFC<SearchPreviewProps> = ({
  entityID,
  entityType,
}) => {
  switch (entityType) {
    case "Sale": {
      return <div>Sale Context Not Implemented</div>
    }
    case "Fair": {
      return <div>Fair Context Not Implemented</div>
    }
    case "Artist": {
      return <ArtistSearchPreview entityID={entityID} />
    }
    // And so forth...
  }
}
