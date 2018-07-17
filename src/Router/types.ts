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
  initialAppState?: object // TODO: Deprecated
  routes: RouteConfig
  user?: User

  // TODO: This is only used by the server app and so maybe it should move into
  //       a server app config interface that extends this AppConfig interface?
  //       That way it can be made required as well and inform the caller that
  //       the argument is needed, right now that won’t happen.
  url?: string

  // TODO: This could get some generics so that the callback is typed and maybe
  //       the various ‘apps’ (artist, artwork, etc) could have their own
  //       exported `build*App` variants that only specify the types of
  //       available state that can be provided/subscribed to by the host. E.g.
  //
  //         export buildArtistClientApp: BuildClientApp<[FilterState]> = buildClientApp
  //
  initialState?: Array<Container<any>>
  subscribe?: {
    to: SubscribeProps["to"]
    onChange: (...instances: Array<Container<any>>) => void
  }
}

export type App = React.ComponentType<{}>

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
