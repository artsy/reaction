import { Box } from "@artsy/palette"
import { AnalyticsSchema, useTracking } from "Artsy/Analytics"
import { Location } from "found"
import React from "react"

import { ArtworkFilter_viewer } from "__generated__/ArtworkFilter_viewer.graphql"
import { ZeroState } from "Apps/Search/Components/ZeroState"
import { ArtworkFilter } from "Components/v2/ArtworkFilter"
import { updateUrl } from "Components/v2/ArtworkFilter/Utils/urlBuilder"

interface SearchResultsRouteProps {
  viewer: ArtworkFilter_viewer
  location: Location
}

export const SearchResultsArtworksRoute: React.FC<
  SearchResultsRouteProps
> = props => {
  const tracking = useTracking()

  return (
    <Box pt={2}>
      <ArtworkFilter
        viewer={props.viewer}
        filters={props.location.query as any}
        onChange={updateUrl}
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
}
