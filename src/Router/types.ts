import { ComponentType } from "react"
import { RouteConfig } from "found"
import { ContextProps } from "../Components/Artsy"

export interface AppConfig {
  routes: RouteConfig
  currentRoute?: string
  user?: User
}

export interface ClientResolveProps {
  ClientApp: ComponentType<any>
}

export interface ServerResolveProps {
  ServerApp?: ComponentType<any>
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
