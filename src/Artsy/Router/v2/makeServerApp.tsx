import React from "react"
import serialize from "serialize-javascript"

import { createRelaySSREnvironment } from "Artsy/Relay/createRelaySSREnvironment"
import { createMediaStyle } from "Utils/Responsive"
import { getUser } from "Utils/user"
import { Boot } from "../Boot"
import { createRouteConfig } from "../Utils/createRouteConfig"
import { matchingMediaQueriesForUserAgent } from "../Utils/matchingMediaQueriesForUserAgent"
import { buildServerApp } from "./buildServerApp2"
import { RouterConfig } from "./RouterConfig"

const MediaStyle = createMediaStyle()

export function makeServerApp(
  config: RouterConfig & { userAgent?: string }
): ReturnType<typeof buildServerApp> {
  const user = getUser(config.context && config.context.user)

  return buildServerApp({
    ...config,
    routes: createRouteConfig(config.routes),

    getFarceConfig: () => {
      return {
        matchContext: {
          user,
        },
      }
    },

    getRelayEnvironment: () => {
      const relayEnvironment =
        (config.context && config.context.relayEnvironment) ||
        createRelaySSREnvironment({ user })

      return relayEnvironment
    },

    renderWrapper: ({ Router, relayEnvironment, routes }) => {
      const headTags = [<style type="text/css">{MediaStyle}</style>]

      const matchingMediaQueries =
        config.userAgent && matchingMediaQueriesForUserAgent(config.userAgent)

      return (
        <Boot
          context={config.context}
          headTags={headTags}
          onlyMatchMediaQueries={matchingMediaQueries}
          relayEnvironment={relayEnvironment}
          routes={routes}
          user={user}
        >
          <Router />
        </Boot>
      )
    },

    serializeRelayData: relayData => {
      let hydrationData
      try {
        hydrationData = serialize(relayData, {
          isJSON: true,
        })
      } catch (error) {
        hydrationData = "{}"
        console.error(
          "[Artsy/Router/v2/makeServerApp] Error serializing data:",
          error
        )
      }
      return serialize(hydrationData || {}, {
        isJSON: true,
      })
    },
  })
}
