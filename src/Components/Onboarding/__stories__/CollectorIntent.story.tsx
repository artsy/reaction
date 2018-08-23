import { storiesOf } from "@storybook/react"
import React from "react"

import { ContextProvider } from "Router/Artsy2"
import CollectorIntent from "../Steps/CollectorIntent"

storiesOf("Onboarding", module).add("Collector Intent", () => {
  return (
    <ContextProvider>
      <CollectorIntent onNextButtonPressed={() => null} />
    </ContextProvider>
  )
})
