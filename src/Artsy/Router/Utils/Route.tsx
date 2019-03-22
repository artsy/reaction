/**
 * Taken from @taion as per example of how they actually use found-relay and
 * have default setup for each route.
 *
 * TODO:
 * - Decide if we want to change our getDataFrom, such as the one @taion uses.
 * - There's opportunity to unify some code with renderWithLoadProgress.
 */

import { Spinner } from "@artsy/palette"
import { LoadingClassName } from "Artsy/Relay/renderWithLoadProgress"
import BaseRoute from "found/lib/Route"
import React from "react"
import styled from "styled-components"

const SpinnerContainer = styled.figure`
  width: 100%;
  height: 100px;
  position: relative;
`

// When popping a route (navigate back), use the data in the store.
// function defaultGetDataFrom({ location }) {
//   return location.action === "POP" ? "STORE_OR_NETWORK" : "STORE_THEN_NETWORK"
// }

function createRender({
  prerender,
  render,
  renderFetched,
  showPreloader = true,
}) {
  return (renderArgs: {
    Component: React.ComponentType
    props?: object
    error?: Error
  }) => {
    const { Component, props, error } = renderArgs

    if (error) {
      throw error
    }

    if (prerender) {
      prerender(renderArgs)
    }

    if (render) {
      return render(renderArgs)
    }

    if (Component === undefined) {
      return undefined
    }

    // This should only ever show when doing client-side routing.
    if (!props) {
      if (showPreloader) {
        return (
          <SpinnerContainer className={LoadingClassName}>
            <Spinner />
          </SpinnerContainer>
        )
      } else {
        return null
      }
    }

    if (renderFetched) {
      return renderFetched(renderArgs)
    }

    return <Component {...props} />
  }
}

export class Route extends BaseRoute {
  constructor(props) {
    if (!(props.query || props.getQuery)) {
      super(props)
      return
    }

    super({
      // getDataFrom: defaultGetDataFrom,
      ...props,
      render: createRender(props),
    })
  }
}
