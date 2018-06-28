import { RouteConfig } from "found"
import { ComponentType } from "react"
import { Breakpoint } from "Styleguide/Utils/Responsive"
import { ContextProps } from "../Components/Artsy"

type ReactComponent = ComponentType<any>
type HistoryProtocol = "browser" | "hash" | "memory"

export interface AppConfig {
  boot?: {
    breakpoint: Breakpoint
  }
  historyProtocol?: HistoryProtocol
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

export interface Router {
  routes: RouteConfig
  resolver: any // FIXME
}

export interface AppShellProps {
  loadableState?: {
    getScriptTag: () => string
  }
  data?: Array<object>
  provide?: ContextProps
}

export interface PreloadLinkProps extends ContextProps {
  children?: any
  exact?: boolean
  immediate?: boolean
  name?: string
  onClick?: () => void
  onToggleFetching?: (isLoading: boolean) => void
  replace?: string
  router?: any // TODO
  to?: string
}

export interface PreloadLinkState {
  isFetching: boolean
}
