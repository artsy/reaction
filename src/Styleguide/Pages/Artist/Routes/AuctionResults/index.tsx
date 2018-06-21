import { AuctionResults_artist } from "__generated__/AuctionResults_artist.graphql"
import { ContextConsumer, ContextProps } from "Components/Artsy"
import React from "react"
import { Subscribe } from "unstated"
import { AuctionResults } from "./AuctionResults"
import { FilterState } from "./state"

import {
  createRefetchContainer,
  graphql,
  QueryRenderer,
  RelayRefetchProp,
} from "react-relay"

const PAGE_SIZE = 10

interface Props extends ContextProps {
  artistID: string
}

interface AuctionResultsProps {
  relay: RelayRefetchProp
  artist: AuctionResults_artist
}

export const RelayAuctionResults = ContextConsumer(
  class extends React.Component<Props> {
    render() {
      const { artistID, relayEnvironment } = this.props

      return (
        <Subscribe to={[FilterState]}>
          {filters => {
            const { sort } = filters.state

            return (
              <QueryRenderer
                environment={relayEnvironment}
                query={graphql`
                  query AuctionResultsIndexQuery(
                    $artistID: String!
                    $first: Int!
                    $sort: AuctionResultSorts
                  ) {
                    artist(id: $artistID) {
                      ...AuctionResults_artist
                        @arguments(first: $first, sort: $sort)
                    }
                  }
                `}
                variables={{
                  artistID,
                  first: PAGE_SIZE,
                  sort,
                }}
                render={({ props }) => {
                  if (props) {
                    return <Container artist={props.artist} />
                  } else {
                    return null
                  }
                }}
              />
            )
          }}
        </Subscribe>
      )
    }
  }
)

const Container = createRefetchContainer(
  class extends React.Component<AuctionResultsProps> {
    loadPrev = () => {
      const {
        startCursor,
        hasPreviousPage,
      } = this.props.artist.auctionResults.pageInfo

      if (hasPreviousPage) {
        this.loadBefore(startCursor)
      }
    }

    loadNext = () => {
      const {
        hasNextPage,
        endCursor,
      } = this.props.artist.auctionResults.pageInfo

      if (hasNextPage) {
        this.loadAfter(endCursor)
      }
    }

    loadBefore(cursor) {
      this.props.relay.refetch(
        {
          first: null,
          before: cursor,
          artistID: this.props.artist.id,
          after: null,
          last: PAGE_SIZE,
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
        <AuctionResults
          {...this.props}
          loadAfter={this.loadAfter}
          loadNext={this.loadNext}
          loadPrev={this.loadPrev}
        />
      )
    }
  },
  {
    artist: graphql`
      fragment AuctionResults_artist on Artist
        @argumentDefinitions(
          sort: { type: "AuctionResultSorts" }
          first: { type: "Int" }
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
            hasPreviousPage
            startCursor
            endCursor
          }
          pageCursors {
            around {
              cursor
              page
              isCurrent
            }
            first {
              cursor
              page
              isCurrent
            }
            last {
              cursor
              page
              isCurrent
            }
          }
          edges {
            node {
              title
              dimension_text
              organization
              images {
                thumbnail {
                  url
                }
              }
              description
              date_text
              sale_date_text
              price_realized {
                display
                cents_usd
              }
              estimate {
                display
              }
            }
          }
        }
      }
    `,
  },
  graphql`
    query AuctionResultsQuery(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $sort: AuctionResultSorts
      $artistID: String!
    ) {
      artist(id: $artistID) {
        ...AuctionResults_artist
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
