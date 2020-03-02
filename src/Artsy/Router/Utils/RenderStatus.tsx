import React from "react"
import StaticContainer from "react-static-container"

import { Box, PageLoader } from "@artsy/palette"
import { useSystemContext } from "Artsy"
import { ErrorPage } from "Components/ErrorPage"
import ElementsRenderer from "found/lib/ElementsRenderer"
import { data as sd } from "sharify"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"

const logger = createLogger("Artsy/Router/Utils/RenderStatus")

export const RenderPending = () => {
  const {
    isFetching,
    setIsFetching,
    EXPERIMENTAL_APP_SHELL,
  } = useSystemContext()

  if (!isFetching) {
    setIsFetching(true)
  }

  /**
   * TODO: Add timeout here for when a request takes too long. Show generic error
   * and notify Sentry.
   */
  if (EXPERIMENTAL_APP_SHELL) {
    return (
      <>
        <Renderer>{null}</Renderer>

        {/*
          FIXME: Remove when EXPERIMENTAL_APP_SHELL a/b test is complete
        */}
        <Media lessThan="md">
          <Box
            className="reactionPageLoader" // positional styling comes from Force body.styl
            style={{
              background: "#ffffff90",
              position: "fixed",
              width: "100%",
              height: "100%",
              left: 0,
              top: -6,
              zIndex: 1000,
            }}
          >
            <PageLoader
              showBackground={false}
              style={{
                top: "50vh",
                position: "absolute",
                left: 0,
                zIndex: 1000,
              }}
            />
          </Box>
        </Media>
        <Media greaterThanOrEqual="md">
          <PageLoader
            className="reactionPageLoader" // positional styling comes from Force body.styl
            showBackground={false}
            style={{
              position: "fixed",
              left: 0,
              top: -6,
              zIndex: 1000,
            }}
          />
        </Media>
      </>
    )
  } else {
    return (
      <>
        <Renderer>{null}</Renderer>
        <PageLoader
          className="reactionPageLoader" // positional styling comes from Force body.styl
          showBackground={false}
          style={{
            position: "fixed",
            left: 0,
            top: -6,
            zIndex: 1000,
          }}
        />
      </>
    )
  }
}

export const RenderReady: React.FC<{
  elements: React.ReactNode
}> = props => {
  const { isFetching, setIsFetching } = useSystemContext()

  if (isFetching) {
    setIsFetching(false)
  }

  return (
    <Renderer shouldUpdate>
      <ElementsRenderer elements={props.elements} />
    </Renderer>
  )
}

export const RenderError: React.FC<{
  error: { status?: number; data?: any }
}> = props => {
  logger.error(props.error.data)

  const { isFetching, setIsFetching } = useSystemContext()

  if (isFetching) {
    setIsFetching(false)
  }

  const message =
    (process.env.NODE_ENV || sd.NODE_ENV) === "development"
      ? String(props.error.data)
      : "Internal error"

  // TODO: Make error code more granular. See:
  // https://artsyproduct.atlassian.net/browse/PLATFORM-1343
  // https://github.com/artsy/reaction/pull/1855
  return <ErrorPage code={props.error.status || 500} message={message} />
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
