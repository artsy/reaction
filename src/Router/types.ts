import { RouteConfig } from "found"
import { ComponentType } from "react"
import { ContextProps } from "../Components/Artsy"

type ReactComponent = ComponentType<any>
type HistoryProtocol = "browser" | "hash" | "memory"

export interface AppConfig {
  historyProtocol?: HistoryProtocol
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
  immediate?: boolean
  onToggleLoading?: (isLoading: boolean) => void
  router?: any // TODO
  replace?: string
  to?: string
}

export interface PreloadLinkState {
  isLoading: boolean
}
