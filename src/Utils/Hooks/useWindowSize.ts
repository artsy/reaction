import { useEffect, useState } from "react"
import { getViewportWidth } from "../viewport"

/**
 * A React hook for triggering an update when a window is resized.
 */
export function useWindowSize() {
  const isClient = typeof window !== undefined
  const [windowSize, setWindowSize] = useState(getViewportWidth())

  useEffect(() => {
    if (!isClient) {
      return () => null
    }

    const handleResize = () => {
      setWindowSize(getViewportWidth())
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowSize
}
