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
import { Boot } from "Router/Components/Boot"
import { Hydrator } from "Router/Components/Hydrator"
import { getUser } from "Utils/getUser"
import { AppConfig2, ClientResolveProps } from "./types"

export function buildClientApp(
  config: AppConfig2
): Promise<ClientResolveProps> {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        context = {},
        history = {},
        initialRoute = "/",
        routes = [],
      } = config

      const { relayNetwork, user } = context
      const relayBootstrap = JSON.parse(window.__RELAY_BOOTSTRAP__ || "{}")
      const currentUser = getUser(user)
      const relayEnvironment = createEnvironment({
        cache: relayBootstrap,
        user: currentUser,
        relayNetwork,
      })

      const getHistoryProtocol = () => {
        switch (history.protocol) {
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
        historyOptions: history.options,
        routeConfig: routes,
        resolver,
        render,
      })

      try {
        await loadComponents()
      } catch (error) {
        // FIXME: https://github.com/smooth-code/loadable-components/pull/93
      }

      const ClientApp = props => {
        return (
          <Boot
            system={{
              ...config,
              relayEnvironment,
              resolver,
              routes,
              currentUser,
            }}
            {...props}
          >
            <Hydrator>
              <Router resolver={resolver} />
            </Hydrator>
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
