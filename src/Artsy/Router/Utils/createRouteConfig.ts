import { RouteConfig } from "found"
import { Route } from "../Route"

export function createRouteConfig(routes, user?): RouteConfig[] {
  const { routesMiddleware } = routes[0]
  if (routesMiddleware) {
    routes = routesMiddleware(routes, user)
  }
  return routes.map(route => {
    if (route.__proto__ === Object.prototype) {
      return new Route({
        ...route,
        children: route.children && createRouteConfig(route.children),
      })
    } else {
      return route
    }
  })
}
