import { track as _track } from "Artsy/Analytics"
import * as AnalyticsSchema from "Artsy/Analytics/Schema"
import React from "react"
import { TrackingProp } from "react-tracking"

type Trackables = AnalyticsSchema.Trackables

interface TrackingContextProps {
  tracking?: TrackingProp<Trackables>
}

export const TrackingContext = React.createContext<TrackingContextProps>({})

export const injectTracking = (trackingProps?: Trackables) => (
  Component: React.FC | React.ComponentClass
) => {
  return _track(trackingProps)(({ tracking, ...props }) => {
    return (
      <TrackingContext.Provider value={{ tracking }}>
        <Component {...props} />
      </TrackingContext.Provider>
    )
  })
}
