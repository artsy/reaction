/// <reference types="segment-analytics" />

import * as Relay from "react-relay"
import sharify from "sharify"

declare global {
  interface Window {
    /**
     * This requires the Segment JS client to be exposed as `window.analytics`.
     */
    analytics: SegmentAnalytics.AnalyticsJS
  }
}

declare module "express" {
  interface Response {
    locals: {
      sharify: sharify.ResponseLocals,
      networkLayer: Relay.DefaultNetworkLayer,
    },
  }
}
