import { createRelaySSREnvironment } from "Artsy/Relay/createRelaySSREnvironment"
import { Boot } from "Artsy/Router/Components/Boot"
import BrowserProtocol from "farce/lib/BrowserProtocol"
import HashProtocol from "farce/lib/HashProtocol"
import MemoryProtocol from "farce/lib/MemoryProtocol"
import queryMiddleware from "farce/lib/queryMiddleware"
import { Resolver } from "found-relay"
import { ScrollManager } from "found-scroll"
import createInitialFarceRouter from "found/lib/createInitialFarceRouter"
import createRender from "found/lib/createRender"
import React, { ComponentType } from "react"
import { getUser } from "Utils/getUser"
import { RouterConfig } from "./"
import { createRouteConfig } from "./Utils/createRouteConfig"

interface Resolve {
  ClientApp: ComponentType<any>
}

export function buildClientApp(config: RouterConfig): Promise<Resolve> {
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
      const _user = getUser(user)
      const relayEnvironment =
        context.relayEnvironment ||
        createRelaySSREnvironment({
          cache: relayBootstrap,
          user: _user,
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
        routeConfig: createRouteConfig(routes),
        resolver,
        render: renderArgs => (
          <ScrollManager renderArgs={renderArgs}>
            {render(renderArgs)}
          </ScrollManager>
        ),
      })

      const ClientApp = () => {
        return (
          <Boot
            context={context}
            user={_user}
            relayEnvironment={relayEnvironment}
            resolver={resolver}
            routes={routes}
          >
            <Router resolver={resolver} />
          </Boot>
        )
      }

      resolve({
        ClientApp,
      })
    } catch (error) {
      console.error("[Artsy/Router/buildClientApp]", error)
      reject(error)
    }
  })
}
