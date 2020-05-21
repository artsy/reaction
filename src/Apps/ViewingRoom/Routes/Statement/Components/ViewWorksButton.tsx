import React from "react"
import { RouterLink } from "Artsy/Router/RouterLink"
import { scrollToId } from "../Utils/scrollToId"
import { AnalyticsSchema, useTracking } from "Artsy"
import { Button } from "@artsy/palette"
import { useRouter } from "Artsy/Router/useRouter"

export const ViewWorksButton: React.FC = () => {
  const tracking = useTracking()

  const {
    match: {
      params: { slug },
    },
  } = useRouter()

  const navigateTo = `/viewing-room/${slug}/works`

  return (
    <RouterLink
      to={navigateTo}
      data-test="viewingRoomWorksButton"
      onClick={() => {
        scrollToId("viewingRoomTabBarAnchor")
        tracking.trackEvent({
          action_type: AnalyticsSchema.ActionType.ClickedArtworkGroup,
          context_module: AnalyticsSchema.ContextModule.ViewingRoomArtworkRail,
          subject: AnalyticsSchema.Subject.ViewWorks,
          destination_path: navigateTo,
        })
      }}
    >
      <Button size="large" width="100%">
        View works
      </Button>
    </RouterLink>
  )
}
