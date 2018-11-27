import React from "react"
import { ErrorWithMetadata } from "Utils/errors"
import createLogger from "Utils/logger"

interface Props {
  children?: any
}

const logger = createLogger()

export class ErrorBoundary extends React.Component<Props> {
  componentDidCatch(error, errorInfo) {
    logger.error(new ErrorWithMetadata(error.message, errorInfo))
  }

  render() {
    return this.props.children
  }
}
