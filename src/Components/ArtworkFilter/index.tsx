import * as React from "react"
import { ConnectionData } from "react-relay"
import { createPaginationContainer, graphql, RelayPaginationProp } from "react-relay/compat"
import styled from "styled-components"

import ArtworkGrid from "../ArtworkGrid"
import BorderedPulldown from "../BorderedPulldown"
import Spinner from "../Spinner"

import Dropdown from "./Dropdown"
import ForSaleCheckbox from "./ForSaleCheckbox"
import Headline from "./Headline"
import TotalCount from "./TotalCount"

const PageSize = 10

interface Props extends RelayProps, React.HTMLProps<ArtworkFilter> {
  relay: RelayPaginationProp
  for_sale?: boolean
  dimension_range?: string
  price_range?: string
  medium?: string
}

interface State {
  for_sale: boolean
  dimension_range: string
  price_range: string
  medium: string
  loading: boolean
}

class ArtworkFilter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      for_sale: props.for_sale || false,
      dimension_range: props.dimension_range || "*",
      price_range: props.price_range || "*",
      medium: props.medium || "*",
      loading: false,
    }
  }

  handleLoadMore() {
    if (!this.state.loading && this.props.filter_artworks.filter_artworks.artworks.pageInfo.hasNextPage) {
      this.setState({ loading: true }, () => {
        this.props.relay.loadMore(PageSize, error => {
          console.log(error)
          this.setState({ loading: false })
        })
      })
    }
  }

  setForSale() {
    const isForSale = !this.state.for_sale
    const forSaleVar = isForSale ? true : null

    this.setState({
      for_sale: isForSale,
    })
    // TODO: Relay Modern
    // this.props.relay.setVariables({
    //   for_sale: forSaleVar,
    //   size: PageSize,
    // })
  }

  onSelect(count, slice) {
    this.setState({
      [slice.toLowerCase()]: count.id,
    })
    // TODO: Relay Modern
    // this.props.relay.setVariables({
    //   [slice.toLowerCase()]: count.id,
    //   size: PageSize,
    // })
  }

  onChangeSort(option) {
    // TODO: Relay Modern
    // this.props.relay.setVariables({
    //   sort: option.val,
    //   size: PageSize,
    // })
  }

  render() {
    const filterArtworks = this.props.filter_artworks.filter_artworks
    const dropdowns = filterArtworks.aggregations.map(aggregation => (
      <Dropdown
        aggregation={aggregation}
        key={aggregation.slice}
        onSelect={(count, slice) => this.onSelect(count, slice)}
      />
    ))
    const pulldownOptions = [
      { val: "-partner_updated_at", name: "Recently Updated" },
      { val: "-year", name: "Artwork Year (desc.)" },
      { val: "year", name: "Artwork Year (asc.)" },
    ]

    return (
      <div>
        <FilterBar>
          <ForSaleCheckbox checked={this.state.for_sale} onClick={() => this.setForSale()} />
          {dropdowns}
        </FilterBar>
        <SubFilterBar>
          <div>
            <Headline
              medium={this.state.medium}
              price_range={this.state.price_range}
              dimension_range={this.state.dimension_range}
              for_sale={this.state.for_sale}
              facet={filterArtworks.facet}
              aggregations={filterArtworks.aggregations}
            />
            <TotalCount filter_artworks={filterArtworks} />
          </div>
          <BorderedPulldown
            defaultValue="Recently Updated"
            options={pulldownOptions}
            onChange={option => this.onChangeSort(option)}
          />
        </SubFilterBar>
        <ArtworkGrid
          artworks={filterArtworks.artworks as any}
          onLoadMore={() => this.handleLoadMore()}
          columnCount={4}
        />
        <SpinnerContainer>{this.state.loading ? <Spinner /> : ""}</SpinnerContainer>
      </div>
    )
  }
}

const FilterBar = styled.div`
  text-align: center;
`

const SubFilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px 0 20px;
  align-items: center;
`

const SpinnerContainer = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
`

export default createPaginationContainer(
  ArtworkFilter,
  {
    filter_artworks: graphql.experimental`
      fragment ArtworkFilter_filter_artworks on Viewer
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String", defaultValue: "" }
          sort: { type: "String", defaultValue: "-partner_updated_at" }
          for_sale: { type: "Boolean", defaultValue: false }
          medium: { type: "String", defaultValue: "*" }
          aggregations: { type: "[ArtworkAggregation]", defaultValue: [MEDIUM, TOTAL, PRICE_RANGE, DIMENSION_RANGE] }
          price_range: { type: "String", defaultValue: "*" }
          dimension_range: { type: "String", defaultValue: "*" }
        ) {
        filter_artworks(
          aggregations: $aggregations
          size: $count
          for_sale: $for_sale
          medium: $medium
          price_range: $price_range
          dimension_range: $dimension_range
          sort: $sort
        ) {
          aggregations {
            slice
            counts {
              id
              name
            }
            ...Dropdown_aggregation
          }
          ...TotalCount_filter_artworks
          artworks: artworks_connection(first: $count, after: $cursor)
            @connection(key: "ArtworkFilter_filter_artworks") {
            ...ArtworkGrid_artworks
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                __id
              }
            }
          }
          facet {
            ...Headline_facet
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.filter_artworks.filter_artworks.artworks as ConnectionData
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
      }
    },
    query: graphql.experimental`
      query ArtworkFilterQuery(
        $count: Int!
        $cursor: String
        $sort: String
        $for_sale: Boolean
        $medium: String
        $aggregations: [ArtworkAggregation]
        $price_range: String
        $dimension_range: String
      ) {
        viewer {
          ...ArtworkFilter_filter_artworks
            @arguments(
              count: $count
              cursor: $cursor
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
  filter_artworks: {
    filter_artworks: {
      artworks: {
        pageInfo: {
          hasNextPage: boolean
          endCursor: string
        }
      } | null
      counts: {
        total: number | null
      } | null
      aggregations: Array<any | null> | null
      facet: any
    } | null
  } | null
}
