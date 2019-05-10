import { SystemContext } from "Artsy"
import * as AnalyticsSchema from "Artsy/Analytics/Schema"
import { useContext, useEffect } from "react"
import { TrackingProp } from "react-tracking"

export function useTracking(
  newTrackingInstance?: TrackingProp
): {
  tracking: TrackingProp
  AnalyticsSchema: typeof AnalyticsSchema
} {
  const { tracking, setTracking } = useContext(SystemContext)

  useEffect(() => {
    if (newTrackingInstance) {
      setTracking(newTrackingInstance)
    }
  }, [])

  return {
    tracking,
    AnalyticsSchema,
  }
}
