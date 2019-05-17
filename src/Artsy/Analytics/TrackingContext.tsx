import { track as _track } from "Artsy/Analytics"
import * as AnalyticsSchema from "Artsy/Analytics/Schema"
import React from "react"

type Trackables = AnalyticsSchema.Trackables

/**
 * Used when tracking custom events, not in the schema:
 *
 * @example
 *
 * trackEvent<AnalyticsProp<{ name: string }>>({ name: 'foo' })
 *
 */
export type AnalyticsProp<P> = Trackables & P

interface TrackingContextProps {
  trackEvent?<P extends Trackables>(trackingProps: Partial<P>): void
}

export const TrackingContext = React.createContext<TrackingContextProps>({})

/**
 * For a given component tree, inject a tracking context.
 *
 * @example

    import { provideTracking, useTracking, AnalyticsSchema } from 'Artsy/Analytics'

    const App = provideTracking({
      flow: AnalyticsSchema.Flow.Header,
    })(props => {
      const { trackEvent } = useTracking()

      const trackClick = () => {
        trackEvent({
          ...
        })
      }

      return (
        <div onClick={() => trackClick()}>
          ...
        </div>
      )
    })

    // Once injected into the context, child components can pull it right out:

    const Child = props => {
      const { trackEvent } = useTracking()
      ...
    }
 *
 */
export const provideTracking = (trackingProps?: Trackables) => (
  Component: React.FC | React.ComponentClass
) => {
  return _track(trackingProps)(({ tracking, ...props }) => {
    return (
      <TrackingContext.Provider value={{ trackEvent: tracking.trackEvent }}>
        <Component {...props} />
      </TrackingContext.Provider>
    )
  })
}
