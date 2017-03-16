import * as React from "react"
import * as Relay from "react-relay"
import styled from "styled-components"

import Artworks from "../artwork_grid"
import Dropdown from "./dropdown"
import Headline from "./headline"
import TotalCount from "./total_count"

const PageSize = 10

interface ArtworkFilterProps extends RelayProps, React.HTMLProps<ArtworkFilter> {
  filter_artworks: any
  relay: any
}

interface FilterArtworksDropdownState {
  dimension_range: any,
  price_range: any,
  medium: any,
}

class ArtworkFilter extends React.Component<ArtworkFilterProps, FilterArtworksDropdownState> {
  constructor(props) {
    super(props)
    this.state = {
      dimension_range: "*",
      price_range: "*",
      medium: "*",
    }
  }
  onSelect(count, slice) {
    this.setState({
      [slice.toLowerCase()]: count.name,
    })
    this.props.relay.setVariables({
      [slice.toLowerCase()]: count.id,
    })
  }

  render() {
    const filterArtworks = this.props.filter_artworks.filter_artworks
    const dropdowns = filterArtworks.aggregations.map(aggregation =>
      (
        <Dropdown
          aggregation={aggregation}
          key={aggregation.slice}
          onSelect={(count, slice) => this.onSelect(count, slice)}
        />
      ),
    )
    return (
      <div>
        <FilterBar>
          {dropdowns}
        </FilterBar>
        <SubFilterBar>
          <div>
            <Headline
              medium={this.state.medium}
              price_range={this.state.price_range}
              dimension_range={this.state.dimension_range} 
            />
            <TotalCount filter_artworks={filterArtworks} />
          </div>
        </SubFilterBar>
        <Artworks artworks={filterArtworks.artworks} />
      </div>
    )
  }
}

const FilterBar = styled.div`
  text-align: center;
`

const SubFilterBar = styled.div`
  display: flex;
  align-items: space-between;
  padding: 20px 0;
`

export default Relay.createContainer(ArtworkFilter, {
  initialVariables: {
    size: PageSize,
    medium: "*",
    aggregations: ["MEDIUM", "TOTAL", "PRICE_RANGE", "DIMENSION_RANGE"],
    price_range: "*",
    dimension_range: "*",
  },
  fragments: {
    filter_artworks: () => Relay.QL`
      fragment on Viewer {
        filter_artworks(
          aggregations: $aggregations, 
          size: $size,
          medium: $medium,
          price_range: $price_range,
          dimension_range: $dimension_range
        ) {
          ${TotalCount.getFragment("filter_artworks")}
          aggregations {
            ${Dropdown.getFragment("aggregation")}
          }
          artworks: artworks_connection(first: $size) {
            ${Artworks.getFragment("artworks")}
          }
        }
      }
    `,
  },
})

interface RelayProps {
  filter_artworks: {
    filter_artworks: {
      artworks: Array<any | null> | null,
      counts: {
        total: number | null,
      } | null,
      aggregations: Array<any | null> | null,
    } | null,
  } | null,
}
