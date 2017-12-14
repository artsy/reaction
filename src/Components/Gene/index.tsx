import React from "react"
import { graphql, QueryRenderer } from "react-relay"

import { ContextConsumer, ContextProps } from "../Artsy"
import Artists from "./Artists"
import GeneArtworks from "./GeneArtworks"

interface Filters {
  for_sale: boolean
  dimension_range: string
  price_range: string
  medium: string
}

type Sort = "year" | "-year" | "-partner_updated_at"

type Mode = "artists" | "artworks"

interface StateChangePayload {
  filters: Filters
  sort: Sort
  mode: Mode
}

interface Props extends ContextProps {
  mode: Mode
  filters?: Filters
  geneID: string
  sort?: Sort
  onStateChange: (payload: StateChangePayload) => void
}

interface State extends Filters {
  mode: Mode
  sort?: Sort
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

  handleStateChange = () => {
    const { for_sale, medium, price_range, dimension_range, sort, mode } = this.state
    const filters = {
      for_sale,
      medium,
      price_range,
      dimension_range,
    }
    this.props.onStateChange({ filters, sort, mode })
  }

  onDropdownSelect(slice: string, value: string) {
    this.setState({
      [slice.toLowerCase() as any]: value,
      mode: "artworks",
    }, this.handleStateChange)
  }

  onForSaleToggleSelect() {
    const forSale = this.state.for_sale ? null : true
    this.setState({
      for_sale: forSale,
    }, this.handleStateChange)
  }

  onSortSelect(sortEl) {
    this.setState({
      sort: sortEl.val,
      mode: "artworks",
    }, this.handleStateChange)
  }

  onArtistModeSelect() {
    this.setState({
      mode: "artists",
    }, this.handleStateChange)
  }

  renderArtists() {
    const { geneID, relayEnvironment } = this.props
    return (
      <QueryRenderer
        environment={relayEnvironment}
        query={graphql`
          query GeneContentsArtistsQuery($geneID: String!) {
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
          query GeneContentsArtworksQuery(
            $geneID: String!
            $medium: String
            $price_range: String
            $sort: String
            $for_sale: Boolean
            $dimension_range: String
          ) {
            gene(id: $geneID) {
              ...GeneArtworks_gene
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
              <GeneArtworks
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
