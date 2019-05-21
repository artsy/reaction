/**
 * Thanks! https://github.com/olistic/react-use-media/
 */

import { useEffect, useState } from "react"

/**
 * Checks to see if the browser matches a particular media query
 *
 * @example

    import { themeProps } from '@artsy/palette'
    import { useMedia } from 'Utils/Hooks/useMedia'

    const App = () => {
      const isMobile = useMedia(themeProps.mediaQueries.sm)

      return (
        <div>Mobile view? {isMobile}</div>
      )
    }
 */
export function useMedia(
  mediaQueryString: string,
  { initialMatches = true } = {}
) {
  const [matches, setMatches] = useState(initialMatches)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQueryString)
    setMatches(mediaQueryList.matches)
    const handleChange = event => setMatches(event.matches)

    mediaQueryList.addEventListener("change", handleChange)
    return () => {
      mediaQueryList.removeEventListener("change", handleChange)
    }
  }, [mediaQueryString])

  return matches
}
