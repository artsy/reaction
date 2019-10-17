import { buildServerApp as makeRouter, RouterConfig } from "@artsy/arc"
import React from "react"
import serialize from "serialize-javascript"

import { createRelaySSREnvironment } from "Artsy/Relay/createRelaySSREnvironment"
import { createMediaStyle } from "Utils/Responsive"
import { getUser } from "Utils/user"
import { Boot } from "./Boot"

import { createRouteConfig } from "./Utils/createRouteConfig"
import { historyMiddlewares } from "./Utils/historyMiddlewares"
import { matchingMediaQueriesForUserAgent } from "./Utils/matchingMediaQueriesForUserAgent"
import { RenderError, RenderPending, RenderReady } from "./Utils/RenderStatus"

const MediaStyle = createMediaStyle()

export function buildServerApp(config: RouterConfig & { userAgent?: string }) {
  const user = getUser(config.context && config.context.user)
  const headTags = [<style type="text/css">${MediaStyle}</style>]

  return makeRouter({
    ...config,
    headTags,

    routes: createRouteConfig(config.routes),

    getFarceConfig: () => {
      return {
        historyMiddlewares,
        matchContext: {
          user,
        },
      }
    },

    getRelayEnvironment: () => {
      const relayEnvironment =
        (config.context && config.context.relayEnvironment) ||
        createRelaySSREnvironment({ user, userAgent: config.userAgent })

      return relayEnvironment
    },

    render: {
      renderPending: RenderPending,
      renderReady: RenderReady,
      renderError: RenderError,

      renderWrapper: ({ Router, relayEnvironment, routes }) => {
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
          "[Artsy/Router/buildServerApp] Error serializing data:",
          error
        )
      }
      return serialize(hydrationData || {}, {
        isJSON: true,
      })
    },
  })
}
