import { TagArtworks_tag } from "__generated__/TagArtworks_tag.graphql"
import * as React from "react"
import {
  createFragmentContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import styled from "styled-components"
import Dropdown from "../ArtworkFilter/Dropdown"
import ForSaleCheckbox from "../ArtworkFilter/ForSaleCheckbox"
import Headline from "../ArtworkFilter/Headline"
import TotalCount from "../ArtworkFilter/TotalCount"
import BorderedPulldown from "../BorderedPulldown"
import TagArtworksContent from "./TagArtworksContent"

interface Filters {
  for_sale?: boolean
  dimension_range?: string
  price_range?: string
  medium?: string
}

interface Props extends Filters {
  relay: RelayPaginationProp
  tag: TagArtworks_tag
  onDropdownSelected: (slice: string, value: string) => void
  onSortSelected: (sort: string) => void
  onForSaleToggleSelected: () => void
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

export class TagArtworks extends React.Component<Props, null> {
  renderDropdown() {
    return this.props.tag.filtered_artworks.aggregations.map(aggregation => {
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
          <div style={{ lineHeight: "1.8em" }}>
            <Headline
              medium={this.props.medium}
              price_range={this.props.price_range}
              dimension_range={this.props.dimension_range}
              for_sale={this.props.for_sale}
              facet={this.props.tag.filtered_artworks.facet}
              aggregations={this.props.tag.filtered_artworks.aggregations}
            />
            <TotalCount filter_artworks={this.props.tag.filtered_artworks} />
          </div>
          <BorderedPulldown
            defaultValue="Recently Updated"
            selectedName={selectedSort && selectedSort.name}
            options={pulldownOptions}
            onChange={this.props.onSortSelected}
          />
        </SubFilterBar>
        <TagArtworksContent
          tagID={this.props.tag.id}
          filtered_artworks={this.props.tag.filtered_artworks}
        />
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

export default createFragmentContainer(TagArtworks, {
  tag: {
    tag: graphql`
      fragment TagArtworks_tag on Tag
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
        ) {
          ...TotalCount_filter_artworks
          ...TagArtworksContent_filtered_artworks
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
