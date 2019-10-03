import React from "react"
import { ErrorWithMetadata } from "Utils/errors"
import createLogger from "Utils/logger"

interface Props {
  children?: any
  onCatch?: () => void
}

const logger = createLogger()

export class ErrorBoundary extends React.Component<Props> {
  componentDidCatch(error, errorInfo) {
    logger.error(new ErrorWithMetadata(error.message, errorInfo))

    if (this.props.onCatch) {
      this.props.onCatch()
    }
  }

  render() {
    return this.props.children
  }
}
