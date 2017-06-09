/// <reference types="segment-analytics" />

import * as React from "react"
import * as Relay from "react-relay"
import * as sharify from "sharify"

declare global {
  interface Window {
    /**
     * This requires the Segment JS client to be exposed as `window.analytics`.
     */
    analytics: SegmentAnalytics.AnalyticsJS
  }
}

declare module "express" {
  interface ArtsyResponseLocals {
    sharify: sharify.ResponseLocal

    /**
     * A short-hand convenience accessor for `sharify.data`.
     */
    sd: sharify.ResponseLocalData

    /**
     * A Relay network layer configured for Artsy’s GraphQL service (metaphysics).
     */
    networkLayer: Relay.DefaultNetworkLayer
  }

  interface Response {
    /**
     * An interface for `response.locals` that can be extended with route specific locals.
     */
    locals: ArtsyResponseLocals
  }
}
