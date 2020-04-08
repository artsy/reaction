import { trackExperimentViewed } from "Artsy/Analytics/trackExperimentViewed"
import FarceActionTypes from "farce/lib/ActionTypes"
import { ActionTypes as FoundActionTypes } from "found"
import { debounce } from "lodash"
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
  const actions = []
  const debouncedTrack = debounce(trackPageView => trackPageView(), 100)
  let referrer

  return store => next => action => {
    const { excludePaths = [] } = options
    const { type, payload } = action

    function trackPageView() {
      // On FarceActionTypes.INIT, pathname is directly passed. On
      // FoundActionTypes.RESOLVE_MATCH, pathname is attached to `location`.
      const pathname = payload.pathname || payload.location.pathname

      // Pluck segment analytics instance from force
      const analytics =
        typeof window.analytics !== "undefined" && window.analytics

      if (analytics) {
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

          analytics.page(trackingData, {
            integrations: {
              Marketo: false,
            },
          })

          // TODO: Remove after EXPERIMENTAL_APP_SHELL AB test ends.
          if (sd.CLIENT_NAVIGATION_V5) {
            trackExperimentViewed("client_navigation_v5")
          }
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
    }

    switch (type) {
      case FarceActionTypes.INIT: {
        actions.push(action) // store the first action so we can evaluate the below
        break
      }

      /**
       * This action can fire multiple times during a route transition, so we
       * want to check if the previous event is an init event. If so, we know
       * we've performed a hard jump to the page form an SSR pass. This is the
       * session "start" within the the client-side nav experience, or the
       * conventional pageview track otherwise.
       */
      case FarceActionTypes.CREATE_HREF: {
        const isSSRPageRender = actions.pop()?.type === "@@farce/INIT"
        if (isSSRPageRender) {
          debouncedTrack(trackPageView)
        }
        break
      }

      case FarceActionTypes.UPDATE_LOCATION: {
        // When the URL bar updates a new state transition has begun, but not yet
        // committed into the store. Grab the pathname and store as a referrer.
        referrer = get(
          store.getState(),
          state => state.found.match.location.pathname
        )
        break
      }

      // Once the session has started, fire tracking when the page data is done
      // loading and the new page renders.
      case FoundActionTypes.RESOLVE_MATCH: {
        debouncedTrack(trackPageView)
        break
      }
    }

    return next(action)
  }
}
