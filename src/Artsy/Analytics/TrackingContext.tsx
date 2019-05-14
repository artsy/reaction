import { track as _track } from "Artsy/Analytics"
import * as AnalyticsSchema from "Artsy/Analytics/Schema"
import React from "react"
import { TrackingProp } from "react-tracking"

export interface TrackingContextProps {
  tracking?: TrackingProp
  AnalyticsSchema?: typeof AnalyticsSchema
}

export const TrackingContext = React.createContext<TrackingContextProps>({})

export const injectTracking = (trackingProps?: AnalyticsSchema.Trackables) => (
  Component: React.FC | React.ComponentClass
) => {
  return _track(trackingProps)(({ tracking, ...props }) => {
    return (
      <TrackingContext.Provider value={{ tracking, AnalyticsSchema }}>
        <Component {...props} />
      </TrackingContext.Provider>
    )
  })
}
