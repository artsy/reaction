import * as React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { Subscribe } from "unstated"

import { FilterState } from "./state"
import ArtworkGrid from "../ArtworkGrid"

import { Artworks_filtered_artworks } from "../../__generated__/Artworks_filtered_artworks.graphql"

interface Props {
  filtered_artworks: Artworks_filtered_artworks
  relay: RelayRefetchProp
  artistID: string
}

const PAGE_SIZE = 10

class Artworks extends React.Component<Props> {
  loadPage(filters, page) {
    this.props.relay.refetch(
      {
        page,
        size: PAGE_SIZE,
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

  loadNextPage(filters) {
    const hasMore = this.props.filtered_artworks.artworks.pageInfo.hasNextPage

    if (hasMore) {
      return this.loadPage(filters, filters.state.page + 1)
    }
  }

  loadPrevPage(filters) {
    if (filters.state.page > 1) {
      return this.loadPage(filters, filters.state.page - 1)
    }
  }

  renderPaginationBar(filters) {
    let page
    const pages = []
    for (
      page = 1;
      page < this.props.filtered_artworks.artworks.totalPages + 1;
      page++
    ) {
      pages.push(
        <span
          data-page={page}
          onClick={e => {
            this.loadPage(
              filters,
              parseInt(e.currentTarget.getAttribute("data-page"), 10)
            )
          }}
        >
          {page}{" "}
        </span>
      )
    }
    return <div>{pages}</div>
  }

  renderPagination(filters) {
    return (
      <div>
        <div>
          Current Page: {filters.state.page} /{" "}
          {this.props.filtered_artworks.artworks.totalPages}
        </div>
        <div
          onClick={() => {
            this.loadPrevPage(filters)
          }}
        >
          Prev /
        </div>
        <div
          onClick={() => {
            this.loadNextPage(filters)
          }}
        >
          Next
        </div>
        {this.renderPaginationBar(filters)}
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
          page: { type: "Int", defaultValue: 1 }
          size: { type: "Int", defaultValue: 10 }
        ) {
        __id
        artworks: artworks_connection(page: $page, size: $size) {
          pageInfo {
            hasNextPage
            endCursor
          }
          totalPages
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
    query ArtworksQuery($filteredArtworksNodeID: ID!, $page: Int, $size: Int) {
      node(__id: $filteredArtworksNodeID) {
        ...Artworks_filtered_artworks @arguments(size: $size, page: $page)
      }
    }
  `
)
