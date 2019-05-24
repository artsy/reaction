import { Breakpoint, themeProps } from "@artsy/palette"
import { useEffect, useState } from "react"

/**
 * Returns an object containing keys representing each media query as they're
 * defined in Palette's theme file, and if they're currently matching.
 *
 * NOTE: useMedia is not meant to be run on the server.
 *
 * See: https://github.com/artsy/palette/blob/master/packages/palette/src/Theme.tsx#L84-L92
 *
 * @example

    import { useMedia } from 'Utils/Hooks/useMedia'

    const App = () => {
      const { xs, sm, md, lg, xl } = useMedia()

      return (
        <div>Mobile view? {xs || sm}</div>
      )
    }
 */
export function useMedia(): { [k in Breakpoint]?: boolean } {
  const matches = Object.entries(themeProps.mediaQueries).reduce(
    (acc, [key, value]) => {
      return {
        ...acc,
        [key]: useMatchMedia(value),
      }
    },
    {}
  )
  return matches
}

/**
 * Checks to see if the browser matches a particular media query
 *
 * Thanks! https://github.com/olistic/react-use-media/
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
export function useMatchMedia(
  mediaQueryString: string,
  { initialMatches = null } = {}
) {
  const [matches, setMatches] = useState(initialMatches)

  // Exit if we're in a server-like environment
  const isServer = typeof window === "undefined"
  if (isServer) {
    return matches
  }

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
