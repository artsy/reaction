import { storiesOf } from "@storybook/react"
import React from "react"

import { ContextProvider } from "../../Artsy2"
import Budget from "../Steps/Budget"

storiesOf("Onboarding", module).add("Budget", () => {
  return (
    <div>
      <ContextProvider>
        {/* tbc */}
        <Budget onNextButtonPressed={null} />
      </ContextProvider>
    </div>
  )
})
