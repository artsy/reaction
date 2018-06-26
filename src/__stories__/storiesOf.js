import React from "react"
import { storiesOf as _storiesOf } from "@storybook/react"
import { Boot } from "../Styleguide/Pages/Boot"
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
