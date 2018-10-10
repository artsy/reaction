export * from "./SuperDeprecatedResponsive"
import * as theme from "@artsy/palette"
import { createMedia } from "./Media"

// We need this to be 0-based, whereas currently in palette xs is defined as 767
const newThemeBreakpoints = {
  xs: 0,
  sm: 768,
  md: 900,
  lg: 1024,
  xl: 1192,
}

const ReactionMedia = createMedia({
  breakpoints: newThemeBreakpoints,
  interactions: {
    // TODO: Haven’t actually tested this negated version yet
    hover: negated =>
      negated
        ? `not all and ${theme.themeProps.mediaQueries.hover}`
        : theme.themeProps.mediaQueries.hover,
  },
})

export const Media = ReactionMedia.Media
export const MediaContextProvider = ReactionMedia.MediaContextProvider
