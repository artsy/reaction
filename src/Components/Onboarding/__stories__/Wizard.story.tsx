import { storiesOf } from "@storybook/react"
import React from "react"

import { ContextProvider } from "Artsy/SystemContext"
import { Wizard } from "../Wizard"

storiesOf("Onboarding", module).add("Wizard", () => {
  return (
    <div>
      <ContextProvider>
        <Wizard />
      </ContextProvider>
    </div>
  )
})
