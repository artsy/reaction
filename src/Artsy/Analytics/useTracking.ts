import { TrackingContext } from "Artsy/Analytics/TrackingContext"
import { useContext } from "react"

export function useTracking() {
  const { tracking, AnalyticsSchema } = useContext(TrackingContext)

  return {
    tracking,
    AnalyticsSchema,
  }
}
