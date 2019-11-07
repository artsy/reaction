import { Box } from "@artsy/palette"
import { AnalyticsSchema, useTracking } from "Artsy/Analytics"
import { RouterState, withRouter } from "found"
import React from "react"

import { ArtworkFilter_viewer } from "__generated__/ArtworkFilter_viewer.graphql"
import { ZeroState } from "Apps/Search/Components/ZeroState"
import { ArtworkFilter } from "Components/v2/ArtworkFilter"
import { updateUrl } from "Components/v2/ArtworkFilter/Utils/urlBuilder"

interface SearchResultsRouteProps extends RouterState {
  viewer: ArtworkFilter_viewer
}

export const SearchResultsArtworksRoute = withRouter((props => {
  const tracking = useTracking()

  return (
    <Box pt={2}>
      <ArtworkFilter
        viewer={props.viewer}
        filters={props.match.location.query}
        onChange={updateUrl}
        onArtworkBrickClick={(artwork, artworkBrickProps) => {
          tracking.trackEvent({
            action_type: AnalyticsSchema.ActionType.SelectedItemFromSearchPage,
            query: artworkBrickProps.term,
            item_type: "Artwork",
            item_id: artwork.id,
            destination_path: artwork.href,
          })
        }}
        onFilterClick={(key, value, filterState) => {
          tracking.trackEvent({
            action_type:
              AnalyticsSchema.ActionType.CommercialFilterParamsChanged,
            changed: { [key]: value },
            current: filterState,
          })
        }}
        ZeroState={ZeroState}
      />
    </Box>
  )
}) as React.FC<SearchResultsRouteProps>)
