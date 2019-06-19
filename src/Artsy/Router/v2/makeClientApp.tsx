import { createRelaySSREnvironment } from "Artsy/Relay/createRelaySSREnvironment"
import React from "react"
import { getUser } from "Utils/user"
import { Boot } from "../Boot"
import { buildClientApp } from "./buildClientApp2"

export function makeClientRoutes(config) {
  const user = getUser(config.context.user)

  return buildClientApp({
    ...config,
    getRelayEnvironment: () => {
      const relayEnvironment = createRelaySSREnvironment({
        cache: JSON.parse(window.__RELAY_BOOTSTRAP__ || "{}"),
        user,
      })

      return relayEnvironment
    },
    renderApp: ({ Router, relayEnvironment, routes }) => {
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
