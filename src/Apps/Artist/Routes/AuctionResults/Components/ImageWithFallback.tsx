import React, { useState } from "react"

export const ImageWithFallback = ({ Fallback, ...props }) => {
  const [useFallback, setFallback] = useState(false)
  if (useFallback) {
    return <Fallback />
  } else {
    return <img onError={() => setFallback(true)} {...props} />
  }
}
