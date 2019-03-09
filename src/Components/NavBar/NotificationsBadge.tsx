import React from "react"
import { ReadyState } from "react-relay"
import styled from "styled-components"

import { color, Flex, Sans } from "@artsy/palette"

import { get } from "Utils/get"
import createLogger from "Utils/logger"
import { NotificationsQueryRenderer } from "./Menus"

const logger = createLogger("Components/NavBar")

export const NotificationsBadge = () => {
  return (
    <NotificationsQueryRenderer
      render={({ error, props }: ReadyState) => {
        if (error) {
          logger.error(error)
          return null // If there's an error hide the badge
        }
        if (!props) {
          return null
        }

        const notificationCount = get(props, p => p.me.followsAndSaves.notifications.edges.length, 0) // prettier-ignore
        if (notificationCount === 0) {
          return null
        }

        return (
          <Container>
            <Sans size="1" weight="medium" color="white100">
              {notificationCount}
            </Sans>
          </Container>
        )
      }}
    />
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
  top: 3px;
  right: 0;

  animation-name: fadeIn;
  animation-duration: 0.3s;
  animation-fill-mode: both;

  opacity: 0;
  transform: scale(0);

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`
