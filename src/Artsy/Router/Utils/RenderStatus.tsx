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
    <>
      <Renderer>{null}</Renderer>
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
    </>
  )
}

export const RenderReady: React.FC<{
  elements: React.ReactNode
}> = props => {
  return (
    <Renderer shouldUpdate>
      <ElementsRenderer elements={props.elements} />
    </Renderer>
  )
}

/**
 * Define a container component so that we don't run into reconciliation issues
 * due to an element existing in RenderPending that doesn't exist in RenderReady,
 * between the top most container and StaticContainer.
 *
 */
const Renderer = ({ children, ...props }) => {
  return (
    <Box>
      <StaticContainer {...props}>{children}</StaticContainer>
    </Box>
  )
}
