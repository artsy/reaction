import { ModalDialog } from "Components/Modal/ModalDialog"
import React, { useEffect, useState } from "react"

export const NetworkOfflineMonitor: React.FC = () => {
  const [showOfflineModal, toggleOfflineModal] = useState(false)

  const setOffline = () => {
    toggleOfflineModal(true)
  }
  const setOnline = () => {
    toggleOfflineModal(false)
  }

  useEffect(() => {
    window.addEventListener("offline", setOffline)
    window.addEventListener("online", setOnline)

    return () => {
      window.removeEventListener("offline", setOffline)
      window.removeEventListener("online", setOnline)
    }
  }, [])

  if (!showOfflineModal) {
    return null
  }

  return (
    <ModalDialog
      show={showOfflineModal}
      heading="Your network is offline"
      primaryCta={{
        text: "Dismiss",
        action: () => setOnline(),
      }}
    />
  )
}
