import { Box, Separator, Spacer } from "@artsy/palette"
import { SearchResultsArtists_viewer } from "__generated__/SearchResultsArtists_viewer.graphql"
import { GenericSearchResultItem } from "Apps/Search/Components/GenericSearchResultItem"
import { ZeroState } from "Apps/Search/Components/ZeroState"
import { PaginationFragmentContainer as Pagination } from "Components/v2"
import { LoadingArea, LoadingAreaState } from "Components/v2/LoadingArea"
import { Location } from "found"
import React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { get } from "Utils/get"

export interface Props {
  viewer: SearchResultsArtists_viewer
  relay: RelayRefetchProp
  location: Location
}

const PAGE_SIZE = 10

export class SearchResultsArtistsRoute extends React.Component<
  Props,
  LoadingAreaState
> {
  state = {
    isLoading: false,
  }

  toggleLoading = isLoading => {
    this.setState({
      isLoading,
    })
  }

  loadNext = () => {
    const { viewer } = this.props
    const { search: searchConnection } = viewer

    const {
      pageInfo: { hasNextPage, endCursor },
    } = searchConnection

    if (hasNextPage) {
      this.loadAfter(endCursor)
    }
  }

  loadAfter = cursor => {
    this.toggleLoading(true)

    this.props.relay.refetch(
      {
        first: PAGE_SIZE,
        after: cursor,
        before: null,
        last: null,
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

  renderArtists() {
    const { viewer, location } = this.props
    const { term } = get(location, l => l.query)
    const { search: searchConnection } = viewer

    const artists = get(viewer, v => v.search.edges, []).map(e => e.node)

    return (
      <>
        {artists.map((artist, index) => {
          return (
            <Box key={index}>
              <GenericSearchResultItem
                name={artist.name}
                description={artist.bio}
                imageUrl={artist.imageUrl}
                entityType="Artist"
                href={artist.href}
                index={index}
                term={term}
                id={artist._id}
              />
              {index < artists.length - 1 ? (
                <>
                  <Spacer mb={3} />
                  <Separator />
                  <Spacer mb={3} />
                </>
              ) : (
                <Spacer mb={3} />
              )}
            </Box>
          )
        })}
        <Pagination
          pageCursors={searchConnection.pageCursors}
          onClick={this.loadAfter}
          onNext={this.loadNext}
          scrollTo="#jumpto--searchResultTabs"
          hasNextPage={searchConnection.pageInfo.hasNextPage}
        />
      </>
    )
  }

  render() {
    const { viewer, location } = this.props
    const { term } = get(location, l => l.query)

    const artists = get(viewer, v => v.search.edges, []).map(e => e.node)
    return (
      <LoadingArea isLoading={this.state.isLoading}>
        {artists.length === 0 ? (
          <ZeroState entity="artists" term={term} />
        ) : (
          this.renderArtists()
        )}
      </LoadingArea>
    )
  }
}

export const SearchResultsArtistsRouteFragmentContainer = createRefetchContainer(
  SearchResultsArtistsRoute,
  {
    viewer: graphql`
      fragment SearchResultsArtists_viewer on Viewer
        @argumentDefinitions(
          term: { type: "String!", defaultValue: "" }
          first: { type: "Int", defaultValue: 10 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
        ) {
        search(
          query: $term
          first: $first
          after: $after
          before: $before
          last: $last
          entities: [ARTIST]
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
              ... on Artist {
                name
                _id
                href
                imageUrl
                bio
              }
            }
          }
        }
      }
    `,
  },
  graphql`
    query SearchResultsArtistsQuery(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $term: String!
    ) {
      viewer {
        ...SearchResultsArtists_viewer
          @arguments(
            first: $first
            last: $last
            after: $after
            before: $before
            term: $term
          )
      }
    }
  `
)
