// FIXME: Open PR back to found

declare module "farce" {
  type HistoryProtocol = "browser" | "hash" | "memory"

  interface HistoryOptions {
    useBeforeUnload?: boolean
  }
}

declare module "found/lib/server/getFarceResult" {
  import { Resolver, RouteConfig } from "found"

  export interface FarceRedirectionResult {
    redirect: {
      url: string
    }
  }

  export interface FarceRenderResult {
    status: number
    element: JSX.Element
  }

  // TODO: Defining the return value as a union like this definitely benefits
  //       from having access to a type guard. E.g.
  //
  // function isRedirect(
  //   farceResult: FarceResult
  // ): farceResult is FarceRedirectionResult {
  //   return (farceResult as FarceRedirectionResult).redirect !== undefined
  // }
  //
  export type FarceResult = FarceRedirectionResult | FarceRenderResult

  function getFarceResult(options: {
    url: string
    routeConfig: RouteConfig[]
    render: React.ReactElement<any> // TODO createRender() should return e.g. React.ReactElement<RenderComponent>
    historyMiddlewares?: any[] // TODO Farce is untyped
    historyOptions?: any
    matchContext?: any
    resolver?: Resolver
  }): Promise<FarceResult>

  export default getFarceResult
}

declare module "found/lib/server" {
  import _getFarceResult from "found/lib/server/getFarceResult"
  const getFarceResult: typeof _getFarceResult
}

declare module "found" {
  import { Match } from "found"

  interface Resolver {
    resolveElements: (match: Match) => JSX.Element[]
  }

  interface ResolverUtils {
    checkResolved: () => any
    isResolved: () => any
    getRouteMatches: (match) => any
    getRouteValues: (routeMatches, routeQuery, query) => any
    getComponents: () => any
    accumulateRouteValues: () => any
  }

  const ResolverUtils: ResolverUtils
}
