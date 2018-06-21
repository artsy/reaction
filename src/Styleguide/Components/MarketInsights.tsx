import { Sans } from "@artsy/palette"
import React from "react"
import { BorderBox, Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Responsive } from "Styleguide/Utils/Responsive"

const wrapper = xs => props =>
  xs ? <Flex flexDirection="column" mb={1} {...props} /> : <Box {...props} />

export interface MarketInsight {
  primaryLabel: string
  secondaryLabel: string
}

export interface MarketInsightsProps {
  insights: MarketInsight[]
}

export class MarketInsights extends React.Component<MarketInsightsProps> {
  render() {
    return (
      <BorderBox flexDirection="column">
        <Responsive>
          {({ xs }) => {
            const TextWrap = wrapper(xs)
            return (
              this.props.insights &&
              this.props.insights.map(insight => {
                return (
                  <TextWrap key={insight.primaryLabel}>
                    <Sans size="2" weight="medium" display="inline" mr={1}>
                      {insight.primaryLabel}
                    </Sans>
                    <Sans size="2" display="inline" color="black60">
                      {insight.secondaryLabel}
                    </Sans>
                  </TextWrap>
                )
              })
            )
          }}
        </Responsive>
      </BorderBox>
    )
  }
}
