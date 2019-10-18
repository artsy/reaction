import { useLayoutEffect, useState } from "react"
import { getViewportDimensions } from "Utils/viewport"

export const useWindowSize = () => {
  if (typeof window === "undefined") {
    return { width: 0, height: 0 }
  }

  const [size, setSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    function resize() {
      const { width, height } = getViewportDimensions()

      setSize({ width, height })
    }
    window.addEventListener("resize", resize)
    resize()
    return () => window.removeEventListener("resize", resize)
  }, [])

  return size
}
