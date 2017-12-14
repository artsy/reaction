import React from "react"
import { graphql, QueryRenderer } from "react-relay"

import { ContextConsumer, ContextProps } from "../Artsy"
import Artists from "./Artists"
import Artworks from "./Artworks"

interface Filters {
  for_sale: boolean
  dimension_range: string
  price_range: string
  medium: string
}

interface Props extends ContextProps {
  mode: "artists" | "artworks"
  filters?: Filters
  geneID: string
  sort?: string
}

interface State extends Filters {
  mode: "artists" | "artworks"
  sort?: string
}

class GeneContents extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      for_sale: null,
      medium: "*",
      price_range: "*",
      dimension_range: "*",
      mode: props.mode,
      sort: "-partner_updated_at",
    }
  }

  onDropdownSelect(slice: string, value: string) {
    this.setState({
      [slice.toLowerCase() as any]: value,
      mode: "artworks",
    })
  }

  onForSaleToggleSelect() {
    if (this.state.for_sale) {
      this.setState({
        for_sale: null,
      })
    } else {
      this.setState({
        for_sale: true,
      })
    }
  }

  onSortSelect(sortEl) {
    this.setState({
      sort: sortEl.val,
      mode: "artworks",
    })
  }

  onArtistModeSelect() {
    this.setState({
      mode: "artists",
    })
  }

  renderArtists() {
    const { geneID, relayEnvironment } = this.props
    return (
      <QueryRenderer
        environment={relayEnvironment}
        query={graphql`
          query ContentsArtistsQuery($geneID: String!) {
            gene(id: $geneID) {
              ...Artists_gene
            }
          }
        `}
        variables={{ geneID }}
        render={({ props }) => {
          if (props) {
            return <Artists gene={props.gene} onDropdownSelected={this.onDropdownSelect.bind(this)} />
          } else {
            return null
          }
        }}
      />
    )
  }

  renderArtworks() {
    const { geneID, relayEnvironment } = this.props
    const { for_sale, medium, price_range, dimension_range, sort } = this.state
    return (
      <QueryRenderer
        environment={relayEnvironment}
        query={graphql.experimental`
          query ContentsArtworksQuery(
            $geneID: String!
            $medium: String
            $price_range: String
            $sort: String
            $for_sale: Boolean
            $dimension_range: String
          ) {
            gene(id: $geneID) {
              ...Artworks_gene
                @arguments(
                  for_sale: $for_sale
                  medium: $medium
                  price_range: $price_range
                  dimension_range: $dimension_range
                )
            }
          }
        `}
        variables={{ geneID, ...this.state }}
        render={({ props }) => {
          if (props) {
            return (
              <Artworks
                onArtistModeToggleSelected={this.onArtistModeSelect.bind(this)}
                onForSaleToggleSelected={this.onForSaleToggleSelect.bind(this)}
                onSortSelected={this.onSortSelect.bind(this)}
                sort={sort}
                for_sale={for_sale}
                medium={medium}
                price_range={price_range}
                dimension_range={dimension_range}
                gene={props.gene}
                onDropdownSelected={this.onDropdownSelect.bind(this)}
              />
            )
          } else {
            return null
          }
        }}
      />
    )
  }

  render() {
    const { filters } = this.props
    const { mode } = this.state
    if (mode === "artists" && !filters) {
      return this.renderArtists()
    }
    return this.renderArtworks()
  }
}

export const Contents = ContextConsumer(GeneContents)
