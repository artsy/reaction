import { Theme, themeProps } from "@artsy/palette"
import React from "react"
import { GridThemeProvider } from "styled-bootstrap-grid"
import { GlobalStyles } from "Styleguide/Elements/GlobalStyles"
import { Grid } from "Styleguide/Elements/Grid"
import { ResponsiveProvider } from "Styleguide/Utils/Responsive"
import { Provider as StateProvider } from "unstated"
import { ContextProvider } from "../Components/Artsy"
import { GlobalState } from "./state"
import { BootProps } from "./types"

export const Boot: React.SFC<BootProps> = ({ children, ...props }) => {
  const globalState = new GlobalState(props)
  return (
    <StateProvider inject={[globalState]}>
      <ContextProvider
        relayEnvironment={globalState.state.system.relayEnvironment}
        currentUser={globalState.state.system.currentUser}
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
