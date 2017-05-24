import * as React from "react"
import * as Relay from "react-relay"
import styled from "styled-components"

import Dropdown from "../artwork_filter/dropdown"
import ForSaleCheckbox from "../artwork_filter/for_sale_checkbox"
import Headline from "../artwork_filter/headline"
import TotalCount from "../artwork_filter/total_count"

import BorderedPulldown from "../bordered_pulldown"
import Button from "../buttons/ghost"
import Spinner from "../spinner"

import Artworks from "../artwork_grid"
import ArtistRow from "./artist_row"

const PageSize = 10

interface Props extends RelayProps, React.HTMLProps<GeneContents> {
  gene: any
  relay?: any,
  filtered_artworks?: any,
}

interface State {
  for_sale: boolean,
  dimension_range: string,
  price_range: string,
  medium: string,
  loading: boolean,
}

export class GeneContents extends React.Component<Props, State> {

  constructor(props) {
    super(props)
    this.state = {
      for_sale: false,
      dimension_range: "*",
      price_range: "*",
      medium: "*",
      loading: false,
    }
  }

  onSelect(count, slice) {
    this.setState({
      [slice.toLowerCase()]: count.name,
    })
    this.props.relay.setVariables({
      [slice.toLowerCase()]: count.id,
      size: PageSize,
    })
  }

  onChangeSort(option) {
    this.props.relay.setVariables({
      sort: option.val,
      size: PageSize,
    })
  }

  setForSale() {
    const isForSale = !this.state.for_sale
    const forSaleVar = isForSale ? true : null

    this.setState({
      for_sale: isForSale,
    })
    this.props.relay.setVariables({
      for_sale: forSaleVar,
      size: PageSize,
    })
  }

  render() {
    const {
      artists,
      filtered_artworks,
      mode,
      artworks,
    } = this.props.gene

    let artistRows = artists && artists.edges.map(edge => {
      return (
        <ArtistRow artist={edge.node as any} key={edge.__dataID__} />
      )
    })

    const dropdowns = filtered_artworks.aggregations.map(aggregation =>
      (
        <Dropdown
          aggregation={aggregation}
          key={aggregation.slice}
          onSelect={(count, slice) => this.onSelect(count, slice)}
        />
      ),
    )

    const pulldownOptions = [
      { val: "-partner_updated_at", name: "Recently Updated" },
      { val: "-year", name: "Artwork Year (desc.)" },
      { val: "year", name: "Artwork Year (asc.)" },
    ]

    const artistFilter = mode === "artist" ? (
      <div>
        <span>By Artists:</span>
        <Button>All Artists</Button>
        <span>By Work:</span>
      </div>
    ) : ""

    const content = mode === "artist" ? artistRows : (
      <div>
        <SubFilterBar>
          <div>
            <Headline
              medium={this.state.medium}
              price_range={this.state.price_range}
              dimension_range={this.state.dimension_range}
              for_sale={this.state.for_sale}
              facet={this.props.gene}
            />
            <TotalCount filter_artworks={filtered_artworks} />
          </div>
          <BorderedPulldown
            defaultValue="Recently Updated"
            options={pulldownOptions}
            onChange={option => this.onChangeSort(option)}
          />
        </SubFilterBar>
        <Artworks
          artworks={artworks}
          columnCount={4}
        />
        <SpinnerContainer>
          {this.state.loading ? <Spinner /> : ""}
        </SpinnerContainer>
      </div>
    )

    return (
      <div>
        <FilterBar>
          {artistFilter}
          <ForSaleCheckbox checked={this.state.for_sale} onClick={() => this.setForSale()}/>
          {dropdowns}
        </FilterBar>
        {content}
      </div>
    )
  }
}

const FilterBar = styled.div`
  display: flex;
  justify-content: center;
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

export default Relay.createContainer(GeneContents, {
  initialVariables: {
    showArtists: true,
    artworksSize: PageSize,
    artistsSize: PageSize,
    medium: "*",
    aggregations: ["MEDIUM", "TOTAL", "PRICE_RANGE", "DIMENSION_RANGE"],
    price_range: "*",
    dimension_range: "*",
    sort: "-partner_updated_at",
    for_sale: null,
  },
  fragments: {
    gene: () => Relay.QL`
      fragment on Gene {
        mode
        name
        artists: artists_connection(first: $artistsSize) @include(if: $showArtists) {
          edges {
            node {
              ${ArtistRow.getFragment("artist")}
            }
          }
        }
        artworks: artworks_connection(
          first: $artworksSize,
          medium: $medium,
          price_range: $price_range,
          dimension_range: $dimension_range,
          sort: $sort,
        ) {
          ${Artworks.getFragment("artworks")}
        }
        filtered_artworks(
          aggregations: $aggregations, 
          size: $artworksSize,
          for_sale: $for_sale,
          medium: $medium,
          price_range: $price_range,
          dimension_range: $dimension_range,
          sort: $sort,
        ) {
          ${TotalCount.getFragment("filter_artworks")}
          aggregations {
            ${Dropdown.getFragment("aggregation")}
          }
        }
      }
    `,
  },
})

interface RelayProps {
  gene: {
    mode: string | null,
    name: string | null,
  } | any
}
