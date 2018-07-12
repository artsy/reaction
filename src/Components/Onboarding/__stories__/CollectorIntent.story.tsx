import { storiesOf } from "@storybook/react"
import React from "react"

import { ContextProvider } from "../../Artsy"
import CollectorIntent from "../Steps/CollectorIntent"

storiesOf("Legacy/Onboarding", module).add("Collector Intent", () => {
  return (
    <ContextProvider>
      <CollectorIntent onNextButtonPressed={() => null} />
    </ContextProvider>
  )
})
