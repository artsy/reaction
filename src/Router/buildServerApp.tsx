import React, { ComponentType } from "react"
import ReactDOMServer from "react-dom/server"
import createRender from "found/lib/createRender"
import queryMiddleware from "farce/lib/queryMiddleware"
import { AppShell } from "./AppShell"
import { Resolver } from "found-relay"
import { RouteConfig } from "found"
import { createRelayEnvironment } from "./relayEnvironment"
import { getFarceResult } from "found/lib/server"
import { getLoadableState } from "loadable-components/server"

interface ResolveProps {
  ServerApp?: ComponentType<any>
  redirect?: string
  status?: string
}

export function buildServerApp(
  routeConfig: RouteConfig,
  currentRoute = "/"
): Promise<ResolveProps> {
  return new Promise(async (resolve, reject) => {
    try {
      if (!process.env.SSR_ENABLED) {
        return resolve()
      }

      const relayEnvironment = createRelayEnvironment()
      const historyMiddlewares = [queryMiddleware]
      const resolver = new Resolver(relayEnvironment)
      const render = createRender({})

      const { redirect, status, element } = await getFarceResult({
        url: currentRoute,
        historyMiddlewares,
        routeConfig,
        resolver,
        render,
      })

      if (redirect) {
        resolve({
          redirect,
          status,
        })

        return
      }

      const AppContainer = props => {
        return (
          <AppShell
            relayData={props.relayData}
            loadableState={props.loadableState}
            provide={{
              relayEnvironment,
              reactionRouter: {
                resolver,
                routeConfig,
              },
            }}
            {...props}
          >
            {element}
          </AppShell>
        )
      }

      // Kick off relay requests to prime cache
      ReactDOMServer.renderToString(<AppContainer />)

      // Serializable data to be rehydrated on client
      const relayData = await relayEnvironment.relaySSRMiddleware.getCache()
      const loadableState = await getLoadableState(<AppContainer />)

      resolve({
        ServerApp: props => (
          <AppContainer
            relayData={relayData}
            loadableState={loadableState}
            {...props}
          />
        ),
        status,
      })
    } catch (error) {
      console.error("[Reaction Router/buildClientApp] Error:", error)
      reject(error)
    }
  })
}
