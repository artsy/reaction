import { Match } from "found"

export const findCurrentRoute = ({ routes, routeIndices }: Match) => {
  let currentRoute = routes[routeIndices[0]]
  routeIndices.slice(1).forEach(routeIndex => {
    currentRoute = currentRoute.children[routeIndex]
  })
  return currentRoute
}
