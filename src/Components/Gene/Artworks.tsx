import * as React from "react"
import { ConnectionData } from "react-relay"
import { createPaginationContainer, graphql, RelayPaginationProp } from "react-relay"
import styled from "styled-components"

import Spinner from "../Spinner"

import Dropdown from "../ArtworkFilter/Dropdown"
import ForSaleCheckbox from "../ArtworkFilter/ForSaleCheckbox"

import Headline from "../ArtworkFilter/Headline"
import TotalCount from "../ArtworkFilter/TotalCount"

import BorderedPulldown from "../BorderedPulldown"

import ArtworkGrid from "../ArtworkGrid"

const PageSize = 10

interface Filters {
  for_sale?: boolean
  dimension_range?: string
  price_range?: string
  medium?: string
}

interface Props extends RelayProps, Filters {
  relay?: RelayPaginationProp
  onDropdownSelected: (slice: string, value: string) => void
}

interface State {
  loading: boolean
}

const FilterBar = styled.div`
  vertical-align: middle;
  text-align: center;

  > div {
    display: inline-block;
  }
`

const SubFilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px 0 20px;
  align-items: center;
`

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`

export class Artworks extends React.Component<Props, State> {
  state = {
    loading: false,
  }

  renderDropdown() {
    return this.props.gene.filtered_artworks.aggregations.map(aggregation => {
      return (
        <Dropdown
          aggregation={aggregation}
          key={aggregation.slice}
          selected={aggregation.slice && this.state[aggregation.slice.toLowerCase()]}
          onSelected={this.props.onDropdownSelected}
        />
      )
    })
  }

  renderForSaleToggle() {
    return <ForSaleCheckbox checked={this.props.for_sale} onClick={() => null} />
  }

  renderArtworks() {
    const pulldownOptions = [
      { val: "-partner_updated_at", name: "Recently Updated" },
      { val: "-year", name: "Artwork Year (desc.)" },
      { val: "year", name: "Artwork Year (asc.)" },
    ]
    return (
      <div>
        <SubFilterBar>
          <div>
            <Headline
              medium={this.props.medium}
              price_range={this.props.price_range}
              dimension_range={this.props.dimension_range}
              for_sale={this.props.for_sale}
              facet={this.props.gene}
              aggregations={this.props.gene.filtered_artworks.aggregations}
            />
            <TotalCount filter_artworks={this.props.gene.filtered_artworks} />
          </div>
          <BorderedPulldown defaultValue="Recently Updated" options={pulldownOptions} onChange={option => null} />
        </SubFilterBar>
        <ArtworkGrid
          artworks={this.props.gene.filtered_artworks.artworks as any}
          columnCount={4}
          itemMargin={40}
          onLoadMore={() => null}
        />
        <SpinnerContainer>{this.state.loading ? <Spinner /> : ""}</SpinnerContainer>
      </div>
    )
  }

  render() {
    return (
      <div>
        <FilterBar>
          {this.renderForSaleToggle()}
          {this.renderDropdown()}
        </FilterBar>
        {this.renderArtworks()}
      </div>
    )
  }
}

export default createPaginationContainer(
  Artworks,
  {
    gene: graphql.experimental`
      fragment Artworks_gene on Gene
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String", defaultValue: "" }
          sort: { type: "String", defaultValue: "-partner_updated_at" }
          for_sale: { type: "Boolean" }
          medium: { type: "String", defaultValue: "*" }
          aggregations: { type: "[ArtworkAggregation]", defaultValue: [MEDIUM, TOTAL, PRICE_RANGE, DIMENSION_RANGE] }
          price_range: { type: "String", defaultValue: "*" }
          dimension_range: { type: "String", defaultValue: "*" }
        ) {
        filtered_artworks(
          aggregations: $aggregations
          size: $count
          for_sale: $for_sale
          medium: $medium
          price_range: $price_range
          dimension_range: $dimension_range
          sort: $sort
        ) {
          ...TotalCount_filter_artworks
          aggregations {
            slice
            ...Dropdown_aggregation
          }
          artworks: artworks_connection(first: $count, after: $cursor) @connection(key: "Artworks_artworks") {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                __id
              }
            }
            ...ArtworkGrid_artworks
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.gene.filtered_artworks.artworks as ConnectionData
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        // in most cases, for variables other than connection filters like
        // `first`, `after`, etc. you may want to use the previous values.
        ...fragmentVariables,
        count,
        cursor,
        geneNodeID: props.gene.__id,
      }
    },
    query: graphql.experimental`
      query ArtworksQuery(
        $geneNodeID: ID!
        $count: Int!
        $cursor: String
        $showArtists: Boolean
        $sort: String
        $for_sale: Boolean
        $medium: String
        $aggregations: [ArtworkAggregation]
        $price_range: String
        $dimension_range: String
      ) {
        node(__id: $geneNodeID) {
          ...Artworks_gene
            @arguments(
              count: $count
              cursor: $cursor
              showArtists: $showArtists
              sort: $sort
              for_sale: $for_sale
              medium: $medium
              aggregations: $aggregations
              price_range: $price_range
              dimension_range: $dimension_range
            )
        }
      }
    `,
  }
)

interface RelayProps {
  gene: {
    __id: string
    filtered_artworks: {
      aggregations: Array<{
        slice: string
      }>
      artworks: {
        edges: Array<{}>
      }
    }
  }
}
