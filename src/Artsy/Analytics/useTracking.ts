import * as AnalyticsSchema from "Artsy/Analytics/Schema"
import { TrackingContext } from "Artsy/Analytics/TrackingContext"
import { useContext } from "react"

export function useTracking() {
  const { tracking } = useContext(TrackingContext)

  return {
    tracking,
    AnalyticsSchema,
  }
}
