import React from "react"
import { graphql, QueryRenderer } from "react-relay"

import { ContextConsumer, ContextProps } from "../Artsy"
import TagArtworks from "./TagArtworks"

interface Filters {
  for_sale: boolean
  dimension_range: string
  price_range: string
  medium: string
}

interface Props extends ContextProps {
  filters?: Filters
  tagID: string
  sort?: string
}

interface State extends Filters {
  sort?: string
}

class TagContents extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      for_sale: null,
      medium: "*",
      price_range: "*",
      dimension_range: "*",
      sort: "-partner_updated_at",
    }
  }

  onDropdownSelect(slice: string, value: string) {
    this.setState({
      [slice.toLowerCase() as any]: value,
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
    })
  }

  render() {
    const { tagID, relayEnvironment } = this.props
    const { for_sale, medium, price_range, dimension_range, sort } = this.state
    return (
      <QueryRenderer
        environment={relayEnvironment}
        query={graphql.experimental`
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

export const Contents = ContextConsumer(TagContents)
