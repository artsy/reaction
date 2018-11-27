import { Theme, themeProps } from "@artsy/palette"
import * as Sentry from "@sentry/browser"
import { track } from "Artsy/Analytics"
import * as Artsy from "Artsy/SystemContext"
import { ErrorBoundary } from "Components/ErrorBoundary"
import { ResolverUtils, RouteConfig } from "found"
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
  componentDidMount() {
    if (sd.NODE_ENV !== "development") {
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
            <Artsy.ContextProvider {...contextProps}>
              <MediaContextProvider
                onlyMatch={props.initialMatchingMediaQueries}
              >
                <ResponsiveProvider
                  mediaQueries={themeProps.mediaQueries}
                  initialMatchingMediaQueries={
                    props.initialMatchingMediaQueries
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
            </Artsy.ContextProvider>
          </StateProvider>
        </HeadProvider>
      </ErrorBoundary>
    )
  }
}
