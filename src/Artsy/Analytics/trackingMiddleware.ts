import { trackExperimentViewed } from "Artsy/Analytics/trackExperimentViewed"
import ActionTypes from "farce/lib/ActionTypes"
import { data as sd } from "sharify"
import { get } from "Utils/get"

/**
 * PageView tracking middleware for use in our router apps. Middleware conforms
 * to Redux middleware spec.
 *
 * @see Artsy/Router/buildClientApp.tsx for mount point
 * @see https://github.com/4Catalyzer/farce/blob/master/src/ActionTypes.js
 */

interface TrackingMiddlewareOptions {
  excludePaths?: [string]
}

export function trackingMiddleware(options: TrackingMiddlewareOptions = {}) {
  return store => next => action => {
    const { excludePaths = [] } = options
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
          // TODO: Pass referrer over to Artwork page if A/B test passes
          // window.sd.routerReferrer = referrer

          const foundExcludedPath = excludePaths.some(excludedPath => {
            return pathname.includes(excludedPath)
          })

          if (!foundExcludedPath) {
            const trackingData: {
              path: string
              referrer?: string
              url: string
            } = {
              path: pathname,
              url: sd.APP_URL + pathname,
            }

            if (referrer) {
              trackingData.referrer = sd.APP_URL + referrer
            }

            // TODO: Remove after EXPERIMENTAL_APP_SHELL AB test ends.
            if (
              ["/collect", "/collections", "/collection/"].some(path =>
                pathname.includes(path)
              ) &&
              referrer
            ) {
              trackingData.referrer = sd.APP_URL + referrer
            }

            analytics.page(trackingData, { integrations: { Marketo: false } })
          }

          // TODO: Remove after EXPERIMENTAL_APP_SHELL AB test ends.
          if (sd.CLIENT_NAVIGATION_V5) {
            trackExperimentViewed("client_navigation_v5")
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
