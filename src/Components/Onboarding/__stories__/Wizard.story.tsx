import { storiesOf } from "@storybook/react"
import React from "react"

import { SystemContextProvider } from "Artsy"
import { Wizard } from "../Wizard"

storiesOf("Onboarding", module).add("Wizard", () => {
  return (
    <div>
      <SystemContextProvider>
        <Wizard />
      </SystemContextProvider>
    </div>
  )
})
