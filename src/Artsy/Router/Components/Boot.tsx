import { Theme, themeProps } from "@artsy/palette"
import { track } from "Artsy/Analytics"
import * as Artsy from "Artsy/SystemContext"
import { ResolverUtils, RouteConfig } from "found"
import React from "react"
import { HeadProvider } from "react-head"
import { Environment } from "relay-runtime"
import { GridThemeProvider } from "styled-bootstrap-grid"
import { GlobalStyles } from "Styleguide/Elements/GlobalStyles"
import { Grid } from "Styleguide/Elements/Grid"
import { BreakpointVisualizer } from "Styleguide/Utils/BreakpointVisualizer"
import { Provider as StateProvider } from "unstated"
import Events from "Utils/Events"

import {
  MatchingMediaQueries,
  MediaContextProvider,
  ResponsiveProvider,
} from "Utils/Responsive"

export interface BootProps {
  context: object
  user: User
  initialMatchingMediaQueries?: MatchingMediaQueries
  relayEnvironment: Environment
  resolver: ResolverUtils
  routes: RouteConfig
  headTags?: JSX.Element[]
}

// TODO: Do we want to let Force explicitly inject the analytics code?
@track(null, {
  dispatch: data => Events.postEvent(data),
})
export class Boot extends React.Component<BootProps> {
  render() {
    const { children, context, headTags = [], ...props } = this.props
    const contextProps = {
      ...props,
      ...context,
    }

    return (
      <HeadProvider headTags={headTags}>
        <StateProvider>
          <Artsy.ContextProvider {...contextProps}>
            {/* TODO: initialMatchingMediaQueries may also contain `hover` */}
            <MediaContextProvider
              onlyRender={props.initialMatchingMediaQueries as any}
            >
              <ResponsiveProvider
                mediaQueries={themeProps.mediaQueries}
                initialMatchingMediaQueries={props.initialMatchingMediaQueries}
              >
                <Theme>
                  <GridThemeProvider gridTheme={themeProps.grid}>
                    <Grid fluid>
                      <GlobalStyles>
                        {children}
                        {process.env.NODE_ENV === "development" && (
                          <BreakpointVisualizer />
                        )}
                      </GlobalStyles>
                    </Grid>
                  </GridThemeProvider>
                </Theme>
              </ResponsiveProvider>
            </MediaContextProvider>
          </Artsy.ContextProvider>
        </StateProvider>
      </HeadProvider>
    )
  }
}
