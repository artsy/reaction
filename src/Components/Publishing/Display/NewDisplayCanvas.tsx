import { Flex } from "@artsy/palette"
import { ErrorBoundary } from "Components/ErrorBoundary"
import { isHTLAdEnabled } from "Components/Publishing/Ads/EnabledAd"
import { AdDimension, AdUnit } from "Components/Publishing/Typings"
import React, { SFC } from "react"
import styled from "styled-components"

interface DisplayCanvasProps {
  adUnit?: AdUnit
  adDimension?: AdDimension
}

export const NewDisplayCanvas: SFC<DisplayCanvasProps> = props => {
  const { adUnit, adDimension } = props

  if (!isHTLAdEnabled()) {
    return null
  }

  return (
    <ErrorBoundary>
      <DisplayCanvasContainer
        flexDirection="column"
        width="100%"
        m={"0 auto"}
        maxWidth="1250px"
      >
        <div
          className="htl-ad"
          data-unit={adUnit}
          data-sizes={adDimension}
          data-eager
        />
      </DisplayCanvasContainer>
    </ErrorBoundary>
  )
}

const DisplayCanvasContainer = styled(Flex)`
  min-height: fit-content;
  max-width: 1250px;
  box-sizing: border-box;
`

// Set names for tests and DOM
DisplayCanvasContainer.displayName = "DisplayCanvasContainer"
