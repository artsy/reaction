import { injectGlobalCSS, Theme, themeProps } from "@artsy/palette"
import React from "react"
import { GlobalStyles } from "Styleguide/Elements/GlobalStyles"
import { Grid } from "Styleguide/Elements/Grid"
import { ResponsiveProvider } from "Styleguide/Utils/Responsive"
import { Provider as StateProvider } from "unstated"

// FIXME: move inner css to Palette
injectGlobalCSS(`
  *:focus {
    outline: none;
  }
`)

export const Boot = ({ children }) => {
  return (
    <StateProvider>
      <ResponsiveProvider breakpoints={themeProps.mediaQueries}>
        <GlobalStyles>
          <Theme>
            <Grid fluid>{children}</Grid>
          </Theme>
        </GlobalStyles>
      </ResponsiveProvider>
    </StateProvider>
  )
}
