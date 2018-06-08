import React from "react"
import { storiesOf as _storiesOf } from "@storybook/react"
import { Theme, injectGlobalCSS } from "@artsy/palette"

export function storiesOf(desc, mod) {
  return _storiesOf(desc, mod).addDecorator(storyFn => {
    injectGlobalCSS()
    return <Theme>{storyFn()}</Theme>
  })
}
