import React from "react"

import { Resolver } from "found-relay"
import { ScrollManager } from "found-scroll"
import createInitialFarceRouter from "found/lib/createInitialFarceRouter"
import createRender from "found/lib/createRender"

import BrowserProtocol from "farce/lib/BrowserProtocol"
import createQueryMiddleware from "farce/lib/createQueryMiddleware"
import HashProtocol from "farce/lib/HashProtocol"
import MemoryProtocol from "farce/lib/MemoryProtocol"
import qs from "qs"

const defaultConfig = {
  initialRoute: "/",
  history: {},
  routes: [],
  renderApp: () => <div />,
  getFarceConfig: () => ({}),
  getRelayEnvironment: null,
  getRouteConfig: null,
}

export function buildClientApp(config): any {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        history,
        initialRoute,
        getFarceConfig,
        getRelayEnvironment,
        getRouteConfig,
        renderApp,
        routes,
      } = Object.assign({}, defaultConfig, config)

      const relayEnvironment = getRelayEnvironment()

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

      const historyMiddlewares = [
        createQueryMiddleware({
          parse: qs.parse,
          stringify: qs.stringify,
        }),
      ]

      const resolver = new Resolver(relayEnvironment)

      const render = createRender({})

      const routeConfig = getRouteConfig ? getRouteConfig() : routes

      const Router = await createInitialFarceRouter({
        historyProtocol: getHistoryProtocol(),
        historyMiddlewares,
        historyOptions: history.options,
        routeConfig,
        resolver,
        render: renderArgs => (
          <ScrollManager renderArgs={renderArgs}>
            {render(renderArgs)}
          </ScrollManager>
        ),
        ...getFarceConfig(),
      })

      const App = () =>
        renderApp({
          relayEnvironment,
          routes: routeConfig,
          Router: () => <Router resolver={resolver} />,
        })

      resolve({
        ClientApp: App,
      })
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}
