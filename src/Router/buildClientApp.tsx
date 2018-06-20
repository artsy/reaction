import BrowserProtocol from "farce/lib/BrowserProtocol"
import HashProtocol from "farce/lib/HashProtocol"
import MemoryProtocol from "farce/lib/MemoryProtocol"
import queryMiddleware from "farce/lib/queryMiddleware"
import { Resolver } from "found-relay"
import createInitialFarceRouter from "found/lib/createInitialFarceRouter"
import createRender from "found/lib/createRender"
import { loadComponents } from "loadable-components"
import React from "react"
import { data as sd } from "sharify"
import { createEnvironment } from "../Relay/createEnvironment"
import { AppShell } from "./AppShell"
import { AppConfig, ClientResolveProps } from "./types"

export function buildClientApp(config: AppConfig): Promise<ClientResolveProps> {
  return new Promise(async (resolve, reject) => {
    try {
      const { routes, historyProtocol = "browser" } = config
      const relayBootstrap = JSON.parse(window.__RELAY_BOOTSTRAP__ || "{}")

      const relayEnvironment = createEnvironment({
        cache: relayBootstrap,
        user: (sd as any).CURRENT_USER, // FIXME: https://github.com/artsy/reaction/pull/704#pullrequestreview-12508005
      })

      const getHistoryProtocol = () => {
        switch (historyProtocol) {
          case "browser":
            return new BrowserProtocol()
          case "hash":
            return new HashProtocol()
          case "memory":
            return new MemoryProtocol("/")
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

      const provide = {
        relayEnvironment,
        reactionRouter: {
          routes,
          resolver,
        },
      }

      try {
        await loadComponents()
      } catch (error) {
        // FIXME: https://github.com/smooth-code/loadable-components/pull/93
      }

      const ClientApp = props => {
        return (
          <AppShell provide={provide} {...props}>
            <Router resolver={resolver} />
          </AppShell>
        )
      }

      resolve({ ClientApp })
    } catch (error) {
      console.error("[Reaction Router/buildClientApp]", error)
    }
  })
}
