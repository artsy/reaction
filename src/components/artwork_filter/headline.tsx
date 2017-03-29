import * as React from "react"

import { secondary } from "../../assets/fonts"
import labelMap from "./param_map"

import { compact } from "lodash"
import styled from "styled-components"

interface HeadlineProps extends React.HTMLProps<Headline> {
  medium: any,
  price_range: any,
  dimension_range: any,
  for_sale: boolean,
}

export class Headline extends React.Component<HeadlineProps, null> {
  size() {
    if (this.props.dimension_range && this.props.dimension_range !== "*") {
      return this.props.dimension_range
    }
    return false
  }

  medium() {
    if (this.props.medium && this.props.medium !== "*") {
      return this.props.medium
    }
    return "Works"
  }

  priceRange() {
    if (this.props.price_range && this.props.price_range !== "*") {
      return this.props.price_range
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
    return (
      <h1 className={this.props.className}>
        {this.renderHeadline()}
      </h1>
    )
  }
}

const StyledHeadline = styled(Headline)`
  ${secondary.style}
  font-weight: normal;
  margin: 0;
`

export default StyledHeadline
