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
import { collectSSRStyles } from "Utils/collectSSRStyles"
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
  styleTags?: string
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
        const relayEnvironment = context.relayEnvironment || createRelaySSREnvironment({ user }) // prettier-ignore
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
          resolve({ redirect })
          return
        }

        const headTags = [<style type="text/css">{MediaStyle}</style>]
        const matchingMediaQueries = userAgent && matchingMediaQueriesForUserAgent(userAgent) // prettier-ignore

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

        const { loadableState, relayData: _relayData, styleTags } = await trace(
          "buildServerApp.fetch",
          (async () => {
            // Kick off relay requests to prime cache. TODO: Remove the need to
            // do this by using persisted queries.
            ReactDOMServer.renderToString(<ServerApp />)
            // Extract render queue for bundle split components using dyanamic `import()`
            const state = await getLoadableState(<ServerApp />)
            // Extract CSS styleTags to inject for SSR pass
            const tags = collectSSRStyles(<ServerApp />)
            // Get serializable Relay data for rehydration on the client
            const data = await relayEnvironment.relaySSRMiddleware.getCache()

            return {
              loadableState: state,
              relayData: data,
              styleTags: tags,
            }
          })()
        )

        // Strip response of problematic data structures
        const relayData = cleanRelayData(_relayData)

        // Build up script tags to inject into head
        const scripts = []
        if (loadableState) {
          scripts.push(loadableState.getScriptTag())
        }

        scripts.push(`
          <script>
            var __RELAY_BOOTSTRAP__ = ${serializeRelayData(relayData)};
          </script>
        `)

        resolve({
          ServerApp,
          status,
          headTags,
          styleTags,
          scripts: scripts.join("\n"),
        })
      } catch (error) {
        console.error("[Artsy/Router/buildServerApp] Error:", error)
        reject(error)
      }
    })
  )
}

/**
 * FIXME: Relay SSR middleware is passing a _res object across which
 * has circular references, leading to issues *ONLY* on staging / prod
 * which can't be reproduced locally. This strips out _res as a quickfix
 * though this should be PR'd back at relay-modern-network-modern-ssr.
 */
function cleanRelayData(relayData: any) {
  try {
    relayData.forEach(item => {
      item.forEach(i => {
        delete i._res
      })
    })
  } catch (error) {
    console.error("[Artsy/Router/buildServerApp] Error cleaning data", error)
  }

  return relayData
}
/**
 * Serialize data for client-side consumption
 */
function serializeRelayData(relayData: any) {
  let hydrationData
  try {
    hydrationData = serialize(relayData, {
      isJSON: true,
    })
  } catch (error) {
    hydrationData = "{}"
    console.error(
      "[Artsy/Router/buildServerApp] Error serializing data:",
      error
    )
  }
  return serialize(hydrationData || {}, {
    isJSON: true,
  })
}
