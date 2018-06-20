import { garamond } from "Assets/Fonts"
import { compact, find } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

interface Props extends React.HTMLProps<Headline> {
  aggregations?: any
  medium: string
  price_range: string
  dimension_range: string
  for_sale: boolean
  facet?: any
}

export class Headline extends React.Component<Props, null> {
  getCountName(aggregation, id) {
    const selectedAggregation = find(
      this.props.aggregations,
      agg => agg.slice === aggregation.toUpperCase()
    )
    const selectedCount = find(
      selectedAggregation.counts,
      count => count.id === id
    )
    return selectedCount ? selectedCount.name : null
  }

  size() {
    const { dimension_range } = this.props

    if (dimension_range && dimension_range !== "*") {
      return this.getCountName("dimension_range", dimension_range)
    }
    return false
  }

  medium() {
    const { medium, facet } = this.props
    if (medium && medium !== "*") {
      return this.getCountName("medium", medium)
    }

    if (facet && facet.name) {
      return facet.name
    }

    return "Works"
  }

  priceRange() {
    const { price_range } = this.props

    if (price_range && price_range !== "*") {
      return this.getCountName("price_range", price_range)
    }
    return false
  }

  forSale() {
    if (this.props.for_sale) {
      return "For Sale"
    }
    return false
  }

  renderHeadline() {
    const headline = compact([
      this.size(),
      this.medium(),
      this.priceRange(),
      this.forSale(),
    ]).join(" ")
    if (headline === "works") {
      return "Artworks"
    }
    return headline.charAt(0).toUpperCase() + headline.substr(1)
  }

  render() {
    return <h1 className={this.props.className}>{this.renderHeadline()}</h1>
  }
}

const StyledHeadline = styled(Headline)`
  ${garamond("s11")};
  font-weight: normal;
  margin: 0;
  font-size: 2em;
`

export default createFragmentContainer(
  StyledHeadline,
  graphql`
    fragment Headline_facet on ArtworkFilterFacet {
      ... on ArtworkFilterTag {
        name
      }
      ... on ArtworkFilterGene {
        name
      }
    }
  `
)
