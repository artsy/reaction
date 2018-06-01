declare module "found" {
  // FIXME: Open PR back to found
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
