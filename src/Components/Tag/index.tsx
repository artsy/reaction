import React from "react"
import { graphql, QueryRenderer } from "react-relay"

import { TagContentsArtworksQuery } from "__generated__/TagContentsArtworksQuery.graphql"
import { ContextProps, withContext } from "Artsy"
import TagArtworks from "./TagArtworks"

export interface Filters {
  for_sale: boolean
  dimension_range: string
  price_range: string
  medium: string
}

export type Sort = "year" | "-year" | "-partner_updated_at"

export interface StateChangePayload {
  filters: Filters
  sort: Sort
}

export interface Props extends ContextProps {
  filters?: Partial<Filters>
  tagID: string
  sort?: Sort
  onStateChange: (payload: StateChangePayload) => void
}

export interface State extends Filters {
  sort?: Sort
}

class TagContents extends React.Component<Props, State> {
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
      sort: this.props.sort || "-partner_updated_at",
    }
  }

  handleStateChange = () => {
    const { for_sale, medium, price_range, dimension_range, sort } = this.state
    const filters = {
      for_sale,
      medium,
      price_range,
      dimension_range,
    }
    this.props.onStateChange({ filters, sort })
  }

  // Because `for_sale` is a proper filter of its own, but
  // we include its aggregation as part of `price_range`, we
  // have to handle it specially.
  onDropdownSelect(slice: string, value: string) {
    let filter = slice.toLowerCase()
    if (filter === "price_range" && value === "*-*") {
      filter = "for_sale"
      value = "true"
    }
    this.setState(
      ({
        [filter]: value,
      } as any) as Filters,
      this.handleStateChange
    )
  }

  onForSaleToggleSelect() {
    const forSale = this.state.for_sale ? null : true
    this.setState(
      {
        for_sale: forSale,
      },
      this.handleStateChange
    )
  }

  onSortSelect(sortEl) {
    this.setState(
      {
        sort: sortEl.val,
      },
      this.handleStateChange
    )
  }

  render() {
    const { tagID, relayEnvironment } = this.props
    const { for_sale, medium, price_range, dimension_range, sort } = this.state
    return (
      <QueryRenderer<TagContentsArtworksQuery>
        environment={relayEnvironment}
        query={graphql`
          query TagContentsArtworksQuery(
            $tagID: String!
            $medium: String
            $price_range: String
            $sort: String
            $for_sale: Boolean
            $dimension_range: String
          ) {
            tag(id: $tagID) {
              ...TagArtworks_tag
                @arguments(
                  for_sale: $for_sale
                  medium: $medium
                  price_range: $price_range
                  dimension_range: $dimension_range
                )
            }
          }
        `}
        variables={{ tagID, ...this.state }}
        render={({ props }) => {
          if (props) {
            return (
              <TagArtworks
                onForSaleToggleSelected={this.onForSaleToggleSelect.bind(this)}
                onSortSelected={this.onSortSelect.bind(this)}
                sort={sort}
                for_sale={for_sale}
                medium={medium}
                price_range={price_range}
                dimension_range={dimension_range}
                tag={props.tag}
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
}

export const Contents = withContext(TagContents)
