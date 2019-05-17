/**
 * TODO:
 *
 * - react-tracking/build/index.js does not export ReactTrackingContext
 * - the context isn't typed
 */

import { Trackables } from "Artsy/Analytics/Schema"
import merge from "deepmerge"
import { useContext } from "react"
import { ReactTrackingContext } from "react-tracking/build/withTrackingComponentDecorator"

export function useTracking() {
  const trackingContext = useContext(ReactTrackingContext) as any

  if (!trackingContext) {
    throw new Error(
      "[Artsy/Analytics/useTracking] Error: Attempting to call `useTracking` " +
        "without a TrackingContext present. Did you forget to wrap the top of " +
        "your component tree with `provideTracking`?"
    )
  }

  /**
   * This function is a simple replacement of https://github.com/nytimes/react-tracking/blob/d7cc4403733b5968878181af849cdebec41ab4ef/src/withTrackingComponentDecorator.js#L87-L97
   * which only does the parts we really need (for now).
   *
   * TODO: Reconcile this with upstream.
   */
  return {
    trackEvent: <Data>(data: Data & Trackables): void =>
      trackingContext.tracking.dispatch(
        merge(trackingContext.tracking.data, data as any)
      ),
  }
}
