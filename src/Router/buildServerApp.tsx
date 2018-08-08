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
import { getUser } from "./getUser"
import { AppConfig, ServerResolveProps } from "./types"

export function buildServerApp(config: AppConfig): Promise<ServerResolveProps> {
  return new Promise(async (resolve, reject) => {
    try {
      const { routes, url, user, initialMatchingMediaQueries } = config
      const currentUser = getUser(user)
      const relayEnvironment = createEnvironment({ user: currentUser })
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
        resolve({ redirect, status })
        return
      }

      const bootProps = {
        initialMatchingMediaQueries,
        system: {
          ...config,
          relayEnvironment,
          resolver,
          routes,
          currentUser,
        },
      }

      const AppContainer = props => {
        return (
          <Boot {...bootProps} {...props}>
            <AppShell
              data={props.relayData}
              loadableState={props.loadableState}
              url={url}
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
        console.error("Router/buildServerApp Error cleaning data", error)
      }

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
      console.error("[Reaction Router/buildServerApp] Error:", error)
      reject(error)
    }
  })
}
