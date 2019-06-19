import queryMiddleware from "farce/lib/queryMiddleware"
import { Resolver } from "found-relay"
import createRender from "found/lib/createRender"
import { getFarceResult } from "found/lib/server"
import React from "react"
import ReactDOMServer from "react-dom/server"
import serialize from "serialize-javascript"
import { ServerStyleSheet } from "styled-components"

export function buildServerApp(config): any {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        routes = [],
        url = "/",
        renderApp = () => <div />,
        getFarceConfig = null,
        getRelayEnvironment = null,
        serializeRelayData = data => serialize(data, { json: true }),
      } = config

      const relayEnvironment = getRelayEnvironment()
      const historyMiddlewares = [queryMiddleware]
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

      const App = () =>
        renderApp({
          Router: () => element,
          relayEnvironment,
          routes,
          status,
        })

      // Collect styles
      const sheet = new ServerStyleSheet()

      // Kick off relay requests
      ReactDOMServer.renderToString(sheet.collectStyles(<App />))

      // Sanitize data
      const relayData = await relayEnvironment.relaySSRMiddleware.getCache()

      // Re-render with primed cache
      const bodyHTML = ReactDOMServer.renderToString(
        sheet.collectStyles(<App />)
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

      resolve({
        bodyHTML,
        scripts,
        styleTags,
      })
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}
