import { Location, RouteConfig, Router } from "found"
import React from "react"

const findRoute = (routes, routeIndices) => {
  let currentRoute = routes[routeIndices[0]]
  routeIndices.slice(1).forEach(routeIndex => {
    currentRoute = currentRoute.children[routeIndex]
  })
  return currentRoute
}

export interface OrderAppProps {
  me: {
    name: string
  }
  params: {
    orderID: string
  }
  location: Location
  routeIndices: number[]
  routes: RouteConfig[]
  router: Router
}

export class OrderApp extends React.Component<OrderAppProps> {
  removeTransitionHook: () => void

  constructor(props) {
    super(props)

    this.removeTransitionHook = props.router.addTransitionHook(
      this.onTransition
    )
  }

  componentWillUnmount() {
    this.removeTransitionHook()
  }

  onTransition = newLocation => {
    const { routes, routeIndices, location: oldLocation, router } = this.props
    const route = findRoute(routes, routeIndices)

    if (route.onTransition) {
      return route.onTransition(newLocation, oldLocation, router)
    }

    return true
  }

  render() {
    const { children } = this.props
    return children
  }
}
