import { Theme, themeProps } from "@artsy/palette"
import { track } from "Analytics"
import React from "react"
import { Environment } from "relay-runtime"
import * as Artsy from "Router/Artsy2"
import { MatchingMediaQueries } from "Router/types"
import { GridThemeProvider } from "styled-bootstrap-grid"
import styled from "styled-components"
import { GlobalStyles } from "Styleguide/Elements/GlobalStyles"
import { Grid } from "Styleguide/Elements/Grid"
import { BreakpointVisualizer } from "Styleguide/Utils/BreakpointVisualizer"
import { Provider as StateProvider } from "unstated"
import Events from "Utils/Events"
import { ResponsiveProvider } from "Utils/Responsive"
import { Responsive } from "Utils/Responsive"

export interface BootProps {
  currentUser?: User
  initialMatchingMediaQueries?: MatchingMediaQueries
  relayEnvironment?: Environment
}

// TODO: Do we want to let Force explicitly inject the analytics code?
@track(null, {
  dispatch: data => Events.postEvent(data),
})
export class Boot extends React.Component<BootProps> {
  static defaultProps = {
    currentUser: null,
    initialMatchingMediaQueries: null,
    relayEnvironment: null,
  }

  render() {
    const { children, ...props } = this.props

    return (
      <StateProvider>
        <Artsy.ContextProvider {...props}>
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
                        // FIXME: Padding should be moved out of here
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
        </Artsy.ContextProvider>
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
