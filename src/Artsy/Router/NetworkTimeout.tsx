import { ErrorModal } from "Components/Modal/ErrorModal"
import React, { useEffect, useState } from "react"
import { ErrorWithMetadata } from "Utils/errors"
import createLogger from "Utils/logger"

const logger = createLogger("Artsy/Router/NetworkTimeout")

const NETWORK_TIMEOUT_MS = 10000

export const NetworkTimeout: React.FC = () => {
  const [showErrorModal, toggleErrorModal] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!showErrorModal) {
        logger.error(
          new ErrorWithMetadata(
            `[Router/NetworkTimeout] Error: Network request timed out after ${NETWORK_TIMEOUT_MS}ms`
          )
        )
        toggleErrorModal(true)
      }
    }, NETWORK_TIMEOUT_MS)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  if (!showErrorModal) {
    return null
  }

  return (
    <ErrorModal
      headerText="Network timeout"
      show={showErrorModal}
      closeText="Retry"
      ctaAction={() => {
        location.reload()
      }}
    />
  )
}
