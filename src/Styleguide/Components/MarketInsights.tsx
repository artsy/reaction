import React from "react"
import { Responsive } from "../Utils/Responsive"
import { Box, BorderBox } from "../Elements/Box"
import { Flex } from "../Elements/Flex"
import { Sans } from "@artsy/palette"

const wrapper = xs => props =>
  xs ? <Flex flexDirection="column" mb={3} {...props} /> : <Box {...props} />

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
            return this.props.insights.map(insight => {
              return (
                <TextWrap>
                  <Sans size="2" weight="medium" display="inline" mr={3}>
                    {insight.primaryLabel}
                    k{" "}
                  </Sans>
                  <Sans size="2" display="inline" color="black60">
                    {insight.secondaryLabel}
                  </Sans>
                </TextWrap>
              )
            })
          }}
        </Responsive>
      </BorderBox>
    )
  }
}
