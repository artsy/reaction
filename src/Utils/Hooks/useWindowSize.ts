import { useLayoutEffect, useState } from "react"
import { getViewportDimensions } from "Utils/viewport"

export const useWindowSize = () => {
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
