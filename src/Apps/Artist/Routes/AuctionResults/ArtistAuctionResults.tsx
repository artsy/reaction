import { Col, Row } from "@artsy/palette"
import { ArtistAuctionResults_artist } from "__generated__/ArtistAuctionResults_artist.graphql"
import { PaginationFragmentContainer as Pagination } from "Components/v2/Pagination"
import React, { Component } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { Subscribe } from "unstated"
import { ArtistAuctionDetailsModal } from "./ArtistAuctionDetailsModal"
import { AuctionResultItemFragmentContainer as AuctionResultItem } from "./ArtistAuctionResultItem"
import { AuctionResultsState } from "./state"
import { TableColumns } from "./TableColumns"
import { TableSidebar } from "./TableSidebar"

import { Box, Separator, Spacer } from "@artsy/palette"

import { LoadingArea, LoadingAreaState } from "Components/v2/LoadingArea"
import createLogger from "Utils/logger"

const logger = createLogger("ArtistAuctionResults.tsx")

const PAGE_SIZE = 10

interface AuctionResultsProps {
  relay: RelayRefetchProp
  artist: ArtistAuctionResults_artist
  sort: string
}

class AuctionResultsContainer extends Component<
  AuctionResultsProps,
  LoadingAreaState
> {
  state = {
    isLoading: false,
  }

  loadNext = () => {
    const {
      artist: {
        auctionResultsConnection: {
          pageInfo: { hasNextPage, endCursor },
        },
      },
    } = this.props

    if (hasNextPage) {
      this.loadAfter(endCursor)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sort !== this.props.sort) {
      this.resort()
    }
  }

  resort = () => {
    this.props.relay.refetch(
      {
        first: PAGE_SIZE,
        after: null,
        artistID: this.props.artist.slug,
        before: null,
        last: null,
        sort: this.props.sort,
      },
      null,
      error => {
        if (error) {
          logger.error(error)
        }
      }
    )
  }

  loadAfter = cursor => {
    this.toggleLoading(true)

    this.props.relay.refetch(
      {
        first: PAGE_SIZE,
        after: cursor,
        artistID: this.props.artist.slug,
        before: null,
        last: null,
        sort: this.props.sort,
      },
      null,
      error => {
        this.toggleLoading(false)

        if (error) {
          console.error(error)
        }
      }
    )
  }

  toggleLoading = isLoading => {
    this.setState({
      isLoading,
    })
  }

  render() {
    const auctionResultsLength = this.props.artist.auctionResultsConnection
      .edges.length
    const { totalCount } = this.props.artist.auctionResultsConnection
    return (
      <Subscribe to={[AuctionResultsState]}>
        {({ state }: AuctionResultsState) => {
          return (
            <>
              <Row>
                <Col sm={2} pr={[0, 2]}>
                  <TableSidebar count={totalCount} />
                </Col>

                <Col sm={10}>
                  <TableColumns />

                  <Box pt={0.5}>
                    <Separator />
                  </Box>

                  <ArtistAuctionDetailsModal
                    auctionResult={state.selectedAuction}
                  />

                  <Spacer mt={3} />

                  <LoadingArea isLoading={this.state.isLoading}>
                    {this.props.artist.auctionResultsConnection.edges.map(
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
                      hasNextPage={
                        this.props.artist.auctionResultsConnection.pageInfo
                          .hasNextPage
                      }
                      pageCursors={
                        this.props.artist.auctionResultsConnection.pageCursors
                      }
                      onClick={this.loadAfter}
                      onNext={this.loadNext}
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
        ) {
        slug
        auctionResultsConnection(
          first: $first
          after: $after
          before: $before
          last: $last
          sort: $sort
        ) {
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
