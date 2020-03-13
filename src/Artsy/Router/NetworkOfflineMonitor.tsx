import { Banner, Box } from "@artsy/palette"
import { debounce } from "lodash"
import React, { useEffect, useState } from "react"

export const NetworkOfflineMonitor: React.FC = () => {
  const [showOfflineModal, toggleOfflineModal] = useState(false)

  const setOffline = () => {
    debounce(() => toggleOfflineModal(true), 100)
  }
  const setOnline = () => {
    debounce(() => toggleOfflineModal(false), 100)
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
    <Box position="fixed" top={58} width="100%" style={{ opacity: 0.9 }}>
      <Banner
        backgroundColor="black10"
        textColor="black100"
        message="Network offline"
      />
    </Box>
  )
}
