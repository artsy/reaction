import { Match, RouteConfig } from "found"

export const findCurrentRoute = ({
  routes,
  routeIndices,
}: Match & { route?: RouteConfig }) => {
  console.log(routes, routeIndices)
  let remainingRouteIndicies = [...routeIndices]
  let route: RouteConfig = routes[remainingRouteIndicies.shift()]

  while (remainingRouteIndicies.length > 0) {
    route = route.children[remainingRouteIndicies.shift()]
  }

  return route
}
