import { AuctionResultsRefetchContainer_artist } from "__generated__/AuctionResultsRefetchContainer_artist.graphql"
import React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { PaginationFragmentContainer } from "Styleguide/Components/Pagination"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Separator } from "Styleguide/Elements/Separator"
import { Subscribe } from "unstated"
import { AuctionDetailsModal } from "./AuctionDetailsModal"
import { AuctionResultItemFragmentContainer } from "./AuctionResultItem"
import { AuctionResultsStateContainer } from "./AuctionResultsState"
import { TableColumns } from "./TableColumns"
import { TableSidebar } from "./TableSidebar"

const PAGE_SIZE = 10

interface AuctionResultsProps {
  relay: RelayRefetchProp
  artist: AuctionResultsRefetchContainer_artist
  sort: string
}

class AuctionResultsContainer extends React.Component<AuctionResultsProps> {
  loadNext = () => {
    const { hasNextPage, endCursor } = this.props.artist.auctionResults.pageInfo

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
        artistID: this.props.artist.id,
        before: null,
        last: null,
        sort: this.props.sort,
      },
      null,
      error => {
        if (error) {
          console.error(error)
        }
      }
    )
  }

  loadAfter = cursor => {
    this.props.relay.refetch(
      {
        first: PAGE_SIZE,
        after: cursor,
        artistID: this.props.artist.id,
        before: null,
        last: null,
        sort: this.props.sort,
      },
      null,
      error => {
        if (error) {
          console.error(error)
        }
      }
    )
  }

  render() {
    return (
      <Subscribe to={[AuctionResultsStateContainer]}>
        {({ state }: AuctionResultsStateContainer) => {
          return (
            <React.Fragment>
              <Row>
                <TableSidebar />

                <Col sm={10}>
                  <Row>
                    <TableColumns />
                  </Row>

                  <Box pt={0.5}>
                    <Separator />
                  </Box>

                  <AuctionDetailsModal auctionResult={state.selectedAuction} />

                  {this.props.artist.auctionResults.edges.map(
                    ({ node }, index) => {
                      return (
                        <React.Fragment key={index}>
                          <AuctionResultItemFragmentContainer
                            auctionResult={node as any}
                          />
                        </React.Fragment>
                      )
                    }
                  )}
                </Col>
              </Row>

              <Row>
                <Col>
                  <Flex justifyContent="flex-end">
                    <PaginationFragmentContainer
                      pageCursors={
                        this.props.artist.auctionResults.pageCursors as any
                      }
                      onClick={this.loadAfter}
                      onNext={this.loadNext}
                      scrollTo="#jumpto-RouteTabs"
                    />
                  </Flex>
                </Col>
              </Row>
            </React.Fragment>
          )
        }}
      </Subscribe>
    )
  }
}

export const AuctionResultsRefetchContainer = createRefetchContainer(
  (props: AuctionResultsProps) => {
    return (
      <Subscribe to={[AuctionResultsStateContainer]}>
        {({ state }: AuctionResultsStateContainer) => {
          return <AuctionResultsContainer {...props} sort={state.sort} />
        }}
      </Subscribe>
    )
  },
  {
    artist: graphql`
      fragment AuctionResultsRefetchContainer_artist on Artist
        @argumentDefinitions(
          sort: {
            type: "AuctionResultSorts"
            defaultValue: "PRICE_AND_DATE_DESC"
          }
          first: { type: "Int", defaultValue: 10 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
        ) {
        id
        auctionResults(
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
          edges {
            node {
              ...AuctionResultItem_auctionResult
            }
          }
        }
      }
    `,
  },
  graphql`
    query AuctionResultsRefetchContainerQuery(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $sort: AuctionResultSorts
      $artistID: String!
    ) {
      artist(id: $artistID) {
        ...AuctionResultsRefetchContainer_artist
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
