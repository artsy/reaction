import { createRelaySSREnvironment } from "Artsy/Relay/createRelaySSREnvironment"
import { Boot } from "Artsy/Router/Components/Boot"
import queryMiddleware from "farce/lib/queryMiddleware"
import { Resolver } from "found-relay"
import createRender from "found/lib/createRender"
import { getFarceResult } from "found/lib/server"
import React from "react"
import ReactDOMServer from "react-dom/server"
import serialize from "serialize-javascript"
import { ServerStyleSheet } from "styled-components"
import { getUser } from "Utils/getUser"
import createLogger from "Utils/logger"
import { createMediaStyle } from "Utils/Responsive"
import { trace } from "Utils/trace"
import { RouterConfig } from "./"
import { createRouteConfig } from "./Utils/createRouteConfig"
import { matchingMediaQueriesForUserAgent } from "./Utils/matchingMediaQueriesForUserAgent"

interface Resolve {
  bodyHTML?: string
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

const logger = createLogger("Artsy/Router/buildServerApp.tsx")

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

        const { relayData: _relayData, styleTags, bodyHTML } = await trace(
          "buildServerApp.fetch",
          (async () => {
            const sheet = new ServerStyleSheet()
            // Kick off relay requests to prime cache.
            // TODO: Remove the need to do this by using persisted queries.
            ReactDOMServer.renderToString(sheet.collectStyles(<ServerApp />))
            // Get serializable Relay data for rehydration on the client
            const data = await relayEnvironment.relaySSRMiddleware.getCache()
            // Render tree again, but this time with Relay data being available.
            const html = ReactDOMServer.renderToString(
              sheet.collectStyles(<ServerApp />)
            )
            // Extract CSS styleTags to inject for SSR pass
            const tags = sheet.getStyleTags()

            return {
              relayData: data,
              styleTags: tags,
              bodyHTML: html,
            }
          })()
        )

        // Strip response of problematic data structures
        const relayData = cleanRelayData(_relayData)

        // Build up script tags to inject into head
        const scripts = []
        scripts.push(`
          <script>
            var __RELAY_BOOTSTRAP__ = ${serializeRelayData(relayData)};
          </script>
        `)

        const result = {
          bodyHTML,
          status,
          headTags,
          styleTags,
          scripts: scripts.join("\n"),
        }

        // Only exporting this for testing purposes, don't go around using this
        // elsewhere, we’re serious.
        if (typeof jest !== "undefined") {
          Object.defineProperty(
            result,
            __THOU_SHALT_NOT_FAFF_AROUND_WITH_THIS_HERE_OBJECT_WE_ARE_SERIOUS__,
            { value: ServerApp }
          )
        }

        resolve(result)
      } catch (error) {
        logger.error(error)
        reject(error)
      }
    })
  )
}

export const __THOU_SHALT_NOT_FAFF_AROUND_WITH_THIS_HERE_OBJECT_WE_ARE_SERIOUS__ =
  typeof jest !== "undefined" ? Symbol() : null

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
