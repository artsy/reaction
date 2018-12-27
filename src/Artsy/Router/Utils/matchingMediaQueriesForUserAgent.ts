import { findDevice } from "@artsy/detect-responsive-traits"
import {
  findBreakpointAtWidth,
  findBreakpointsForWidths,
  MatchingMediaQueries,
} from "Utils/Responsive"

/**
 * Find the breakpoints and interactions that the server should render
 */
export function matchingMediaQueriesForUserAgent(
  userAgent: string
): MatchingMediaQueries {
  const device = findDevice(userAgent)
  if (!device) {
    return undefined
  } else {
    const supportsHover = device.touch ? "notHover" : "hover"
    const onlyMatch: MatchingMediaQueries = device.resizable
      ? [
          supportsHover,
          ...findBreakpointsForWidths(device.minWidth, device.maxWidth),
        ]
      : [
          supportsHover,
          findBreakpointAtWidth(device.minWidth),
          findBreakpointAtWidth(device.maxWidth),
        ]
    return onlyMatch
  }
}
