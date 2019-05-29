import { Box, color, Flex, FlexProps, Sans } from "@artsy/palette"
import { AdDimension, AdUnit } from "Components/Publishing/Typings"
import React, { SFC } from "react"
import { Bling as GPT } from "react-gpt"
import styled from "styled-components"

export interface DisplayAdProps extends FlexProps {
  adUnit?: AdUnit
  adDimension?: AdDimension
  displayNewAds?: boolean
  targetingData?: {
    is_testing: boolean
    page_type: string
    post_id: string
  }
  isSeries?: boolean
  isStandard?: boolean
}

export const DisplayAd: SFC<DisplayAdProps> = props => {
  const {
    adDimension,
    adUnit,
    displayNewAds,
    targetingData,
    ...otherProps
  } = props

  if (!displayNewAds) {
    return null
  }

  const [width, height] = adDimension.split("x").map(a => parseInt(a))

  return (
    <DisplayAdContainer flexDirection="column" pt={2} pb={1} {...otherProps}>
      <Box m="auto">
        <GPT
          adUnitPath={`/21805539690/${adUnit}`}
          targeting={targetingData}
          slotSize={[width, height]}
        />
        <Sans size="1" color="black30" m={1}>
          Advertisement
        </Sans>
      </Box>
    </DisplayAdContainer>
  )
}

const DisplayAdContainer = styled(Flex)<DisplayAdProps>`
  margin: ${props => (props.isStandard ? "0" : "0 auto")};
  border-top: ${props =>
    props.isSeries ? `1px solid ${color("black10")}` : "none"};
  background: ${props =>
    props.isSeries ? color("black100") : color("black5")};
  text-align: center;
  width: 100%;
`
