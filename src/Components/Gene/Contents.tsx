import * as React from "react"
import { ConnectionData } from "react-relay"
import { createPaginationContainer, graphql, RelayPaginationProp } from "react-relay/compat"
import styled from "styled-components"

import { addUrlProps, UrlQueryParamTypes } from "react-url-query"

import Dropdown from "../ArtworkFilter/Dropdown"
import ForSaleCheckbox from "../ArtworkFilter/ForSaleCheckbox"
import Headline from "../ArtworkFilter/Headline"
import TotalCount from "../ArtworkFilter/TotalCount"

import BorderedPulldown from "../BorderedPulldown"
import { ButtonState } from "../Buttons/Default"
import Button from "../Buttons/Ghost"
import Spinner from "../Spinner"

import ArtworkGrid from "../ArtworkGrid"
import Artists from "./Artists"

const PageSize = 10

interface Props extends RelayProps, React.HTMLProps<GeneContents> {
  relay?: RelayPaginationProp
  filtered_artworks?: any
  onChangeUrlQueryParams?: any
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

const urlPropsQueryConfig = {
  for_sale: { type: UrlQueryParamTypes.boolean },
  price_range: { type: UrlQueryParamTypes.string },
  medium: { type: UrlQueryParamTypes.string },
  dimension_range: { type: UrlQueryParamTypes.string },
}

export class GeneContents extends React.Component<Props, State> {
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

  anyArtworkFilters() {
    return (
      this.state.for_sale ||
      (this.state.dimension_range !== "*" && !!this.state.dimension_range) ||
      (this.state.price_range !== "*" && !!this.state.price_range) ||
      (this.state.medium !== "*" && !!this.state.medium)
    )
  }

  componentWillMount() {
    // const { relay, gene } = this.props
    // Allow us to set variables from URL params
    if (this.anyArtworkFilters()) {
      // TODO: Relay Modern
      // relay.setVariables({
      //   for_sale: this.props.for_sale,
      //   dimension_range: this.props.dimension_range,
      //   price_range: this.props.price_range,
      //   medium: this.props.medium,
      // })
    } else {
      // TODO: Relay Modern
      // relay.setVariables({
      //   showArtists: gene.mode === "artist",
      // })
    }
  }

  onSelect(count, slice) {
    this.setState({
      [slice.toLowerCase()]: count.id,
    })
    this.props.onChangeUrlQueryParams({
      [slice.toLowerCase()]: count.id,
    })
    // TODO: Relay Modern
    // this.props.relay.setVariables({
    //   [slice.toLowerCase()]: count.id,
    //   artworksSize: PageSize,
    //   showArtists: false,
    // })
  }

  onChangeSort(option) {
    this.props.onChangeUrlQueryParams({
      sort: option.val,
    })
    // TODO: Relay Modern
    // this.props.relay.setVariables({
    //   sort: option.val,
    //   artworksSize: PageSize,
    //   showArtists: false,
    // })
  }

  setForSale() {
    const isForSale = !this.state.for_sale
    const forSaleVar = isForSale ? true : null

    this.setState({
      for_sale: isForSale,
    })
    this.props.onChangeUrlQueryParams({
      for_sale: forSaleVar,
    })
    // TODO: Relay Modern
    // this.props.relay.setVariables({
    //   for_sale: forSaleVar,
    //   artworksSize: PageSize,
    //   showArtists: false,
    // })
  }

  loadMoreArtworks() {
    const hasMore = this.props.gene.filtered_artworks.artworks.pageInfo.hasNextPage
    if (!this.state.loading && hasMore) {
      this.setState({ loading: true }, () => {
        this.props.relay.loadMore(PageSize, error => {
          this.setState({ loading: false })
        })
      })
    }
  }

  setShowArtists() {
    this.setState({
      dimension_range: null,
      price_range: null,
      medium: null,
      for_sale: false,
    })
    this.props.onChangeUrlQueryParams({
      dimension_range: null,
      price_range: null,
      medium: null,
      for_sale: false,
    })
    // TODO: Relay Modern
    // this.props.relay.setVariables({
    //   showArtists: true,
    //   for_sale: false,
    //   dimension_range: "*",
    //   price_range: "*",
    //   medium: "*",
    // })
  }

  render() {
    const { filtered_artworks, mode } = this.props.gene

    const { showArtists } = this.context.relay.variables
    const shouldShowArtists = showArtists && !this.anyArtworkFilters()

    const dropdowns = filtered_artworks.aggregations.map(aggregation => {
      return (
        <Dropdown
          aggregation={aggregation}
          key={aggregation.slice}
          selected={aggregation.slice && this.state[aggregation.slice.toLowerCase()]}
          onSelect={(count, slice) => this.onSelect(count, slice)}
        />
      )
    })

    const pulldownOptions = [
      { val: "-partner_updated_at", name: "Recently Updated" },
      { val: "-year", name: "Artwork Year (desc.)" },
      { val: "year", name: "Artwork Year (asc.)" },
    ]

    const artistFilter =
      mode === "artist" ? (
        <ArtistFilterButtons>
          <span>By Artists:</span>
          <Button
            onClick={() => this.setShowArtists()}
            state={shouldShowArtists ? ButtonState.Success : ButtonState.Default}
          >
            All Artists
          </Button>
          <span>By Work:</span>
        </ArtistFilterButtons>
      ) : (
        ""
      )

    const content = shouldShowArtists ? (
      <Artists gene={this.props.gene as any} />
    ) : (
      <div>
        <SubFilterBar>
          <div>
            <Headline
              medium={this.state.medium}
              price_range={this.state.price_range}
              dimension_range={this.state.dimension_range}
              for_sale={this.state.for_sale}
              facet={this.props.gene}
              aggregations={filtered_artworks.aggregations}
            />
            <TotalCount filter_artworks={filtered_artworks} />
          </div>
          <BorderedPulldown
            defaultValue="Recently Updated"
            options={pulldownOptions}
            onChange={option => this.onChangeSort(option)}
          />
        </SubFilterBar>
        <ArtworkGrid
          artworks={filtered_artworks.artworks as any}
          columnCount={4}
          itemMargin={40}
          onLoadMore={() => this.loadMoreArtworks()}
        />
        <SpinnerContainer>{this.state.loading ? <Spinner /> : ""}</SpinnerContainer>
      </div>
    )

    return (
      <div>
        <FilterBar>
          {artistFilter}
          <ForSaleCheckbox checked={this.state.for_sale} onClick={() => this.setForSale()} />
          {dropdowns}
        </FilterBar>
        {content}
      </div>
    )
  }
}

const FilterBar = styled.div`
  vertical-align: middle;
  text-align: center;

  > div {
    display: inline-block;
  }
`

const ArtistFilterButtons = styled.div`
  margin-right: 10px;
  button {
    height: 52px;
    padding: 16px;
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

const GeneContentsUrl = addUrlProps({ urlPropsQueryConfig })(GeneContents) as React.StatelessComponent<Props>

interface RelayProps {
  gene: {
    mode: string | null
    name: string | null
    filtered_artworks: {
      aggregations: Array<{ slice: string }>
      artworks: {
        pageInfo: {
          hasNextPage: boolean
          endCursor: string
        }
      }
    }
  }
}

export default createPaginationContainer(
  GeneContentsUrl,
  {
    gene: graphql.experimental`
      fragment Contents_gene on Gene
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String", defaultValue: "" }
          showArtists: { type: "Boolean", defaultValue: true }
          sort: { type: "String", defaultValue: "-partner_updated_at" }
          for_sale: { type: "Boolean", defaultValue: false }
          medium: { type: "String", defaultValue: "*" }
          aggregations: { type: "[ArtworkAggregation]", defaultValue: [MEDIUM, TOTAL, PRICE_RANGE, DIMENSION_RANGE] }
          price_range: { type: "String", defaultValue: "*" }
          dimension_range: { type: "String", defaultValue: "*" }
        ) {
        mode
        name
        ... on Gene @include(if: $showArtists) {
          ...Artists_gene
        }
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
          artworks: artworks_connection(first: $count, after: $cursor) @connection(key: "Contents_artworks") {
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
      }
    },
    query: graphql.experimental`
      query ContentsQuery(
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
          ...Contents_gene
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
