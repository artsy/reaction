import { HistoryOptions, HistoryProtocol } from "farce"
import { RouteConfig } from "found"
import { RelayNetwork } from "relay-runtime"
import { MatchingMediaQueries } from "Utils/Responsive"

// Framework API Exports
export { buildServerApp } from "./buildServerApp"
export { buildClientApp } from "./buildClientApp"
export { PreloadLink, PreloadLinkProps } from "./Components/PreloadLink"
export { Link } from "found"
export { StorybooksRouter } from "./Components/StorybooksRouter"
export { Boot } from "./Components/Boot"
export { ContextProvider, ContextConsumer } from "./Artsy2"

/**
 * Configuration used when creating a new Router app
 */
export interface RouterConfig {
  /**
   * Context values to be passed to ArtsyContext
   */
  context?: {
    user?: User
    relayNetwork?: RelayNetwork
    initialMatchingMediaQueries?: MatchingMediaQueries
    [key: string]: any
  }
  /**
   * Configuration options to be passed to Found router
   */
  history?: {
    /**
     * Defines the type of history to use, depending on router environment.
     */
    protocol?: HistoryProtocol
    options?: HistoryOptions
  }
  /**
   * Initial route for router on boot
   */
  initialRoute?: string
  /**
   * Array of routes to be passed to Found
   */
  routes: RouteConfig
  /**
   * URL passed from server
   */
  url?: string
}
