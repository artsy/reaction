import * as React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"

import { Subscribe } from "unstated"
import { FilterState } from "./state"

import { AuctionResults_artist } from "__generated__/AuctionResults_artist.graphql"

import { AuctionResultItem } from "Styleguide/Components/AuctionResultItem"
import { Pagination } from "Styleguide/Components/Pagination"
import { Select } from "Styleguide/Elements/Select"

interface Props {
  relay: RelayRefetchProp
  artist: AuctionResults_artist
}

const PAGE_SIZE = 20

const Sorts = [
  {
    value: "DATE_DESC",
    text: "Most Recent",
  },
  {
    value: "ESTIMATE_AND_DATE_DESC",
    text: "Estimate",
  },
  {
    value: "PRICE_AND_DATE_DESC",
    text: "Sale Price",
  },
]

class AuctionResults extends React.Component<Props> {
  // Used for pagination callbacks
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
    const { hasNextPage, endCursor } = this.props.artist.auctionResults.pageInfo
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

  renderPagination() {
    return (
      <div>
        <Pagination
          {...this.props.artist.auctionResults.pageCursors}
          onClick={this.loadAfter}
          onNext={this.loadNext}
          onPrev={this.loadPrev}
        />
      </div>
    )
  }

  renderResults() {
    return (
      <div>
        {this.props.artist.auctionResults.edges.map(({ node }) => {
          return (
            <AuctionResultItem
              title={node.title}
              imageUrl={node.images.thumbnail.url}
              organization={node.organization}
              description={node.description}
              date={node.date_text}
              auctionDate={node.sale_date_text}
              dimensions={node.dimension_text}
              salePrice={
                node.price_realized.cents_usd === 0
                  ? null
                  : node.price_realized.display
              }
              estimate={node.estimate.display}
            />
          )
        })}
      </div>
    )
  }

  render() {
    return (
      <Subscribe to={[FilterState]}>
        {filters => {
          return (
            <div>
              <Select
                options={Sorts}
                selected={filters.state.sort}
                onSelect={(filters as any).setSort}
              />
              {this.renderResults()}
              {this.renderPagination()}
            </div>
          )
        }}
      </Subscribe>
    )
  }
}

export default createRefetchContainer(
  AuctionResults,
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
