import * as React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"

// import { Subscribe } from "unstated"
// import { FilterState } from "./state"

import { AuctionResults_artist } from "../../../../../__generated__/AuctionResults_artist.graphql"

import { AuctionResultItem } from "../../../AuctionResultItem"
import { Pagination } from "../../../Pagination"

interface Props {
  relay: RelayRefetchProp
  artist: AuctionResults_artist
}

const PAGE_SIZE = 20

class AuctionResults extends React.Component<Props> {
  loadAfter(cursor) {
    this.props.relay.refetch(
      {
        first: PAGE_SIZE,
        after: cursor,
        artistID: this.props.artist.id,
      },
      null,
      error => {
        if (error) {
          console.error(error)
        }
      }
    )
  }
  renderPagination() {
    return (
      <div>
        <Pagination
          first={this.props.artist.auctionResults.pageCursors.first}
          last={this.props.artist.auctionResults.pageCursors.last}
          around={this.props.artist.auctionResults.pageCursors.around}
          onClick={this.loadAfter.bind(this)}
        />
      </div>
    )
  }
  renderResults() {
    return (
      <div>
        {this.props.artist.auctionResults.edges.map(({ node }) => {
          const inches = `${node.dimension_text}`
          return (
            <AuctionResultItem
              title={node.title}
              imageUrl={node.images.thumbnail.url}
              organization={node.organization}
              description={node.description}
              date={node.date_text}
              auctionDate={node.sale_date_text}
              dimensions={{ in: inches }}
              salePrice={
                node.price_realized.cents_usd === 0
                  ? ""
                  : node.price_realized.display
              }
            />
          )
        })}
      </div>
    )
  }
  render() {
    return (
      <div>
        {this.renderResults()}
        {this.renderPagination()}
      </div>
    )
  }
}

export default createRefetchContainer(
  AuctionResults,
  {
    artist: graphql`
      fragment AuctionResults_artist on Artist
        @argumentDefinitions(
          sort: { type: "String" }
          first: { type: "Int", defaultValue: 20 }
          after: { type: "String" }
        ) {
        id
        auctionResults(first: $first, after: $after) {
          pageInfo {
            hasNextPage
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
                display(format: "0a")
                cents_usd
              }
            }
          }
        }
      }
    `,
  },
  graphql`
    query AuctionResultsQuery(
      $first: Int!
      $after: String
      $sort: String
      $artistID: String!
    ) {
      artist(id: $artistID) {
        ...AuctionResults_artist
          @arguments(first: $first, after: $after, sort: $sort)
      }
    }
  `
)
