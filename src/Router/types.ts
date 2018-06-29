import { RouteConfig } from "found"
import { ComponentType } from "react"
import { Environment } from "relay-runtime"
import { Breakpoint } from "Styleguide/Utils/Responsive"
import { ContextProps } from "../Components/Artsy"

type ReactComponent = ComponentType<any>
type HistoryProtocol = "browser" | "hash" | "memory"

export interface AppConfig {
  historyProtocol?: HistoryProtocol
  initialBreakpoint?: Breakpoint
  initialRoute?: string
  routes: RouteConfig
  url?: string
  user?: User
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
}

export interface Router {
  relayEnvironment: Environment
  routes: RouteConfig
  resolver: any // FIXME
}

export interface BootProps extends GlobalStateContainer {
  initialBreakpoint?: Breakpoint
  [x: string]: any // User can pass in any properties on boot
}

export interface GlobalStateContainer {
  system?: Router
}

export interface PreloadLinkProps extends ContextProps, GlobalStateContainer {
  children?: any
  exact?: boolean
  immediate?: boolean
  name?: string
  onClick?: () => void
  onToggleFetching?: (isLoading: boolean) => void
  replace?: string
  router?: any // TODO, from found
  to?: string
}

export interface PreloadLinkContainer {
  isFetching: boolean
}
