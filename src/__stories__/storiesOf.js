import React from "react"
import { storiesOf as _storiesOf } from "@storybook/react"
import { Boot } from "Router/Boot"
import { ContextProvider } from "Components/Artsy"

export function storiesOf(desc, mod) {
  return _storiesOf(desc, mod).addDecorator(storyFn => {
    return (
      <ContextProvider>
        <Boot>{storyFn()}</Boot>
      </ContextProvider>
    )
  })
}
