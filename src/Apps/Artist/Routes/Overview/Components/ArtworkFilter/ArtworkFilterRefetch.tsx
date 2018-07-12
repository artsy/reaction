import { ArtworkFilterRefetch_artist } from "__generated__/ArtworkFilterRefetch_artist.graphql"
import React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { ArtworkGridRefetchContainer } from "./ArtworkFilterArtworkGrid"

interface Props {
  artist: ArtworkFilterRefetch_artist
  relay: RelayRefetchProp
  columnCount: number
  filters: any
  artistID: string
}

class ArtworkGridRefetchContainerWrapper extends React.Component<Props> {
  private isLoading = false // Used to prevent multiple in-flight requests

  componentDidUpdate(prevProps) {
    Object.keys(this.props.filters).forEach(key => {
      if (this.props.filters[key] !== prevProps.filters[key]) {
        this.loadFilter()
      }
    })
  }

  loadFilter = () => {
    if (!this.isLoading) {
      this.isLoading = true
      this.props.relay.refetch(
        {
          ...this.props.filters,
          artistNodeID: this.props.artist.__id,
        },
        null,
        error => {
          if (error) {
            console.error(error)
          }
          this.isLoading = false
        }
      )
    }
  }

  render() {
    return (
      <ArtworkGridRefetchContainer
        {...this.props}
        filtered_artworks={this.props.artist.grid as any}
      />
    )
  }
}

export const ArtworkFilterRefetchContainer = createRefetchContainer(
  ArtworkGridRefetchContainerWrapper,
  {
    artist: graphql`
      fragment ArtworkFilterRefetch_artist on Artist
        @argumentDefinitions(
          medium: { type: "String", defaultValue: "*" }
          major_periods: { type: "[String]" }
          partner_id: { type: "ID" }
          for_sale: { type: "Boolean" }
          sort: { type: "String", defaultValue: "-decayed_merch" }
        ) {
        __id
        grid: filtered_artworks(
          aggregations: [TOTAL]
          medium: $medium
          major_periods: $major_periods
          partner_id: $partner_id
          for_sale: $for_sale
          size: 0
          sort: $sort
        ) {
          ...ArtworkFilterArtworkGrid_filtered_artworks
        }
      }
    `,
  },
  graphql`
    query ArtworkFilterRefetchQuery(
      $artistNodeID: ID!
      $medium: String
      $major_periods: [String]
      $partner_id: ID
      $for_sale: Boolean
      $sort: String
    ) {
      node(__id: $artistNodeID) {
        ... on Artist {
          ...ArtworkFilterRefetch_artist
            @arguments(
              medium: $medium
              major_periods: $major_periods
              partner_id: $partner_id
              for_sale: $for_sale
              sort: $sort
            )
        }
      }
    }
  `
)
