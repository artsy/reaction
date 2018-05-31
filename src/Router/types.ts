import { ComponentType } from "react"
import { RouteConfig } from "found"
import { ContextProps } from "../Components/Artsy"
import * as Found from "found"

type ReactComponent = ComponentType<any>

export interface AppConfig {
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
  data?: Object[]
  provide?: ContextProps
}

export interface PreloadLinkProps extends ContextProps, Found.WithRouter {
  immediate?: boolean
  onToggleLoading: (isLoading: boolean) => void
  replace?: string
  to?: string
  children: any
  render?: (renderProps: PreloadLinkState) => ReactComponent
}

export interface PreloadLinkState {
  isLoading: boolean
}
