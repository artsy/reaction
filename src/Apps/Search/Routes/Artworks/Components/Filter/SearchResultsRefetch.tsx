import { SearchResultsRefetch_viewer } from "__generated__/SearchResultsRefetch_viewer.graphql"
import { FilterState, urlFragmentFromState } from "Apps/Search/FilterState"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { isEqual } from "lodash"
import React, { Component } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { SearchResultsArtworkGridRefreshContainer as SearchArtworkGrid } from "./SearchResultsArtworkGrid"
interface SearchRefetchProps {
  filtersState: FilterState["state"]
  viewer: SearchResultsRefetch_viewer
  relay: RelayRefetchProp
  term: string
}

@track()
export class SearchResultsRefetch extends Component<SearchRefetchProps> {
  // FIXME: Figure out a pattern so that setState can replace this completely
  // Used to prevent multiple in-flight requests
  private isLoading = false

  componentDidUpdate(prevProps: SearchRefetchProps) {
    Object.keys(this.props.filtersState).forEach(key => {
      if (
        key !== "page" &&
        !isEqual(this.props.filtersState[key], prevProps.filtersState[key])
      ) {
        this.loadFilter(key)
      }
    })
  }

  @track((props: SearchRefetchProps, _state, [key]) => {
    return {
      action_type: Schema.ActionType.ClickedCommercialFilter,
      changed: { [key]: props.filtersState[key] },
      current: { ...props.filtersState },
    }
  })
  loadFilter(_key: string) {
    if (!this.isLoading) {
      this.setState({
        isLoading: true,
      })

      this.isLoading = true
      this.props.relay.refetch(
        {
          ...this.props.filtersState,
        },
        null,
        error => {
          if (error) {
            console.error(error)
          }

          // TODO: Look into using router push w/ query params.
          window.history.pushState(
            {},
            null,
            `/search?${urlFragmentFromState(this.props.filtersState)}`
          )

          this.setState({
            isLoading: false,
          })

          this.isLoading = false
        }
      )
    }
  }

  render() {
    const { filtersState, term } = this.props
    const { filtered_artworks } = this.props.viewer
    return (
      <SearchArtworkGrid
        filtered_artworks={filtered_artworks as any}
        isLoading={this.isLoading}
        columnCount={[2, 2, 2, 3]}
        filters={filtersState}
        term={term}
      />
    )
  }
}

export const SearchResultsRefetchContainer = createRefetchContainer(
  SearchResultsRefetch,
  {
    viewer: {
      viewer: graphql`
        fragment SearchResultsRefetch_viewer on Viewer
          @argumentDefinitions(
            medium: { type: "String" }
            major_periods: { type: "[String]" }
            partner_id: { type: "ID" }
            for_sale: { type: "Boolean" }
            at_auction: { type: "Boolean" }
            acquireable: { type: "Boolean" }
            offerable: { type: "Boolean" }
            inquireable_only: { type: "Boolean" }
            sort: { type: "String", defaultValue: "-partner_updated_at" }
            price_range: { type: "String" }
            height: { type: "String" }
            width: { type: "String" }
            artist_id: { type: "String" }
            attribution_class: { type: "[String]" }
            color: { type: "String" }
            keyword: { type: "String!", defaultValue: "" }
            page: { type: "Int" }
          ) {
          filtered_artworks: filter_artworks(
            aggregations: [TOTAL]
            medium: $medium
            major_periods: $major_periods
            partner_id: $partner_id
            for_sale: $for_sale
            at_auction: $at_auction
            acquireable: $acquireable
            offerable: $offerable
            inquireable_only: $inquireable_only
            size: 0
            sort: $sort
            price_range: $price_range
            height: $height
            width: $width
            artist_id: $artist_id
            attribution_class: $attribution_class
            color: $color
            keyword: $keyword
            page: $page
          ) {
            ...SearchResultsArtworkGrid_filtered_artworks
          }
        }
      `,
    },
  },
  graphql`
    query SearchResultsRefetchQuery(
      $medium: String
      $major_periods: [String]
      $partner_id: ID
      $acquireable: Boolean
      $offerable: Boolean
      $at_auction: Boolean
      $inquireable_only: Boolean
      $for_sale: Boolean
      $sort: String
      $price_range: String
      $height: String
      $width: String
      $artist_id: String
      $attribution_class: [String]
      $color: String
      $keyword: String
      $page: Int
    ) {
      viewer {
        ...SearchResultsRefetch_viewer
          @arguments(
            medium: $medium
            major_periods: $major_periods
            partner_id: $partner_id
            for_sale: $for_sale
            sort: $sort
            at_auction: $at_auction
            acquireable: $acquireable
            offerable: $offerable
            inquireable_only: $inquireable_only
            price_range: $price_range
            height: $height
            width: $width
            artist_id: $artist_id
            attribution_class: $attribution_class
            color: $color
            keyword: $keyword
            page: $page
          )
      }
    }
  `
)
