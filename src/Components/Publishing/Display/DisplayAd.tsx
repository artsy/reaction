import { Box, color, Flex, FlexProps, Sans } from "@artsy/palette"
import { is300x50AdUnit } from "Components/Publishing/Display/DisplayTargeting"
import { AdDimension, AdUnit } from "Components/Publishing/Typings"
import React, { SFC, useState } from "react"
import { Bling as GPT } from "react-gpt"
import styled from "styled-components"

export interface DisplayAdProps extends FlexProps {
  adUnit: AdUnit
  adDimension: AdDimension
  targetingData: {
    is_testing: boolean
    page_type: string
    post_id: string
    tags: string
  }
  isSeries?: boolean
  isStandard?: boolean
}

export interface DisplayAdContainerProps extends FlexProps {
  isSeries?: boolean
  isStandard?: boolean
  adDimension?: AdDimension
  isAdEmpty?: boolean
}

GPT.syncCorrelator(true)

export const DisplayAd: SFC<DisplayAdProps> = props => {
  const { adDimension, adUnit, targetingData, ...otherProps } = props
  const [width, height] = adDimension.split("x").map(a => parseInt(a))
  const [isAdEmpty, setAdEmpty] = useState(null)
  const isMobileLeaderboardAd = is300x50AdUnit(adDimension)

  const ad = (
    <GPT
      collapseEmptyDiv
      adUnitPath={`/21805539690/${adUnit}`}
      targeting={targetingData}
      slotSize={[width, height]}
      onSlotRenderEnded={event => {
        setAdEmpty(event.isEmpty)
      }}
    />
  )

  if (isAdEmpty) {
    return null
  }

  return (
    <DisplayAdContainer
      flexDirection="column"
      pt={isMobileLeaderboardAd ? 2 : 4}
      pb={isMobileLeaderboardAd ? 2 : 1}
      height={
        isAdEmpty || isAdEmpty === null
          ? "1px" // on initial render OR when no ad content returned from Google, set 1px height to ad container to prevent jarring UX effect
          : isMobileLeaderboardAd
          ? "100px" // on mobile 300x50 ads reduce ad container height to 100px
          : "334px"
      }
      isAdEmpty={isAdEmpty}
      {...otherProps}
    >
      <Box m="auto">
        {ad}
        <Sans size="1" color="black30" m={1}>
          Advertisement
        </Sans>
      </Box>
    </DisplayAdContainer>
  )
}

const DisplayAdContainer = styled(Flex)<DisplayAdContainerProps>`
  margin: ${p => (p.isStandard ? "0" : "0 auto")};
  border-top: ${p => (p.isSeries ? `1px solid ${color("black10")}` : "none")};
  background: ${p => (p.isSeries ? color("black100") : color("black5"))};
  text-align: center;
  width: 100%;
  visibility: ${p =>
    p.isAdEmpty || p.isAdEmpty === null ? "hidden" : "visible"};
`
