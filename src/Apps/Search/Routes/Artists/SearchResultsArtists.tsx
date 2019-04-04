import { Box, Separator } from "@artsy/palette"
import { SearchResultsArtists_viewer } from "__generated__/SearchResultsArtists_viewer.graphql"
import { GenericSearchResultItem } from "Apps/Search/Components/GenericSearchResultItem"
import { ZeroState } from "Apps/Search/Components/ZeroState"
import { PaginationFragmentContainer as Pagination } from "Components/v2"
import { LoadingArea, LoadingAreaState } from "Components/v2/LoadingArea"
import { Location } from "found"
import qs from "qs"
import React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { get } from "Utils/get"

export interface Props {
  viewer: SearchResultsArtists_viewer
  relay: RelayRefetchProp
  location: Location
}

interface State extends LoadingAreaState {
  page: number
}

const PAGE_SIZE = 10

export class SearchResultsArtistsRoute extends React.Component<Props, State> {
  state = {
    isLoading: false,
    page: null,
  }

  constructor(props) {
    super(props)
    const { location } = this.props
    const { page } = get(location, l => l.query)

    this.state = { isLoading: false, page: (page && parseInt(page, 10)) || 1 }
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
      this.loadAfter(endCursor, this.state.page + 1)
    }
  }

  loadAfter = (cursor: string, page: number) => {
    this.toggleLoading(true)

    this.props.relay.refetch(
      {
        first: PAGE_SIZE,
        after: cursor,
        before: null,
        last: null,
        page: null,
      },
      null,
      error => {
        this.toggleLoading(false)
        this.setState({ page })
        if (error) {
          console.error(error)
        }

        const { location } = this.props
        const { term } = get(location, l => l.query)
        const urlParams = qs.stringify({
          term,
          page,
        })
        // TODO: Look into using router push w/ query params.
        // this.props.router.replace(`/search2?${filterQueryParams}`)
        window.history.pushState({}, null, `/search2/artists?${urlParams}`)
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
              {index < artists.length - 1 && <Separator />}
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
          <Box mt={3}>
            <ZeroState entity="artists" term={term} />
          </Box>
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
          page: { type: "Int" }
        ) {
        search(
          query: $term
          first: $first
          after: $after
          before: $before
          last: $last
          page: $page
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
      $page: Int
    ) {
      viewer {
        ...SearchResultsArtists_viewer
          @arguments(
            first: $first
            last: $last
            after: $after
            before: $before
            term: $term
            page: $page
          )
      }
    }
  `
)
