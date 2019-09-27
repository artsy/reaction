import { ArtistArtworkFilter_artist } from "__generated__/ArtistArtworkFilter_artist.graphql"
import { Overview_artist } from "__generated__/Overview_artist.graphql"
import { useTracking } from "Artsy"
import * as Schema from "Artsy/Analytics/Schema"
import { BaseArtworkFilter } from "Components/v2/ArtworkFilter"
import { ArtworkFilterContextProvider } from "Components/v2/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "Components/v2/ArtworkFilter/Utils/urlBuilder"
import { Location } from "found"
import React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { ZeroState } from "./ZeroState"

interface ArtistArtworkFilterProps {
  artist: ArtistArtworkFilter_artist
  relay: RelayRefetchProp
  sidebarAggregations: Overview_artist["sidebarAggregations"]
  location: Location
}

const ArtistArtworkFilter: React.FC<ArtistArtworkFilterProps> = props => {
  const { location, relay, artist, sidebarAggregations } = props
  const tracking = useTracking()
  const { filtered_artworks } = artist

  const hasFilter = filtered_artworks && filtered_artworks.__id

  // If there was an error fetching the filter,
  // we still want to render the rest of the page.
  if (!hasFilter) return null

  return (
    <ArtworkFilterContextProvider
      filters={location.query}
      sortOptions={[
        { value: "-decayed_merch", text: "Default" },
        { value: "-partner_updated_at", text: "Recently updated" },
        { value: "-published_at", text: "Recently added" },
        { value: "-year", text: "Artwork year (desc.)" },
        { value: "year", text: "Artwork year (asc.)" },
      ]}
      aggregations={sidebarAggregations.aggregations as any}
      counts={artist.counts}
      onChange={updateUrl}
      onFilterClick={(key, value, filterState) => {
        tracking.trackEvent({
          action_type: Schema.ActionType.CommercialFilterParamsChanged,
          changed: { [key]: value },
          current: filterState,
        })
      }}
    >
      <BaseArtworkFilter
        relay={relay}
        viewer={artist}
        relayVariables={{
          aggregations: ["TOTAL"],
        }}
      >
        {artist.counts.artworks.length === 0 && (
          <ZeroState artist={artist} is_followed={artist.is_followed} />
        )}
      </BaseArtworkFilter>
    </ArtworkFilterContextProvider>
  )
}

export const ArtistArtworkFilterRefetchContainer = createRefetchContainer(
  ArtistArtworkFilter,
  {
    artist: graphql`
      fragment ArtistArtworkFilter_artist on Artist
        @argumentDefinitions(
          partner_category: {
            type: "[String]"
            defaultValue: ["blue-chip", "top-established", "top-emerging"]
          }
          acquireable: { type: "Boolean" }
          aggregations: { type: "[ArtworkAggregation]" }
          artist_id: { type: "String" }
          at_auction: { type: "Boolean" }
          attribution_class: { type: "[String]" }
          color: { type: "String" }
          for_sale: { type: "Boolean" }
          hasFilter: { type: "Boolean", defaultValue: false }
          height: { type: "String" }
          inquireable_only: { type: "Boolean" }
          keyword: { type: "String" }
          major_periods: { type: "[String]" }
          medium: { type: "String", defaultValue: "*" }
          offerable: { type: "Boolean" }
          page: { type: "Int" }
          partner_id: { type: "ID" }
          price_range: { type: "String" }
          sort: { type: "String", defaultValue: "-partner_updated_at" }
          width: { type: "String" }
        ) {
        is_followed

        counts {
          partner_shows
          for_sale_artworks
          ecommerce_artworks
          auction_artworks
          artworks
          has_make_offer_artworks
        }

        filtered_artworks(
          acquireable: $acquireable
          aggregations: $aggregations
          artist_id: $artist_id
          at_auction: $at_auction
          attribution_class: $attribution_class
          color: $color
          for_sale: $for_sale
          height: $height
          inquireable_only: $inquireable_only
          keyword: $keyword
          major_periods: $major_periods
          medium: $medium
          offerable: $offerable
          page: $page
          partner_id: $partner_id
          price_range: $price_range
          size: 0
          sort: $sort
          width: $width
        ) {
          __id
          ...ArtworkFilterArtworkGrid2_filtered_artworks
        }
      }
    `,
  },
  graphql`
    query ArtistArtworkFilterQuery(
      $acquireable: Boolean
      $aggregations: [ArtworkAggregation] = [
        MEDIUM
        TOTAL
        GALLERY
        INSTITUTION
        MAJOR_PERIOD
      ]
      $artist_id: String!
      $at_auction: Boolean
      $attribution_class: [String]
      $color: String
      $for_sale: Boolean
      $hasFilter: Boolean!
      $height: String
      $inquireable_only: Boolean
      $keyword: String
      $major_periods: [String]
      $medium: String
      $offerable: Boolean
      $page: Int
      $partner_id: ID
      $price_range: String
      $sort: String
      $width: String
    ) {
      artist(id: $artist_id) {
        ...ArtistArtworkFilter_artist
          @arguments(
            acquireable: $acquireable
            aggregations: $aggregations
            artist_id: $artist_id
            at_auction: $at_auction
            attribution_class: $attribution_class
            color: $color
            for_sale: $for_sale
            hasFilter: $hasFilter
            height: $height
            inquireable_only: $inquireable_only
            keyword: $keyword
            major_periods: $major_periods
            medium: $medium
            offerable: $offerable
            page: $page
            partner_id: $partner_id
            price_range: $price_range
            sort: $sort
            width: $width
          )
      }
    }
  `
)
