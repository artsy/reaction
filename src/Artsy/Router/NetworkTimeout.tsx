import { ErrorModal } from "Components/Modal/ErrorModal"
import React, { useEffect, useState } from "react"

const NETWORK_TIMEOUT_MS = 10000

export const NetworkTimeout: React.FC = () => {
  const [showErrorModal, toggleErrorModal] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!showErrorModal) {
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
      show={showErrorModal}
      closeText="Retry"
      ctaAction={() => {
        location.reload()
      }}
    />
  )
}
