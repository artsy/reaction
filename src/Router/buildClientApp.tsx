import BrowserProtocol from "farce/lib/BrowserProtocol"
import React from "react"
import createInitialFarceRouter from "found/lib/createInitialFarceRouter"
import createRender from "found/lib/createRender"
import queryMiddleware from "farce/lib/queryMiddleware"
import { AppShell } from "./AppShell"
import { Resolver } from "found-relay"
import { createEnvironment } from "../Relay/createEnvironment"
import { loadComponents } from "loadable-components"
import { data as sd } from "sharify"
import { AppConfig, ClientResolveProps } from "./types"

export function buildClientApp(config: AppConfig): Promise<ClientResolveProps> {
  return new Promise(async (resolve, reject) => {
    try {
      const { routes } = config
      const relayBootstrap = JSON.parse(window.__RELAY_BOOTSTRAP__ || "{}")

      const relayEnvironment = createEnvironment({
        cache: relayBootstrap,
        user: sd.CURRENT_USER,
      })

      const historyMiddlewares = [queryMiddleware]
      const resolver = new Resolver(relayEnvironment)
      const render = createRender({})
      const Router = await createInitialFarceRouter({
        historyProtocol: new BrowserProtocol(),
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
