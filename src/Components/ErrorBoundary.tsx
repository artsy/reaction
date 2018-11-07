import React from "react"
import createLogger from "Utils/logger"

interface Props {
  children?: any
}

const logger = createLogger()

export class ErrorBoundary extends React.Component<Props> {
  componentDidCatch(error, errorInfo) {
    logger.error(error, errorInfo)
  }

  render() {
    return this.props.children
  }
}
