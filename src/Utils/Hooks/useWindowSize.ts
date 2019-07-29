import { useEffect, useState } from "react"
import { getViewportWidth } from "../viewport"

/**
 * A React hook for triggering an update when a window is resized.
 */
export function useWindowSize() {
  const { width: viewportWidth } = getViewportWidth()
  const isClient = typeof window !== undefined
  const [windowSize, setWindowSize] = useState(viewportWidth)

  useEffect(() => {
    if (!isClient) {
      return () => null
    }

    const handleResize = () => {
      setWindowSize(viewportWidth)
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowSize
}
