import { Box } from "@artsy/palette"
import { Location } from "found"
import React from "react"

import { ArtworkFilter_viewer } from "__generated__/ArtworkFilter_viewer.graphql"
import { ArtworkFilter } from "Components/v2/ArtworkFilter"
import { updateUrl } from "Components/v2/ArtworkFilter/Utils/urlBuilder"

interface SearchResultsRouteProps {
  viewer: ArtworkFilter_viewer
  location: Location
}

export const SearchResultsArtworksRoute: React.FC<
  SearchResultsRouteProps
> = props => {
  return (
    <Box pt={2}>
      <ArtworkFilter
        viewer={props.viewer}
        filters={props.location.query as any}
        sortOptions={[
          { value: "-decayed_merch", text: "Default" },
          { value: "-partner_updated_at", text: "Recently updated" },
          { value: "-published_at", text: "Recently added" },
          { value: "-year", text: "Artwork year (desc.)" },
          { value: "year", text: "Artwork year (asc.)" },
        ]}
        onChange={updateUrl}
        onFilterClick={(key, value, filterState) => {
          // TODO: Wire up tracking once data-team gets back to us
          // trackEvent({
          //   action_type: Schema.ActionType.CommercialFilterParamsChanged,
          //   changed: { [key]: value },
          //   current: filterState,
          // })
        }}
      />
    </Box>
  )
}
