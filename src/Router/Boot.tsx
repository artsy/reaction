import { Theme, themeProps } from "@artsy/palette"
import React from "react"
import { GridThemeProvider } from "styled-bootstrap-grid"
import { GlobalStyles } from "Styleguide/Elements/GlobalStyles"
import { Grid } from "Styleguide/Elements/Grid"
import { Container, Provider as StateProvider } from "unstated"
import { ResponsiveProvider } from "Utils/Responsive"
import { Breakpoint } from "Utils/Responsive"
import { ContextProvider } from "../Components/Artsy"
import { AppStateContainer } from "./types"

export interface BootProps extends AppStateContainer {
  initialBreakpoint?: Breakpoint
  initialState: Array<Container<any>>
}

export const Boot: React.SFC<BootProps> = ({ children, ...props }) => (
  <StateProvider inject={props.initialState}>
    <ContextProvider
      relayEnvironment={props.system.relayEnvironment}
      currentUser={props.system.currentUser}
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
