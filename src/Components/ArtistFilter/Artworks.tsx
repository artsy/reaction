import * as React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { Subscribe } from "unstated"

import ArtworkGrid from "../ArtworkGrid"
import { FilterState } from "./state"

import { Artworks_filtered_artworks } from "../../__generated__/Artworks_filtered_artworks.graphql"

interface Props {
  filtered_artworks: Artworks_filtered_artworks
  relay: RelayRefetchProp
  artistID: string
}

const PAGE_SIZE = 10

class Artworks extends React.Component<Props> {
  loadArtworks(filters, cursor, page) {
    this.props.relay.refetch(
      {
        first: PAGE_SIZE,
        after: cursor,
        filteredArtworksNodeID: this.props.filtered_artworks.__id,
      },
      null,
      error => {
        if (error) {
          console.error(error)
        }
        filters.setPage(page)
      }
    )
  }
  renderPages(filters, pageCursors, options = { prefix: "", suffix: null }) {
    return pageCursors.map(pageCursor => {
      const { cursor, isCurrent, page } = pageCursor
      const { prefix, suffix } = options
      return (
        <span
          onClick={() => {
            this.loadArtworks(filters, cursor, page)
          }}
          style={{
            padding: `${isCurrent ? "0 10px 0 10px" : "0 3px 0 0"}`,
          }}
        >
          {prefix ? prefix + page : page}
          {suffix}
        </span>
      )
    })
  }
  renderPagination(filters) {
    const {
      first,
      last,
      around,
    } = this.props.filtered_artworks.artworks.pageCursors
    return (
      <div>
        <div>
          {first
            ? this.renderPages(filters, [first], {
                prefix: "",
                suffix: "...",
              })
            : null}
          {this.renderPages(filters, around)}
          {last
            ? this.renderPages(filters, [last], {
                prefix: "...",
                suffix: "",
              })
            : null}
        </div>
      </div>
    )
  }

  render() {
    return (
      <Subscribe to={[FilterState]}>
        {filters => {
          return (
            <div>
              {this.renderPagination(filters)}
              <ArtworkGrid
                artworks={this.props.filtered_artworks.artworks as any}
                columnCount={4}
                itemMargin={40}
              />
            </div>
          )
        }}
      </Subscribe>
    )
  }
}

export default createRefetchContainer(
  Artworks,
  {
    filtered_artworks: graphql`
      fragment Artworks_filtered_artworks on FilterArtworks
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
          after: { type: "String", defaultValue: "" }
        ) {
        __id
        artworks: artworks_connection(first: $first, after: $after) {
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
          ...ArtworkGrid_artworks
          edges {
            node {
              __id
            }
          }
        }
      }
    `,
  },
  graphql`
    query ArtworksQuery(
      $filteredArtworksNodeID: ID!
      $first: Int!
      $after: String
    ) {
      node(__id: $filteredArtworksNodeID) {
        ...Artworks_filtered_artworks @arguments(first: $first, after: $after)
      }
    }
  `
)
