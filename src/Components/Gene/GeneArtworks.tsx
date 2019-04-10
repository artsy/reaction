import * as React from "react"
import {
  createFragmentContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import styled from "styled-components"

import { ButtonState } from "../Buttons/Default"
import Button from "../Buttons/Ghost"

import Dropdown from "../ArtworkFilter/Dropdown"
import ForSaleCheckbox from "../ArtworkFilter/ForSaleCheckbox"

import Headline from "../ArtworkFilter/Headline"
import TotalCount from "../ArtworkFilter/TotalCount"

import BorderedPulldown from "../BorderedPulldown"

import { GeneArtworks_gene } from "__generated__/GeneArtworks_gene.graphql"
import GeneArtworksContent from "./GeneArtworksContent"

interface Filters {
  for_sale?: boolean
  dimension_range?: string
  price_range?: string
  medium?: string
}

interface Props extends Filters {
  relay: RelayPaginationProp
  gene: GeneArtworks_gene
  onDropdownSelected: (slice: string, value: string) => void
  onSortSelected: (sort: string) => void
  onForSaleToggleSelected: () => void
  onArtistModeToggleSelected: () => void
  sort?: string
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

const ArtistFilterButtons = styled.div`
  margin-right: 10px;

  button {
    height: 52px;
    padding: 16px;
  }
`

export class GeneArtworks extends React.Component<Props, null> {
  renderDropdown() {
    return this.props.gene.filtered_artworks.aggregations.map(aggregation => {
      return (
        <Dropdown
          aggregation={aggregation}
          key={aggregation.slice}
          selected={
            aggregation.slice && this.props[aggregation.slice.toLowerCase()]
          }
          onSelected={this.props.onDropdownSelected}
        />
      )
    })
  }

  renderArtistsModeToggle() {
    return (
      <ArtistFilterButtons>
        <span>By Artists:</span>
        <Button
          onClick={this.props.onArtistModeToggleSelected}
          state={ButtonState.Default}
        >
          All Artists
        </Button>
        <span>By Work:</span>
      </ArtistFilterButtons>
    )
  }

  renderForSaleToggle() {
    return (
      <ForSaleCheckbox
        checked={this.props.for_sale}
        onChange={this.props.onForSaleToggleSelected}
      />
    )
  }

  renderArtworks() {
    const pulldownOptions = [
      { val: "-partner_updated_at", name: "Recently Updated" },
      { val: "-year", name: "Artwork Year (desc.)" },
      { val: "year", name: "Artwork Year (asc.)" },
    ]
    const selectedSort = pulldownOptions.find(
      sort => sort.val === this.props.sort
    )
    return (
      <div>
        <SubFilterBar>
          <div>
            <Headline
              medium={this.props.medium}
              price_range={this.props.price_range}
              dimension_range={this.props.dimension_range}
              for_sale={this.props.for_sale}
              facet={this.props.gene.filtered_artworks.facet}
              aggregations={this.props.gene.filtered_artworks.aggregations}
            />
            <TotalCount filter_artworks={this.props.gene.filtered_artworks} />
          </div>
          <BorderedPulldown
            defaultValue="Recently Updated"
            selectedName={selectedSort && selectedSort.name}
            options={pulldownOptions}
            onChange={this.props.onSortSelected}
          />
        </SubFilterBar>
        <GeneArtworksContent
          geneID={this.props.gene.id}
          filtered_artworks={this.props.gene.filtered_artworks}
        />
      </div>
    )
  }

  render() {
    return (
      <div>
        <FilterBar>
          {this.renderArtistsModeToggle()}
          {this.renderForSaleToggle()}
          {this.renderDropdown()}
        </FilterBar>
        {this.renderArtworks()}
      </div>
    )
  }
}

export default createFragmentContainer(GeneArtworks, {
  gene: {
    gene: graphql`
      fragment GeneArtworks_gene on Gene
        @argumentDefinitions(
          for_sale: { type: "Boolean" }
          medium: { type: "String", defaultValue: "*" }
          aggregations: {
            type: "[ArtworkAggregation]"
            defaultValue: [MEDIUM, TOTAL, PRICE_RANGE, DIMENSION_RANGE]
          }
          price_range: { type: "String", defaultValue: "*" }
          dimension_range: { type: "String", defaultValue: "*" }
        ) {
        id
        filtered_artworks(
          aggregations: $aggregations
          for_sale: $for_sale
          medium: $medium
          price_range: $price_range
          dimension_range: $dimension_range
          size: 0
          include_medium_filter_in_aggregation: true
        ) {
          ...TotalCount_filter_artworks
          ...GeneArtworksContent_filtered_artworks
          aggregations {
            slice
            counts {
              name
              id
            }
            ...Dropdown_aggregation
          }
          facet {
            ...Headline_facet
          }
        }
      }
    `,
  },
})
