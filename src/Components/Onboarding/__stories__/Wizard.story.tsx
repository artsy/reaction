import { storiesOf } from "@storybook/react"
import React from "react"

import { ContextProvider } from "Router/Artsy2"
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
