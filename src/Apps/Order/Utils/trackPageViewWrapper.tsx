import React from "react"
import { trackPageView } from "./trackPageView"

export function trackPageViewWrapper<T>(
  Component: React.ComponentType<T>
): React.ComponentType<T> {
  return class TrackPageView extends React.Component<T> {
    static displayName = `TrackPageView(${Component.displayName ||
      Component.name ||
      "unknonwn"})`
    componentDidMount() {
      trackPageView()
    }
    render() {
      return <Component {...this.props} />
    }
  }
}
