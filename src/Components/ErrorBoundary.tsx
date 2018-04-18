import React from "react"

interface Props {
  children?: any
}

export class ErrorBoundary extends React.Component<Props, null> {
  componentDidCatch(error, errorInfo) {
    console.error(error)
  }

  render() {
    return this.props.children
  }
}
