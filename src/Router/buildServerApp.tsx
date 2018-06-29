import queryMiddleware from "farce/lib/queryMiddleware"
import { Resolver } from "found-relay"
import createRender from "found/lib/createRender"
import { getFarceResult } from "found/lib/server"
import { getLoadableState } from "loadable-components/server"
import React from "react"
import ReactDOMServer from "react-dom/server"
import { createEnvironment } from "../Relay/createEnvironment"
import { AppShell } from "./AppShell"
import { Boot } from "./Boot"
import { AppConfig, ServerResolveProps } from "./types"

export function buildServerApp(config: AppConfig): Promise<ServerResolveProps> {
  return new Promise(async (resolve, reject) => {
    try {
      const { routes, url, user } = config
      const relayEnvironment = createEnvironment({
        // FIXME: Might be a better way to do this...
        user: user || {
          id: process.env.USER_ID,
          accessToken: process.env.USER_ACCESS_TOKEN,
        },
      })
      const historyMiddlewares = [queryMiddleware]
      const resolver = new Resolver(relayEnvironment)
      const render = createRender({})

      const { redirect, status, element } = await getFarceResult({
        url,
        historyMiddlewares,
        routeConfig: routes,
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

      const router = {
        relayEnvironment,
        resolver,
        routes,
      }

      const AppContainer = props => {
        return (
          <Boot {...config} reactionRouter={router} {...props}>
            <AppShell
              data={props.relayData}
              loadableState={props.loadableState}
              {...props}
            >
              {element}
            </AppShell>
          </Boot>
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
            data={relayData}
            loadableState={loadableState}
            {...props}
          />
        ),
        status,
      })
    } catch (error) {
      console.error("[Reaction Router/buildServerApp] Error:", error)
      reject(error)
    }
  })
}
