import BrowserProtocol from "farce/lib/BrowserProtocol"
import HashProtocol from "farce/lib/HashProtocol"
import MemoryProtocol from "farce/lib/MemoryProtocol"
import queryMiddleware from "farce/lib/queryMiddleware"
import { Resolver } from "found-relay"
import createInitialFarceRouter from "found/lib/createInitialFarceRouter"
import createRender from "found/lib/createRender"
import { loadComponents } from "loadable-components"
import React from "react"
import { createEnvironment } from "Relay/createEnvironment"
import { AppShell } from "./AppShell"
import { Boot } from "./Boot"
import { AppConfig, ClientResolveProps } from "./types"

export function buildClientApp(config: AppConfig): Promise<ClientResolveProps> {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        routes,
        user,
        historyProtocol = "browser",
        initialRoute = "/",
        relayNetwork,
      } = config

      const relayBootstrap = JSON.parse(window.__RELAY_BOOTSTRAP__ || "{}")

      let currentUser = user
      if (process.env.USER_ID && process.env.USER_ACCESS_TOKEN) {
        currentUser = currentUser || {
          id: process.env.USER_ID,
          accessToken: process.env.USER_ACCESS_TOKEN,
        }
      }

      const relayEnvironment = createEnvironment({
        cache: relayBootstrap,
        user: currentUser,
        relayNetwork,
      })

      const getHistoryProtocol = () => {
        switch (historyProtocol) {
          case "browser":
            return new BrowserProtocol()
          case "hash":
            return new HashProtocol()
          case "memory":
            return new MemoryProtocol(initialRoute)
          default:
            return new BrowserProtocol()
        }
      }

      const historyMiddlewares = [queryMiddleware]
      const resolver = new Resolver(relayEnvironment)
      const render = createRender({})
      const Router = await createInitialFarceRouter({
        historyProtocol: getHistoryProtocol(),
        historyMiddlewares,
        routeConfig: routes,
        resolver,
        render,
      })

      const bootProps = {
        system: {
          ...config,
          relayEnvironment,
          resolver,
          routes,
          currentUser,
        },
      }

      try {
        await loadComponents()
      } catch (error) {
        // FIXME: https://github.com/smooth-code/loadable-components/pull/93
      }

      const ClientApp = props => {
        return (
          <Boot {...bootProps} {...props}>
            <AppShell>
              <Router resolver={resolver} />
            </AppShell>
          </Boot>
        )
      }

      resolve({
        ClientApp,
      })
    } catch (error) {
      console.error("[Reaction Router/buildClientApp]", error)
    }
  })
}
