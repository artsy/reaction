import { useEffect, useState } from "react"

export function useDidMount() {
  const [isMounted, toggleMounted] = useState(false)

  useEffect(() => {
    toggleMounted(true)
  }, [])

  return isMounted
}
