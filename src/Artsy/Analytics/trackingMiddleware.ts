import { trackExperimentViewed } from "Artsy/Analytics/trackExperimentViewed"
import { getENV } from "Utils/getENV"
import createLogger from "Utils/logger"

const logger = createLogger("Artsy/Analytics/trackingMiddleware")

const ActionTypes = {
  UPDATE_LOCATION: "@@farce/UPDATE_LOCATION",

  /**
   * Unused Farce/Found router events.
   * TODO: Remove once we're sure we don't need to intercept anything else or
   * after client side routing launches.
   */
  // INIT: "@@farce/INIT",
  // PUSH: "@@farce/PUSH",
  // REPLACE: "@@farce/REPLACE",
  // TRANSITION: "@@farce/TRANSITION",
  // GO: "@@farce/GO",
  // CREATE_HREF: "@@farce/CREATE_HREF",
  // CREATE_LOCATION: "@@farce/CREATE_LOCATION",
  // DISPOSE: "@@farce/DISPOSE",
}

/**
 * PageView tracking middleware for use in our router apps.
 *
 * @see Artsy/Router/buildClientApp.tsx for mount point
 */
export function trackingMiddleware() {
  return _store => next => action => {
    const { type, payload } = action

    switch (type) {
      case ActionTypes.UPDATE_LOCATION: {
        const { pathname } = payload

        // Pluck segment analytics instance from force
        const analytics =
          typeof window.analytics !== "undefined" && window.analytics

        if (analytics) {
          logger.warn("Tracking PageView:", pathname)

          analytics.page(
            { path: pathname },
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
