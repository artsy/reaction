declare const window: any

export function trackPageView(): void {
  if (typeof window.analytics !== "undefined") {
    window.analytics.page(
      { path: window.location.pathname },
      { integrations: { Marketo: false } }
    )
    // Reset timers that track time on page since we're tracking each order
    // checkout view as a separate page.
    typeof window.desktopPageTimeTrackers !== "undefined" &&
      window.desktopPageTimeTrackers.forEach(tracker => {
        // No need to reset the tracker if we're on the same page.
        if (window.location.pathname !== tracker.path)
          tracker.reset(window.location.pathname)
      })
  }
}
