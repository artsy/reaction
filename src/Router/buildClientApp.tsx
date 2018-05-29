import BrowserProtocol from "farce/lib/BrowserProtocol"
import React, { ComponentType } from "react"
import createInitialFarceRouter from "found/lib/createInitialFarceRouter"
import createRender from "found/lib/createRender"
import queryMiddleware from "farce/lib/queryMiddleware"
import { AppShell } from "./AppShell"
import { Resolver } from "found-relay"
import { RouteConfig } from "found"
import { createRelayEnvironment } from "./relayEnvironment"
import { loadComponents } from "loadable-components"

interface ResolveProps {
  ClientApp: ComponentType<any>
}

export function buildClientApp(
  routeConfig: RouteConfig
): Promise<ResolveProps> {
  return new Promise(async (resolve, reject) => {
    try {
      const bootstrap = JSON.parse(window.__RELAY_BOOTSTRAP__ || "{}")
      const relayEnvironment = createRelayEnvironment(bootstrap)
      const historyMiddlewares = [queryMiddleware]
      const resolver = new Resolver(relayEnvironment)
      const render = createRender({})
      const Router = await createInitialFarceRouter({
        historyProtocol: new BrowserProtocol(),
        historyMiddlewares,
        routeConfig,
        resolver,
        render,
      })

      const provide = {
        relayEnvironment,
        reactionRouter: {
          routeConfig,
          resolver,
        },
      }

      if (process.env.SSR_ENABLED) {
        try {
          await loadComponents()
        } catch (error) {
          // FIXME: https://github.com/smooth-code/loadable-components/pull/93
        }
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
