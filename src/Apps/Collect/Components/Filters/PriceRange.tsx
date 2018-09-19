import {
  Flex,
  Sans,
  Separator,
  Serif,
  Slider,
  SliderProps,
} from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { space, SpaceProps } from "styled-system"

interface PriceRangeProps extends SliderProps {
  currency?: string
}

interface PriceRangeState {
  min: number
  max: number
}

export class PriceRange extends React.Component<
  PriceRangeProps,
  PriceRangeState
> {
  static defaultProps = {
    currency: "USD",
  }

  state = {
    min: this.props.min,
    max: this.props.max,
  }

  updateMinMax = ([min, max]) => {
    this.setState({ min, max })
  }

  toString() {
    const formatOptions = {
      style: "currency",
      currency: this.props.currency,
      minimumFractionDigits: 0,
    }

    const minPrice = this.state.min.toLocaleString("en-US", formatOptions)
    const maxPrice = this.state.max.toLocaleString("en-US", formatOptions)
    const isMaxIndicator = this.props.max === this.state.max ? "+" : ""

    return `${minPrice} - ${maxPrice}${isMaxIndicator}`
  }

  render() {
    return (
      <Flex width="100%" flexDirection="column">
        <Separator mb={2} />
        <Header mt="-6px">
          <Flex justifyContent="space-between">
            <Sans size="2" weight="medium" color="black100" mt={0.3}>
              Price
            </Sans>
            <Serif size="2" color="black60" mt={0.3}>
              {this.toString()}
            </Serif>
          </Flex>
        </Header>

        <Flex flexDirection="column" alignItems="left" mt={-1} mb={1}>
          <Slider my={1} mx={1} {...this.props} onChange={this.updateMinMax} />
        </Flex>
      </Flex>
    )
  }
}

const Header = styled.div.attrs<SpaceProps>({})`
  cursor: pointer;
  padding-bottom: 16px;
  user-select: none;
  ${space};
`

Header.displayName = "Header"
