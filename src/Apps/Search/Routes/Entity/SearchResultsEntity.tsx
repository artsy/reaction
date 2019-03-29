import { Box, Separator, Spacer } from "@artsy/palette"
import { SearchResultsEntity_viewer } from "__generated__/SearchResultsEntity_viewer.graphql"
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
  viewer: SearchResultsEntity_viewer
  relay: RelayRefetchProp
  location: Location
  entities: string[]
  tab: string
}

interface State extends LoadingAreaState {
  page: number
}

const PAGE_SIZE = 10

export class SearchResultsEntityRoute extends React.Component<Props, State> {
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

        const { location, tab } = this.props
        const { term } = get(location, l => l.query)
        const urlParams = qs.stringify({
          term,
          page,
        })
        // TODO: Look into using router push w/ query params.
        // this.props.router.replace(`/search2?${filterQueryParams}`)
        window.history.pushState({}, null, `/search2/${tab}?${urlParams}`)
      }
    )
  }

  renderItems() {
    const { viewer, location } = this.props
    const { term } = get(location, l => l.query)
    const { search: searchConnection } = viewer

    const items = get(viewer, v => v.search.edges, []).map(e => e.node)

    return (
      <>
        {items.map((searchableItem, index) => {
          return (
            <Box key={index}>
              <GenericSearchResultItem
                name={searchableItem.displayLabel}
                description={searchableItem.description}
                href={searchableItem.href}
                imageUrl={searchableItem.imageUrl}
                entityType={searchableItem.searchableType}
                index={index}
                term={term}
                id={searchableItem._id}
              />
              {index < items.length - 1 ? (
                <Box my={3}>
                  <Separator />
                </Box>
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
    const { viewer, location, entities, tab } = this.props

    const { term } = get(location, l => l.query)

    const items = get(viewer, v => v.search.edges, []).map(e => e.node)
    const zeroStateText = entities.length === 1 ? tab : "results"
    return (
      <LoadingArea isLoading={this.state.isLoading}>
        {items.length === 0 ? (
          <ZeroState entity={zeroStateText} term={term} />
        ) : (
          this.renderItems()
        )}
      </LoadingArea>
    )
  }
}

export const SearchResultsEntityRouteFragmentContainer = createRefetchContainer(
  SearchResultsEntityRoute,
  {
    viewer: graphql`
      fragment SearchResultsEntity_viewer on Viewer
        @argumentDefinitions(
          term: { type: "String!", defaultValue: "" }
          first: { type: "Int", defaultValue: 10 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
          page: { type: "Int" }
          entities: { type: "[SearchEntity]" }
        ) {
        search(
          query: $term
          first: $first
          after: $after
          before: $before
          last: $last
          page: $page
          entities: $entities
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
              ... on SearchableItem {
                description
                displayLabel
                href
                _id
                imageUrl
                searchableType
              }
            }
          }
        }
      }
    `,
  },
  graphql`
    query SearchResultsEntityQuery(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $term: String!
      $page: Int
      $entities: [SearchEntity]
    ) {
      viewer {
        ...SearchResultsEntity_viewer
          @arguments(
            first: $first
            last: $last
            after: $after
            before: $before
            term: $term
            page: $page
            entities: $entities
          )
      }
    }
  `
)
