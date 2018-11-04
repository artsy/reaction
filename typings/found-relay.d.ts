declare module "found-relay" {
  import * as Found from "found"
  import * as RelayRuntime from "relay-runtime"

  class Resolver implements Found.Resolver {
    constructor(environment: RelayRuntime.Environment)

    resolveElements: (match: Found.Match) => JSX.Element[] // TODO ReadyStateRenderer element

    getRouteVariables: (match: Found.Match, routeMatches: any[]) => any // TODO Not sure if this is meant as public API
  }
}
