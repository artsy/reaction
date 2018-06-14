import React from "react"
import { Responsive } from "../Utils/Responsive"
import { BorderBox } from "../Elements/Box"
import { Sans } from "@artsy/palette"
import { themeGet } from "styled-system"
import styled from "styled-components"

const TextWrap = styled.div`
  display: block;

  @media ${themeGet("mediaQueries.xs")} {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
`

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
      <Responsive>
        {({ xs }) => {
          return (
            <BorderBox flexDirection="column">
              {this.props.insights.map(insight => {
                return (
                  <TextWrap>
                    <Sans size="2" weight="medium" display="inline" mr={3}>
                      {insight.primaryLabel}
                    </Sans>
                    <Sans size="2" display="inline" color="black60">
                      {insight.secondaryLabel}
                    </Sans>
                  </TextWrap>
                )
              })}
            </BorderBox>
          )
        }}
      </Responsive>
    )
  }
}
