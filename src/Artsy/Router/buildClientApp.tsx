import { buildClientApp as makeRouter, RouterConfig } from "@artsy/arc"
import { createRelaySSREnvironment } from "Artsy/Relay/createRelaySSREnvironment"
import React from "react"
import { getUser } from "Utils/user"
import { Boot } from "./Boot"
import { createRouteConfig } from "./Utils/createRouteConfig"
import { historyMiddlewares } from "./Utils/historyMiddlewares"
import { RenderError, RenderPending, RenderReady } from "./Utils/RenderStatus"

export function buildClientApp(config: RouterConfig) {
  const user = getUser(config.context && config.context.user)

  return makeRouter({
    ...config,
    routes: createRouteConfig(config.routes),

    getRelayEnvironment: () => {
      const relayEnvironment = createRelaySSREnvironment({
        cache: JSON.parse(window.__RELAY_BOOTSTRAP__ || "{}"),
        user,
        userAgent: window.navigator.userAgent,
      })

      return relayEnvironment
    },

    getFarceConfig: () => {
      return {
        historyMiddlewares,
      }
    },

    render: {
      renderPending: RenderPending,
      renderReady: RenderReady,
      renderError: RenderError,

      renderWrapper: ({ Router, relayEnvironment, routes }) => {
        return (
          <Boot
            context={config.context}
            user={user}
            relayEnvironment={relayEnvironment}
            routes={routes}
          >
            <Router />
          </Boot>
        )
      },
    },
  })
}
