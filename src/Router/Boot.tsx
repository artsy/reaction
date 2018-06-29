import { injectGlobalCSS, Theme, themeProps } from "@artsy/palette"
import React from "react"
import { GlobalStyles } from "Styleguide/Elements/GlobalStyles"
import { Grid } from "Styleguide/Elements/Grid"
import { ResponsiveProvider } from "Styleguide/Utils/Responsive"
import { Provider as StateProvider } from "unstated"
import { ContextProvider } from "../Components/Artsy"
import { GlobalState } from "./state"
import { BootProps } from "./types"

// FIXME: move inner css to Palette
if (process.env.NODE_ENV !== "test") {
  injectGlobalCSS(`
    *:focus {
      outline: none;
    }
  `)
}

export const Boot: React.SFC<BootProps> = ({ children, ...props }) => {
  const globalState = new GlobalState(props)

  return (
    <StateProvider inject={[globalState]}>
      <ContextProvider
        relayEnvironment={globalState.state.system.relayEnvironment}
      >
        <ResponsiveProvider
          initialBreakpoint={props.initialBreakpoint}
          breakpoints={themeProps.mediaQueries}
        >
          <GlobalStyles>
            <Theme>
              <Grid fluid>{children}</Grid>
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
