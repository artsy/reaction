import React from "react"
import { storiesOf as _storiesOf } from "@storybook/react"
import { GlobalStyles } from "../Styleguide/GlobalStyles"
import { Theme, injectGlobalCSS } from "@artsy/palette"
import { ResponsiveProvider } from "../Styleguide/Utils/Responsive"

injectGlobalCSS(`
  html, body {
    font-family: 'AGaramondPro-Regular';
    font-size: 16px;
    line-height: 24px;
  }
`)

const breakpoints = {
  xl: "(min-width: 1192px)",
  lg: "(min-width: 1024px) and (max-width: 1191px)",
  md: "(min-width: 900px) and (max-width: 1023px)",
  sm: "(min-width: 768px) and (max-width: 889px)",
  xs: "(max-width: 767px)",
}

export function storiesOf(desc, mod) {
  return _storiesOf(desc, mod).addDecorator(storyFn => {
    return (
      <Theme>
        <GlobalStyles>
          <ResponsiveProvider breakpoints={breakpoints}>
            {storyFn()}
          </ResponsiveProvider>
        </GlobalStyles>
      </Theme>
    )
  })
}
