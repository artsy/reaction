import React from "react"
import { graphql, QueryRenderer } from "react-relay"

import { GeneContentsArtistsQuery } from "__generated__/GeneContentsArtistsQuery.graphql"
import { GeneContentsArtworksQuery } from "__generated__/GeneContentsArtworksQuery.graphql"
import { ContextProps, withContext } from "Artsy"
import Artists from "./Artists"
import GeneArtworks from "./GeneArtworks"

export interface Filters {
  for_sale: boolean
  dimension_range: string
  price_range: string
  medium?: string
}

export type Sort = "year" | "-year" | "-partner_updated_at"

export type Mode = "artists" | "artworks"

export interface StateChangePayload {
  filters: Filters
  sort: Sort
  mode: Mode
}

export interface Props extends ContextProps {
  mode: Mode
  filters?: Partial<Filters>
  geneID: string
  sort?: Sort
  onStateChange: (payload: StateChangePayload) => void
}

export interface State extends Filters {
  mode: Mode
  sort?: Sort
}

class GeneContents extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const {
      for_sale,
      price_range,
      dimension_range,
      medium,
    } = this.props.filters
    this.state = {
      for_sale: for_sale || null,
      medium: medium || "*",
      price_range: price_range || "*",
      dimension_range: dimension_range || "*",
      mode: props.mode,
      sort: props.sort || "-partner_updated_at",
    }
  }

  handleStateChange = () => {
    const {
      for_sale,
      medium,
      price_range,
      dimension_range,
      sort,
      mode,
    } = this.state
    const filters = {
      for_sale,
      medium,
      price_range,
      dimension_range,
    }
    this.props.onStateChange({ filters, sort, mode })
  }

  // Because `for_sale` is a proper filter of its own, but
  // we include its aggregation as part of `price_range`, we
  // have to handle it specially.
  onDropdownSelect(slice: string, value: string | boolean) {
    let filter = slice.toLowerCase() as string
    if (filter === "price_range" && value === "*-*") {
      filter = "for_sale"
      value = true
    }
    this.setState(
      ({
        [filter]: value,
        mode: "artworks",
      } as any) as Filters,
      this.handleStateChange
    )
  }

  onForSaleToggleSelect() {
    const forSale = this.state.for_sale ? null : true
    this.setState(
      {
        for_sale: forSale,
        mode: "artworks",
      },
      this.handleStateChange
    )
  }

  onSortSelect(sortEl) {
    this.setState(
      {
        sort: sortEl.val,
        mode: "artworks",
      },
      this.handleStateChange
    )
  }

  onArtistModeSelect() {
    this.setState(
      {
        mode: "artists",
      },
      this.handleStateChange
    )
  }

  renderArtists() {
    const { geneID, relayEnvironment } = this.props
    return (
      <QueryRenderer<GeneContentsArtistsQuery>
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
            return (
              <Artists
                onForSaleToggleSelected={this.onForSaleToggleSelect.bind(this)}
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

  renderArtworks() {
    const { geneID, relayEnvironment } = this.props
    const { for_sale, medium, price_range, dimension_range, sort } = this.state
    return (
      <QueryRenderer<GeneContentsArtworksQuery>
        environment={relayEnvironment}
        query={graphql`
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
        variables={{
          geneID,
          medium,
          price_range,
          sort,
          for_sale,
          dimension_range,
        }}
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
    const { mode } = this.state
    if (mode === "artists") {
      return this.renderArtists()
    }
    return this.renderArtworks()
  }
}

export const Contents = withContext(GeneContents)
