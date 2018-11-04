import { storiesOf } from "@storybook/react"
import React from "react"

import { SystemContextProvider } from "Artsy/SystemContext"
import CollectorIntent from "../Steps/CollectorIntent"

storiesOf("Onboarding", module).add("Collector Intent", () => {
  return (
    <SystemContextProvider>
      <CollectorIntent onNextButtonPressed={() => null} />
    </SystemContextProvider>
  )
})
