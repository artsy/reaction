import { Box, color, Flex } from "@artsy/palette"
import { AdDimension, AdUnit } from "Components/Publishing/Typings"
import React, { SFC } from "react"
import styled from "styled-components"
import { ErrorBoundary } from "../../ErrorBoundary"

export interface DisplayPanelProps extends React.HTMLProps<HTMLDivElement> {
  adUnit?: AdUnit
  adDimension?: AdDimension
  displayNewAds?: boolean
}

export const NewDisplayPanel: SFC<DisplayPanelProps> = props => {
  const { adDimension, adUnit, displayNewAds } = props

  if (!displayNewAds) {
    return null
  }

  return (
    <ErrorBoundary>
      <Wrapper color="black100" m="0 auto">
        <DisplayPanelContainer
          className="DisplayPanel__DisplayPanelContainer"
          m="0 auto"
          flexDirection="column"
          p={2}
        >
          <div
            className="htl-ad"
            data-unit={adUnit}
            data-sizes={adDimension}
            data-eager
          />
        </DisplayPanelContainer>
      </Wrapper>
    </ErrorBoundary>
  )
}

const Wrapper = styled(Box)`
  cursor: pointer;
  text-decoration: none;
  max-width: 360px;
`

const DisplayPanelContainer = styled(Flex)`
  border: 1px solid ${color("black10")};
  max-width: 360px;
  box-sizing: border-box;
`

// Set names for tests and DOM
DisplayPanelContainer.displayName = "DisplayPanelContainer"
Wrapper.displayName = "Wrapper"
