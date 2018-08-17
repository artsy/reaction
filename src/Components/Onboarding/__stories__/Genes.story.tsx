import { storiesOf } from "@storybook/react"
import * as React from "react"

import { ContextProvider } from "../../Artsy2"
import Genes from "../Steps/Genes"

storiesOf("Onboarding", module).add("Gene Follow", () => {
  return (
    <ContextProvider>
      <Genes onNextButtonPressed={null} />
    </ContextProvider>
  )
})
