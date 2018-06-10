import React from "react"
import { storiesOf as _storiesOf } from "@storybook/react"
import { Theme, injectGlobalCSS } from "@artsy/palette"
import { ResponsiveProvider } from "../Styleguide/Elements/Responsive"

injectGlobalCSS()

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
        <ResponsiveProvider breakpoints={breakpoints}>
          {storyFn()}
        </ResponsiveProvider>
      </Theme>
    )
  })
}
