import { RouteConfig } from "found"
import { Environment } from "relay-runtime"
import { Container, SubscribeProps } from "unstated"
import { Breakpoint } from "Utils/Responsive"
import { ContextProps } from "../Components/Artsy"

type HistoryProtocol = "browser" | "hash" | "memory"

export interface AppConfig {
  historyProtocol?: HistoryProtocol
  initialBreakpoint?: Breakpoint
  initialRoute?: string
  initialState?: Array<Container<any>>
  initialAppState?: object // TODO: Deprecated
  routes: RouteConfig

  // TODO: What is this used for?
  url?: string
  user?: User
}

export interface AppProps {
  subscribeTo?: SubscribeProps["to"]
  // Copied to change return type
  children?: (...instances: Array<Container<any>>) => void
}

export type App = React.SFC<AppProps>

export interface ClientResolveProps {
  ClientApp: App
}

export interface ServerResolveProps {
  ServerApp?: App
  redirect?: string
  status?: string
}

export interface Router {
  currentUser: User
  relayEnvironment: Environment
  routes: RouteConfig
  resolver: any // FIXME
}

// TODO: Neither of these things should be state, they should use the Artsy
//       context.
export interface AppStateContainer {
  mediator?: any
  system: Router
}

export interface PreloadLinkProps extends ContextProps, AppStateContainer {
  children?: any
  exact?: boolean
  immediate?: boolean
  name?: string
  onClick?: () => void
  onToggleLoading?: (isLoading: boolean) => void
  replace?: string
  to?: string
  router?: any // TODO: found
}

export interface PreloadLinkContainer {
  isLoading: boolean
}
