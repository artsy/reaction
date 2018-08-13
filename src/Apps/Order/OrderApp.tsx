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
  location: any
  routeIndices: number[]
  routes: any
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

  onTransition = location => {
    const { routes, routeIndices } = this.props
    let route = findRoute(routes, routeIndices)

    if (route.onTransition) {
      return route.onTransition(location)
    }

    return true
  }

  render() {
    const { children } = this.props
    return children
  }
}
