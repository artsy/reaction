import { RelaySSREnvironment } from "Artsy/Relay/createRelaySSREnvironment"
import { SystemContextProps } from "Artsy/SystemContext"
import { HistoryOptions, HistoryProtocol } from "farce"
import { RouteConfig } from "found"

export { Link } from "found"
export { SystemContextProvider, SystemContextConsumer } from "Artsy"

/**
 * Configuration used when creating a new Router app
 */
export interface RouterConfig {
  /** Context values to be passed to ArtsyContext */
  context?: SystemContextProps & { relayEnvironment?: RelaySSREnvironment }

  /**
   * Return additional items to pass to farce.
   * See https://github.com/4Catalyzer/farce
   */
  getFarceConfig?: () => object

  /** Return a relay environment to pass to the router */
  getRelayEnvironment?: () => RelaySSREnvironment

  /** Configuration options to be passed to Found router */
  history?: {
    /** Defines the type of history to use, depending on router environment. */
    protocol?: HistoryProtocol
    options?: HistoryOptions
  }

  /** Initial route for router on boot */
  initialRoute?: string

  /** Render function that returns a component tree to render */
  renderWrapper?: (props: {
    Router: React.FC
    relayEnvironment: RelaySSREnvironment
    routes: RouteConfig[]
  }) => React.ReactNode

  /** Array of routes to be passed to Found */
  routes: RouteConfig[]

  /** Server-side only. Used to sanitize or serialize Relay data */
  serializeRelayData?: (data: any) => any

  /** Server-side only. URL passed from server */
  url?: string
}
