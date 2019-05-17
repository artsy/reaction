import merge from "deepmerge"
import { useContext } from "react"
import { Trackables } from "./Schema"

import {
  ReactTrackingContext,
  TrackingContext,
} from "react-tracking/build/withTrackingComponentDecorator"

export function useTracking() {
  const trackingContext = useContext(ReactTrackingContext) as TrackingContext

  if (!(trackingContext && trackingContext.tracking)) {
    throw new Error(
      "[Artsy/Analytics/useTracking] Error: Attempting to call `useTracking` " +
        "without a ReactTrackingContext present. Did you forget to wrap the top of " +
        "your component tree with `track`?"
    )
  }

  return {
    trackEvent: (data: Partial<Trackables>): void =>
      trackingContext.tracking.dispatch(
        merge(trackingContext.tracking.data, data as any)
      ),
  }
}
