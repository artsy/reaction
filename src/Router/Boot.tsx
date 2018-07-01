import { Theme, themeProps } from "@artsy/palette"
import React from "react"
import { GridThemeProvider } from "styled-bootstrap-grid"
import { GlobalStyles } from "Styleguide/Elements/GlobalStyles"
import { Grid } from "Styleguide/Elements/Grid"
import { Provider as StateProvider } from "unstated"
import { ResponsiveProvider } from "Utils/Responsive"
import { ContextProvider } from "../Components/Artsy"
import { AppState } from "./state"
import { BootProps } from "./types"

export const Boot: React.SFC<BootProps> = ({ children, ...props }) => {
  const app = new AppState(props)
  const relayEnvironment = app.state.system && app.state.system.relayEnvironment
  const currentUser = app.state.system && app.state.system.currentUser
  return (
    <StateProvider inject={[app]}>
      <ContextProvider
        relayEnvironment={relayEnvironment}
        currentUser={currentUser}
      >
        <ResponsiveProvider
          initialBreakpoint={props.initialBreakpoint}
          breakpoints={themeProps.mediaQueries}
        >
          <GlobalStyles>
            <Theme>
              <GridThemeProvider gridTheme={themeProps.grid}>
                <Grid fluid>{children}</Grid>
              </GridThemeProvider>
            </Theme>
          </GlobalStyles>
        </ResponsiveProvider>
      </ContextProvider>
    </StateProvider>
  )
}

Boot.defaultProps = {
  initialBreakpoint: null,
}
