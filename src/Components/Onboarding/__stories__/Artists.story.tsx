import { storiesOf } from "@storybook/react"
import React from "react"

import { SystemContextProvider } from "Artsy/SystemContext"
import Artists from "../Steps/Artists"

storiesOf("Onboarding", module).add("Artist Selector", () => {
  return (
    <SystemContextProvider>
      <Artists onNextButtonPressed={() => null} />
    </SystemContextProvider>
  )
})
