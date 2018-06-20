import React from "react"
import { storiesOf as _storiesOf } from "@storybook/react"
import { Theme, themeProps } from "@artsy/palette"
import { GlobalStyles } from "../Styleguide/Elements/GlobalStyles"
import { ResponsiveProvider } from "../Styleguide/Utils/Responsive"

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
