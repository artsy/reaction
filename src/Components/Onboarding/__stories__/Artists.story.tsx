import { storiesOf } from "@storybook/react"
import React from "react"

import { ContextProvider } from "Artsy"
import Artists from "../Steps/Artists"

storiesOf("Onboarding", module).add("Artist Selector", () => {
  return (
    <ContextProvider>
      <Artists onNextButtonPressed={() => null} />
    </ContextProvider>
  )
})
