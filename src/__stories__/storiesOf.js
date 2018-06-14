import React from "react"
import { storiesOf as _storiesOf } from "@storybook/react"
import { Theme, themeProps, injectGlobalCSS } from "@artsy/palette"
import { GlobalStyles } from "../Styleguide/Elements/GlobalStyles"
import { ResponsiveProvider } from "../Styleguide/Utils/Responsive"

injectGlobalCSS(`
  html, body {
    font-family: 'AGaramondPro-Regular';
    font-size: 16px;
    line-height: 24px;
  }
`)

const breakpoints = themeProps.mediaQueries

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
