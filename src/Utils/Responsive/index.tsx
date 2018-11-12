export * from "./DeprecatedResponsive"
import * as theme from "@artsy/palette"
import { createMedia } from "@artsy/react-responsive-media"

// TODO: We need this to be 0-based, whereas currently in palette xs is defined
//       as 767. We should move this up to palette, but we need to give the
//       migration path for users of the current Responsive component some
//       serious thought.
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
    hover: theme.themeProps.mediaQueries.hover,
  },
})

export const Media = ReactionMedia.Media
export const MediaContextProvider = ReactionMedia.MediaContextProvider
export const MediaStyle = ReactionMedia.MediaStyle
