import React from "react"
import StaticContainer from "react-static-container"

import { Box } from "@artsy/palette"
import ElementsRenderer from "found/lib/ElementsRenderer"

export const RenderPending: React.FC = props => {
  /**
   * TODO: Add timeout here for when a request takes too long. Show generic error
   * and notify Sentry.
   */
  return (
    <Box>
      <StaticContainer>{null}</StaticContainer>

      <Box
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: "white",
          opacity: 0.5,
          zIndex: 1000,
          height: "100vh",
        }}
      />
    </Box>
  )
}

export const RenderReady: React.FC<{
  elements: React.ReactNode
}> = props => {
  return (
    <Box>
      <StaticContainer shouldUpdate>
        <ElementsRenderer elements={props.elements} />
      </StaticContainer>
    </Box>
  )
}
