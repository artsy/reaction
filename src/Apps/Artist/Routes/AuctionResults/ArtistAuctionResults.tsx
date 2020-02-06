import { Col, Flex, Row, Sans, Separator, Serif } from "@artsy/palette"
import { ArtistAuctionResults_artist } from "__generated__/ArtistAuctionResults_artist.graphql"
import { PaginationFragmentContainer as Pagination } from "Components/v2/Pagination"
import React, { useEffect, useState } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { Subscribe } from "unstated"
import { AuctionResultItemFragmentContainer as AuctionResultItem } from "./ArtistAuctionResultItem"
import { AuctionResultsState } from "./state"
import { TableSidebar } from "./TableSidebar"

import { Box, Spacer } from "@artsy/palette"

import { LoadingArea } from "Components/v2/LoadingArea"
import createLogger from "Utils/logger"
import { AuctionResultsCountFragmentContainer as AuctionResultsCount } from "./Components/AuctionResultsCount"
import { SortSelect } from "./Components/SortSelect"

const logger = createLogger("ArtistAuctionResults.tsx")

const PAGE_SIZE = 10

interface AuctionResultsProps {
  relay: RelayRefetchProp
  artist: ArtistAuctionResults_artist
  sort: string
}

const AuctionResultsContainer: React.FC<AuctionResultsProps> = ({
  artist,
  relay,
  sort,
}) => {
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

  const resort = () => {
    relay.refetch(
      {
        first: PAGE_SIZE,
        after: null,
        artistID: artist.slug,
        before: null,
        last: null,
        organization: null,
        sort,
      },
      null,
      error => {
        if (error) {
          logger.error(error)
        }
      }
    )
  }


  const [isLoading, setIsLoading] = useState(false)
  useEffect(resort, [sort])

  const { pageInfo } = artist.auctionResultsConnection
  const auctionResultsLength = artist.auctionResultsConnection.edges.length

  return (
    <Subscribe to={[AuctionResultsState]}>
      {({ state }: AuctionResultsState) => {
        return (
          <>
            <Row>
              <Box pb={2}>
                <Sans size="5t">Auction results</Sans>
                <Serif size="3" color="black100">
                  Some copy about definitions and methodology and link to it
                  here.
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
                  <AuctionResultsCount
                    results={artist.auctionResultsConnection}
                  />
                  <SortSelect />
                </Flex>

                <ArtistAuctionDetailsModal
                  auctionResult={state.selectedAuction}
                />

                <Spacer mt={3} />

                <LoadingArea isLoading={isLoading}>
                  {artist.auctionResultsConnection.edges.map(
                    ({ node }, index) => {
                      return (
                        <React.Fragment key={index}>
                          <AuctionResultItem
                            auctionResult={node}
                            lastChild={index === auctionResultsLength - 1}
                          />
                        </React.Fragment>
                      )
                    }
                  )}
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
      }}
    </Subscribe>
  )
}

export const ArtistAuctionResultsRefetchContainer = createRefetchContainer(
  (props: AuctionResultsProps) => {
    return (
      <Subscribe to={[AuctionResultsState]}>
        {({ state }: AuctionResultsState) => {
          return <AuctionResultsContainer {...props} sort={state.sort} />
        }}
      </Subscribe>
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
          organization: { type: "String" }
        ) {
        slug
        auctionResultsConnection(
          first: $first
          after: $after
          before: $before
          last: $last
          sort: $sort
          organization: $organization
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
      $organization: String
    ) {
      artist(id: $artistID) {
        ...ArtistAuctionResults_artist
          @arguments(
            first: $first
            last: $last
            after: $after
            before: $before
            sort: $sort
            organization: $organization
          )
      }
    }
  `
)
