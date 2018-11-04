import { Theme, themeProps } from "@artsy/palette"
import * as Sentry from "@sentry/browser"
import { track } from "Artsy/Analytics"
import * as Artsy from "Artsy/SystemContext"
import { ErrorBoundary } from "Components/ErrorBoundary"
import { RouteConfig } from "found"
import React from "react"
import { HeadProvider } from "react-head"
import { Environment } from "relay-runtime"
import { data as sd } from "sharify"
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
  onlyMatchMediaQueries?: MatchingMediaQueries
  relayEnvironment: Environment
  routes: RouteConfig
  headTags?: JSX.Element[]
}

// TODO: Do we want to let Force explicitly inject the analytics code?
@track(null, {
  dispatch: data => Events.postEvent(data),
})
export class Boot extends React.Component<BootProps> {
  componentDidMount() {
    const env = sd.NODE_ENV || (process.env && process.env.NODE_ENV)
    if (env === "production") {
      Sentry.init({ dsn: sd.SENTRY_PUBLIC_DSN })
    }
  }

  render() {
    const { children, context, headTags = [], ...props } = this.props
    const contextProps = {
      ...props,
      ...context,
    }

    return (
      <ErrorBoundary>
        <HeadProvider headTags={headTags}>
          <StateProvider>
            <Artsy.SystemContextProvider {...contextProps}>
              <MediaContextProvider onlyMatch={props.onlyMatchMediaQueries}>
                <ResponsiveProvider
                  mediaQueries={themeProps.mediaQueries}
                  initialMatchingMediaQueries={
                    props.onlyMatchMediaQueries as any
                  }
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
            </Artsy.SystemContextProvider>
          </StateProvider>
        </HeadProvider>
      </ErrorBoundary>
    )
  }
}
