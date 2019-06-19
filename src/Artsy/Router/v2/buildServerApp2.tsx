import qs from "qs"
import React from "react"
import ReactDOMServer from "react-dom/server"
import serialize from "serialize-javascript"
import { ServerStyleSheet } from "styled-components"

import createQueryMiddleware from "farce/lib/createQueryMiddleware"
import { Resolver } from "found-relay"
import createRender from "found/lib/createRender"
import { getFarceResult } from "found/lib/server"
import { RouterConfig } from "./RouterConfig"

interface Resolve {
  bodyHTML?: string
  redirect?: {
    url: string
  }
  scripts?: string
  status?: number
  styleTags?: string
}

export function buildServerApp(config: RouterConfig): Promise<Resolve> {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        routes = [],
        url = "/",
        renderWrapper = null,
        getFarceConfig = null,
        getRelayEnvironment = null,
        serializeRelayData = data => serialize(data, { json: true }),
      } = config

      const historyMiddlewares = [
        createQueryMiddleware({
          parse: qs.parse,
          stringify: qs.stringify,
        }),
      ]

      const relayEnvironment = getRelayEnvironment()
      const resolver = new Resolver(relayEnvironment)
      const render = createRender({})

      const { redirect, status, element } = await getFarceResult({
        url,
        historyMiddlewares,
        routeConfig: routes,
        resolver,
        render,
        ...getFarceConfig(),
      })

      if (redirect) {
        resolve({ redirect })
        return
      }

      const ServerApp = () => {
        if (renderWrapper) {
          return renderWrapper({
            Router: () => element,
            relayEnvironment,
            routes,
          })
        } else {
          return element
        }
      }

      // Collect styles
      const sheet = new ServerStyleSheet()

      // Kick off relay requests
      ReactDOMServer.renderToString(sheet.collectStyles(<ServerApp />))

      // Sanitize data
      const relayData = await relayEnvironment.relaySSRMiddleware.getCache()

      // Re-render with primed cache
      const bodyHTML = ReactDOMServer.renderToString(
        sheet.collectStyles(<ServerApp />)
      )

      // Build up script tags to inject into head
      const scripts = [
        `
        <script>
          var __RELAY_BOOTSTRAP__ = ${serializeRelayData(relayData)};
        </script>
      `,
      ].join("\n")

      // Extract CSS styleTags to inject for SSR pass
      const styleTags = sheet.getStyleTags()

      const result = {
        ServerApp: bodyHTML,
        bodyHTML,
        scripts,
        status,
        styleTags,
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
      console.log(error)
      reject(error)
    }
  })
}

export const __THOU_SHALT_NOT_FAFF_AROUND_WITH_THIS_HERE_OBJECT_WE_ARE_SERIOUS__ =
  typeof jest !== "undefined" ? Symbol() : null
