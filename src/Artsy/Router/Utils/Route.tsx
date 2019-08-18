/**
 * Taken from @taion as per example of how they actually use found-relay and
 * have default setup for each route.
 */

import { RouteSpinner } from "Artsy/Relay/renderWithLoadProgress"
import { HttpError } from "found"
import BaseRoute from "found/lib/Route"
import React from "react"
import { get } from "Utils/get"

// TODO: Wire up
// import { HttpError } from "found"

type FetchIndicator = "spinner" | "overlay"

interface CreateRenderProps {
  fetchIndicator?: FetchIndicator
  render?: (props) => React.ReactNode
}

interface RenderArgProps {
  Component: React.ComponentType
  props?: object
  error?: Error
}

function createRender({
  fetchIndicator = "spinner",
  render,
}: CreateRenderProps) {
  return (renderArgs: RenderArgProps) => {
    const { Component, props, error } = renderArgs
    let status: number
    let message: string
    if (error) {
      if (error instanceof HttpError) {
        throw error
      } else if (error.name === "RRNLRequestError") {
        // TODO: Better error typing.
        // @ts-ignore
        const firstError = get(error, e => e.res.errors[0])
        const statusCodes = get(
          firstError,
          e => e.extensions.httpStatusCodes,
          []
        )
        if (statusCodes.length === 1) {
          status = statusCodes[0]
          message = firstError.message
        }
      } else {
        status = 500
        message = error.message
      }

      // TODO: Need upstream fix type in found as it complains about missing
      // second argument.
      // @ts-ignore
      throw new HttpError(status, message)
    }

    if (render) {
      return render(renderArgs)
    }

    if (Component === undefined) {
      return undefined
    }

    // This should only ever show when doing client-side routing.
    if (!props) {
      if (fetchIndicator === "spinner") {
        return <RouteSpinner />
      } else if (fetchIndicator === "overlay") {
        // TODO: At some point  we might want to make this a little fancier. If
        // undefined  is returned here, then we defer to `RenderStatus` component.

        return
      } else {
        return
      }
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
      ...props,
      render: createRender(props),
    })
  }
}
