import { storiesOf } from "@storybook/react"
import * as React from "react"

import { SystemContextProvider } from "Artsy"
import Genes from "../Steps/Genes"

storiesOf("Onboarding", module).add("Gene Follow", () => {
  return (
    <SystemContextProvider>
      <Genes onNextButtonPressed={null} />
    </SystemContextProvider>
  )
})
