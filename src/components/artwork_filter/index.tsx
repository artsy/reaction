import * as React from "react"
import * as Relay from "react-relay"

import styled from "styled-components"
import Dropdown from "./dropdown"
import TotalCount from "./total_count"
import Artworks from "../artwork_grid"

const PageSize = 10

interface ArtworkFilterProps extends RelayProps, React.HTMLProps<ArtworkFilter> {
  filter_artworks: any
}

class ArtworkFilter extends React.Component<ArtworkFilterProps, null> {
  render() {
    const filterArtworks = this.props.filter_artworks.filter_artworks
    const dropdowns = filterArtworks.aggregations.map((aggregation) => 
        <Dropdown 
          aggregation={aggregation} 
          key={aggregation.slice}
        />
      )
    return (
      <div>
        <FilterBar>
          {dropdowns}
        </FilterBar>
        <SubFilterBar>
          <TotalCount filter_artworks={filterArtworks} />
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
    totalSize: PageSize,
    medium: "*",
    aggregations: ["MEDIUM", "TOTAL", "PRICE_RANGE", "DIMENSION_RANGE"],
    priceRange: "*",
    dimensionRange: "*"
  },
  fragments: {
    filter_artworks: () => Relay.QL`
      fragment on Viewer {
        filter_artworks(
          aggregations: $aggregations, 
          size: $totalSize,
          medium: $medium,
          price_range: $priceRange,
          dimension_range: $dimensionRange
        ) {
          ${TotalCount.getFragment('filter_artworks')}
          aggregations {
            ${Dropdown.getFragment('aggregation')}
          }
          artworks: artworks_connection(first: $totalSize) {
            ${Artworks.getFragment('artworks')}
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
