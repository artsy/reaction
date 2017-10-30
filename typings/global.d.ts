/// <reference types="segment-analytics" />

import * as sharify from "sharify"

declare global {
  interface Window {
    /**
     * This requires the Segment JS client to be exposed as `window.analytics`.
     */
    analytics: SegmentAnalytics.AnalyticsJS
  }
}
