import { Col, Flex, Row, Sans, Separator, Serif } from "@artsy/palette"
import { ArtistAuctionResults_artist } from "__generated__/ArtistAuctionResults_artist.graphql"
import { PaginationFragmentContainer as Pagination } from "Components/v2/Pagination"
import React, { useState } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import useDeepCompareEffect from "use-deep-compare-effect"
import { AuctionResultItemFragmentContainer as AuctionResultItem } from "./ArtistAuctionResultItem"
import { TableSidebar } from "./TableSidebar"

import { Box, Spacer } from "@artsy/palette"

import { LoadingArea } from "Components/v2/LoadingArea"
import { isEqual } from "lodash"
import { usePrevious } from "Utils/Hooks/usePrevious"
import {
  AuctionResultsFilterContextProvider,
  useAuctionResultsFilterContext,
} from "./AuctionResultsFilterContext"
import { AuctionResultsCountFragmentContainer as AuctionResultsCount } from "./Components/AuctionResultsCount"
import { SortSelect } from "./Components/SortSelect"

// TODO:
// const logger = createLogger("ArtistAuctionResults.tsx")

const PAGE_SIZE = 10

interface AuctionResultsProps {
  relay: RelayRefetchProp
  artist: ArtistAuctionResults_artist
}

const AuctionResultsContainer: React.FC<AuctionResultsProps> = ({
  artist,
  relay,
}) => {
  const filterContext = useAuctionResultsFilterContext()

  const { sort } = filterContext.filters

  const loadNext = () => {
    const { hasNextPage, endCursor } = pageInfo

    if (hasNextPage) {
      this.loadAfter(artist.slug, endCursor, relay, setIsLoading)
    }
  }

  const loadAfter = cursor => {
    setIsLoading(true)

    relay.refetch(
      {
        first: PAGE_SIZE,
        after: cursor,
        artistID: artist.slug,
        before: null,
        last: null,
        organization: null,
        sort,
      },
      null,
      error => {
        setIsLoading(false)

        if (error) {
          console.error(error)
        }
      }
    )
  }

  const [isLoading, setIsLoading] = useState(false)

  const previousFilters = usePrevious(filterContext.filters)

  // TODO: move this and artwork copy to util?
  useDeepCompareEffect(() => {
    Object.entries(filterContext.filters).forEach(
      ([filterKey, currentFilter]) => {
        const previousFilter = previousFilters[filterKey]
        const filtersHaveUpdated = !isEqual(currentFilter, previousFilter)
        if (filtersHaveUpdated) {
          fetchResults()

          // TODO: instrumentation?
          // tracking.trackEvent({
          //   action_type:
          //     AnalyticsSchema.ActionType.CommercialFilterParamsChanged,
          //   current: filterContext.filters,
          //   changed: {
          //     [filterKey]: filterContext.filters[filterKey],
          //   },
          // })
        }
      }
    )
  }, [filterContext.filters])

  // TODO: move this and artwork copy to util? (pass loading state setter)
  function fetchResults() {
    setIsLoading(true)

    const relayParams = {
      first: PAGE_SIZE,
      artistID: artist.slug,
      after: null,
      before: null,
      last: null,
    }

    const relayRefetchVariables = {
      ...relayParams,
      ...filterContext.filters,
    }

    relay.refetch(relayRefetchVariables, null, error => {
      if (error) {
        console.error(error)
      }

      setIsLoading(false)
    })
  }

  const { pageInfo } = artist.auctionResultsConnection
  const auctionResultsLength = artist.auctionResultsConnection.edges.length

  const { openedItemIndex } = filterContext.filters
  const openedAuctionResult =
    openedItemIndex > -1
      ? artist.auctionResultsConnection.edges[openedItemIndex].node
      : null

  return (
    <>
      <Row>
        <Box pb={2}>
          <Sans size="5t">Auction results</Sans>
          <Serif size="3" color="black100">
            Some copy about definitions and methodology and link to it here.
          </Serif>
        </Box>
      </Row>
      <Row>
        <Col sm={2} pr={[0, 2]}>
          <TableSidebar />
        </Col>

        <Col sm={10}>
          <Row pb={2}>
            <Separator />
          </Row>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            mb={2}
          >
            <AuctionResultsCount results={artist.auctionResultsConnection} />
            <SortSelect />
          </Flex>

          <Spacer mt={3} />

          <LoadingArea isLoading={isLoading}>
            {artist.auctionResultsConnection.edges.map(({ node }, index) => {
              return (
                <React.Fragment key={index}>
                  <AuctionResultItem
                    index={index}
                    auctionResult={node}
                    lastChild={index === auctionResultsLength - 1}
                  />
                </React.Fragment>
              )
            })}
          </LoadingArea>
        </Col>
      </Row>

      <Row>
        <Col>
          <Box>
            <Pagination
              hasNextPage={pageInfo.hasNextPage}
              pageCursors={artist.auctionResultsConnection.pageCursors}
              onClick={loadAfter}
              onNext={loadNext}
              scrollTo="#jumpto-ArtistHeader"
            />
          </Box>
        </Col>
      </Row>
    </>
  )
}

export const ArtistAuctionResultsRefetchContainer = createRefetchContainer(
  (props: AuctionResultsProps) => {
    return (
      <AuctionResultsFilterContextProvider>
        <AuctionResultsContainer {...props} />
      </AuctionResultsFilterContextProvider>
    )
  },
  {
    artist: graphql`
      fragment ArtistAuctionResults_artist on Artist
        @argumentDefinitions(
          sort: { type: "AuctionResultSorts", defaultValue: DATE_DESC }
          first: { type: "Int", defaultValue: 10 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
        ) {
        slug
        auctionResultsConnection(
          first: $first
          after: $after
          before: $before
          last: $last
          sort: $sort
        ) {
          ...AuctionResultsCount_results
          pageInfo {
            hasNextPage
            endCursor
          }
          pageCursors {
            ...Pagination_pageCursors
          }
          totalCount
          edges {
            node {
              title
              dimension_text: dimensionText
              images {
                thumbnail {
                  url
                }
              }
              description
              date_text: dateText
              ...ArtistAuctionResultItem_auctionResult
            }
          }
        }
      }
    `,
  },
  graphql`
    query ArtistAuctionResultsQuery(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $sort: AuctionResultSorts
      $artistID: String!
    ) {
      artist(id: $artistID) {
        ...ArtistAuctionResults_artist
          @arguments(
            first: $first
            last: $last
            after: $after
            before: $before
            sort: $sort
          )
      }
    }
  `
)
