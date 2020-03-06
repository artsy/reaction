import { ErrorModal } from "Components/Modal/ErrorModal"
import React, { useEffect, useState } from "react"

const RENDER_TIMEOUT = 12000

export const NetworkTimeout: React.FC = () => {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!showModal) {
        setShowModal(true)
      }
    }, RENDER_TIMEOUT)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  if (!showModal) {
    return null
  }

  return (
    <ErrorModal
      show={showModal}
      closeText="Retry"
      ctaAction={() => {
        location.reload()
      }}
    />
  )
}
