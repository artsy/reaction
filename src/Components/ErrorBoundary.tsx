import { NavBar } from "Components/NavBar"
import React from "react"
import { ErrorWithMetadata } from "Utils/errors"
import createLogger from "Utils/logger"
import { ErrorModal } from "./Modal/ErrorModal"

const logger = createLogger()

interface Props {
  children?: any
  onCatch?: () => void
}

interface State {
  asyncChunkLoadError: boolean
}

export class ErrorBoundary extends React.Component<Props, State> {
  state = {
    asyncChunkLoadError: false,
  }

  componentDidCatch(error, errorInfo) {
    logger.error(new ErrorWithMetadata(error.message, errorInfo))

    if (this.props.onCatch) {
      this.props.onCatch()
    }
  }

  static getDerivedStateFromError(error) {
    /**
     * Check to see if there's been a network error while asynchronously loading
     * a dynamic webpack split chunk bundle. Can happen if a user is navigating
     * between routes and their network connection goes out.
     *
     * @see https://reactjs.org/docs/code-splitting.html
     */
    if (error.message.match(/Loading chunk .* failed/)) {
      return {
        asyncChunkLoadError: true,
      }
    }
  }

  render() {
    if (this.state.asyncChunkLoadError) {
      return <ErrorModalWithReload show={this.state.asyncChunkLoadError} />
    }

    return this.props.children
  }
}

/**
 * An error popup with the option to reload the page
 */
const ErrorModalWithReload: React.FC<{ show: boolean }> = ({ show }) => {
  return (
    <>
      <NavBar />
      <ErrorModal
        show={show}
        detailText="Please check your network connection and try again."
        closeText="Reload"
        ctaAction={() => {
          location.reload()
        }}
      />
    </>
  )
}
