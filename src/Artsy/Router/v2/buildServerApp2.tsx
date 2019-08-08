import queryMiddleware from "farce/lib/queryMiddleware"
import { Resolver } from "found-relay"
import createRender from "found/lib/createRender"
import { getFarceResult } from "found/lib/server"
import React from "react"
import ReactDOMServer from "react-dom/server"
import serialize from "serialize-javascript"
import { ServerStyleSheet } from "styled-components"

// import { createRelayEnvironment } from "./createRelayEnvironment"

// const defaultConfig = {
//   routes: [],
//   url: "/",
//   renderApp: () => <div />,
//   getFarceConfig: () => ({}),
//   getRelayEnvironment: null,
//   serializeRelayData: data => data,
// }

// export function buildServerApp(config): any {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const { routes, url, renderApp, getFarceConfig } = Object.assign({
//         ...defaultConfig,
//         ...config,
//       })

//       const relayEnvironment = createRelayEnvironment()
//       const historyMiddlewares = [queryMiddleware]
//       const resolver = new Resolver(relayEnvironment)
//       const render = createRender({})

//       const { redirect, status, element } = await getFarceResult({
//         url,
//         historyMiddlewares,
//         routeConfig: routes,
//         resolver,
//         render,
//         ...getFarceConfig(),
//       })

//       if (redirect) {
//         resolve({ redirect })
//         return
//       }

//       const App = () =>
//         renderApp({
//           element,
//           relayEnvironment,
//           resolver,
//           routes,
//           status,
//         })

//       // Collect styles
//       const sheet = new ServerStyleSheet()

//       // Kick off relay requests
//       ReactDOMServer.renderToString(sheet.collectStyles(<App />))

//       // Sanitize data
//       const relayData = serialize(
//         await relayEnvironment.relaySSRMiddleware.getCache()
//       )

//       // Re-render with primed cache
//       const bodyHTML = ReactDOMServer.renderToString(
//         sheet.collectStyles(<App />)
//       )

//       // Build up script tags to inject into head
//       const scriptTags = [
//         `
//         <script>
//           var __RELAY_BOOTSTRAP__ = ${serialize(relayData)};
//         </script>
//       `,
//       ].join("\n")

//       // Extract CSS styleTags to inject for SSR pass
//       const styleTags = sheet.getStyleTags()

//       resolve({
//         bodyHTML,
//         scriptTags,
//         styleTags,
//       })
//     } catch (error) {
//       console.log(error)
//       reject(error)
//     }
//   })
// }
