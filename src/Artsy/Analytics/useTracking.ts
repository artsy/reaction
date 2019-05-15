import { TrackingContext } from "Artsy/Analytics/TrackingContext"
import { useContext } from "react"

export function useTracking() {
  const tracking = useContext(TrackingContext)

  if (!tracking) {
    console.error(
      "[Artsy/Analytics/useTracking] Error: Attempting to call `useTracking` " +
        "without a TrackingContext present. Did you forget to wrap the top of " +
        "your component tree with `provideTracking`?"
    )
  }

  // If missing a TrackingContext, return a noop for safety
  const trackEvent = tracking ? tracking.trackEvent : x => x

  return {
    trackEvent,
  }
}
