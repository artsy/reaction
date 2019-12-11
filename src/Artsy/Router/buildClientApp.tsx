import React, { ComponentType } from "react"

import { Resolver } from "found-relay"
import { ScrollManager } from "found-scroll"
import createInitialFarceRouter from "found/lib/createInitialFarceRouter"
import createRender from "found/lib/createRender"

import BrowserProtocol from "farce/lib/BrowserProtocol"
import createQueryMiddleware from "farce/lib/createQueryMiddleware"
import HashProtocol from "farce/lib/HashProtocol"
import MemoryProtocol from "farce/lib/MemoryProtocol"
import qs from "qs"

import createLogger from "Utils/logger"
import { getUser } from "Utils/user"
import { createRouteConfig } from "./Utils/createRouteConfig"
import { queryStringParsing } from "./Utils/queryStringParsing"

import { createRelaySSREnvironment } from "Artsy/Relay/createRelaySSREnvironment"
import { Boot } from "Artsy/Router/Boot"

import { RouterConfig } from "./"

import { RenderError, RenderPending, RenderReady } from "./Utils/RenderStatus"

interface Resolve {
  ClientApp: ComponentType<any>
}

const logger = createLogger("Artsy/Router/buildClientApp.tsx")

export function buildClientApp(config: RouterConfig): Promise<Resolve> {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        context = {},
        history = {},
        initialRoute = "/",
        routes = [],
      } = config

      const user = getUser(context.user)
      const relayEnvironment =
        context.relayEnvironment ||
        createRelaySSREnvironment({
          cache: JSON.parse(window.__RELAY_BOOTSTRAP__ || "{}"),
          user,
          userAgent: (navigator && navigator.userAgent) || undefined,
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

      const historyMiddlewares = [
        createQueryMiddleware({
          parse: queryStringParsing,
          stringify: qs.stringify,
        }),
      ]
      const resolver = new Resolver(relayEnvironment)

      const Renderer = createRender({
        renderPending: RenderPending,
        renderReady: RenderReady,
        renderError: RenderError,
      })

      const Router = await createInitialFarceRouter({
        historyProtocol: getHistoryProtocol(),
        historyMiddlewares,
        historyOptions: history.options,
        routeConfig: createRouteConfig(routes),
        matchContext: { user },
        resolver,
        render: renderArgs => {
          return (
            <ScrollManager renderArgs={renderArgs}>
              <Renderer {...renderArgs} />
            </ScrollManager>
          )
        },
      })

      const ClientApp = () => {
        return (
          <Boot
            context={context}
            user={user}
            relayEnvironment={relayEnvironment}
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
      logger.error(error)
      reject(error)
    }
  })
}
