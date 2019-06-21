import React, { useEffect, useState } from "react"
import { createRefetchContainer, graphql, QueryRenderer } from "react-relay"

import { useSystemContext } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { Media } from "Utils/Responsive"

import { ArtworkFilterQuery as ArtworkFilterQueryType } from "__generated__/ArtworkFilterQuery.graphql"

import { ArtworkFilterArtworkGridRefetchContainer as ArtworkFilterArtworkGrid } from "./ArtworkFilterArtworkGrid2"
import { initialFilterState } from "./ArtworkFilterContext"
import { FilterContextProvider } from "./ArtworkFilterContext"
import { ArtworkFilterMobileActionSheet } from "./ArtworkFilterMobileActionSheet"
import { ArtworkFilters } from "./ArtworkFilters"

import {
  Box,
  Button,
  FilterIcon,
  Flex,
  Separator,
  Spacer,
} from "@artsy/palette"
import { ArtworkFilter_viewer } from "__generated__/ArtworkFilter_viewer.graphql"

const ArtworkQueryFilter = graphql`
  query ArtworkFilterQuery(
    $acquireable: Boolean
    $artist_id: String
    $at_auction: Boolean
    $attribution_class: [String]
    $color: String
    $for_sale: Boolean
    $height: String
    $inquireable_only: Boolean
    $major_periods: [String]
    $medium: String
    $offerable: Boolean
    $page: Int
    $partner_id: ID
    $price_range: String
    $sort: String
    $term: String!
    $width: String
  ) {
    viewer {
      ...ArtworkFilter_viewer
        @arguments(
          acquireable: $acquireable
          artist_id: $artist_id
          at_auction: $at_auction
          attribution_class: $attribution_class
          color: $color
          for_sale: $for_sale
          height: $height
          inquireable_only: $inquireable_only
          keyword: $term
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

interface ArtworkFilterProps {
  viewer: ArtworkFilter_viewer
  term: string
}

const ArtworkFilterFragmentContainer = createRefetchContainer(
  ({ viewer, term }: ArtworkFilterProps) => {
    const [showMobileActionSheet, toggleMobileActionSheet] = useState(false)

    const mediums = viewer.filter_artworks.aggregations.find(
      agg => agg.slice === "MEDIUM"
    )

    // If we're in mobile mode, prohibit scrolling
    useEffect(() => {
      const setScrollable = doScroll => {
        document.body.style.overflowY = doScroll ? "hidden" : "visible"
      }

      // Start blocking
      if (showMobileActionSheet) {
        setScrollable(false)
      }

      // On unmount, reenable scrolling
      return () => {
        setScrollable(true)
      }
    }, [showMobileActionSheet])

    const ArtworkGrid = () => {
      return (
        <ArtworkFilterArtworkGrid
          filtered_artworks={viewer.filtered_artworks as any}
          // isLoading={this.isLoading}
          columnCount={[2, 2, 2, 3]}
          term={term}
        />
      )
    }

    return (
      <Box>
        <Media at="xs">
          <Box>
            {showMobileActionSheet && (
              <ArtworkFilterMobileActionSheet
                onClose={() => toggleMobileActionSheet(false)}
              >
                <ArtworkFilters mediums={mediums as any} />
              </ArtworkFilterMobileActionSheet>
            )}

            <Box id="jump--searchArtworkGrid" />

            <Flex justifyContent="flex-end" alignItems="center">
              <Button
                size="small"
                mt={-1}
                onClick={() => toggleMobileActionSheet(true)}
              >
                <Flex justifyContent="space-between" alignItems="center">
                  <FilterIcon fill="white100" />
                  <Spacer mr={0.5} />
                  Filter
                </Flex>
              </Button>
            </Flex>

            <Spacer mb={2} />

            <ArtworkGrid />
          </Box>
        </Media>

        <Media greaterThan="xs">
          <Flex>
            <Box width="25%" mr={2}>
              <ArtworkFilters mediums={mediums as any} />
              <Separator mb={2} />
            </Box>
            <Box width="75%">
              <Box id="jump--searchArtworkGrid" />

              <ArtworkGrid />
            </Box>
          </Flex>
        </Media>
      </Box>
    )
  },
  {
    viewer: graphql`
      fragment ArtworkFilter_viewer on Viewer
        @argumentDefinitions(
          aggregations: {
            type: "[ArtworkAggregation]"
            defaultValue: [MEDIUM, TOTAL]
          }

          acquireable: { type: "Boolean" }
          artist_id: { type: "String" }
          at_auction: { type: "Boolean" }
          attribution_class: { type: "[String]" }
          color: { type: "String" }
          for_sale: { type: "Boolean" }
          height: { type: "String" }
          inquireable_only: { type: "Boolean" }
          keyword: { type: "String!", defaultValue: "" }
          major_periods: { type: "[String]" }
          medium: { type: "String" }
          offerable: { type: "Boolean" }
          page: { type: "Int" }
          partner_id: { type: "ID" }
          price_range: { type: "String" }
          sort: { type: "String", defaultValue: "-partner_updated_at" }
          width: { type: "String" }
        ) {
        filter_artworks(aggregations: $aggregations, size: 0) {
          aggregations {
            slice
            counts {
              name
              id
            }
          }
        }
        filtered_artworks: filter_artworks(
          aggregations: [TOTAL]
          medium: $medium
          major_periods: $major_periods
          partner_id: $partner_id
          for_sale: $for_sale
          at_auction: $at_auction
          acquireable: $acquireable
          offerable: $offerable
          inquireable_only: $inquireable_only
          size: 0
          sort: $sort
          price_range: $price_range
          height: $height
          width: $width
          artist_id: $artist_id
          attribution_class: $attribution_class
          color: $color
          keyword: $keyword
          page: $page
        ) {
          ...ArtworkFilterArtworkGrid2_filtered_artworks
        }
      }
    `,
  },
  ArtworkQueryFilter
)

export const ArtworkFilterQueryRenderer = ({ term = "andy warhol" }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <FilterContextProvider keyword={term} {...initialFilterState}>
      <QueryRenderer<ArtworkFilterQueryType>
        environment={relayEnvironment}
        // FIXME: Passing a variable to `query` shouldn't error out in linter
        /* tslint:disable:relay-operation-generics */
        query={ArtworkQueryFilter}
        variables={{
          term: "andy warhol",
        }}
        render={renderWithLoadProgress(ArtworkFilterFragmentContainer as any)}
      />
    </FilterContextProvider>
  )
}
