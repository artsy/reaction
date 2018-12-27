import { createRelaySSREnvironment } from "Artsy/Relay/createRelaySSREnvironment"
import { Boot } from "Artsy/Router/Components/Boot"
import queryMiddleware from "farce/lib/queryMiddleware"
import { Resolver } from "found-relay"
import createRender from "found/lib/createRender"
import { getFarceResult } from "found/lib/server"
import { getLoadableState } from "loadable-components/server"
import React, { ComponentType } from "react"
import ReactDOMServer from "react-dom/server"
import serialize from "serialize-javascript"
import { getUser } from "Utils/getUser"
import { createMediaStyle } from "Utils/Responsive"
import { trace } from "Utils/trace"
import { RouterConfig } from "./"
import { createRouteConfig } from "./Utils/createRouteConfig"
import { matchingMediaQueriesForUserAgent } from "./Utils/matchingMediaQueriesForUserAgent"

interface Resolve {
  ServerApp?: ComponentType<any>
  redirect?: {
    url: string
  }
  status?: number
  headTags?: any[]
  scripts?: string
}

// No need to invoke this for each request.
const MediaStyle = createMediaStyle()

export interface ServerRouterConfig extends RouterConfig {
  userAgent?: string
}

export function buildServerApp(config: ServerRouterConfig): Promise<Resolve> {
  return trace(
    "buildServerApp",
    new Promise(async (resolve, reject) => {
      try {
        const { context = {}, routes = [], url, userAgent } = config
        const user = getUser(context.user)
        const relayEnvironment =
          context.relayEnvironment || createRelaySSREnvironment({ user })
        const historyMiddlewares = [queryMiddleware]
        const resolver = new Resolver(relayEnvironment)
        const render = createRender({})

        const { redirect, status, element } = await trace(
          "buildServerApp.farceResults",
          getFarceResult({
            url,
            historyMiddlewares,
            routeConfig: createRouteConfig(routes),
            resolver,
            render,
          })
        )

        if (redirect) {
          resolve({
            redirect,
            // TODO: The docs seem to indicate that if there’s a redirect there
            //       will not be a status.
            //       https://github.com/4Catalyzer/found#server-side-rendering
            status,
          })
          return
        }

        const headTags = [<style type="text/css">{MediaStyle}</style>]
        const matchingMediaQueries =
          userAgent && matchingMediaQueriesForUserAgent(userAgent)

        const ServerApp = () => {
          return (
            <Boot
              context={context}
              user={user}
              headTags={headTags}
              onlyMatchMediaQueries={matchingMediaQueries}
              relayEnvironment={relayEnvironment}
              resolver={resolver}
              routes={routes}
            >
              {element}
            </Boot>
          )
        }

        const { relayData, loadableState } = await trace(
          "buildServerApp.fetch",
          (async () => {
            // Kick off relay requests to prime cache
            // TODO: Remove the need to do this by using persisted queries.
            ReactDOMServer.renderToString(<ServerApp />)
            // Serializable data to be rehydrated on client
            const data = await relayEnvironment.relaySSRMiddleware.getCache()
            const state = await getLoadableState(<ServerApp />)
            return { relayData: data, loadableState: state }
          })()
        )

        /**
         * FIXME: Relay SSR middleware is passing a _res object across which
         * has circular references, leading to issues *ONLY* on staging / prod
         * which can't be reproduced locally. This strips out _res as a quickfix
         * though this should be PR'd back at relay-modern-network-modern-ssr.
         */
        try {
          relayData.forEach(item => {
            item.forEach(i => {
              delete i._res
            })
          })
        } catch (error) {
          console.error(
            "[Artsy/Router/buildServerApp] Error cleaning data",
            error
          )
        }

        const scripts = []
        loadableState && scripts.push(loadableState.getScriptTag())
        scripts.push(`
          <script>
            var __RELAY_BOOTSTRAP__ = ${serializeRelayData(relayData)};
          </script>
        `)

        resolve({
          ServerApp,
          status,
          headTags,
          scripts: scripts.join("\n"),
        })
      } catch (error) {
        console.error("[Artsy/Router/buildServerApp] Error:", error)
        reject(error)
      }
    })
  )
}

function serializeRelayData(relayData: any) {
  let hydrationData
  try {
    hydrationData = serialize(relayData, {
      isJSON: true,
    })
  } catch (error) {
    hydrationData = "{}"
    console.error(
      "reaction/Router/buildServerApp Error serializing data:",
      error
    )
  }
  return serialize(hydrationData || {}, {
    isJSON: true,
  })
}
