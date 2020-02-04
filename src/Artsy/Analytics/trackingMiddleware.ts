import { trackExperimentViewed } from "Artsy/Analytics/trackExperimentViewed"
import ActionTypes from "farce/lib/ActionTypes"
import { get } from "Utils/get"
import { getENV } from "Utils/getENV"
import createLogger from "Utils/logger"

const logger = createLogger("Artsy/Analytics/trackingMiddleware")

/**
 * PageView tracking middleware for use in our router apps. Middleware conforms
 * to Redux middleware spec.
 *
 * @see Artsy/Router/buildClientApp.tsx for mount point
 * @see https://github.com/4Catalyzer/farce/blob/master/src/ActionTypes.js
 */
export function trackingMiddleware() {
  return store => next => action => {
    const { type, payload } = action

    switch (type) {
      case ActionTypes.UPDATE_LOCATION: {
        const { pathname } = payload
        const referrer = get(
          store.getState(),
          state => state.found.match.location.pathname
        )

        // Pluck segment analytics instance from force
        const analytics =
          typeof window.analytics !== "undefined" && window.analytics

        if (analytics) {
          logger.warn("Tracking PageView:", pathname)

          analytics.page(
            { path: pathname, referrer },
            { integrations: { Marketo: false } }
          )

          // TODO: Remove after AB test ends.
          if (getENV("EXPERIMENTAL_APP_SHELL")) {
            trackExperimentViewed("client_navigation_v2")
          }

          // Reset timers that track time on page since we're tracking each order
          // checkout view as a separate page.
          const desktopPageTimeTrackers =
            typeof window.desktopPageTimeTrackers !== "undefined" &&
            window.desktopPageTimeTrackers

          if (desktopPageTimeTrackers) {
            desktopPageTimeTrackers.forEach(tracker => {
              // No need to reset the tracker if we're on the same page.
              if (pathname !== tracker.path) {
                tracker.reset(pathname)
              }
            })
          }
        }

        return next(action)
      }
      default:
        return next(action)
    }
  }
}
