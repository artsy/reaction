import * as React from "react"

import { secondary } from "../../assets/fonts"

import { compact } from "lodash"
import styled from "styled-components"

interface Props extends React.HTMLProps<Headline> {
  medium: string,
  price_range: string,
  dimension_range: string,
  for_sale: boolean,
}

export class Headline extends React.Component<Props, null> {
  size() {
    const { dimension_range } = this.props

    if (dimension_range && dimension_range !== "*") {
      return dimension_range
    }
    return false
  }

  medium() {
    const { medium } = this.props

    if (medium && medium !== "*") {
      return medium
    }
    return "Works"
  }

  priceRange() {
    const { price_range } = this.props

    if (price_range && price_range !== "*") {
      return price_range
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
  font-size: 2em;
`

export default StyledHeadline
