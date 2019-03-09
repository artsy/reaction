import React, { useContext } from "react"
import { graphql, QueryRenderer } from "react-relay"

import { SystemContext } from "Artsy"
import {
  LoadProgressRenderer,
  renderWithLoadProgress,
} from "Artsy/Relay/renderWithLoadProgress"
import { get } from "Utils/get"

import {
  NotificationsMenuQuery,
  NotificationsMenuQueryResponse,
} from "__generated__/NotificationsMenuQuery.graphql"

import {
  Box,
  Flex,
  Image,
  Link,
  Menu,
  MenuItem,
  Sans,
  Separator,
} from "@artsy/palette"

const NotificationMenuItems: React.FC<
  NotificationsMenuQueryResponse
> = props => {
  const notifications = get(props, p => p.me.followsAndSaves.notifications.edges, []) // prettier-ignore

  return (
    <>
      {notifications.map(({ node }, index) => {
        const { artists, href, image, summary } = node
        return (
          <MenuItem href={href} key={index}>
            <Flex alignItems="center">
              <Box width={40} height={40} bg="black5" mr={1}>
                <Image
                  src={image.resized.url}
                  width={40}
                  height={40}
                  style={{
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Box>
                <Sans size="2">{summary}</Sans>
                <Sans size="2" weight="medium">
                  {artists}
                </Sans>
              </Box>
            </Flex>
          </MenuItem>
        )
      })}

      <Flex py={1} flexDirection="column" alignItems="center">
        {notifications.length ? (
          <>
            <Separator />
            <Box pt={2}>
              <Sans size="2">
                <Link href="/works-for-you">View all</Link>
              </Sans>
            </Box>
          </>
        ) : (
          <Box>
            <Sans size="3">No new notifications</Sans>
          </Box>
        )}
      </Flex>
    </>
  )
}

export const NotificationsQueryRenderer: React.FC<{
  render: LoadProgressRenderer<any>
}> = ({ render }) => {
  const { relayEnvironment } = useContext(SystemContext)

  return (
    <QueryRenderer<NotificationsMenuQuery>
      environment={relayEnvironment}
      query={graphql`
        query NotificationsMenuQuery {
          me {
            followsAndSaves {
              notifications: bundledArtworksByArtist(
                sort: PUBLISHED_AT_DESC
                for_sale: true
                first: 10
              ) @connection(key: "WorksForYou_notifications") {
                edges {
                  node {
                    href
                    summary
                    artists
                    published_at(format: "MMM DD")
                    image {
                      resized(height: 40, width: 40) {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `}
      variables={{}}
      render={render}
    />
  )
}

export const NotificationsMenu: React.FC = () => {
  return (
    <Menu title="Actvity">
      <NotificationsQueryRenderer
        render={renderWithLoadProgress(
          NotificationMenuItems,
          {},
          {},
          { size: "small" }
        )}
      />
    </Menu>
  )
}
