import { injectGlobalCSS, Theme, themeProps } from "@artsy/palette"
import React from "react"
import { GlobalStyles } from "Styleguide/Elements/GlobalStyles"
import { Grid } from "Styleguide/Elements/Grid"
import { ResponsiveProvider } from "Styleguide/Utils/Responsive"
import { Breakpoint } from "Styleguide/Utils/Responsive"
import { Provider as StateProvider } from "unstated"

// FIXME: move inner css to Palette
injectGlobalCSS(`
  *:focus {
    outline: none;
  }
`)

export interface BootProps {
  initialState?: {
    breakpoint: Breakpoint
  }
}

export const Boot: React.SFC<BootProps> = ({ children, ...props }) => {
  return (
    <StateProvider>
      <ResponsiveProvider
        initialBreakpoint={props.initialState.breakpoint}
        breakpoints={themeProps.mediaQueries}
      >
        <GlobalStyles>
          <Theme>
            <Grid fluid>{children}</Grid>
          </Theme>
        </GlobalStyles>
      </ResponsiveProvider>
    </StateProvider>
  )
}

Boot.defaultProps = {
  initialState: {
    breakpoint: null,
  },
}
