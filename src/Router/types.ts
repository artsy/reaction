import { RouteConfig } from "found"
import { ComponentType } from "react"
import { Environment, RelayNetwork } from "relay-runtime"
import { NewResponsiveProviderProps } from "Utils/Responsive"

type ReactComponent = ComponentType<any>
type HistoryProtocol = "browser" | "hash" | "memory"
export interface HistoryOptions {
  useBeforeUnload?: boolean
}
export type MatchingMediaQueries = NewResponsiveProviderProps["initialMatchingMediaQueries"]

export interface AppConfig {
  historyProtocol?: HistoryProtocol
  historyOptions?: HistoryOptions
  initialMatchingMediaQueries?: MatchingMediaQueries
  initialRoute?: string
  routes: RouteConfig
  url?: string
  user?: User
  relayNetwork?: RelayNetwork
}

export interface AppConfig2 {
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

export interface ClientResolveProps {
  ClientApp: ReactComponent
}

export interface ServerResolveProps {
  ServerApp?: ReactComponent
  redirect?: string
  status?: string
}

export interface AppShellProps {
  loadableState?: {
    getScriptTag: () => string
  }
  data?: Array<object>
  url?: string
}

export interface Router {
  currentUser: User
  relayEnvironment: Environment
  routes: RouteConfig
  resolver: any // FIXME
}

export interface AppStateContainer {
  system?: Router
}

export interface BootProps extends AppStateContainer {
  currentUser?: User
  initialMatchingMediaQueries?: MatchingMediaQueries
  relayEnvironment?: Environment
  [x: string]: any // User can pass in any properties on boot
}

export interface PreloadLinkContainer {
  isLoading: boolean
}
