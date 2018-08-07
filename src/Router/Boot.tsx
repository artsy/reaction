import { Theme, themeProps } from "@artsy/palette"
import { track } from "Analytics"
import React from "react"
import { GridThemeProvider } from "styled-bootstrap-grid"
import styled from "styled-components"
import { GlobalStyles } from "Styleguide/Elements/GlobalStyles"
import { Grid } from "Styleguide/Elements/Grid"
import { BreakpointVisualizer } from "Styleguide/Utils/BreakpointVisualizer"
import { Provider as StateProvider } from "unstated"
import Events from "Utils/Events"
import { ResponsiveProvider } from "Utils/Responsive"
import { Responsive } from "Utils/Responsive"
import { ContextProvider } from "../Components/Artsy"
import { AppState } from "./state"
import { BootProps } from "./types"

// TODO: Do we want to let Force explicitly inject the analytics code?
@track(null, {
  dispatch: data => Events.postEvent(data),
})
export class Boot extends React.Component<BootProps> {
  static defaultProps = {
    initialMatchingMediaQueries: null,
    relayEnvironment: null,
    currentUser: null,
  }

  render() {
    const { children, ...props } = this.props
    const appState = new AppState(props)

    return (
      <StateProvider inject={[appState]}>
        <ContextProvider
          relayEnvironment={props.relayEnvironment}
          currentUser={props.currentUser}
        >
          <ResponsiveProvider
            mediaQueries={themeProps.mediaQueries}
            initialMatchingMediaQueries={props.initialMatchingMediaQueries}
          >
            <Theme>
              <GridThemeProvider gridTheme={themeProps.grid}>
                <Grid fluid>
                  <GlobalStyles>
                    <Responsive>
                      {({ xs }) => {
                        return (
                          <Padding padding={xs ? 20 : 40}>
                            {children}
                            {process.env.NODE_ENV === "development" && (
                              <BreakpointVisualizer />
                            )}
                          </Padding>
                        )
                      }}
                    </Responsive>
                  </GlobalStyles>
                </Grid>
              </GridThemeProvider>
            </Theme>
          </ResponsiveProvider>
        </ContextProvider>
      </StateProvider>
    )
  }
}

const Padding = styled.div.attrs<{ padding: number }>({})`
  padding-right: ${p => p.padding}px;
  padding-left: ${p => p.padding}px;
  margin-right: auto;
  margin-left: auto;
`
