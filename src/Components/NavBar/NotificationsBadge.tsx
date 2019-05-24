import { Box, color, Flex, Sans } from "@artsy/palette"
import { AnalyticsSchema, SystemContext } from "Artsy"
import { useTracking } from "Artsy/Analytics/useTracking"
import cookie from "cookies-js"
import React, { useContext, useEffect } from "react"
import { ReadyState } from "react-relay"
import styled from "styled-components"
import { get } from "Utils/get"
import createLogger from "Utils/logger"
import { NotificationsQueryRenderer } from "./Menus"

const logger = createLogger("Components/NavBar")

export const NotificationsBadge: React.FC<{
  /**
   * If hovering over the nav item, `hover` is passed into the badge (Overlay)
   */
  hover?: boolean
}> = ({ hover }) => {
  return (
    <NotificationsQueryRenderer
      render={({ error, props }: ReadyState) => {
        // If there's an error hide the badge
        if (error) {
          logger.error(error)
          return null
        }

        // Fetching. If there's a notification count stored in a cookie, display it
        if (!props) {
          return <CircularCount />
        }

        // Get the unread notification count from the server
        const totalUnread = get(
          props,
          p => {
            return p.me.followsAndSaves.notifications.edges.length
          },
          0
        )

        let count = totalUnread

        // Update the notification bad with the count, and store it in a cookie
        // so that subsequent page views don't need a fetch in order to render
        // the badge.
        if (count > 0) {
          const cachedNotificationCount = Number(
            cookie.get("notification-count")
          )
          if (count !== cachedNotificationCount) {
            if (count >= 100) {
              count = "99+"
            }

            // In force, when a request is made to `/notifications` endpoint,
            // sd.NOTIFICATIONS_COUNT is populated by this cookie.
            cookie.set("notification-count", count)
          }
        }

        // User has no notifications; clear the cookie
        if (count === 0) {
          cookie.expire("notification-count")
          return null
        }

        return (
          <Box>
            <CircularCount count={count} rawCount={totalUnread} hover={hover} />
          </Box>
        )
      }}
    />
  )
}

const CircularCount: React.FC<{
  /**
   * Formatted count for display
   */
  count?: string
  /**
   * Raw unread count, used for analytics.
   */
  rawCount?: boolean
  /**
   * True if hovering over the badge
   */
  hover?: boolean
}> = ({ count, rawCount, hover }) => {
  // Check to see if we've got a value from sharify, populated by a cookie on
  // the server.
  const { notificationCount } = useContext(SystemContext)
  const notificationsLabel = count || notificationCount
  const { trackEvent } = useTracking()

  if (!notificationsLabel) {
    return null
  }

  useEffect(() => {
    if (hover) {
      trackEvent({
        subject: AnalyticsSchema.Subject.NotificationBell,
        new_notification_count: rawCount,
      })
    }
  }, [hover])

  return (
    <Container>
      <Sans size="1" weight="medium" color="white100">
        {notificationsLabel}
      </Sans>
    </Container>
  )
}

const Container = styled(Flex)`
  background-color: ${color("purple100")};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 12px;
  right: 0;
`
