import { Match, RouteConfig } from "found"

export const findCurrentRoute = ({
  route,
  routes,
  routeIndices,
}: Match & { route?: RouteConfig }) => {
  if (route) {
    return route
  }
  let currentRoute = routes[routeIndices[0]]
  routeIndices.slice(1).forEach(routeIndex => {
    currentRoute = currentRoute.children[routeIndex]
  })
  return currentRoute
}
