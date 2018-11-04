import { createEnvironment } from "Artsy/Relay/createEnvironment"
import { Boot } from "Artsy/Router/Components/Boot"
import { Hydrator } from "Artsy/Router/Components/Hydrator"
import queryMiddleware from "farce/lib/queryMiddleware"
import { Resolver } from "found-relay"
import createRender from "found/lib/createRender"
import getFarceResult, {
  FarceRedirectionResult,
} from "found/lib/server/getFarceResult"
import { getLoadableState } from "loadable-components/server"
import React, { ComponentType } from "react"
import ReactDOMServer from "react-dom/server"
import { getUser } from "Utils/getUser"
import { trace } from "Utils/trace"
import { RouterConfig } from "./"

export interface Resolve {
  ServerApp: ComponentType<any>
  status: number
  headTags: any[]
}

export function isRedirect(
  farceResult: FarceRedirectionResult | object
): farceResult is FarceRedirectionResult {
  return (farceResult as FarceRedirectionResult).redirect !== undefined
}

export function buildServerApp(
  config: RouterConfig
): Promise<Resolve | FarceRedirectionResult> {
  return trace(
    "buildServerApp",
    new Promise(async (resolve, reject) => {
      try {
        const { context = {}, routes = [], url } = config
        const { initialMatchingMediaQueries, user } = context
        const _user = getUser(user)
        const relayEnvironment = createEnvironment({ user: _user })
        const historyMiddlewares = [queryMiddleware]
        const resolver = new Resolver(relayEnvironment)
        const render = createRender({})
        const headTags = []

        const farceResult = await trace(
          "buildServerApp.farceResults",
          getFarceResult({
            url,
            historyMiddlewares,
            routeConfig: routes,
            resolver,
            render,
          })
        )

        if (isRedirect(farceResult)) {
          resolve(farceResult)
          return
        } else {
          farceResult.element
        }

        const App = props => {
          return (
            <Boot
              context={context}
              user={_user}
              headTags={headTags}
              initialMatchingMediaQueries={initialMatchingMediaQueries}
              relayEnvironment={relayEnvironment}
              routes={routes}
            >
              <Hydrator
                data={props.data}
                loadableState={props.loadableState}
                url={url}
              >
                {farceResult.element}
              </Hydrator>
            </Boot>
          )
        }

        const { relayData, loadableState } = await trace(
          "buildServerApp.fetch",
          (async () => {
            // Kick off relay requests to prime cache
            ReactDOMServer.renderToString(<App />)
            // Serializable data to be rehydrated on client
            const data = await relayEnvironment.relaySSRMiddleware.getCache()
            const state = await getLoadableState(<App />)
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

        resolve({
          ServerApp: props => (
            <App data={relayData} loadableState={loadableState} {...props} />
          ),
          status: farceResult.status,
          headTags,
        })
      } catch (error) {
        console.error("[Artsy/Router/buildServerApp] Error:", error)
        reject(error)
      }
    })
  )
}
