import { createRelaySSREnvironment } from "Artsy/Relay/createRelaySSREnvironment"
import React from "react"
import { getUser } from "Utils/user"
import { Boot } from "../Boot"
import { createRouteConfig } from "../Utils/createRouteConfig"
import { buildClientApp } from "./buildClientApp2"
import { RouterConfig } from "./RouterConfig"

export function makeClientApp(
  config: RouterConfig
): ReturnType<typeof buildClientApp> {
  const user = getUser(config.context && config.context.user)

  return buildClientApp({
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
        createRelaySSREnvironment({
          cache: JSON.parse(window.__RELAY_BOOTSTRAP__ || "{}"),
          user,
        })

      return relayEnvironment
    },

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
  })
}
